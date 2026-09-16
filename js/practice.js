/* ============================================================
   수학아 놀자 (math) - 연습 문제 (practice.js)
   - 한 문제씩 풀이 + 해설 + 숫자 바꾸기 재생성
   - 로그인은 선택 (비로그인도 전체 기능)
   의존성: MathData · MathFormulas · MathProblems · MathGenerator · MathSync
   ============================================================ */
(function () {
  'use strict';

  function esc(s) { return MathData.escapeHtml(s); }
  var state = { level: 'all', formula: 'all', diff: 'all' };
  var cur = null;      // 현재 문제 (정적 or 생성)
  var curFormula = null;
  var score = { ok: 0, total: 0 };
  var genMode = false; // 숫자바꾸기 모드

  // 생성기 매핑 (공식 → generator 타입)
  var GEN_MAP = {
    el_rect_area: 'rectArea', el_add_carry: 'add', el_sub_borrow: 'sub',
    el_mult_table: 'mul', el_average: 'average',
    mi_linear_eq: 'linearEq'
  };

  function paintScore() {
    document.getElementById('practice-score').innerHTML =
      '<span class="quiz-dot">✅ ' + score.ok + '</span>' +
      '<span class="quiz-dot">📝 ' + score.total + '</span>' +
      (score.total ? '<span class="quiz-dot cur">정답률 ' + Math.round(score.ok / score.total * 100) + '%</span>' : '');
  }

  function pool() {
    return MathProblems.filter({
      schoolLevel: state.level === 'all' ? null : state.level,
      formulaId: state.formula === 'all' ? null : state.formula,
      level: state.diff === 'all' ? null : Number(state.diff)
    });
  }

  function next(staticOnly) {
    var list = pool();
    if (!list.length) {
      document.getElementById('practice-q').innerHTML = '<div class="empty">조건에 맞는 문제가 없어요. 필터를 바꿔 보세요.</div>';
      return;
    }
    cur = list[Math.floor(Math.random() * list.length)];
    curFormula = MathFormulas.get(cur.formulaId);
    genMode = false;
    if (!staticOnly) show(cur);
    else show(cur);
  }

  function show(p) {
    document.getElementById('practice-hint').textContent = '';
    document.getElementById('practice-fb').innerHTML = '';
    var f = curFormula;
    document.getElementById('practice-q').innerHTML =
      (f ? '<div style="margin-bottom:6px;"><span class="badge-lv ' + MathData.schoolLevelOf(f.schoolLevel).className + '">' +
        esc(f.emoji) + ' ' + esc(f.title) + '</span> ' +
        '<a href="formula-view.html?id=' + esc(f.id) + '" style="font-size:13px;">공식 보기 →</a></div>' : '') +
      '<div style="font-size:18px;font-weight:800;">Q. ' + esc(p.question) + '</div>';
    var ch = document.getElementById('practice-choices');
    var row = document.getElementById('practice-input-row');
    if (p.type === 'choice' && p.choices) {
      ch.style.display = '';
      row.style.display = 'none';
      ch.innerHTML = p.choices.map(function (c) {
        return '<li><button type="button" data-c="' + esc(c) + '">' + esc(c) + '</button></li>';
      }).join('');
      ch.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () { answer(b.getAttribute('data-c')); });
      });
    } else {
      ch.style.display = 'none';
      row.style.display = '';
      document.getElementById('practice-a').value = '';
      document.getElementById('practice-a').focus();
    }
  }

  function norm(s) { return String(s == null ? '' : s).replace(/\s+/g, ''); }

  function answer(v) {
    if (!cur) return;
    var ok = norm(v) === norm(cur.answer);
    score.total++;
    if (ok) score.ok++;
    paintScore();
    var fb = document.getElementById('practice-fb');
    fb.innerHTML = ok
      ? '<div class="feedback ok"><h3>🎉 ' + esc(MathData.pick(MathData.praise)) + '</h3><div>' + esc(cur.explanation) + '</div></div>'
      : '<div class="feedback no"><h3>💪 ' + esc(MathData.pick(MathData.comfort)) + '</h3>' +
        '<div>정답: <strong>' + esc(cur.answer) + '</strong></div><div>' + esc(cur.explanation) + '</div></div>' +
        '<div style="margin-top:10px;"><button class="btn btn-sm btn-primary" id="practice-next2">다음 문제</button></div>';
    var n2 = document.getElementById('practice-next2');
    if (n2) n2.addEventListener('click', function () { next(); });
    // 객관식 버튼 잠금
    document.querySelectorAll('#practice-choices button').forEach(function (b) {
      b.disabled = true;
      if (norm(b.getAttribute('data-c')) === norm(cur.answer)) b.classList.add('picked-ok');
      else if (norm(b.getAttribute('data-c')) === norm(v) && !ok) b.classList.add('picked-no');
    });
    MathSync.savePractice({
      formula_id: cur.formulaId,
      is_correct: ok,
      score: ok ? 1 : 0,
      total: 1,
      detail: { kind: 'practice', problem_id: cur.id || null, gen: genMode }
    });
  }

  function bind() {
    document.querySelectorAll('#level-chips .filter-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        state.level = chip.getAttribute('data-level');
        document.querySelectorAll('#level-chips .filter-chip').forEach(function (c) {
          c.classList.toggle('active', c === chip);
        });
        fillFormulas();
        next();
      });
    });
    document.getElementById('level-diff').addEventListener('change', function (e) {
      state.diff = e.target.value; next();
    });
    document.getElementById('formula-filter').addEventListener('change', function (e) {
      state.formula = e.target.value; next();
    });
    document.getElementById('next-btn').addEventListener('click', function () { next(); });
    document.getElementById('practice-ok').addEventListener('click', function () {
      answer(document.getElementById('practice-a').value);
    });
    document.getElementById('practice-a').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') answer(e.target.value);
    });
    document.getElementById('practice-hint-btn').addEventListener('click', function () {
      if (cur) document.getElementById('practice-hint').textContent = '💡 ' + cur.hint;
    });
    document.getElementById('practice-gen-btn').addEventListener('click', function () {
      regen();
    });
  }

  function fillFormulas() {
    var sel = document.getElementById('formula-filter');
    sel.innerHTML = '<option value="all">공식 (전체)</option>';
    MathFormulas.filter({ schoolLevel: state.level === 'all' ? null : state.level }).forEach(function (f) {
      var o = document.createElement('option');
      o.value = f.id;
      o.textContent = f.emoji + ' ' + f.title;
      sel.appendChild(o);
    });
    state.formula = 'all';
  }

  // 숫자 바꾸기 재생성
  function regen() {
    if (!cur || !curFormula) return;
    var t = GEN_MAP[cur.formulaId];
    if (!t || !window.MathGenerator) {
      document.getElementById('practice-hint').textContent = '이 문제는 숫자 바꾸기를 지원하지 않아요. 다음 문제로 넘어가세요.';
      return;
    }
    var g = MathGenerator.make(t, {});
    if (!g) return;
    if (cur.type === 'choice') MathGenerator.withChoices(g);
    cur = {
      id: null,
      formulaId: cur.formulaId,
      type: cur.type,
      question: g.question,
      choices: g.choices || null,
      answer: g.answer,
      explanation: g.explanation,
      hint: g.hint
    };
    genMode = true;
    show(cur);
  }

  function start() {
    if (!document.getElementById('practice-card')) return;
    // URL ?formula= 지원
    var fq = new URLSearchParams(window.location.search).get('formula');
    bind();
    fillFormulas();
    if (fq && MathFormulas.get(fq)) {
      state.formula = fq;
      document.getElementById('formula-filter').value = fq;
      var f = MathFormulas.get(fq);
      state.level = f.schoolLevel;
      document.querySelectorAll('#level-chips .filter-chip').forEach(function (c) {
        c.classList.toggle('active', c.getAttribute('data-level') === f.schoolLevel);
      });
      fillFormulas();
      document.getElementById('formula-filter').value = fq;
    }
    paintScore();
    next();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
