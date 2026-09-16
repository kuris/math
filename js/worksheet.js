/* ============================================================
   수학아 놀자 (math) - 인쇄용 학습지 (worksheet.js)
   의존성: MathData · MathProblems · MathSync
   ============================================================ */
(function () {
  'use strict';

  function esc(s) { return MathData.escapeHtml(s); }
  var cur = [];

  function make() {
    var lv = document.querySelector('#ws-level .filter-chip.active');
    var level = lv ? lv.getAttribute('data-level') : 'elementary';
    var n = Number(document.getElementById('ws-count').value || 10);
    var pool = MathProblems.filter({ schoolLevel: level });
    cur = MathProblems.sample(pool, n);
    render(level);
    MathSync.saveWorksheet({
      title: ({
        elementary: '초등 학습지', middle: '중등 학습지', high: '고등 학습지'
      })[level] + ' ' + n + '문제',
      total: cur.length,
      detail: { level: level, ids: cur.map(function (p) { return p.id; }) }
    });
  }

  function render(level) {
    var label = ({ elementary: '초등', middle: '중등', high: '고등' })[level] || '';
    document.getElementById('ws-title').textContent = '수학 학습지 (' + label + ' ' + cur.length + '문제)';
    document.getElementById('ws-total').textContent = cur.length;
    document.getElementById('ws-list').innerHTML = cur.map(function (p) {
      return '<li style="margin-bottom:10px;">' + esc(p.question) +
        '<div style="border-bottom:1px solid var(--line);height:28px;margin-top:4px;"></div></li>';
    }).join('');
    document.getElementById('ws-answers').innerHTML = cur.map(function (p) {
      return '<li>' + esc(p.answer) + '</li>';
    }).join('');
  }

  function start() {
    if (!document.getElementById('ws-sheet')) return;
    document.querySelectorAll('#ws-level .filter-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('#ws-level .filter-chip').forEach(function (c) {
          c.classList.toggle('active', c === chip);
        });
      });
    });
    document.getElementById('ws-make').addEventListener('click', make);
    document.getElementById('ws-print').addEventListener('click', function () { window.print(); });
    make();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
