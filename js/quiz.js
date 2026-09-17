/* ============================================================
   수학아 놀자 (math) - 10문제 퀴즈 (quiz.js)
   - 초등·중등·고등 선택 → 10문제 → 점수 → 기록 저장
   의존성: MathData · MathProblems · MathSync
   ============================================================ */
(function () {
  'use strict';

  function esc(s) { return MathData.escapeHtml(s); }
  var N = 10;
  var level = 'mixed';
  var list = [];
  var idx = 0;
  var score = 0;
  var answers = [];

  function norm(s) { return String(s == null ? '' : s).replace(/\s+/g, ''); }

  function start() {
    if (!document.getElementById('quiz-setup')) return;
    document.querySelectorAll('#quiz-level .filter-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        level = chip.getAttribute('data-level');
        document.querySelectorAll('#quiz-level .filter-chip').forEach(function (c) {
          c.classList.toggle('active', c === chip);
        });
      });
    });
    document.getElementById('quiz-start').addEventListener('click', begin);
    document.getElementById('quiz-ok').addEventListener('click', function () {
      answer(document.getElementById('quiz-a').value);
    });
    document.getElementById('quiz-a').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') answer(e.target.value);
    });
    document.getElementById('quiz-retry').addEventListener('click', function () {
      document.getElementById('quiz-result').style.display = 'none';
      document.getElementById('quiz-setup').style.display = '';
    });
  }

  function begin() {
    var pool = level === 'mixed'
      ? MathProblems.all
      : MathProblems.filter({ schoolLevel: level });
    list = MathProblems.sample(pool, N).map(function (p) {
      return MathProblems.shuffled ? MathProblems.shuffled(p) : p;
    });
    idx = 0; score = 0; answers = [];
    document.getElementById('quiz-setup').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-play').style.display = '';
    show();
  }

  function dots() {
    var html = '';
    for (var i = 0; i < list.length; i++) {
      var cls = 'quiz-dot';
      if (i < idx) cls += answers[i] ? ' ok' : ' no';
      if (i === idx) cls += ' cur';
      html += '<span class="' + cls + '">' + (i + 1) + '</span>';
    }
    document.getElementById('quiz-dots').innerHTML = html;
  }

  function show() {
    dots();
    document.getElementById('quiz-fb').innerHTML = '';
    var p = list[idx];
    document.getElementById('quiz-q').innerHTML =
      '<div style="font-size:13px;color:var(--muted);margin-bottom:4px;">' + (idx + 1) + ' / ' + list.length + '</div>' +
      '<div style="font-size:18px;font-weight:800;">Q. ' + esc(p.question) + '</div>';
    var ch = document.getElementById('quiz-choices');
    var row = document.getElementById('quiz-input-row');
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
      document.getElementById('quiz-a').value = '';
      document.getElementById('quiz-a').focus();
    }
  }

  function answer(v) {
    var p = list[idx];
    var ok = norm(v) === norm(p.answer);
    answers.push(ok);
    if (ok) score++;
    dots();
    var fb = document.getElementById('quiz-fb');
    fb.innerHTML = ok
      ? '<div class="feedback ok"><h3>🎉 ' + esc(MathData.pick(MathData.praise)) + '</h3><div>' + esc(p.explanation) + '</div></div>'
      : '<div class="feedback no"><h3>💪 ' + esc(MathData.pick(MathData.comfort)) + '</h3>' +
        '<div>정답: <strong>' + esc(p.answer) + '</strong></div><div>' + esc(p.explanation) + '</div></div>' +
        '<div style="margin-top:10px;"><button class="btn btn-sm btn-primary" id="quiz-next">다음 문제</button></div>';
    document.querySelectorAll('#quiz-choices button').forEach(function (b) {
      b.disabled = true;
      if (norm(b.getAttribute('data-c')) === norm(p.answer)) b.classList.add('picked-ok');
    });
    var nx = document.getElementById('quiz-next');
    if (nx) nx.addEventListener('click', advance);
    if (ok) setTimeout(advance, 1200);
  }

  function advance() {
    idx++;
    if (idx >= list.length) finish();
    else show();
  }

  async function finish() {
    document.getElementById('quiz-play').style.display = 'none';
    var r = document.getElementById('quiz-result');
    r.style.display = '';
    var rate = Math.round(score / list.length * 100);
    document.getElementById('quiz-emoji').textContent = rate >= 80 ? '🎉' : rate >= 60 ? '👍' : '💪';
    document.getElementById('quiz-score').textContent = score + ' / ' + list.length + ' (' + rate + '점)';
    document.getElementById('quiz-msg').textContent =
      rate >= 80 ? '훌륭해요! 공식 마스터에 가까워졌어요.' :
      rate >= 60 ? '잘했어요! 틀린 문제는 해설을 다시 봐요.' :
      '괜찮아요. 공식부터 다시 천천히 볼까요?';
    await MathSync.saveQuiz({
      quiz_type: level,
      score: score,
      total: list.length,
      detail: { answers: answers }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
