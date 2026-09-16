/* ============================================================
   수학아 놀자 (math) - 숫자 바꾸기 문제 생성기 (generator.js)

   정적 문제를 무한 반복하지 않도록, 숫자 범위만 바꿔
   같은 유형의 문제를 여러 번 연습할 수 있게 합니다.
   (AI/API 를 쓰지 않습니다. 브라우저 안에서 숫자만 바꿉니다)

   사용법:
     MathGenerator.make('rectArea', { w: [2,9], h: [2,9] })
     → { question, answer, hint, explanation }

   의존성: 없음 (전역 window.MathGenerator)
   ============================================================ */
(function (global) {
  'use strict';

  function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function range(o) {
    if (Array.isArray(o)) return rnd(o[0], o[1]);
    return o;
  }

  // 유형별 생성기: (opts) => { question, answer, unit, hint, explanation }
  var TYPES = {
    // 직사각형 넓이
    rectArea: function (o) {
      var w = range(o.w || [2, 9]), h = range(o.h || [2, 9]);
      return {
        question: '가로가 ' + w + 'cm, 세로가 ' + h + 'cm인 직사각형의 넓이는?',
        answer: (w * h) + '㎠',
        choices: null,
        hint: '직사각형 넓이는 가로와 세로를 곱해요.',
        explanation: '직사각형의 넓이는 가로 × 세로예요. ' +
          w + ' × ' + h + ' = ' + (w * h) + '이므로 답은 ' + (w * h) + '㎠입니다.'
      };
    },
    // 덧셈/뺄셈
    add: function (o) {
      var a = range(o.a || [10, 99]), b = range(o.b || [10, 99]);
      return {
        question: a + ' + ' + b + ' = ?',
        answer: String(a + b),
        choices: null,
        hint: '일의 자리부터 차례대로 더해 보세요.',
        explanation: a + ' + ' + b + ' = ' + (a + b) + '입니다.'
      };
    },
    sub: function (o) {
      var a = range(o.a || [20, 99]), b = range(o.b || [10, a - 1]);
      return {
        question: a + ' − ' + Math.min(b, a - 1) + ' = ?',
        answer: String(a - Math.min(b, a - 1)),
        choices: null,
        hint: '일의 자리부터 차례대로 빼 보세요.',
        explanation: a + ' − ' + Math.min(b, a - 1) + ' = ' + (a - Math.min(b, a - 1)) + '입니다.'
      };
    },
    // 구구단
    mul: function (o) {
      var a = range(o.a || [2, 9]), b = range(o.b || [2, 9]);
      return {
        question: a + ' × ' + b + ' = ?',
        answer: String(a * b),
        choices: null,
        hint: a + '단을 떠올려 보세요.',
        explanation: a + ' × ' + b + ' = ' + (a * b) + '입니다.'
      };
    },
    // 평균
    average: function (o) {
      var n = range(o.n || [3, 5]);
      var arr = [];
      var sum = 0;
      for (var i = 0; i < n; i++) { var v = range(o.v || [2, 20]); arr.push(v); sum += v; }
      // 나누어떨어지게 조정
      var base = arr[0];
      sum = 0;
      arr = [];
      for (var j = 0; j < n - 1; j++) { var x = range(o.v || [2, 20]); arr.push(x); sum += x; }
      var last = base * n - sum;
      if (last < 1) last = base;
      arr.push(last);
      sum += last - 0;
      var total = arr.reduce(function (a, b) { return a + b; }, 0);
      var ans = total / n;
      return {
        question: '수 ' + arr.join(', ') + '의 평균은?',
        answer: String(ans),
        choices: null,
        hint: '평균은 모두 더한 값을 개수로 나누는 거예요.',
        explanation: '모두 더하면 ' + total + '이에요. ' + total + ' ÷ ' + n + ' = ' + ans + '입니다.'
      };
    },
    // 일차방정식 x + a = b
    linearEq: function (o) {
      var x = range(o.x || [2, 12]);
      var a = range(o.a || [2, 15]);
      var b = x + a;
      return {
        question: 'x + ' + a + ' = ' + b + ' 일 때, x의 값은?',
        answer: String(x),
        choices: null,
        hint: 'x는 양변에서 ' + a + '를 빼면 나와요.',
        explanation: 'x + ' + a + ' = ' + b + ' 에서 양변에서 ' + a + '를 빼면 x = ' + x + '입니다.'
      };
    }
  };

  function make(type, opts) {
    var fn = TYPES[type];
    if (!fn) return null;
    try { return fn(opts || {}); } catch (e) { return null; }
  }

  // 객관식 보기 만들기 (정답 포함 4개)
  function withChoices(gen, near) {
    if (!gen || gen.choices) return gen;
    var ans = parseFloat(gen.answer);
    if (isNaN(ans)) return gen;
    var set = {};
    set[ans] = true;
    var delta = near || [1, 2, 3, 10];
    var cands = [ans];
    while (cands.length < 4) {
      var d = pick(delta) * (Math.random() < 0.5 ? -1 : 1);
      var c = ans + d;
      if (c < 0 || set[c]) continue;
      set[c] = true;
      cands.push(c);
    }
    // 섞기
    for (var i = cands.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = cands[i]; cands[i] = cands[j]; cands[j] = t;
    }
    gen.choices = cands.map(String);
    return gen;
  }

  global.MathGenerator = {
    make: make,
    withChoices: withChoices,
    types: function () { return Object.keys(TYPES); }
  };
})(typeof window !== 'undefined' ? window : this);
