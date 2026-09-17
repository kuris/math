/* ============================================================
   수학아 놀자 (math) - 홈 화면 (main.js)
   - 오늘의 공식 / 오늘의 5문제 / 암기 꿀팁 / 최근 학습 패널
   의존성: MathData · MathFormulas · MathProblems · MathSync · CGAuth
   ============================================================ */
(function () {
  'use strict';

  function esc(s) { return MathData.escapeHtml(s); }

  // ---------- 홈 데이터 헬퍼 (실제 데이터 기반, fallback 포함) ----------
  function allFormulas() { return (window.MathFormulas && MathFormulas.all) || []; }
  function allProblems() { return (window.MathProblems && MathProblems.all) || []; }

  function getTodayFormula() {
    if (window.MathFormulas && MathFormulas.today) return MathFormulas.today();
    var all = allFormulas();
    if (!all.length) return null;
    var d = new Date();
    var seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    return all[seed % all.length];
  }

  function getTodayProblems() {
    if (window.MathProblems && MathProblems.todayFive) return MathProblems.todayFive();
    var all = allProblems();
    if (!all.length) return [];
    var d = new Date();
    var seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    var out = [];
    for (var k = 0; k < 5 && all.length; k++) out.push(all[(seed + k * 37) % all.length]);
    return out;
  }

  function getMemoryTips(count) {
    var all = allFormulas();
    if (!all.length) return [];
    var d = new Date();
    var seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    var tips = [];
    for (var k = 0; k < (count || 3); k++) {
      var f = all[(seed + 1 + k * 29) % all.length];
      if (f) tips.push(f);
    }
    return tips;
  }

  // 많이 헷갈리는 공식 짝 (실제 ID 기반)
  var CONFUSING_IDS = [
    'el_rect_perimeter', 'mi_circle_area',
    'el_average', 'mi_mean_med_mode',
    'hi_log_laws'
  ];

  function getConfusingFormulas() {
    if (!window.MathFormulas || !MathFormulas.get) return [];
    return CONFUSING_IDS.map(function (id) { return MathFormulas.get(id); }).filter(Boolean);
  }

  var POPULAR_UNITS = ['분수', '도형', '방정식', '함수', '확률', '피타고라스', '지수로그', '미분적분'];

  // 학교급별 대표 정보 (실제 데이터에서 단원·공식 추출)
  function levelInfo(schoolLevel) {
    var all = allFormulas().filter(function (f) { return f.schoolLevel === schoolLevel; });
    var units = [];
    all.forEach(function (f) {
      if (f.unit && units.indexOf(f.unit) === -1) units.push(f.unit);
    });
    return {
      count: all.length,
      units: units.slice(0, 4),
      sample: all.length ? all[all.length % all.length] : null,
      sample2: all.length > 1 ? all[(all.length + 3) % all.length] : null
    };
  }

  function formulaCard(f) {
    var lv = MathData.schoolLevelOf(f.schoolLevel);
    var tp = MathData.topicOf(f.topic);
    return (
      '<article class="formula-card ' + lv.className + '">' +
        '<h3><a href="formula-view.html?id=' + esc(f.id) + '">' + esc(f.emoji) + ' ' + esc(f.title) + '</a></h3>' +
        '<div class="fc-tags">' +
          '<span class="badge-lv ' + lv.className + '">' + lv.emoji + ' ' + esc(MathData.gradeLabelOf(f.gradeLevel)) + '</span>' +
          '<span class="badge-topic">' + tp.emoji + ' ' + esc(f.unit) + '</span>' +
        '</div>' +
        '<div class="fc-formula">공식: ' + esc(f.formula) + '</div>' +
        '<div class="fc-easy">쉽게: ' + esc(f.shortDescription) + '</div>' +
        '<div class="fc-tip">암기: ' + esc(f.memoryTip) + '</div>' +
        '<div class="fc-foot">' +
          '<a class="btn btn-sm btn-outline" href="formula-view.html?id=' + esc(f.id) + '">자세히 보기</a>' +
          '<a class="btn btn-sm btn-primary" href="practice.html?formula=' + esc(f.id) + '">문제 풀기</a>' +
        '</div>' +
      '</article>'
    );
  }

  function renderToday() {
    var host = document.getElementById('home-today');
    if (!host) return;
    var f = getTodayFormula();
    host.innerHTML = f ? formulaCard(f) : '<div class="empty">공식을 불러오지 못했어요.</div>';
  }

  function renderHomeStats() {
    var host = document.getElementById('home-stats');
    if (!host) return;
    var nf = allFormulas().length || 110;
    var np = allProblems().length || 200;
    host.innerHTML =
      '<div class="ms-item"><strong>' + nf + '+</strong><span>주요 공식</span></div>' +
      '<div class="ms-item"><strong>' + np + '+</strong><span>연습 문제</span></div>' +
      '<div class="ms-item"><strong>초·중·고</strong><span>전체 과정</span></div>';
  }

  function renderMission() {
    var host = document.getElementById('home-mission');
    if (!host) return;
    var f = getTodayFormula();
    if (!f) { host.innerHTML = '<div class="empty">오늘의 공식을 불러오지 못했어요.</div>'; return; }
    var lv = MathData.schoolLevelOf(f.schoolLevel);
    host.innerHTML =
      '<a class="mission-formula" href="formula-view.html?id=' + esc(f.id) + '">' +
        '<span class="badge-lv ' + lv.className + '">' + lv.emoji + ' 오늘의 추천 공식</span>' +
        '<strong>' + esc(f.emoji) + ' ' + esc(f.title) + '</strong>' +
        '<span class="mission-formula-eq">' + esc(f.formula) + '</span>' +
      '</a>';
  }

  function renderLevelCards() {
    var host = document.getElementById('home-levels');
    if (!host) return;
    var defs = [
      { value: 'elementary', title: '초등 수학', desc: '계산, 분수, 도형, 평균을 쉽고 재미있게 배워요.', link: 'formulas.html?level=elementary' },
      { value: 'middle', title: '중등 수학', desc: '방정식, 함수, 도형, 확률을 공식과 문제로 익혀요.', link: 'formulas.html?level=middle' },
      { value: 'high', title: '고등 수학', desc: '지수로그, 삼각함수, 수열, 미분적분까지 핵심 공식을 정리해요.', link: 'formulas.html?level=high' }
    ];
    host.innerHTML = defs.map(function (d) {
      var info = levelInfo(d.value);
      var lv = MathData.schoolLevelOf(d.value);
      var pracLink = 'practice.html?school=' + d.value;
      return '<div class="level-card level-card--' + lv.className.replace('lv-', '') + '">' +
        '<div class="emoji">' + lv.emoji + '</div>' +
        '<h3>' + d.title + '</h3>' +
        '<p>' + d.desc + '</p>' +
        (info.units.length ? '<div class="lc-units">' + info.units.map(function (u) { return '<span>' + esc(u) + '</span>'; }).join('') + '</div>' : '') +
        ((info.sample || info.sample2) ? '<div class="lc-formulas">' +
          [info.sample, info.sample2].filter(Boolean).map(function (f) {
            return '<a href="formula-view.html?id=' + esc(f.id) + '">📐 ' + esc(f.title) + '</a>';
          }).join('') + '</div>' : '') +
        '<div class="lc-count">' + info.count + '개 공식 준비됨</div>' +
        '<div class="lc-foot">' +
          '<a class="btn btn-sm btn-outline" href="' + d.link + '">공식 보기</a>' +
          '<a class="btn btn-sm btn-primary" href="' + pracLink + '">문제 풀기</a>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function renderFive() {
    var host = document.getElementById('home-five');
    if (!host) return;
    var five = getTodayProblems();
    host.innerHTML =
      '<ol class="five-list">' +
      five.map(function (p) {
        var f = (window.MathFormulas && MathFormulas.get) ? MathFormulas.get(p.formulaId) : null;
        var lv = f ? MathData.schoolLevelOf(f.schoolLevel) : null;
        return '<li>' + esc(p.question) +
          (f ? ' <small>(' + (lv ? lv.label + ' · ' : '') + esc(f.title) + ')</small>' : '') + '</li>';
      }).join('') + '</ol>';
  }

  function renderTips() {
    var host = document.getElementById('home-tips');
    if (!host) return;
    var tips = getMemoryTips(3);
    if (!tips.length) { host.innerHTML = '<div class="empty">꿀팁을 불러오지 못했어요.</div>'; return; }
    host.innerHTML = tips.map(function (f) {
      return '<div class="tip-row">' +
        '<div class="tip-row-head">' + esc(f.emoji) + ' ' + esc(f.title) + '</div>' +
        '<div class="tip-row-tip">💡 ' + esc(f.memoryTip) + '</div>' +
        '<div class="tip-row-easy">' + esc(f.shortDescription) + '</div>' +
      '</div>';
    }).join('');
  }

  function renderConfusing() {
    var host = document.getElementById('home-confusing');
    if (!host) return;
    var list = getConfusingFormulas();
    if (!list.length) { host.style.display = 'none'; return; }
    host.innerHTML = list.map(function (f) {
      var lv = MathData.schoolLevelOf(f.schoolLevel);
      var warn = (f.commonMistakes && f.commonMistakes[0]) || '헷갈리기 쉬운 포인트를 꼭 확인해요.';
      return '<article class="formula-card ' + lv.className + '">' +
        '<h3><a href="formula-view.html?id=' + esc(f.id) + '">' + esc(f.emoji) + ' ' + esc(f.title) + '</a></h3>' +
        '<div class="fc-formula">공식: ' + esc(f.formula) + '</div>' +
        '<div class="dont-box">🙅 헷갈리지 마! ' + esc(warn) + '</div>' +
        '<div class="fc-foot"><a class="btn btn-sm btn-outline" href="formula-view.html?id=' + esc(f.id) + '">자세히 보기</a></div>' +
      '</article>';
    }).join('');
  }

  function renderUnits() {
    var host = document.getElementById('home-units');
    if (!host) return;
    host.innerHTML = POPULAR_UNITS.map(function (u) {
      return '<a class="unit-chip" href="formulas.html?q=' + encodeURIComponent(u) + '">📦 ' + esc(u) + '</a>';
    }).join('');
  }

  function mountRecent() {
    var host = document.getElementById('math-recent');
    if (!host || !window.CGAuth || !CGAuth.mountRecentPanel) return;
    CGAuth.mountRecentPanel(host, {
      title: '📂 최근 학습',
      moreUrl: 'progress.html',
      guestText: 'Google 로그인하면 배운 공식과 퀴즈 점수가 계정에 저장돼, 휴대폰에서 풀고 PC에서 이어서 볼 수 있어요.',
      emptyText: '아직 학습 기록이 없어요. 공식 하나를 골라 배워 보세요.',
      limit: 6,
      loader: async function () {
        var rows = await MathSync.learnedRemote(6);
        if (!rows.length) {
          var local = MathSync.learnedList().slice(-6).reverse();
          return local.map(function (id) {
            var f = MathFormulas.get(id);
            return f ? { title: f.emoji + ' ' + f.title, url: 'formula-view.html?id=' + f.id } : null;
          }).filter(Boolean);
        }
        return rows.map(function (r) {
          var f = MathFormulas.get(r.formula_id);
          return f
            ? { title: f.emoji + ' ' + f.title, url: 'formula-view.html?id=' + f.id, updated_at: r.learned_at }
            : { title: r.formula_id, updated_at: r.learned_at };
        });
      }
    });
  }

  function start() {
    MathSync.ready().then(function () {
      renderHomeStats();
      renderMission();
      renderLevelCards();
      renderToday();
      renderFive();
      renderTips();
      renderConfusing();
      renderUnits();
      mountRecent();
    });
  }

  // 테스트·재사용용 공개 API
  window.MathHome = {
    getTodayFormula: getTodayFormula,
    getTodayProblems: getTodayProblems,
    getMemoryTips: getMemoryTips,
    getConfusingFormulas: getConfusingFormulas,
    renderHomeStats: renderHomeStats,
    renderMission: renderMission,
    renderLevelCards: renderLevelCards,
    renderToday: renderToday,
    renderFive: renderFive,
    renderTips: renderTips,
    renderConfusing: renderConfusing,
    renderUnits: renderUnits
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
