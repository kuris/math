/* ============================================================
   수학아 놀자 (math) - 홈 화면 (main.js)
   - 오늘의 공식 / 오늘의 5문제 / 암기 꿀팁 / 최근 학습 패널
   의존성: MathData · MathFormulas · MathProblems · MathSync · CGAuth
   ============================================================ */
(function () {
  'use strict';

  function esc(s) { return MathData.escapeHtml(s); }

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
    var f = MathFormulas.today();
    host.innerHTML = f ? formulaCard(f) : '<div class="empty">공식을 불러오지 못했어요.</div>';
  }

  function renderFive() {
    var host = document.getElementById('home-five');
    if (!host) return;
    var five = MathProblems.todayFive();
    host.innerHTML =
      '<ol style="margin:0;padding-left:20px;">' +
      five.map(function (p) {
        var f = MathFormulas.get(p.formulaId);
        return '<li style="margin-bottom:6px;">' + esc(p.question) +
          (f ? ' <small style="color:var(--muted);">(' + esc(f.title) + ')</small>' : '') + '</li>';
      }).join('') + '</ol>';
  }

  function renderTips() {
    var host = document.getElementById('home-tips');
    if (!host) return;
    var d = new Date();
    var seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    var tips = [];
    for (var k = 0; k < 3; k++) {
      var f = MathFormulas.all[(seed + k * 29) % MathFormulas.all.length];
      if (f) tips.push(f);
    }
    host.innerHTML = tips.map(function (f) {
      return '<div style="padding:10px 0;border-bottom:1px dashed var(--line);">' +
        '<div style="font-weight:800;">' + esc(f.emoji) + ' ' + esc(f.title) + '</div>' +
        '<div style="color:var(--warm);font-weight:700;">💡 ' + esc(f.memoryTip) + '</div>' +
        '<div style="font-size:13px;color:var(--muted);">' + esc(f.shortDescription) + '</div>' +
      '</div>';
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
      renderToday();
      renderFive();
      renderTips();
      mountRecent();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
