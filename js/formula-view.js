/* ============================================================
   수학아 놀자 (math) - 공식 상세 (formula-view.js)
   - 쉬운 설명/비유/암기팁/예제/실수/확인문제/관련공식/완료
   의존성: MathData · MathFormulas · MathProblems · MathSync · CGAuth
   ============================================================ */
(function () {
  'use strict';

  function esc(s) { return MathData.escapeHtml(s); }
  var id = new URLSearchParams(window.location.search).get('id');
  var formula = null;

  function showGate() {
    document.getElementById('auth-gate').style.display = '';
  }

  function render(f) {
    formula = f;
    document.title = f.title + ' - 수학아 놀자!';
    var lv = MathData.schoolLevelOf(f.schoolLevel);
    var tp = MathData.topicOf(f.topic);

    document.getElementById('fv-tags').innerHTML =
      '<span class="badge-lv ' + lv.className + '">' + lv.emoji + ' ' + esc(MathData.gradeLabelOf(f.gradeLevel)) + '</span>' +
      '<span class="badge-topic">' + tp.emoji + ' ' + esc(f.unit) + '</span>';
    document.getElementById('fv-title').textContent = f.emoji + ' ' + f.title;
    document.getElementById('fv-formula').textContent = f.formula;
    document.getElementById('fv-use').textContent = f.useWhen;
    document.getElementById('fv-easy').textContent = f.easyExplanation;
    document.getElementById('fv-fun').textContent = f.funExplanation;
    document.getElementById('fv-tip').textContent = f.memoryTip;

    document.getElementById('fv-ex-q').textContent = 'Q. ' + f.example.question;
    document.getElementById('fv-ex-steps').innerHTML =
      f.example.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
    document.getElementById('fv-ex-a').textContent = '정답: ' + f.example.answer;

    document.getElementById('fv-warn').innerHTML =
      (f.commonMistakes || []).map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('');

    document.getElementById('fv-check-q').textContent = 'Q. ' + f.quickCheck.question;

    var rel = MathFormulas.related(f);
    document.getElementById('fv-related').innerHTML = rel.length
      ? rel.map(function (r) {
          return '<a class="btn btn-sm btn-outline" style="margin:0 6px 6px 0;" href="formula-view.html?id=' + esc(r.id) + '">' +
            esc(r.emoji) + ' ' + esc(r.title) + '</a>';
        }).join('')
      : '<span style="color:var(--muted);font-size:14px;">관련 공식이 없어요.</span>';

    document.getElementById('fv-practice').href = 'practice.html?formula=' + encodeURIComponent(f.id);

    var doneBtn = document.getElementById('fv-done');
    paintDone(doneBtn);

    document.getElementById('formula-detail').style.display = '';
  }

  function paintDone(btn) {
    if (MathSync.isLearned(id)) {
      btn.innerHTML = '✅ 학습 완료됨';
      btn.disabled = true;
    } else {
      btn.innerHTML = '✅ 학습 완료';
      btn.disabled = false;
    }
  }

  function bindCheck() {
    document.getElementById('fv-check-btn').addEventListener('click', function () {
      var v = document.getElementById('fv-check-a').value.trim();
      var fb = document.getElementById('fv-check-fb');
      if (!v) { fb.textContent = '답을 적어 보세요.'; return; }
      var ok = v.replace(/\s+/g, '') === String(formula.quickCheck.answer).replace(/\s+/g, '');
      fb.innerHTML = ok
        ? '<div class="feedback ok"><h3>🎉 ' + esc(MathData.pick(MathData.praise)) + '</h3><div>정답: ' + esc(formula.quickCheck.answer) + '</div></div>'
        : '<div class="feedback no"><h3>💪 ' + esc(MathData.pick(MathData.comfort)) + '</h3><div>다시 생각해 보세요. 힌트: ' + esc(formula.memoryTip) + '</div></div>';
      MathSync.savePractice({
        formula_id: formula.id,
        is_correct: ok,
        score: ok ? 1 : 0,
        total: 1,
        detail: { kind: 'quickCheck' }
      });
    });
  }

  function bindDone() {
    document.getElementById('fv-done').addEventListener('click', async function () {
      await MathSync.markLearned(id);
      paintDone(document.getElementById('fv-done'));
      if (window.CGAuth && CGAuth.refreshPanels) CGAuth.refreshPanels();
    });
  }

  function start() {
    if (!document.getElementById('formula-detail')) return;
    if (!id) { showGate(); return; }
    var f = MathFormulas.get(id);
    if (!f) { showGate(); return; }
    render(f);
    bindCheck();
    bindDone();
    // 최근 본 공식
    try {
      if (window.CGAuth && CGAuth.touchRecent && MathSync.isLoggedIn()) {
        CGAuth.touchRecent({ kind: 'formula', id: f.id, title: f.title, url: 'formula-view.html?id=' + f.id });
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
