/* ============================================================
   수학아 놀자 (math) - 관리자 「학습 현황」 탭 (admin-math.js)
   - 공용 admin.js 에 별도 탭으로 붙는 부가 모듈입니다.
   - 테이블 건수 + 최근 퀴즈/연습/학습지 기록 조회
   의존성: admin.html 의 window.sbAdmin
   ============================================================ */
(function () {
  'use strict';

  var sb = function () { return window.sbAdmin || null; };

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function ago(iso) {
    if (!iso) return '—';
    var t = new Date(iso).getTime();
    if (!t) return '—';
    var d = Math.floor((Date.now() - t) / 1000);
    if (d < 60) return '방금';
    if (d < 3600) return Math.floor(d / 60) + '분 전';
    if (d < 86400) return Math.floor(d / 3600) + '시간 전';
    if (d < 604800) return Math.floor(d / 86400) + '일 전';
    return String(iso).slice(0, 10);
  }

  async function headCount(table) {
    try {
      var r = await sb().from(table).select('id', { count: 'exact', head: true });
      return r.count || 0;
    } catch (e) { return 0; }
  }

  async function load() {
    var host = document.getElementById('am-content');
    if (!host || !sb()) return;
    host.innerHTML = '<div class="loading">학습 현황을 불러오는 중…</div>';

    var tables = ['math_progress', 'math_practice_logs', 'math_quiz_logs', 'math_worksheet_logs'];
    var counts = {};
    for (var i = 0; i < tables.length; i++) counts[tables[i]] = await headCount(tables[i]);

    var cards = [
      ['학습 완료', counts.math_progress, '건'],
      ['연습 기록', counts.math_practice_logs, '건'],
      ['퀴즈 기록', counts.math_quiz_logs, '건'],
      ['학습지', counts.math_worksheet_logs, '건']
    ];
    host.innerHTML =
      '<div class="admin-stat-grid" style="margin-bottom:16px;">' +
        cards.map(function (c) {
          return '<div class="admin-stat-card"><div class="admin-stat-head"><span>' + c[0] + '</span>' +
            '<span class="admin-stat-icon" style="background:#e0f2fe;color:#0284c7;"><i class="fa-solid fa-calculator"></i></span></div>' +
            '<div class="admin-stat-num">' + esc(c[1]) + '<span style="font-size:13px;color:#94a3b8;"> ' + esc(c[2]) + '</span></div></div>';
        }).join('') + '</div>' +
      '<div class="admin-panel"><div class="admin-panel-head">' +
        '<h3 class="admin-panel-title"><i class="fa-solid fa-list-check" style="color:#2563eb;"></i> 최근 퀴즈 기록 (최신 50건)</h3></div>' +
        '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
        '<th>점수</th><th>유형</th><th>기록일</th></tr></thead>' +
        '<tbody id="am-quiz-tbody"><tr><td colspan="3" style="text-align:center;padding:20px;">불러오는 중…</td></tr></tbody></table></div></div>' +
      '<div class="admin-panel" style="margin-top:14px;"><div class="admin-panel-head">' +
        '<h3 class="admin-panel-title"><i class="fa-solid fa-pencil" style="color:#16a34a;"></i> 최근 연습 기록 (최신 50건)</h3></div>' +
        '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
        '<th>정답 여부</th><th>공식</th><th>기록일</th></tr></thead>' +
        '<tbody id="am-practice-tbody"><tr><td colspan="3" style="text-align:center;padding:20px;">불러오는 중…</td></tr></tbody></table></div></div>';

    try {
      var q = await sb().from('math_quiz_logs').select('*').order('created_at', { ascending: false }).limit(50);
      var rows = q.data || [];
      document.getElementById('am-quiz-tbody').innerHTML = rows.length
        ? rows.map(function (r) {
            return '<tr><td><strong>' + esc(r.score) + ' / ' + esc(r.total) + '</strong></td>' +
              '<td>' + esc(r.quiz_type || '') + '</td><td>' + esc(ago(r.created_at)) + '</td></tr>';
          }).join('')
        : '<tr><td colspan="3" style="text-align:center;padding:20px;">아직 기록이 없어요.</td></tr>';
    } catch (e) {
      document.getElementById('am-quiz-tbody').innerHTML = '<tr><td colspan="3" style="text-align:center;">조회 실패</td></tr>';
    }

    try {
      var p = await sb().from('math_practice_logs').select('*').order('created_at', { ascending: false }).limit(50);
      var pr = p.data || [];
      document.getElementById('am-practice-tbody').innerHTML = pr.length
        ? pr.map(function (r) {
            return '<tr><td>' + (r.is_correct ? '⭕' : '❌') + '</td>' +
              '<td><code>' + esc(r.formula_id || '') + '</code></td><td>' + esc(ago(r.created_at)) + '</td></tr>';
          }).join('')
        : '<tr><td colspan="3" style="text-align:center;padding:20px;">아직 기록이 없어요.</td></tr>';
    } catch (e) {
      document.getElementById('am-practice-tbody').innerHTML = '<tr><td colspan="3" style="text-align:center;">조회 실패</td></tr>';
    }
  }

  function start() {
    var btn = document.querySelector('[data-tab="math"]');
    if (btn) btn.addEventListener('click', function () { setTimeout(load, 50); });
    if (btn && btn.classList.contains('active')) load();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
