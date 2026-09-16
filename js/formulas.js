/* ============================================================
   수학아 놀자 (math) - 공식 목록 (formulas.js)
   - 학교급/단원 필터 + 검색
   의존성: MathData · MathFormulas · MathSync
   ============================================================ */
(function () {
  'use strict';

  function esc(s) { return MathData.escapeHtml(s); }
  var state = { level: 'all', topic: 'all', q: '' };

  function cardHtml(f) {
    var lv = MathData.schoolLevelOf(f.schoolLevel);
    var tp = MathData.topicOf(f.topic);
    var done = MathSync.isLearned(f.id);
    return (
      '<article class="formula-card ' + lv.className + '">' +
        '<h3><a href="formula-view.html?id=' + esc(f.id) + '">' + esc(f.emoji) + ' ' + esc(f.title) +
        (done ? ' <span class="done-stamp" style="font-size:11px;padding:2px 8px;">✅ 배움</span>' : '') + '</a></h3>' +
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

  function render() {
    var grid = document.getElementById('formula-grid');
    var empty = document.getElementById('empty-state');
    var count = document.getElementById('formula-count');
    var rows = MathFormulas.filter({
      schoolLevel: state.level === 'all' ? null : state.level,
      topic: state.topic === 'all' ? null : state.topic,
      q: state.q
    });
    grid.innerHTML = rows.map(cardHtml).join('');
    empty.style.display = rows.length ? 'none' : '';
    count.textContent = '총 ' + MathFormulas.all.length + '개 중 ' + rows.length + '개 표시';
  }

  function fillTopics() {
    var sel = document.getElementById('topic-filter');
    MathData.topics.forEach(function (t) {
      var o = document.createElement('option');
      o.value = t.value;
      o.textContent = t.emoji + ' ' + t.label;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function () { state.topic = sel.value; render(); });
  }

  function start() {
    if (!document.getElementById('formula-grid')) return;
    // URL ?level=elementary 지원
    var lv = new URLSearchParams(window.location.search).get('level');
    if (lv && ['elementary', 'middle', 'high'].indexOf(lv) !== -1) {
      state.level = lv;
      document.querySelectorAll('#level-chips .filter-chip').forEach(function (c) {
        c.classList.toggle('active', c.getAttribute('data-level') === lv);
      });
    }
    document.querySelectorAll('#level-chips .filter-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        state.level = chip.getAttribute('data-level');
        document.querySelectorAll('#level-chips .filter-chip').forEach(function (c) {
          c.classList.toggle('active', c === chip);
        });
        render();
      });
    });
    var inp = document.getElementById('search-input');
    inp.addEventListener('input', function () { state.q = inp.value.trim(); render(); });
    fillTopics();
    MathSync.ready().then(render);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
