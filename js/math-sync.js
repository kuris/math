/* ============================================================
   수학아 놀자 (math) - 학습 기록 공통 계층 (math-sync.js)

   · 로그인 계정(auth.users.id) 기준 public 스키마에 저장합니다.
   · 공통 로그인 모듈(cg-auth.js)이 만든 public 클라이언트를 그대로 씁니다.
     (별도 클라이언트를 만들지 않아 토큰 갱신 충돌이 없습니다)
   · 비로그인: 기기(localStorage)에 저장, 페이지는 그대로 동작합니다.
   · AI/API 를 쓰지 않습니다.

   의존성: cg-auth.js (window.CGAuth)
   ============================================================ */
(function (global) {
  'use strict';

  function CG() { return global.CGAuth || null; }
  function warn(m, e) { try { console.warn('[수학 기록] ' + m, e && (e.message || e)); } catch (_) {} }
  function uid() { var c = CG(); return c ? c.getUserId() : null; }
  function isLoggedIn() { return !!(CG() && CG().isLoggedIn()); }
  function ready() { return CG() ? CG().ready() : Promise.resolve(false); }
  function onChange(cb) { return CG() ? CG().onChange(cb) : function () {}; }

  function db() {
    var c = CG();
    if (!c || !c.getPublicDb) return null;
    return c.getPublicDb();
  }

  // ---------- 공식 학습 완료 ----------
  async function markLearned(formulaId) {
    // 기기 기록은 항상
    try {
      var key = 'math_learned';
      var list = [];
      try { list = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { list = []; }
      if (list.indexOf(formulaId) === -1) {
        list.push(formulaId);
        localStorage.setItem(key, JSON.stringify(list));
      }
    } catch (e) {}
    // 서버 기록은 로그인 시
    if (!isLoggedIn()) return true;
    try {
      var d = db();
      if (!d) return false;
      var r = await d.from('math_progress').upsert(
        { user_id: uid(), formula_id: formulaId, status: 'done', learned_at: new Date().toISOString() },
        { onConflict: 'user_id,formula_id' }
      );
      if (r.error) throw r.error;
      // 최근 본 공식
      if (CG().touchRecent) CG().touchRecent({ kind: 'formula', id: formulaId, url: 'formula-view.html?id=' + formulaId });
      return true;
    } catch (e) { warn('학습 완료 저장 실패', e); return false; }
  }

  function learnedList() {
    try { return JSON.parse(localStorage.getItem('math_learned') || '[]'); }
    catch (e) { return []; }
  }
  function isLearned(formulaId) {
    return learnedList().indexOf(formulaId) !== -1;
  }

  async function learnedRemote(limit) {
    if (!isLoggedIn()) return [];
    try {
      var d = db();
      if (!d) return [];
      var q = d.from('math_progress').select('*').eq('user_id', uid()).order('learned_at', { ascending: false });
      if (limit) q = q.limit(limit);
      var r = await q;
      if (r.error) throw r.error;
      return r.data || [];
    } catch (e) { warn('학습 기록 조회 실패', e); return []; }
  }

  // ---------- 연습/퀴즈/학습지 기록 ----------
  async function savePractice(row) {
    bumpLocal('math_practice_count');
    if (!isLoggedIn()) return true;
    try {
      var d = db();
      if (!d) return false;
      var r = await d.from('math_practice_logs').insert(Object.assign({}, row, { user_id: uid() }));
      if (r.error) throw r.error;
      return true;
    } catch (e) { warn('연습 기록 저장 실패', e); return false; }
  }

  async function saveQuiz(row) {
    bumpLocal('math_quiz_count');
    if (!isLoggedIn()) return true;
    try {
      var d = db();
      if (!d) return false;
      var r = await d.from('math_quiz_logs').insert(Object.assign({}, row, { user_id: uid() }));
      if (r.error) throw r.error;
      return true;
    } catch (e) { warn('퀴즈 기록 저장 실패', e); return false; }
  }

  async function saveWorksheet(row) {
    if (!isLoggedIn()) return true;
    try {
      var d = db();
      if (!d) return false;
      var r = await d.from('math_worksheet_logs').insert(Object.assign({}, row, { user_id: uid() }));
      if (r.error) throw r.error;
      return true;
    } catch (e) { warn('학습지 기록 저장 실패', e); return false; }
  }

  async function listLogs(table, limit) {
    if (!isLoggedIn()) return [];
    try {
      var d = db();
      if (!d) return [];
      var q = d.from(table).select('*').eq('user_id', uid()).order('created_at', { ascending: false });
      if (limit) q = q.limit(limit);
      var r = await q;
      if (r.error) throw r.error;
      return r.data || [];
    } catch (e) { warn('기록 조회 실패 (' + table + ')', e); return []; }
  }

  // ---------- 통계 집계 ----------
  async function stats() {
    var out = {
      learned: learnedList().length,
      practice: 0, practiceCorrect: 0,
      quiz: 0, quizBest: 0,
      worksheets: 0
    };
    if (!isLoggedIn()) {
      try {
        out.practice = Number(localStorage.getItem('math_practice_count') || 0);
        out.quiz = Number(localStorage.getItem('math_quiz_count') || 0);
      } catch (e) {}
      return out;
    }
    var remote = await learnedRemote(2000);
    if (remote.length) out.learned = remote.length;
    var pl = await listLogs('math_practice_logs', 500);
    out.practice = pl.length;
    out.practiceCorrect = pl.filter(function (r) { return r.is_correct; }).length;
    var ql = await listLogs('math_quiz_logs', 100);
    out.quiz = ql.length;
    ql.forEach(function (r) {
      if (r.total) {
        var rate = Math.round((r.score / r.total) * 100);
        if (rate > out.quizBest) out.quizBest = rate;
      }
    });
    var wl = await listLogs('math_worksheet_logs', 100);
    out.worksheets = wl.length;
    return out;
  }

  // ---------- 서비스 가입 (첫 이용 시) ----------
  async function ensureMembership() {
    var c = CG();
    if (!c || !uid()) return;
    try {
      var d = c.getPublicDb();
      if (!d) return;
      await d.from('service_members')
        .insert({ user_id: uid(), service: 'math', last_seen_at: new Date().toISOString() })
        .onConflict('user_id,service')
        .ignore();
    } catch (e) { warn('서비스 가입 처리 실패', e); }
  }

  function bumpLocal(key) {
    try { localStorage.setItem(key, String(Number(localStorage.getItem(key) || 0) + 1)); } catch (e) {}
  }

  global.MathSync = {
    uid: uid,
    isLoggedIn: isLoggedIn,
    ready: ready,
    onChange: onChange,
    markLearned: markLearned,
    learnedList: learnedList,
    isLearned: isLearned,
    learnedRemote: learnedRemote,
    savePractice: savePractice,
    saveQuiz: saveQuiz,
    saveWorksheet: saveWorksheet,
    listLogs: listLogs,
    stats: stats,
    ensureMembership: ensureMembership
  };
})(typeof window !== 'undefined' ? window : this);
