/* ============================================================
   수학아 놀자 (math) - 문제 데이터 합본 (problem-data.js)

   초등 60 + 중등 70 + 고등 86 = 총 216개.
   원본 파트 파일: problem-el.js / problem-mi.js / problem-hi-a.js / problem-hi-b.js
   이 파일은 합본이며, window.MathProblemData 로 제공합니다.

   ※ 문제 추가/수정은 파트 파일을 고친 뒤 아래 순서대로 다시 합치세요.
   ============================================================ */
(function (global) {
  'use strict';

  var all = []
    .concat(global.MathProblemEl || [])
    .concat(global.MathProblemMi || [])
    .concat(global.MathProblemHiA || [])
    .concat(global.MathProblemHiB || []);

  var byId = {};
  all.forEach(function (p) { byId[p.id] = p; });

  function get(id) { return byId[id] || null; }

  // 특정 공식의 문제들
  function byFormula(formulaId, o) {
    o = o || {};
    return all.filter(function (p) {
      if (p.formulaId !== formulaId) return false;
      if (o.level && p.level !== o.level) return false;
      if (o.type && p.type !== o.type) return false;
      return true;
    });
  }

  function filter(o) {
    o = o || {};
    return all.filter(function (p) {
      if (o.schoolLevel && p.schoolLevel !== o.schoolLevel) return false;
      if (o.gradeLevel && p.gradeLevel !== o.gradeLevel) return false;
      if (o.topic && p.topic !== o.topic) return false;
      if (o.level && p.level !== o.level) return false;
      if (o.type && p.type !== o.type) return false;
      if (o.formulaId && p.formulaId !== o.formulaId) return false;
      return true;
    });
  }

  // n개 무작위 추출 (Fisher-Yates 부분)
  function sample(pool, n) {
    pool = pool.slice();
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
    }
    return pool.slice(0, n);
  }

  // 오늘의 5문제 (날짜 기반 결정적 선택)
  function todayFive() {
    var d = new Date();
    var seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    var out = [];
    var lv = ['elementary', 'middle', 'high'];
    for (var k = 0; k < 5; k++) {
      var pool = all.filter(function (p) { return p.schoolLevel === lv[k % 3]; });
      if (pool.length) out.push(pool[(seed + k * 37) % pool.length]);
    }
    return out;
  }

  global.MathProblemData = all;
  global.MathProblems = {
    all: all,
    byId: byId,
    get: get,
    byFormula: byFormula,
    filter: filter,
    sample: sample,
    todayFive: todayFive
  };
})(typeof window !== 'undefined' ? window : this);
