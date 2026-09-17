/* ============================================================
   수학아 놀자 (math) - 학습 통계 (stats.js, 로그인 필요)
   의존성: MathData · MathFormulas · MathSync
   ============================================================ */
(function () {
  'use strict';

  function esc(s) { return MathData.escapeHtml(s); }

  function barRow(label, n, max, cls) {
    var pct = max ? Math.round((n / max) * 100) : 0;
    return (
      '<div class="bar-row">' +
        '<div class="bar-label">' + esc(label) + '</div>' +
        '<div class="bar-track"><div class="bar-fill' + (cls || '') + '" style="width:' + pct + '%"></div></div>' +
        '<div class="bar-num">' + n + '</div>' +
      '</div>'
    );
  }

  async function render() {
    var s = await MathSync.stats();
    var totals = {
      elementary: MathFormulas.bySchool('elementary').length,
      middle: MathFormulas.bySchool('middle').length,
      high: MathFormulas.bySchool('high').length
    };
    document.getElementById('stat-row').innerHTML = [
      ['배운 공식', s.learned + ' / ' + MathFormulas.all.length, '개'],
      ['연습 정답률', s.practice ? Math.round(s.practiceCorrect / s.practice * 100) + '%' : '—', '📝'],
      ['퀴즈 최고', s.quizBest, '점'],
      ['학습지', s.worksheets, '장']
    ].map(function (it) {
      return '<div class="stat-card"><div class="num">' + esc(it[1]) + '</div>' +
        '<div class="label">' + esc(it[0]) + ' <span style="color:var(--muted);font-size:12px;">' + esc(it[2]) + '</span></div></div>';
    }).join('');

    // 학교급별 학습
    var remote = await MathSync.learnedRemote(2000);
    var byLv = { elementary: 0, middle: 0, high: 0 };
    remote.forEach(function (r) {
      var f = MathFormulas.get(r.formula_id);
      if (f && byLv[f.schoolLevel] !== undefined) byLv[f.schoolLevel]++;
    });
    var max = Math.max(totals.elementary, totals.middle, totals.high, 1);
    document.getElementById('stats-level').innerHTML =
      '<h2 class="sec-title" style="margin-top:0;">초등·중등·고등별 학습</h2>' +
      barRow('🌱 초등 (' + byLv.elementary + '/' + totals.elementary + ')', byLv.elementary, max, ' bar-fill--el') +
      barRow('🌊 중등 (' + byLv.middle + '/' + totals.middle + ')', byLv.middle, max, ' bar-fill--mi') +
      barRow('🔮 고등 (' + byLv.high + '/' + totals.high + ')', byLv.high, max, ' bar-fill--hi');

    // 최근
    document.getElementById('stats-recent').innerHTML =
      '<h2 class="sec-title" style="margin-top:0;">최근 배운 공식</h2>' +
      (remote.length
        ? '<div class="cg-rec-list">' + remote.slice(0, 8).map(function (r) {
            var f = MathFormulas.get(r.formula_id);
            return f ? '<a class="cg-rec-row" href="formula-view.html?id=' + esc(f.id) + '">' +
              '<span class="cg-rec-title">' + esc(f.emoji) + ' ' + esc(f.title) + '</span></a>' : '';
          }).join('') + '</div>'
        : '<div class="empty">아직 배운 공식이 없어요.</div>');
  }

  function applyAuth(loggedIn) {
    document.getElementById('auth-required').style.display = loggedIn ? 'none' : '';
    document.getElementById('stats-area').style.display = loggedIn ? '' : 'none';
    if (loggedIn) { render(); MathSync.ensureMembership(); }
  }

  function start() {
    if (!document.getElementById('stats-area')) return;
    MathSync.ready().then(function () { applyAuth(MathSync.isLoggedIn()); });
    MathSync.onChange(function (s) { applyAuth(s.isLoggedIn); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
