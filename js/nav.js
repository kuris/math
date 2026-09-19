/* ============================================================
   수학아 놀자 (math) - 공통 상단 내비게이션 + family 드롭다운 (nav.js)
   각 HTML 에는 <nav class="nav-scroll" id="math-nav"></nav> 한 줄만 넣습니다.
   ============================================================ */
(function () {
  'use strict';

  var MENU = [
    { label: '홈', href: 'index.html', emoji: '🏠' },
    { label: '공식', href: 'formulas.html', emoji: '📐' },
    { label: '연습', href: 'practice.html', emoji: '✏️' },
    { label: '퀴즈', href: 'quiz.html', emoji: '🎯' },
    { label: '학습지', href: 'worksheet.html', emoji: '📄' },
    { label: '내 기록', href: 'progress.html', emoji: '📂' }
  ];

  // 14종 패밀리는 cg-family.js 공유 모듈이 렌더 (data-cg-family 컨테이너)

  function currentFile() {
    var f = location.pathname.split('/').pop() || 'index.html';
    return (f === '' ? 'index.html' : f).toLowerCase();
  }

  function render() {
    var host = document.getElementById('math-nav');
    if (!host) return;
    var here = currentFile();
    host.innerHTML = MENU.map(function (m) {
      var active = (m.href === here) ? ' active' : '';
      if (!active && m.href === 'index.html' && (here === '' || here === 'index')) active = ' active';
      return '<a href="' + m.href + '" class="nav-chip' + active + '">' + m.emoji + ' ' + m.label + '</a>';
    }).join('');
  }

  // 헤더 우측 "다른 놀자 서비스" 드롭다운 (cg-family.js 공유 모듈)
  function renderFamily() {
    var host = document.querySelector('.header-right');
    if (!host || host.querySelector('[data-cg-family]')) return;
    var box = document.createElement('div');
    box.setAttribute('data-cg-family', '');
    box.setAttribute('data-current', 'math');
    // flex order로 로그인 위젯(CGAuth append)과 순서 고정: 패밀리가 항상 마지막
    box.style.order = '99';
    host.appendChild(box);
    if (window.CGFamily) window.CGFamily.renderInto(box, { current: 'math' });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { render(); renderFamily(); }, { once: true });
  } else {
    render();
    renderFamily();
  }
})();
