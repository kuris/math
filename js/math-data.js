/* ============================================================
   수학아 놀자 (math) - 학교급/학년/단원/난이도 정적 데이터 (math-data.js)
   의존성: 없음 (전역 window.MathData)
   ============================================================ */
(function (global) {
  'use strict';

  var MathData = {
    service: 'math',

    // 학교급 (색상 구분: 초등=초록 / 중등=파랑 / 고등=보라)
    schoolLevels: [
      { value: 'elementary', label: '초등', emoji: '🌱', color: '#2f9e44', className: 'lv-el' },
      { value: 'middle',     label: '중등', emoji: '🌊', color: '#1971c2', className: 'lv-mi' },
      { value: 'high',       label: '고등', emoji: '🔮', color: '#7048e8', className: 'lv-hi' }
    ],

    // 학년
    gradeLevels: [
      { value: 'elementary1', label: '초등 1학년', schoolLevel: 'elementary' },
      { value: 'elementary2', label: '초등 2학년', schoolLevel: 'elementary' },
      { value: 'elementary3', label: '초등 3학년', schoolLevel: 'elementary' },
      { value: 'elementary4', label: '초등 4학년', schoolLevel: 'elementary' },
      { value: 'elementary5', label: '초등 5학년', schoolLevel: 'elementary' },
      { value: 'elementary6', label: '초등 6학년', schoolLevel: 'elementary' },
      { value: 'middle1', label: '중등 1학년', schoolLevel: 'middle' },
      { value: 'middle2', label: '중등 2학년', schoolLevel: 'middle' },
      { value: 'middle3', label: '중등 3학년', schoolLevel: 'middle' },
      { value: 'high1', label: '고등 1학년', schoolLevel: 'high' },
      { value: 'high2', label: '고등 2학년', schoolLevel: 'high' },
      { value: 'high3', label: '고등 3학년', schoolLevel: 'high' }
    ],

    // 단원
    topics: [
      { value: 'arithmetic',  label: '수와 연산',     emoji: '🔢' },
      { value: 'fractions',   label: '분수와 소수',   emoji: '🍕' },
      { value: 'geometry',    label: '도형과 측정',   emoji: '📐' },
      { value: 'ratio',       label: '비율과 비례',   emoji: '⚖️' },
      { value: 'algebra',     label: '식과 방정식',   emoji: '🧮' },
      { value: 'function',    label: '함수',         emoji: '📈' },
      { value: 'statistics',  label: '자료와 확률',   emoji: '🎲' },
      { value: 'sequence',    label: '수열',         emoji: '🔗' },
      { value: 'trigonometry',label: '삼각함수',     emoji: '📏' },
      { value: 'calculus',    label: '미적분',       emoji: '🌊' },
      { value: 'combinatorics',label:'경우의 수',    emoji: '🃏' },
      { value: 'vector',      label: '벡터',         emoji: '➡️' },
      { value: 'logarithm',   label: '지수와 로그',   emoji: '🔟' }
    ],

    // 난이도
    levels: [
      { value: 1, label: '쉬움',    emoji: '🌱' },
      { value: 2, label: '보통',    emoji: '🌿' },
      { value: 3, label: '어려움',  emoji: '🔥' }
    ],

    // 칭찬 문구
    praise: [
      '좋아요! 공식 사용이 정확해요.',
      '멋져요! 계산도 단위도 잘 확인했어요.',
      '한 단계 성장했어요!',
      '공식 마스터에 가까워졌어요.'
    ],

    // 격려 문구
    comfort: [
      '괜찮아요. 공식부터 다시 천천히 볼까요?',
      '거의 다 왔어요. 단위나 계산을 한 번 더 확인해 봐요.',
      '실수는 실력으로 가는 길이에요.'
    ],

    // ---------- 도우미 ----------
    escapeHtml: function (str) {
      return String(str == null ? '' : str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },
    schoolLevelOf: function (value) {
      var s = this.schoolLevels.filter(function (x) { return x.value === value; })[0];
      return s || { value: value, label: value, emoji: '❔', color: '#888', className: '' };
    },
    gradeLabelOf: function (value) {
      var g = this.gradeLevels.filter(function (x) { return x.value === value; })[0];
      return g ? g.label : value;
    },
    topicOf: function (value) {
      var t = this.topics.filter(function (x) { return x.value === value; })[0];
      return t || { value: value, label: value, emoji: '📚' };
    },
    levelOf: function (value) {
      var l = this.levels.filter(function (x) { return x.value === value; })[0];
      return l || { value: value, label: '보통', emoji: '🌿' };
    },
    pick: function (arr) {
      if (!arr || !arr.length) return '';
      return arr[Math.floor(Math.random() * arr.length)];
    }
  };

  global.MathData = MathData;
})(typeof window !== 'undefined' ? window : this);
