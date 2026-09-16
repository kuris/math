/* ============================================================
   수학아 놀자 (math) - 내 기록 (progress.js)
   - 비로그인: 기기 기록 표시 / 로그인: 계정 기록 표시
   의존성: MathData · MathFormulas · MathSync · CGAuth
   ============================================================ */
(function () {
  'use strict';

  function esc(s) { return MathData.escapeHtml(s); }
  function ago(iso) { return (window.CGAuth && CGAuth.timeAgo) ? CGAuth.timeAgo(iso) : ''; }

  function statCards(s) {
    var items = [
      ['배운 공식', s.learned, '개'],
      ['푼 연습 문제', s.practice, '문제'],
      ['연습 정답', s.practiceCorrect, '문제'],
      ['퀴즈 도전', s.quiz, '회'],
      ['퀴즈 최고', s.quizBest, '점'],
      ['학습지', s.worksheets, '장']
    ];
    return items.map(function (it) {
      return '<div class="stat-card"><div class="num">' + esc(it[1]) + '</div>' +
        '<div class="label">' + esc(it[0]) + ' <span style="color:var(--muted);font-size:12px;">' + esc(it[2]) + '</span></div></div>';
    }).join('');
  }

  async function render() {
    var s = await MathSync.stats();
    document.getElementById('pg-stats').innerHTML = statCards(s);

    // 배운 공식
    var fh = document.getElementById('pg-formulas');
    var remote = await MathSync.learnedRemote(10);
    if (remote.length) {
      fh.innerHTML = '<div class="cg-rec-list">' + remote.map(function (r) {
        var f = MathFormulas.get(r.formula_id);
        return f
          ? '<a class="cg-rec-row" href="formula-view.html?id=' + esc(f.id) + '">' +
            '<span class="cg-rec-title">' + esc(f.emoji) + ' ' + esc(f.title) + '</span>' +
            '<span class="cg-rec-when">' + esc(ago(r.learned_at)) + '</span></a>'
          : '';
      }).join('') + '</div>';
    } else {
      var local = MathSync.learnedList().slice(-10).reverse();
      fh.innerHTML = local.length
        ? '<div class="cg-rec-list">' + local.map(function (id) {
            var f = MathFormulas.get(id);
            return f ? '<a class="cg-rec-row" href="formula-view.html?id=' + esc(f.id) + '">' +
              '<span class="cg-rec-title">' + esc(f.emoji) + ' ' + esc(f.title) + '</span></a>' : '';
          }).join('') + '</div>'
        : '<div class="empty">아직 배운 공식이 없어요. 공식 모음에서 시작해 보세요.</div>';
    }

    // 퀴즈 기록
    var qh = document.getElementById('pg-quiz');
    var ql = await MathSync.listLogs('math_quiz_logs', 10);
    qh.innerHTML = ql.length
      ? '<div class="cg-rec-list">' + ql.map(function (r) {
          return '<div class="cg-rec-row"><span class="cg-rec-title">' + esc(r.score) + ' / ' + esc(r.total) + '</span>' +
            '<span class="cg-rec-sub">' + esc(r.quiz_type) + '</span>' +
            '<span class="cg-rec-when">' + esc(ago(r.created_at)) + '</span></div>';
        }).join('') + '</div>'
      : '<div class="empty">아직 퀴즈 기록이 없어요.' +
        (MathSync.isLoggedIn() ? '' : ' 로그인하면 계정에 쌓여요.') + '</div>';

    // 연습 기록
    var ph = document.getElementById('pg-practice');
    var pl = await MathSync.listLogs('math_practice_logs', 10);
    ph.innerHTML = pl.length
      ? '<div class="cg-rec-list">' + pl.map(function (r) {
          var f = MathFormulas.get(r.formula_id);
          return '<div class="cg-rec-row"><span class="cg-rec-title">' +
            (r.is_correct ? '⭕' : '❌') + ' ' + esc(f ? f.title : (r.formula_id || '')) + '</span>' +
            '<span class="cg-rec-when">' + esc(ago(r.created_at)) + '</span></div>';
        }).join('') + '</div>'
      : '<div class="empty">아직 연습 기록이 없어요.</div>';
  }

  function start() {
    if (!document.getElementById('pg-stats')) return;
    MathSync.ready().then(function () {
      render();
      if (MathSync.isLoggedIn()) MathSync.ensureMembership();
    });
    MathSync.onChange(function () { render(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
