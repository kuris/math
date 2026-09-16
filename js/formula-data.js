/* ============================================================
   수학아 놀자 (math) - 공식 데이터 합본 (formula-data.js)

   초등 30 + 중등 35 + 고등 45 = 총 110개.
   원본 파트 파일: formula-el.js / formula-mi.js / formula-hi-a.js / formula-hi-b.js
   이 파일은 합본이며, window.MathFormulaData 로 제공합니다.

   ※ 공식 추가/수정은 파트 파일을 고친 뒤 아래 순서대로 다시 합치세요.
   ============================================================ */
(function (global) {
  'use strict';

  var all = []
    .concat(global.MathFormulaEl || [])
    .concat(global.MathFormulaMi || [])
    .concat(global.MathFormulaHiA || [])
    .concat(global.MathFormulaHiB || []);

  // id 기준 빠른 조회표
  var byId = {};
  all.forEach(function (f) { byId[f.id] = f; });

  function get(id) { return byId[id] || null; }

  function filter(o) {
    o = o || {};
    return all.filter(function (f) {
      if (o.schoolLevel && f.schoolLevel !== o.schoolLevel) return false;
      if (o.gradeLevel && f.gradeLevel !== o.gradeLevel) return false;
      if (o.topic && f.topic !== o.topic) return false;
      if (o.q) {
        var q = String(o.q).toLowerCase();
        var hay = (f.title + ' ' + f.unit + ' ' + f.formula + ' ' + f.shortDescription).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function bySchool(level) {
    return all.filter(function (f) { return f.schoolLevel === level; });
  }

  // 오늘의 공식 (날짜 기반 결정적 선택 — 매일 같은 공식)
  function todayFormula() {
    if (!all.length) return null;
    var d = new Date();
    var seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    return all[seed % all.length];
  }

  // 관련 공식
  function related(f) {
    if (!f || !f.relatedFormulaIds) return [];
    return f.relatedFormulaIds.map(get).filter(Boolean);
  }

  global.MathFormulaData = all;
  global.MathFormulas = {
    all: all,
    byId: byId,
    get: get,
    filter: filter,
    bySchool: bySchool,
    today: todayFormula,
    related: related
  };
})(typeof window !== 'undefined' ? window : this);
