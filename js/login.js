/* ============================================================
   수학아 놀자 (math) - 로그인 / 내 정보 (login.js)
   새 로그인 시스템을 만들지 않습니다. 공통 cg-auth(Google) 그대로 사용.
   의존성: MathData · MathSync · CGAuth
   ============================================================ */
(function () {
  'use strict';

  function esc(s) { return MathData.escapeHtml(s); }

  async function renderDash() {
    var name = (window.CGAuth && CGAuth.displayName()) || '반가워요';
    document.getElementById('dash-greeting').textContent = name + '님, 오늘도 수학 한 문제! 🔢';
    var s = await MathSync.stats();
    document.getElementById('dash-count').textContent =
      '배운 공식 ' + s.learned + '개 · 푼 연습 ' + s.practice + '문제 · 퀴즈 ' + s.quiz + '회';
    var rows = await MathSync.learnedRemote(5);
    document.getElementById('dash-recent').innerHTML = rows.length
      ? '<div class="cg-rec-list">' + rows.map(function (r) {
          var f = MathFormulas.get(r.formula_id);
          return f ? '<a class="cg-rec-row" href="formula-view.html?id=' + esc(f.id) + '">' +
            '<span class="cg-rec-title">' + esc(f.emoji) + ' ' + esc(f.title) + '</span></a>' : '';
        }).join('') + '</div>'
      : '<div class="empty">아직 배운 공식이 없어요.</div>';
  }

  function applyAuth(loggedIn) {
    document.getElementById('auth-view').style.display = loggedIn ? 'none' : '';
    document.getElementById('dash-view').style.display = loggedIn ? '' : 'none';
    if (loggedIn) { MathSync.ensureMembership(); renderDash(); }
  }

  function start() {
    if (!document.getElementById('auth-view')) return;
    MathSync.ready().then(function () { applyAuth(MathSync.isLoggedIn()); });
    MathSync.onChange(function (s) { applyAuth(s.isLoggedIn); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
