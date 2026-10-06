const fs = require('fs');
const path = require('path');

const chartJsContent = fs.readFileSync(path.join(__dirname, 'chart.umd.min.js'), 'utf8');

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Egy Nutri. - Business Review & Sales Analysis Template</title>
  <!-- 100% Offline Embedded Chart.js Library -->
  <script>
${chartJsContent}
  </script>
  <style>
    :root {
      --primary: #1B365D;
      --primary-light: #2C5282;
      --secondary: #0D9488;
      --accent: #D97706;
      --bg: #F8FAFC;
      --card-bg: #FFFFFF;
      --text: #1E293B;
      --text-muted: #64748B;
      --border: #E2E8F0;
      --green: #10B981;
      --green-bg: #ECFDF5;
      --green-border: #A7F3D0;
      --green-text: #065F46;
      --red: #EF4444;
      --red-bg: #FEF2F2;
      --red-border: #FECACA;
      --red-text: #991B1B;
      --gold: #F59E0B;
      --highlight-bubble: #8B5CF6;
      --highlight-bubble-border: #4C1D95;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Top App Header */
    header {
      background: linear-gradient(135deg, var(--primary) 0%, #0F172A 100%);
      color: white;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .brand-area {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .brand-badge {
      background: var(--gold);
      color: #78350F;
      font-weight: 800;
      font-size: 13px;
      padding: 4px 10px;
      border-radius: 6px;
      letter-spacing: 0.5px;
    }

    .brand-title h1 {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.3px;
    }

    .brand-title p {
      font-size: 11px;
      color: #94A3B8;
    }

    .controls-area {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .selector-group {
      display: flex;
      align-items: center;
      background: rgba(255,255,255,0.15);
      padding: 4px 10px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.25);
    }

    .selector-group label {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
      color: #CBD5E1;
      margin-right: 8px;
    }

    select {
      background: #FFFFFF;
      color: var(--primary);
      border: none;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      outline: none;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }

    .nav-btn {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.25);
      color: white;
      padding: 7px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }

    .nav-btn:hover {
      background: rgba(255,255,255,0.25);
    }

    .slide-counter {
      background: rgba(0,0,0,0.3);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #E2E8F0;
    }

    /* Subheader Tabs */
    .slide-tabs {
      background: white;
      border-bottom: 1px solid var(--border);
      display: flex;
      overflow-x: auto;
      padding: 0 16px;
      gap: 4px;
      position: sticky;
      top: 61px;
      z-index: 90;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }

    .tab-btn {
      padding: 10px 14px;
      border: none;
      background: transparent;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      white-space: nowrap;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;
    }

    .tab-btn:hover {
      color: var(--primary);
      background: #F1F5F9;
    }

    .tab-btn.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
      font-weight: 700;
    }

    /* Main Container */
    main {
      flex: 1;
      padding: 20px 28px;
      max-width: 1540px;
      margin: 0 auto;
      width: 100%;
    }

    .slide-container {
      display: none;
    }

    .slide-container.active {
      display: block;
    }

    /* Slide Header */
    .slide-header {
      background: white;
      padding: 16px 20px;
      border-radius: 10px;
      border: 1px solid var(--border);
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .slide-header-left h2 {
      font-size: 19px;
      font-weight: 800;
      color: var(--primary);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .slide-badge {
      background: var(--primary);
      color: white;
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 700;
    }

    .slide-header-left p {
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    .kpi-pills {
      display: flex;
      gap: 12px;
    }

    .kpi-pill {
      background: #F1F5F9;
      padding: 6px 12px;
      border-radius: 8px;
      text-align: right;
    }

    .kpi-pill span {
      display: block;
      font-size: 10px;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
    }

    .kpi-pill strong {
      font-size: 14px;
      color: var(--primary);
    }

    /* Grid Layouts */
    .grid-2 {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      gap: 20px;
      align-items: start;
    }

    .card {
      background: white;
      border-radius: 10px;
      border: 1px solid var(--border);
      padding: 18px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }

    .card-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
    }

    .chart-box {
      position: relative;
      height: 350px;
      width: 100%;
    }

    .chart-box-tall {
      position: relative;
      height: 480px;
      width: 100%;
    }

    /* Tables */
    .data-table-wrapper {
      max-height: 440px;
      overflow-y: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      text-align: left;
    }

    th {
      background: #F8FAFC;
      color: var(--primary);
      font-weight: 700;
      padding: 9px 10px;
      border-bottom: 2px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    td {
      padding: 8px 10px;
      border-bottom: 1px solid var(--border);
      color: var(--text);
    }

    tr:hover td {
      background-color: #F8FAFC;
    }

    tr.highlight-row td {
      background-color: #EFF6FF !important;
      font-weight: 700;
    }

    tr.total-row td {
      background: #F1F5F9;
      font-weight: 800;
      border-top: 2px solid var(--primary);
      border-bottom: 2px solid var(--primary);
      color: var(--primary);
    }

    .badge-above {
      background: var(--green-bg);
      color: var(--green-text);
      border: 1px solid var(--green-border);
      padding: 3px 8px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 11px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .badge-below {
      background: var(--red-bg);
      color: var(--red-text);
      border: 1px solid var(--red-border);
      padding: 3px 8px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 11px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .num {
      text-align: right;
      font-variant-numeric: tabular-nums;
    }

    /* Highlight Shapes for Slide 4 */
    .shape-highlight {
      padding: 16px;
      border-radius: 10px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .shape-green {
      background: var(--green-bg);
      border: 2px solid var(--green);
      color: var(--green-text);
    }

    .shape-red {
      background: var(--red-bg);
      border: 2px solid var(--red);
      color: var(--red-text);
    }

    .shape-icon {
      font-size: 32px;
      line-height: 1;
    }

    .shape-content h3 {
      font-size: 16px;
      font-weight: 800;
    }

    .shape-content p {
      font-size: 13px;
      margin-top: 2px;
      opacity: 0.9;
    }

    /* FROZEN DUAL-AXIS CHART ON SLIDE 4 */
    .sticky-chart-wrapper {
      position: sticky;
      top: 110px;
      z-index: 80;
      background: white;
      border-radius: 10px;
      border: 1px solid var(--border);
      box-shadow: 0 6px 16px rgba(0,0,0,0.08);
      padding: 16px 20px;
      margin-bottom: 20px;
    }

    .sticky-badge {
      background: #EFF6FF;
      color: #1D4ED8;
      border: 1px solid #BFDBFE;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    /* QUADRANT MATRIX STYLES */
    .quadrant-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 14px;
    }

    .quad-card {
      border-radius: 8px;
      padding: 12px 14px;
      border-width: 2px;
      border-style: solid;
      font-size: 12px;
    }

    .quad-a {
      background: #ECFDF5;
      border-color: #10B981;
      color: #065F46;
    }

    .quad-b {
      background: #EFF6FF;
      border-color: #3B82F6;
      color: #1E40AF;
    }

    .quad-c {
      background: #FFFBEB;
      border-color: #F59E0B;
      color: #92400E;
    }

    .quad-d {
      background: #FEF2F2;
      border-color: #EF4444;
      color: #991B1B;
    }

    .quad-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }

    .quad-header h4 {
      font-size: 13.5px;
      font-weight: 800;
    }

    .quad-card ul {
      margin-left: 16px;
      line-height: 1.5;
    }

    .chosen-quad-highlight {
      background: #F3E8FF;
      border: 2px solid #8B5CF6;
      border-radius: 10px;
      padding: 14px 18px;
      margin-bottom: 14px;
    }

    .chosen-quad-highlight h3 {
      color: #5B21B6;
      font-size: 15px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .chosen-quad-highlight p {
      color: #4C1D95;
      font-size: 12.5px;
      margin-top: 4px;
      line-height: 1.5;
    }

    footer {
      background: white;
      border-top: 1px solid var(--border);
      padding: 12px 24px;
      font-size: 12px;
      color: var(--text-muted);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* ==========================================================================
       FULLSCREEN & PRESENTATION MODE STYLES
       ========================================================================== */
    body.is-fullscreen {
      background-color: #0F172A;
    }

    body.is-fullscreen header {
      padding: 8px 18px;
      background: #0F172A;
      box-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }

    body.is-fullscreen .slide-tabs {
      background: #1E293B;
      border-bottom: 1px solid #334155;
    }

    body.is-fullscreen .tab-btn {
      color: #94A3B8;
    }

    body.is-fullscreen .tab-btn:hover {
      color: white;
      background: rgba(255,255,255,0.05);
    }

    body.is-fullscreen .tab-btn.active {
      color: #38BDF8;
      border-bottom-color: #38BDF8;
    }

    body.is-fullscreen main {
      padding: 12px 16px 80px 16px;
      max-width: 98vw;
    }

    body.is-fullscreen .slide-container {
      background: white;
      border-radius: 12px;
      padding: 20px 24px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.4);
      outline: 3px solid #2563EB;
      outline-offset: 2px;
      min-height: calc(100vh - 160px);
    }

    body.is-fullscreen footer {
      display: none;
    }

    /* Floating Presentation HUD (Active only in Fullscreen) */
    .fullscreen-hud {
      display: none;
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.94);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 30px;
      padding: 8px 18px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      z-index: 1000;
      align-items: center;
      gap: 12px;
      color: white;
    }

    body.is-fullscreen .fullscreen-hud {
      display: flex;
    }

    .fullscreen-hud button {
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }

    .fullscreen-hud button:hover {
      background: rgba(255,255,255,0.25);
      transform: translateY(-1px);
    }

    .fullscreen-hud .hud-badge {
      font-size: 13px;
      font-weight: 800;
      color: #38BDF8;
      padding: 0 6px;
    }

    /* ==========================================================================
       SLIDE OUTLINE DRAWER
       ========================================================================== */
    .outline-drawer {
      position: fixed;
      top: 0;
      right: -360px;
      width: 350px;
      height: 100vh;
      background: white;
      box-shadow: -5px 0 25px rgba(0,0,0,0.25);
      z-index: 1200;
      transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
    }

    .outline-drawer.open {
      right: 0;
    }

    .outline-header {
      background: var(--primary);
      color: white;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .outline-header h3 {
      font-size: 15px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .outline-header button {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      font-size: 18px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .outline-list {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
    }

    .outline-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid var(--border);
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .outline-item:hover {
      background: #F1F5F9;
      border-color: #CBD5E1;
    }

    .outline-item.active {
      background: #EFF6FF;
      border-color: #3B82F6;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
    }

    .outline-num {
      background: var(--primary);
      color: white;
      font-size: 11px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
      white-space: nowrap;
    }

    .outline-item.active .outline-num {
      background: #2563EB;
    }

    .outline-info h4 {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--text);
      line-height: 1.3;
    }

    .outline-info span {
      font-size: 11px;
      color: var(--text-muted);
    }

    /* ==========================================================================
       DATA EDITOR MODAL STYLES
       ========================================================================== */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      z-index: 2000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal-backdrop.open {
      display: flex;
    }

    .data-modal {
      background: white;
      border-radius: 14px;
      width: 95vw;
      max-width: 1320px;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 60px rgba(0,0,0,0.3);
      overflow: hidden;
      animation: modalFadeIn 0.25s ease-out;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }

    .data-modal-header {
      background: linear-gradient(135deg, var(--primary) 0%, #0F172A 100%);
      color: white;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .data-modal-header h2 {
      font-size: 16.5px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .data-modal-header p {
      font-size: 11.5px;
      color: #94A3B8;
      margin-top: 3px;
    }

    .data-modal-close {
      background: rgba(255,255,255,0.15);
      border: none;
      color: white;
      font-size: 20px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .data-modal-close:hover {
      background: rgba(255,255,255,0.3);
    }

    .data-modal-tabs {
      background: #F8FAFC;
      border-bottom: 1px solid var(--border);
      display: flex;
      padding: 0 20px;
      gap: 8px;
      overflow-x: auto;
    }

    .modal-tab-btn {
      padding: 12px 18px;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--text-muted);
      border: none;
      background: transparent;
      border-bottom: 3px solid transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
    }

    .modal-tab-btn.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
      background: white;
    }

    .data-modal-body {
      flex: 1;
      overflow: auto;
      padding: 16px 20px;
      background: #FAFAFA;
    }

    .data-edit-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background: white;
      border-radius: 8px;
      border: 1px solid var(--border);
      font-size: 12px;
    }

    .data-edit-table th {
      background: #F1F5F9;
      color: var(--primary);
      font-weight: 700;
      padding: 8px 8px;
      text-align: right;
      border-bottom: 2px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 5;
    }

    .data-edit-table th:first-child,
    .data-edit-table th:nth-child(2),
    .data-edit-table th:nth-child(3) {
      text-align: left;
    }

    .data-edit-table td {
      padding: 5px 6px;
      border-bottom: 1px solid var(--border);
      vertical-align: middle;
    }

    .data-edit-table input[type="number"],
    .data-edit-table input[type="text"] {
      width: 100%;
      padding: 5px 6px;
      border: 1px solid #CBD5E1;
      border-radius: 5px;
      font-size: 11.5px;
      font-weight: 600;
      text-align: right;
      color: #0F172A;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }

    .data-edit-table input[type="text"] {
      text-align: left;
    }

    .data-edit-table input:focus {
      outline: none;
      border-color: #2563EB;
      box-shadow: 0 0 0 2.5px rgba(37, 99, 235, 0.15);
      background: #EFF6FF;
    }

    .data-edit-table tr:hover td {
      background: #F8FAFC;
    }

    .data-edit-table tr.total-calc-row td {
      background: #F1F5F9;
      font-weight: 800;
      color: var(--primary);
      border-top: 2px solid var(--primary);
    }

    .data-modal-footer {
      background: white;
      border-top: 1px solid var(--border);
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .footer-left-btns, .footer-right-btns {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-apply-data {
      background: #10B981;
      color: white;
      border: none;
      padding: 9px 18px;
      border-radius: 7px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
      transition: all 0.2s;
    }

    .btn-apply-data:hover {
      background: #059669;
      transform: translateY(-1px);
    }

    .btn-reset-data {
      background: white;
      border: 1px solid #EF4444;
      color: #EF4444;
      padding: 9px 14px;
      border-radius: 7px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .btn-reset-data:hover {
      background: #FEF2F2;
    }

    .btn-export-data, .btn-cancel-modal {
      background: white;
      border: 1px solid var(--border);
      color: var(--text);
      padding: 9px 14px;
      border-radius: 7px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-export-data:hover, .btn-cancel-modal:hover {
      background: #F1F5F9;
    }

    /* Toast Notification */
    .toast-msg {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0F172A;
      color: white;
      padding: 12px 20px;
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      border-left: 5px solid #10B981;
      font-size: 13px;
      font-weight: 600;
      display: none;
      align-items: center;
      gap: 10px;
      z-index: 3000;
      animation: toastSlideUp 0.3s ease-out;
    }

    @keyframes toastSlideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @media (max-width: 1024px) {
      .grid-2 {
        grid-template-columns: 1fr;
      }
      .controls-area {
        flex-wrap: wrap;
      }
    }

    @media print {
      header, .slide-tabs, footer, .controls-area {
        display: none !important;
      }
      .slide-container {
        display: block !important;
        page-break-after: always;
      }
      main {
        padding: 0;
        max-width: 100%;
      }
      .card, .sticky-chart-wrapper {
        border: 1px solid #ccc;
        box-shadow: none;
        position: static !important;
      }
    }
  </style>
</head>
<body>

  <!-- App Header -->
  <header>
    <div class="brand-area">
      <div class="brand-badge">EGY NUTRI.</div>
      <div class="brand-title">
        <h1>COMMERCIAL BUSINESS REVIEW</h1>
        <p>YTD M06-2026 vs. Full Year 2025 Performance & Strategic Diagnostics</p>
      </div>
    </div>

    <div class="controls-area">
      <div class="selector-group">
        <label for="chosenAdmSelect">ADM IN REVIEW:</label>
        <select id="chosenAdmSelect" onchange="onPersonChange()">
          <option value="0">Ahmed Hassan (Alx)</option>
          <option value="1">Ahmed Mohamed Sakr (Behera & Dakahlia)</option>
          <option value="2">NOHER ADEL (Cairo)</option>
          <option value="3">Youstina Farag Allah (Guiza)</option>
          <option value="4">Shimaa Tarek El-Shamy (DELTA I)</option>
          <option value="5">Mohamed Yousef M. (Delta II)</option>
          <option value="6">UE North (Upper Egypt I)</option>
          <option value="7" selected>Beshoy Youhanna (Upper Egypt II)</option>
          <option value="8">Karim Shehab (KFR EL.SHK)</option>
        </select>
      </div>

      <div class="slide-counter" id="slideIndicator">Slide 1 of 10</div>

      <button class="nav-btn" onclick="prevSlide()" title="Previous Slide (Left Arrow)">❮ Prev</button>
      <button class="nav-btn" onclick="nextSlide()" title="Next Slide (Right Arrow)">Next ❯</button>
      <button class="nav-btn" id="btnToggleOutline" onclick="toggleSlideOutline()" title="Executive Slide Outline (Shortcut: O)">📑 Outline</button>
      <button class="nav-btn" id="btnOpenDataEditor" onclick="openDataEditor()" title="Edit Sales Volumes & Recalculate Model (Shortcut: E)" style="background:#059669; border-color:#10B981;">✏️ Edit Data</button>
      <button class="nav-btn" id="fullscreenToggleBtn" onclick="toggleFullscreen()" title="Toggle Fullscreen Presentation Mode (Shortcut: F)" style="background:#2563EB; border-color:#60A5FA;">⛶ Fullscreen</button>
      <a href="Egy_Nutri_Business_Review_Deck.pptx" download class="nav-btn" style="text-decoration: none;" title="Download PowerPoint Deck">📥 PPTX</a>
      <a href="Egy_Nutri_Sales_Analysis_Template.xlsx" download class="nav-btn" style="text-decoration: none;" title="Download Excel Model">📊 Excel</a>
      <button class="nav-btn" onclick="window.print()">🖨️ Print / PDF</button>
    </div>
  </header>

  <!-- Slide Tabs Navigation -->
  <nav class="slide-tabs" id="slideTabs">
    <button class="tab-btn active" onclick="goToSlide(1)">01. Selected ADM Share</button>
    <button class="tab-btn" onclick="goToSlide(2)">02. Core Formulas (Horizontal)</button>
    <button class="tab-btn" onclick="goToSlide(3)">03. Specialty Lines (Horizontal)</button>
    <button class="tab-btn" onclick="goToSlide(4)">04. Dual-Axis Deep Dive</button>
    <button class="tab-btn" onclick="goToSlide(5)">05. Total PPG% Ranking</button>
    <button class="tab-btn" onclick="goToSlide(6)">06. Pediamil 1 Ranking</button>
    <button class="tab-btn" onclick="goToSlide(7)">07. Pediamil 2 Ranking</button>
    <button class="tab-btn" onclick="goToSlide(8)">08. Pedia-Start 1 Ranking</button>
    <button class="tab-btn" onclick="goToSlide(9)">09. Pedia-Start 2 Ranking</button>
    <button class="tab-btn" onclick="goToSlide(10)">10. Quadrant Strategic Matrix</button>
  </nav>

  <!-- Main Slides Content Area -->
  <main>

    <!-- SLIDE 1 -->
    <section class="slide-container active" id="slide-1">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge">SLIDE 01</span> TERRITORIAL CONTRIBUTION & GEO SHARE % (SELECTED ADM)</h2>
          <p>Horizontal 3-Bar Share Analysis for the Selected Assistant District Manager with figures plotted directly on the bars.</p>
        </div>
        <div class="kpi-pills">
          <div class="kpi-pill">
            <span>Selected ADM</span>
            <strong id="s1PersonName">Beshoy Youhanna</strong>
          </div>
          <div class="kpi-pill">
            <span>Territory</span>
            <strong id="s1TerritoryName">Upper Egypt II</strong>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <span id="s1ChartTitle">3-Bar Share Analysis (Selected ADM)</span>
            <small style="color:var(--text-muted); font-size:11px;">Figures plotted on bars</small>
          </div>
          <div class="chart-box" style="height: 340px;">
            <canvas id="chartSlide1" width="600" height="340"></canvas>
          </div>
          <div id="s1BarLegendNotes" style="margin-top:14px; padding:10px 14px; background:#F8FAFC; border-radius:8px; font-size:12px; line-height:1.6;">
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>All Territories Share & Potential Benchmark</span>
            <small style="color:var(--text-muted); font-size:11px;">Selected ADM highlighted</small>
          </div>
          <div class="data-table-wrapper" style="max-height: 400px;">
            <table id="tableSlide1">
              <thead>
                <tr>
                  <th>Territory (DM)</th>
                  <th class="num">GEO %</th>
                  <th class="num">Contr 26</th>
                  <th class="num">Contr 25</th>
                  <th class="num">Diff (vs Geo)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="tbodySlide1">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 2 -->
    <section class="slide-container" id="slide-2">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge">SLIDE 02</span> CORE INFANT FORMULAS: MONTHLY SALES AVERAGES</h2>
          <p>Horizontal 3-Bar Volume Comparison (2026 MoAvg vs 2025 MoAvg vs Line Avg/ADM) with exact values rendered on the bars.</p>
        </div>
        <div class="kpi-pills">
          <div class="kpi-pill">
            <span>Selected ADM</span>
            <strong id="s2TerritoryLabel">Beshoy Youhanna (Upper Egypt II)</strong>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <span>Core Formulas: Monthly Volume (Horizontal Bars)</span>
            <small style="color:var(--text-muted); font-size:11px;">Values plotted directly on bars</small>
          </div>
          <div class="chart-box-tall" style="height: 440px;">
            <canvas id="chartSlide2" width="600" height="440"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>Monthly Average Breakdown & Growth Rates</span>
          </div>
          <div class="data-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th class="num">2026 MoAvg</th>
                  <th class="num">2025 MoAvg</th>
                  <th class="num">PPG %</th>
                  <th class="num">Line Avg/ADM</th>
                  <th>vs Line Avg</th>
                </tr>
              </thead>
              <tbody id="tbodySlide2">
              </tbody>
            </table>
          </div>
          <div style="margin-top:14px; font-size:11.5px; color:var(--text-muted); line-height:1.5;">
            <strong>Flattening Rule & Line Average:</strong>
            <br>• <strong>2026 MoAvg:</strong> YTD 6-Month Units ÷ 6.
            <br>• <strong>2025 MoAvg:</strong> Full Year Units ÷ 12 (flattens 2025 shortage periods).
            <br>• <strong>LN AVG 6 2026:</strong> Standard Line Average per ADM across Egypt (Total MoAvg ÷ 9).
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 3 -->
    <section class="slide-container" id="slide-3">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge">SLIDE 03</span> SPECIALTY INFANT FORMULAS: MONTHLY SALES AVERAGES</h2>
          <p>Horizontal 3-Bar Specialty SKU Comparison (Pediamil LF, HA, AR, AC, Pediamum) with values plotted directly on the bars.</p>
        </div>
        <div class="kpi-pills">
          <div class="kpi-pill">
            <span>Selected ADM</span>
            <strong id="s3TerritoryLabel">Beshoy Youhanna (Upper Egypt II)</strong>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <span>Specialty Lines: Monthly Volume (Horizontal Bars)</span>
            <small style="color:var(--text-muted); font-size:11px;">Values plotted directly on bars</small>
          </div>
          <div class="chart-box-tall" style="height: 460px;">
            <canvas id="chartSlide3" width="600" height="460"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>Specialty Breakdown & Benchmark Comparison</span>
          </div>
          <div class="data-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Specialty SKU</th>
                  <th class="num">2026 MoAvg</th>
                  <th class="num">2025 MoAvg</th>
                  <th class="num">PPG %</th>
                  <th class="num">Line Avg/ADM</th>
                  <th>vs Line Avg</th>
                </tr>
              </thead>
              <tbody id="tbodySlide3">
              </tbody>
            </table>
          </div>
          <div style="margin-top:14px; font-size:11.5px; color:var(--text-muted); line-height:1.5;">
            <strong>Specialty Prescription Notes:</strong>
            <br>• Pediamil AC & LF drive highest margin contributions across pediatric clinics.
            <br>• Pediamil AR and Pediamum require dedicated detailing push in H2.
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 4 -->
    <section class="slide-container" id="slide-4">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge">SLIDE 04</span> DUAL-AXIS DEEP DIVE: SELECTED ADM vs COMPANY BENCHMARK</h2>
          <p>Primary Axis: Monthly Sales Volume 2025 vs 2026 (Bars) | Secondary Axis: PPG% Growth (Line Markers). <strong>Chart is frozen at top while data scrolls below.</strong></p>
        </div>
        <div class="kpi-pills">
          <div class="kpi-pill">
            <span>Company Benchmark PPG</span>
            <strong style="color:var(--primary);">+33.79%</strong>
          </div>
          <div class="kpi-pill">
            <span>Selected ADM PPG</span>
            <strong id="s4PersonTotalPpg">+50.11%</strong>
          </div>
        </div>
      </div>

      <!-- Dynamic Highlight Shape (Red / Green) -->
      <div id="growthHighlightBox" class="shape-highlight shape-green">
        <div class="shape-icon" id="shapeIcon">🟢</div>
        <div class="shape-content">
          <h3 id="shapeTitle">ABOVE COMPANY BENCHMARK (+16.33% Ahead of National Growth)</h3>
          <p id="shapeDesc">Beshoy Youhanna generated +50.11% PPG growth across all portfolios, outpacing the national company benchmark of +33.79%.</p>
        </div>
      </div>

      <!-- FROZEN / STICKY CHART CONTAINER -->
      <div class="sticky-chart-wrapper">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="sticky-badge">📌 FROZEN COMBO CHART</span>
            <span style="font-size:13px; font-weight:700; color:var(--primary);" id="s4ChartTitleText">Beshoy Youhanna: Volume (Bars) vs PPG% Growth (Markers)</span>
          </div>
          <small style="color:var(--text-muted); font-size:11px;">Scroll down to inspect detailed figures table</small>
        </div>
        <div class="chart-box" style="height: 310px;">
          <canvas id="chartSlide4" width="900" height="310"></canvas>
        </div>
      </div>

      <!-- Scrollable Data Table Container below frozen chart -->
      <div class="card" style="margin-top: 10px;">
        <div class="card-title">
          <span>Product-by-Product Performance & Variance Table</span>
          <small style="color:var(--text-muted); font-size:11px;">All Figures & Growth Rates for Selected ADM</small>
        </div>
        <div class="data-table-wrapper" style="max-height: none;">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th class="num">Avg Monthly 2025</th>
                <th class="num">Avg Monthly 2026</th>
                <th class="num">Volume Diff / Mo</th>
                <th class="num">Selected ADM PPG%</th>
                <th class="num">Company PPG%</th>
                <th class="num">Growth Variance</th>
                <th>Indicator Status</th>
              </tr>
            </thead>
            <tbody id="tbodySlide4">
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- SLIDE 5 -->
    <section class="slide-container" id="slide-5">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge">SLIDE 05</span> TOTAL PPG% GROWTH RANKING (COMPANY AT TOP)</h2>
          <p>National Benchmark at top (+33.79%) | <span style="color:var(--green);font-weight:700;">GREEN</span> = Above Company PPG | <span style="color:var(--red);font-weight:700;">RED</span> = Below Company PPG</p>
        </div>
        <div class="kpi-pills">
          <div class="kpi-pill">
            <span>National Total PPG</span>
            <strong>+33.79%</strong>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <span>Total Unit Sales Growth Ranking (Horizontal Bars with Figures)</span>
          </div>
          <div class="chart-box-tall">
            <canvas id="chartSlide5" width="600" height="480"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>Executive Performance Leaderboard</span>
          </div>
          <div class="data-table-wrapper">
            <table id="tableSlide5">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Territory (DM)</th>
                  <th class="num">2025 MoAvg</th>
                  <th class="num">2026 MoAvg</th>
                  <th class="num">Total PPG%</th>
                  <th>Indicator</th>
                </tr>
              </thead>
              <tbody id="tbodySlide5">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 6 -->
    <section class="slide-container" id="slide-6">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge">SLIDE 06</span> PEDIAMIL 1 PPG% GROWTH RANKING</h2>
          <p>Pediamil 1 National Benchmark at top (+39.92%) | Green = Above Company | Red = Below Company</p>
        </div>
        <div class="kpi-pills">
          <div class="kpi-pill">
            <span>Pediamil 1 Company PPG</span>
            <strong>+39.92%</strong>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <span>Pediamil 1 Growth Ranking (Horizontal Bars)</span>
          </div>
          <div class="chart-box-tall">
            <canvas id="chartSlide6" width="600" height="480"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>Pediamil 1 Leaderboard</span>
          </div>
          <div class="data-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Territory (DM)</th>
                  <th class="num">2025 MoAvg</th>
                  <th class="num">2026 MoAvg</th>
                  <th class="num">P1 PPG%</th>
                  <th>Indicator</th>
                </tr>
              </thead>
              <tbody id="tbodySlide6"></tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 7 -->
    <section class="slide-container" id="slide-7">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge">SLIDE 07</span> PEDIAMIL 2 PPG% GROWTH RANKING</h2>
          <p>Pediamil 2 National Benchmark at top (+65.26%) | Green = Above Company | Red = Below Company</p>
        </div>
        <div class="kpi-pills">
          <div class="kpi-pill">
            <span>Pediamil 2 Company PPG</span>
            <strong>+65.26%</strong>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <span>Pediamil 2 Growth Ranking (Horizontal Bars)</span>
          </div>
          <div class="chart-box-tall">
            <canvas id="chartSlide7" width="600" height="480"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>Pediamil 2 Leaderboard</span>
          </div>
          <div class="data-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Territory (DM)</th>
                  <th class="num">2025 MoAvg</th>
                  <th class="num">2026 MoAvg</th>
                  <th class="num">P2 PPG%</th>
                  <th>Indicator</th>
                </tr>
              </thead>
              <tbody id="tbodySlide7"></tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 8 -->
    <section class="slide-container" id="slide-8">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge">SLIDE 08</span> PEDIA-START 1 PPG% GROWTH RANKING</h2>
          <p>Pedia-Start 1 National Benchmark at top (-2.06%) | Green = Above Company | Red = Below Company</p>
        </div>
        <div class="kpi-pills">
          <div class="kpi-pill">
            <span>Pedia-Start 1 Company PPG</span>
            <strong>-2.06%</strong>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <span>Pedia-Start 1 Growth Ranking (Horizontal Bars)</span>
          </div>
          <div class="chart-box-tall">
            <canvas id="chartSlide8" width="600" height="480"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>Pedia-Start 1 Leaderboard</span>
          </div>
          <div class="data-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Territory (DM)</th>
                  <th class="num">2025 MoAvg</th>
                  <th class="num">2026 MoAvg</th>
                  <th class="num">PS1 PPG%</th>
                  <th>Indicator</th>
                </tr>
              </thead>
              <tbody id="tbodySlide8"></tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 9 -->
    <section class="slide-container" id="slide-9">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge">SLIDE 09</span> PEDIA-START 2 PPG% GROWTH RANKING</h2>
          <p>Pedia-Start 2 National Benchmark at top (+39.86%) | Green = Above Company | Red = Below Company</p>
        </div>
        <div class="kpi-pills">
          <div class="kpi-pill">
            <span>Pedia-Start 2 Company PPG</span>
            <strong>+39.86%</strong>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <span>Pedia-Start 2 Growth Ranking (Horizontal Bars)</span>
          </div>
          <div class="chart-box-tall">
            <canvas id="chartSlide9" width="600" height="480"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>Pedia-Start 2 Leaderboard</span>
          </div>
          <div class="data-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Territory (DM)</th>
                  <th class="num">2025 MoAvg</th>
                  <th class="num">2026 MoAvg</th>
                  <th class="num">PS2 PPG%</th>
                  <th>Indicator</th>
                </tr>
              </thead>
              <tbody id="tbodySlide9"></tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 10 -->
    <section class="slide-container" id="slide-10">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge">SLIDE 10</span> STRATEGIC PERFORMANCE QUADRANT MATRIX</h2>
          <p>Horizontal Axis Intercept positioned at <strong>Company Total PPG (+33.79%)</strong> | Vertical Axis at <strong>Contribution Diff (0.00%)</strong> | <strong>Selected ADM Bubble Highlighted</strong>.</p>
        </div>
        <div class="kpi-pills">
          <div class="kpi-pill">
            <span>X-Axis Intercept</span>
            <strong style="color:var(--primary);">+33.79% (Company PPG)</strong>
          </div>
          <div class="kpi-pill">
            <span>Y-Axis Intercept</span>
            <strong>0.00% (Diff Baseline)</strong>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <span>Portfolio Quadrant Matrix: ABCD Positioning</span>
            <small style="font-size:11px; color:var(--text-muted);">Bubble size = 2026 YTD Sales Volume</small>
          </div>
          <div class="chart-box-tall" style="height: 520px;">
            <canvas id="chartSlide10" width="600" height="520"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>Diagnostic & Strategic Action Plan</span>
            <small style="color:var(--text-muted); font-size:11px;">Focused on Selected ADM</small>
          </div>

          <!-- Dynamic Selected ADM Diagnostic Box -->
          <div id="chosenQuadDiagnosticCard" class="chosen-quad-highlight">
          </div>

          <div class="quadrant-grid">
            <div class="quad-card quad-b">
              <div class="quad-header">
                <h4>QUADRANT B: CHALLENGERS 🚀</h4>
                <small style="font-weight:700;">High Growth, Neg. Diff</small>
              </div>
              <ul>
                <li><strong>Alx (Ahmed Hassan):</strong> +39.6% PPG, -2.7% Diff (61.2k units).</li>
                <li><em>Core Action:</em> Closing the potential gap. Expand pediatrician advocacy & key pharmacy accounts.</li>
              </ul>
            </div>

            <div class="quad-card quad-a">
              <div class="quad-header">
                <h4>QUADRANT A: STARS 🌟</h4>
                <small style="font-weight:700;">High Growth, Pos. Diff</small>
              </div>
              <ul>
                <li><strong>Delta II (Mohamed Yousef):</strong> +60.2% PPG, +4.2% Diff (136.7k units).</li>
                <li><strong>Upper Egypt II (Beshoy Youhanna):</strong> +50.1% PPG, +0.5% Diff (133.8k units).</li>
                <li><em>Core Action:</em> Core volume engines. Protect baseline share and accelerate specialty cross-selling.</li>
              </ul>
            </div>

            <div class="quad-card quad-d">
              <div class="quad-header">
                <h4>QUADRANT D: LOWEST PERFORMERS ⚠️</h4>
                <small style="font-weight:700;">Low Growth, Neg. Diff</small>
              </div>
              <ul>
                <li><strong>Cairo (Noher Adel):</strong> +22.5% PPG, -8.3% Diff (52.5k units).</li>
                <li><strong>Guiza (Youstina Farag):</strong> +29.6% PPG, -5.2% Diff (77.4k units).</li>
                <li><strong>Upper Egypt I (UE North):</strong> +27.8% PPG, -2.1% Diff.</li>
                <li><em>Core Action:</em> Urgent commercial turnaround, field activity re-structuring, key clinic targeting.</li>
              </ul>
            </div>

            <div class="quad-card quad-c">
              <div class="quad-header">
                <h4>QUADRANT C: VOLUME PILLARS 🛡️</h4>
                <small style="font-weight:700;">Moderate Growth, Pos. Diff</small>
              </div>
              <ul>
                <li><strong>DELTA I (Shimaa Tarek):</strong> +32.2% PPG, +7.3% Diff (120.9k units).</li>
                <li><strong>KFR EL.SHK (Karim Shehab):</strong> +12.0% PPG, +5.8% Diff (62.8k units).</li>
                <li><strong>Behera & Dak. (Ahmed Sakr):</strong> +15.0% PPG, +0.6% Diff (85.8k units).</li>
                <li><em>Core Action:</em> Strong baseline share defenders. Focus detailing on high-growth formulations to re-ignite velocity above +33.8%.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer>
    <div>Egy Nutri. Commercial Analytics Division • Infant Nutrition Business Review Template</div>
    <div>Shortage Flattening Applied: Monthly Averages (YTD 2026 ÷ 6 vs 2025 ÷ 12)</div>
  </footer>

  <!-- Floating Fullscreen Presentation HUD -->
  <div class="fullscreen-hud" id="fullscreenHud">
    <button onclick="prevSlide()" title="Previous Slide (Left Arrow)">❮ Prev</button>
    <span class="hud-badge" id="hudSlideIndicator">Slide 1 / 10</span>
    <button onclick="nextSlide()" title="Next Slide (Right Arrow / Space)">Next ❯</button>
    <button onclick="toggleSlideOutline()" title="Executive Slide Outline (O)">📑 Outline</button>
    <button onclick="openDataEditor()" title="Edit Sales Volumes (E)">✏️ Edit Data</button>
    <button onclick="toggleFullscreen()" title="Exit Fullscreen (Esc)">🗕 Exit Fullscreen</button>
  </div>

  <!-- Slide Outline Drawer -->
  <div class="outline-drawer" id="slideOutlineDrawer">
    <div class="outline-header">
      <h3>📑 Executive Slide Outline</h3>
      <button onclick="toggleSlideOutline()" title="Close Outline">✕</button>
    </div>
    <div class="outline-list" id="outlineList">
      <!-- Generated dynamically by renderSlideOutline() -->
    </div>
  </div>

  <!-- Data Editor Modal -->
  <div class="modal-backdrop" id="dataEditorBackdrop" onclick="if(event.target===this) closeDataEditor()">
    <div class="data-modal">
      <div class="data-modal-header">
        <div>
          <h2>✏️ Sales Data Manager & Live Model Updater</h2>
          <p>Modify territory volumes, Geo Share potentials, or manager assignments. All 10 slides and charts recalculate live.</p>
        </div>
        <button class="data-modal-close" onclick="closeDataEditor()" title="Close">✕</button>
      </div>

      <div class="data-modal-tabs">
        <button class="modal-tab-btn active" id="modalTab2026" onclick="switchEditorTab('2026')">📅 2026 YTD June Actuals (M06)</button>
        <button class="modal-tab-btn" id="modalTab2025" onclick="switchEditorTab('2025')">📅 2025 Full-Year Actuals (M12)</button>
        <button class="modal-tab-btn" id="modalTabMeta" onclick="switchEditorTab('meta')">👤 Managers & Geo Share %</button>
        <button class="modal-tab-btn" id="modalTabJson" onclick="switchEditorTab('json')">💾 Backup / JSON Transfer</button>
      </div>

      <div class="data-modal-body" id="dataModalBody">
        <!-- Rendered dynamically by renderEditorBody() -->
      </div>

      <div class="data-modal-footer">
        <div class="footer-left-btns">
          <button class="btn-apply-data" onclick="applyDataEditorChanges()">💾 Save & Recalculate Dashboard</button>
          <button class="btn-reset-data" onclick="resetDataToBaseline()">🔄 Reset to Baseline</button>
          <button class="btn-export-data" onclick="exportDataToJson()">📥 Export JSON</button>
        </div>
        <div class="footer-right-btns">
          <button class="btn-cancel-modal" onclick="closeDataEditor()">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast Notification Popup -->
  <div class="toast-msg" id="toastNotification">
    <span id="toastIcon">✅</span>
    <span id="toastText">Data successfully updated!</span>
  </div>

  <!-- Embedded Application Data & Logic -->
  <script>
    // Ensure Chart is available in scope
    var ChartLib = window.Chart || Chart;

    // Factory Verified Baseline Data
    const DEFAULT_DATA_2026 = [
      { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elmonem Abdallah', p1: 19436, p2: 8869, pg3: 2538, lf: 1527, ha: 2260, ar: 1895, ac: 2136, mum: 350, ps1: 12955, ps2: 6562, lbw: 2707, sum: 61235, geoShare: 0.10101, contrIdx: 0.730478862, contrDiff: -0.0272 },
      { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', p1: 23500, p2: 11046, pg3: 2651, lf: 2578, ha: 4457, ar: 3572, ac: 4660, mum: 387, ps1: 17403, ps2: 10976, lbw: 4581, sum: 85811, geoShare: 0.09754, contrIdx: 1.06014107, contrDiff: 0.0059 },
      { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- HAKEEM HASSAN', p1: 15452, p2: 11024, pg3: 3206, lf: 2574, ha: 2990, ar: 2240, ac: 3813, mum: 561, ps1: 5169, ps2: 3030, lbw: 2486, sum: 52545, geoShare: 0.14619, contrIdx: 0.433104767, contrDiff: -0.0829 },
      { territory: 'Guiza', dm: 'Youstina Farag Allah', p1: 20510, p2: 12243, pg3: 2582, lf: 4260, ha: 4196, ar: 3300, ac: 6343, mum: 1381, ps1: 11326, ps2: 7718, lbw: 3509, sum: 77368, geoShare: 0.14525, contrIdx: 0.641847568, contrDiff: -0.0520 },
      { territory: 'DELTA I', dm: 'Shimaa Tarek El- Shamy', p1: 32885, p2: 25206, pg3: 6882, lf: 3744, ha: 6222, ar: 5424, ac: 7790, mum: 421, ps1: 15401, ps2: 11553, lbw: 5349, sum: 120877, geoShare: 0.07317, contrIdx: 1.990588131, contrDiff: 0.0725 },
      { territory: 'Delta II', dm: 'Mohamed Yousef M.', p1: 36545, p2: 23057, pg3: 3777, lf: 5016, ha: 6509, ar: 3126, ac: 7430, mum: 358, ps1: 23588, ps2: 22111, lbw: 5183, sum: 136700, geoShare: 0.12271, contrIdx: 1.342339456, contrDiff: 0.0420 },
      { territory: 'Upper Egypt I', dm: 'UE North', p1: 26168, p2: 16847, pg3: 2530, lf: 2031, ha: 2240, ar: 3269, ac: 3832, mum: 137, ps1: 24150, ps2: 14570, lbw: 2978, sum: 98752, geoShare: 0.14039, contrIdx: 0.84761038, contrDiff: -0.0214 },
      { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', p1: 44494, p2: 28761, pg3: 4173, lf: 2908, ha: 4618, ar: 4106, ac: 6659, mum: 548, ps1: 20353, ps2: 11712, lbw: 5499, sum: 133831, geoShare: 0.15611, contrIdx: 1.033014434, contrDiff: 0.0052 },
      { territory: 'KFR EL.SHK', dm: 'Karim Shehab', p1: 15157, p2: 9447, pg3: 3685, lf: 1370, ha: 1902, ar: 1129, ac: 2450, mum: 185, ps1: 15329, ps2: 9174, lbw: 2935, sum: 62763, geoShare: 0.01763, contrIdx: 4.290709151, contrDiff: 0.0580 }
    ];

    const DEFAULT_DATA_2025 = [
      { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elmonem Abdallah', p1: 20546, p2: 9779, pg3: 2744, lf: 2121, ha: 3399, ar: 3693, ac: 3692, mum: 417, ps1: 29953, ps2: 11360, lbw: 0, sum: 87704 },
      { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', p1: 39810, p2: 16384, pg3: 4620, lf: 4913, ha: 8259, ar: 8974, ac: 7073, mum: 807, ps1: 42949, ps2: 15508, lbw: 0, sum: 149297 },
      { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- HAKEEM HASSAN', p1: 23625, p2: 14442, pg3: 4076, lf: 3372, ha: 6241, ar: 8039, ac: 5551, mum: 1473, ps1: 11402, ps2: 7597, lbw: 0, sum: 85818 },
      { territory: 'Guiza', dm: 'Youstina Farag Allah', p1: 31300, p2: 19226, pg3: 5155, lf: 6125, ha: 8313, ar: 10328, ac: 8429, mum: 2570, ps1: 19302, ps2: 8663, lbw: 0, sum: 119411 },
      { territory: 'DELTA I', dm: 'Shimaa Tarek El- Shamy', p1: 48288, p2: 31681, pg3: 8808, lf: 5040, ha: 13724, ar: 14651, ac: 10957, mum: 1856, ps1: 30972, ps2: 16848, lbw: 0, sum: 182825 },
      { territory: 'Delta II', dm: 'Mohamed Yousef M.', p1: 45605, p2: 24543, pg3: 4768, lf: 4961, ha: 8799, ar: 7112, ac: 7895, mum: 730, ps1: 44410, ps2: 21863, lbw: 0, sum: 170686 },
      { territory: 'Upper Egypt I', dm: 'UE North', p1: 45199, p2: 23038, pg3: 4063, lf: 2816, ha: 5335, ar: 8089, ac: 6105, mum: 481, ps1: 41065, ps2: 18333, lbw: 0, sum: 154524 },
      { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', p1: 58524, p2: 23602, pg3: 4677, lf: 4282, ha: 6236, ar: 8468, ac: 8784, mum: 1150, ps1: 43061, ps2: 19528, lbw: 0, sum: 178312 },
      { territory: 'KFR EL.SHK', dm: 'Karim Shehab', p1: 21796, p2: 14599, pg3: 3268, lf: 3250, ha: 4931, ar: 5085, ac: 4643, mum: 508, ps1: 34372, ps2: 19586, lbw: 0, sum: 112038 }
    ];

    // Active Dataset (Loaded from localStorage or initialized from baseline)
    let rawData2026 = null;
    let rawData2025 = null;
    try {
      rawData2026 = JSON.parse(localStorage.getItem('egy_nutri_data_2026') || 'null');
      rawData2025 = JSON.parse(localStorage.getItem('egy_nutri_data_2025') || 'null');
    } catch (e) {
      console.warn('localStorage read error:', e);
    }
    if (!rawData2026 || !Array.isArray(rawData2026) || rawData2026.length === 0) {
      rawData2026 = JSON.parse(JSON.stringify(DEFAULT_DATA_2026));
    }
    if (!rawData2025 || !Array.isArray(rawData2025) || rawData2025.length === 0) {
      rawData2025 = JSON.parse(JSON.stringify(DEFAULT_DATA_2025));
    }

    let company2026 = {};
    let company2025 = {};
    let compTotalPpg = 33.79;
    const compProductMetrics = {};

    const productMeta = [
      { key: 'p1', name: 'Pediamil 1', isCore: true },
      { key: 'p2', name: 'Pediamil 2', isCore: true },
      { key: 'ps1', name: 'Pedia-Start 1', isCore: true },
      { key: 'ps2', name: 'Pedia-Start 2', isCore: true },
      { key: 'lf', name: 'Pediamil LF', isCore: false },
      { key: 'ha', name: 'Pediamil HA', isCore: false },
      { key: 'ar', name: 'Pediamil AR', isCore: false },
      { key: 'ac', name: 'Pediamil AC', isCore: false },
      { key: 'mum', name: 'Pediamum', isCore: false }
    ];

    function calculateRowSum(r) {
      return (Number(r.p1)||0) + (Number(r.p2)||0) + (Number(r.pg3)||0) + 
             (Number(r.lf)||0) + (Number(r.ha)||0) + (Number(r.ar)||0) + 
             (Number(r.ac)||0) + (Number(r.mum)||0) + (Number(r.ps1)||0) + 
             (Number(r.ps2)||0) + (Number(r.lbw)||0);
    }

    function recalculateAllModelData() {
      // 1. Recalculate Row Sums
      rawData2026.forEach(r => { r.sum = calculateRowSum(r); });
      rawData2025.forEach(r => { r.sum = calculateRowSum(r); });

      // 2. Company 2026 Totals
      company2026 = { p1: 0, p2: 0, pg3: 0, lf: 0, ha: 0, ar: 0, ac: 0, mum: 0, ps1: 0, ps2: 0, lbw: 0, sum: 0 };
      rawData2026.forEach(r => {
        company2026.p1 += (Number(r.p1) || 0);
        company2026.p2 += (Number(r.p2) || 0);
        company2026.pg3 += (Number(r.pg3) || 0);
        company2026.lf += (Number(r.lf) || 0);
        company2026.ha += (Number(r.ha) || 0);
        company2026.ar += (Number(r.ar) || 0);
        company2026.ac += (Number(r.ac) || 0);
        company2026.mum += (Number(r.mum) || 0);
        company2026.ps1 += (Number(r.ps1) || 0);
        company2026.ps2 += (Number(r.ps2) || 0);
        company2026.lbw += (Number(r.lbw) || 0);
        company2026.sum += r.sum;
      });

      // 3. Company 2025 Totals
      company2025 = { p1: 0, p2: 0, pg3: 0, lf: 0, ha: 0, ar: 0, ac: 0, mum: 0, ps1: 0, ps2: 0, lbw: 0, sum: 0 };
      rawData2025.forEach(r => {
        company2025.p1 += (Number(r.p1) || 0);
        company2025.p2 += (Number(r.p2) || 0);
        company2025.pg3 += (Number(r.pg3) || 0);
        company2025.lf += (Number(r.lf) || 0);
        company2025.ha += (Number(r.ha) || 0);
        company2025.ar += (Number(r.ar) || 0);
        company2025.ac += (Number(r.ac) || 0);
        company2025.mum += (Number(r.mum) || 0);
        company2025.ps1 += (Number(r.ps1) || 0);
        company2025.ps2 += (Number(r.ps2) || 0);
        company2025.lbw += (Number(r.lbw) || 0);
        company2025.sum += r.sum;
      });

      // 4. Update contrDiff & contrIdx
      rawData2026.forEach((r, i) => {
        const r25 = rawData2025[i] || { sum: 0 };
        const c26 = company2026.sum > 0 ? (r.sum / company2026.sum) * 100 : 0;
        const c25 = company2025.sum > 0 ? (r25.sum / company2025.sum) * 100 : 0;
        r.contrDiff = (c26 - c25) / 100;
        r.contrIdx = (r.geoShare && r.geoShare > 0) ? ((c26 / 100) / r.geoShare) : 1;
      });

      // 5. Total Company Benchmark PPG%
      const compAvg26 = company2026.sum / 6;
      const compAvg25 = company2025.sum / 12;
      compTotalPpg = compAvg25 > 0 ? ((compAvg26 / compAvg25) - 1) * 100 : 33.79;

      // 6. Product Metrics Benchmarks
      productMeta.forEach(p => {
        const v26 = company2026[p.key] || 0;
        const v25 = company2025[p.key] || 0;
        const avg26 = v26 / 6;
        const avg25 = v25 / 12;
        const ppg = avg25 > 0 ? ((avg26 / avg25) - 1) * 100 : 0;
        const lnAvgAdm = avg26 / Math.max(1, rawData2026.length);
        compProductMetrics[p.key] = { avg26, avg25, ppg, lnAvgAdm };
      });

      // 7. Refresh ADM Selector Dropdown options
      refreshAdmSelectOptions();
    }

    function refreshAdmSelectOptions() {
      const sel = document.getElementById('chosenAdmSelect');
      if (!sel) return;
      const prevVal = parseInt(sel.value, 10);
      sel.innerHTML = '';
      rawData2026.forEach((r, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        const shortName = r.dm ? r.dm.split(' ').slice(0, 2).join(' ') : 'ADM ' + (idx + 1);
        opt.text = shortName + ' (' + r.territory + ')';
        if (idx === prevVal || (isNaN(prevVal) && idx === 7)) {
          opt.selected = true;
        }
        sel.appendChild(opt);
      });
    }

    let currentSlide = 1;
    const totalSlides = 10;
    const charts = {};

    function initSlideTabs() {
      const tabs = document.querySelectorAll('.tab-btn');
      tabs.forEach((tab, index) => {
        tab.onclick = () => goToSlide(index + 1);
      });
    }

    function goToSlide(slideNum) {
      if (slideNum < 1 || slideNum > totalSlides) return;
      currentSlide = slideNum;

      document.querySelectorAll('.slide-container').forEach(el => el.classList.remove('active'));
      const activeSlide = document.getElementById('slide-' + slideNum);
      if (activeSlide) activeSlide.classList.add('active');

      document.querySelectorAll('.tab-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx + 1 === slideNum);
      });

      const indicator = document.getElementById('slideIndicator');
      if (indicator) indicator.innerText = 'Slide ' + slideNum + ' of ' + totalSlides;

      const hudInd = document.getElementById('hudSlideIndicator');
      if (hudInd) hudInd.innerText = 'Slide ' + slideNum + ' / ' + totalSlides;

      document.querySelectorAll('.outline-item').forEach((item, idx) => {
        item.classList.toggle('active', idx + 1 === slideNum);
      });

      requestAnimationFrame(() => {
        renderSlide(slideNum);
      });
    }

    function prevSlide() {
      if (currentSlide > 1) goToSlide(currentSlide - 1);
    }

    function nextSlide() {
      if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
    }

    /* Fullscreen Mode Controller */
    function toggleFullscreen() {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
          docEl.requestFullscreen().catch(() => {
            document.body.classList.toggle('is-fullscreen');
            onFullscreenChange();
          });
        } else if (docEl.webkitRequestFullscreen) {
          docEl.webkitRequestFullscreen();
        } else {
          document.body.classList.toggle('is-fullscreen');
          onFullscreenChange();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else {
          document.body.classList.remove('is-fullscreen');
          onFullscreenChange();
        }
      }
    }

    function onFullscreenChange() {
      const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.body.classList.contains('is-fullscreen'));
      document.body.classList.toggle('is-fullscreen', isFull);
      const btn = document.getElementById('fullscreenToggleBtn');
      if (btn) {
        btn.innerHTML = isFull ? '🗕 Exit Fullscreen' : '⛶ Fullscreen';
      }
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        renderSlide(currentSlide);
      }, 150);
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);

    /* Slide Outline Drawer Controller */
    const slideOutlineData = [
      { num: 1, title: 'Territorial Contribution & Geo Share %', category: 'Selected ADM Contribution' },
      { num: 2, title: 'Pediamil 1 & 2, Pedia-Start 1 & 2 Monthly Volumes', category: 'Core Formulas' },
      { num: 3, title: 'Specialty Infant Formulas Monthly Averages', category: 'Specialty Lines' },
      { num: 4, title: 'Dual-Axis Combo: Volume & Growth %', category: 'Strategic Deep Dive' },
      { num: 5, title: 'Total PPG% Growth Ranking', category: 'National Ranking' },
      { num: 6, title: 'Pediamil 1 PPG% Growth Ranking', category: 'Product League Table' },
      { num: 7, title: 'Pediamil 2 PPG% Growth Ranking', category: 'Product League Table' },
      { num: 8, title: 'Pedia-Start 1 PPG% Growth Ranking', category: 'Product League Table' },
      { num: 9, title: 'Pedia-Start 2 PPG% Growth Ranking', category: 'Product League Table' },
      { num: 10, title: 'Strategic Performance Quadrant Matrix (ABCD)', category: 'Growth vs Contribution' }
    ];

    function toggleSlideOutline() {
      const drawer = document.getElementById('slideOutlineDrawer');
      if (!drawer) return;
      drawer.classList.toggle('open');
      if (drawer.classList.contains('open')) {
        renderSlideOutline();
      }
    }

    function closeSlideOutline() {
      const drawer = document.getElementById('slideOutlineDrawer');
      if (drawer) drawer.classList.remove('open');
    }

    function renderSlideOutline() {
      const container = document.getElementById('outlineList');
      if (!container) return;
      container.innerHTML = '';

      slideOutlineData.forEach(s => {
        const item = document.createElement('div');
        item.className = 'outline-item' + (s.num === currentSlide ? ' active' : '');
        item.onclick = () => {
          goToSlide(s.num);
          closeSlideOutline();
        };
        item.innerHTML =
          '<div class="outline-num">Slide ' + (s.num < 10 ? '0' + s.num : s.num) + '</div>' +
          '<div class="outline-info">' +
            '<h4>' + s.title + '</h4>' +
            '<span>' + s.category + '</span>' +
          '</div>';
        container.appendChild(item);
      });
    }

    /* Global Keyboard Navigation */
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        if (e.key === 'Escape') closeDataEditor();
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'o' || e.key === 'O') {
        toggleSlideOutline();
      } else if (e.key === 'e' || e.key === 'E') {
        openDataEditor();
      } else if (e.key === 'Escape') {
        closeDataEditor();
        closeSlideOutline();
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      } else if (e.key === 'Home') {
        goToSlide(1);
      } else if (e.key === 'End') {
        goToSlide(10);
      }
    });

    function getChosenPerson() {
      const sel = document.getElementById('chosenAdmSelect');
      let idx = sel ? parseInt(sel.value, 10) : 7;
      if (isNaN(idx) || idx < 0 || idx >= rawData2026.length) idx = 0;
      const r26 = rawData2026[idx];
      const r25 = rawData2025[idx];
      const avg26 = r26.sum / 6;
      const avg25 = r25.sum / 12;
      const totalPpg = ((avg26 / avg25) - 1) * 100;
      const c26 = (r26.sum / company2026.sum) * 100;
      const c25 = (r25.sum / company2025.sum) * 100;
      const geo = r26.geoShare * 100;
      const contrDiff = r26.contrDiff * 100;

      let quad = 'A';
      if (contrDiff >= 0 && totalPpg >= compTotalPpg) quad = 'A';
      else if (contrDiff < 0 && totalPpg >= compTotalPpg) quad = 'B';
      else if (contrDiff >= 0 && totalPpg < compTotalPpg) quad = 'C';
      else quad = 'D';

      return {
        idx,
        territory: r26.territory,
        dm: r26.dm,
        r26,
        r25,
        avg26,
        avg25,
        totalPpg,
        c26,
        c25,
        geo,
        contrDiff,
        quad
      };
    }

    function onPersonChange() {
      renderSlide(currentSlide);
    }

    const horizontalDataLabelsPlugin = {
      id: 'horizontalDataLabels',
      afterDatasetsDraw(chart, args, pluginOptions) {
        try {
          if (!chart || !chart.chartArea) return;
          const { ctx, chartArea } = chart;
          const { left, right } = chartArea;
          const isHorizontal = chart.config.options && chart.config.options.indexAxis === 'y';
          if (!isHorizontal) return;

          ctx.save();
          ctx.font = 'bold 11px sans-serif';
          ctx.textBaseline = 'middle';

          chart.data.datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            if (!meta || meta.hidden) return;

            meta.data.forEach((element, index) => {
              const val = dataset.data[index];
              if (val === undefined || val === null) return;

              const isPct = pluginOptions && pluginOptions.isPct;
              const text = isPct ? (val.toFixed(1) + '%') : Number(val).toLocaleString();

              const xPos = element.x;
              const yPos = element.y;
              const barBase = element.base !== undefined ? element.base : left;
              const barWidth = Math.abs(xPos - barBase);

              if (barWidth >= 65) {
                ctx.textAlign = 'right';
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText(text, xPos - 8, yPos);
              } else if (xPos + 55 < right) {
                ctx.textAlign = 'left';
                ctx.fillStyle = '#1E293B';
                ctx.font = 'bold 11px sans-serif';
                ctx.fillText(text, xPos + 6, yPos);
              }
            });
          });
          ctx.restore();
        } catch (e) {
          console.warn('horizontalDataLabels error:', e);
        }
      }
    };

    const quadrantCrosshairPlugin = {
      id: 'quadrantCrosshair',
      beforeDraw(chart) {
        try {
          if (!chart || !chart.chartArea || !chart.scales) return;
          const { ctx, chartArea, scales: { x, y } } = chart;
          if (!x || !y) return;
          const { left, top, right, bottom } = chartArea;

          const xZeroPixel = x.getPixelForValue(0);
          const yCompanyPixel = y.getPixelForValue(compTotalPpg);

          ctx.save();

          // 1. Fill Quadrants background
          ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
          ctx.fillRect(xZeroPixel, top, right - xZeroPixel, yCompanyPixel - top);

          ctx.fillStyle = 'rgba(59, 130, 246, 0.08)';
          ctx.fillRect(left, top, xZeroPixel - left, yCompanyPixel - top);

          ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
          ctx.fillRect(left, yCompanyPixel, xZeroPixel - left, bottom - yCompanyPixel);

          ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
          ctx.fillRect(xZeroPixel, yCompanyPixel, right - xZeroPixel, bottom - yCompanyPixel);

          // 2. Horizontal Axis Line at Intercept Y = Company PPG Benchmark (+33.79%)
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#1B365D';
          ctx.setLineDash([6, 4]);
          ctx.beginPath();
          ctx.moveTo(left, yCompanyPixel);
          ctx.lineTo(right, yCompanyPixel);
          ctx.stroke();

          ctx.setLineDash([]);
          ctx.fillStyle = '#1B365D';
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText('▲ ABOVE COMPANY PPG (+' + compTotalPpg.toFixed(1) + '%)', right - 8, yCompanyPixel - 6);
          ctx.fillText('▼ BELOW COMPANY PPG', right - 8, yCompanyPixel + 14);

          // 3. Vertical Axis Line at Intercept X = 0.00%
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#475569';
          ctx.setLineDash([6, 4]);
          ctx.beginPath();
          ctx.moveTo(xZeroPixel, top);
          ctx.lineTo(xZeroPixel, bottom);
          ctx.stroke();

          ctx.setLineDash([]);
          ctx.fillStyle = '#475569';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('CONTR. DIFF = 0.00% (GEO SHARE PARITY)', xZeroPixel, top + 14);

          // 4. Quadrant Watermarks
          ctx.font = 'bold 13px sans-serif';
          ctx.fillStyle = 'rgba(30, 64, 175, 0.7)';
          ctx.textAlign = 'left';
          ctx.fillText('QUADRANT B: CHALLENGERS 🚀', left + 14, top + 30);
          ctx.font = '10.5px sans-serif';
          ctx.fillText('(High Growth > +33.8%, Negative Diff < 0%)', left + 14, top + 46);

          ctx.font = 'bold 13px sans-serif';
          ctx.fillStyle = 'rgba(6, 95, 70, 0.75)';
          ctx.textAlign = 'right';
          ctx.fillText('QUADRANT A: STARS 🌟', right - 14, top + 30);
          ctx.font = '10.5px sans-serif';
          ctx.fillText('(High Growth > +33.8%, Positive Diff > 0%)', right - 14, top + 46);

          ctx.font = 'bold 13px sans-serif';
          ctx.fillStyle = 'rgba(153, 27, 27, 0.75)';
          ctx.textAlign = 'left';
          ctx.fillText('QUADRANT D: LOWEST PERFORMERS ⚠️', left + 14, bottom - 30);
          ctx.font = '10.5px sans-serif';
          ctx.fillText('(Low Growth < +33.8%, Negative Diff < 0%)', left + 14, bottom - 14);

          ctx.font = 'bold 13px sans-serif';
          ctx.fillStyle = 'rgba(146, 64, 14, 0.75)';
          ctx.textAlign = 'right';
          ctx.fillText('QUADRANT C: VOLUME PILLARS 🛡️', right - 14, bottom - 30);
          ctx.font = '10.5px sans-serif';
          ctx.fillText('(Moderate Growth < +33.8%, Positive Diff > 0%)', right - 14, bottom - 14);

          ctx.restore();
        } catch (e) {
          console.warn('quadrantCrosshair error:', e);
        }
      }
    };

    function renderSlide(slideNum) {
      try {
        switch (slideNum) {
          case 1: renderSlide1(); break;
          case 2: renderSlide2(); break;
          case 3: renderSlide3(); break;
          case 4: renderSlide4(); break;
          case 5: renderSlide5(); break;
          case 6: renderSlide6(); break;
          case 7: renderSlide7(); break;
          case 8: renderSlide8(); break;
          case 9: renderSlide9(); break;
          case 10: renderSlide10(); break;
        }
      } catch (err) {
        console.error('Error rendering slide ' + slideNum + ':', err);
      }
    }

    // SLIDE 1
    function renderSlide1() {
      const p = getChosenPerson();
      document.getElementById('s1PersonName').innerText = p.dm;
      document.getElementById('s1TerritoryName').innerText = p.territory;
      document.getElementById('s1ChartTitle').innerText = p.territory + ' (' + p.dm.split(' ')[0] + '): 3-Bar Share Comparison';

      const labels = ['GEO Share % (2025 Potential)', 'YTD Contribution % 2026', 'Contribution % 2025'];
      const values = [Number(p.geo.toFixed(2)), Number(p.c26.toFixed(2)), Number(p.c25.toFixed(2))];
      const colors = ['#94A3B8', '#1B365D', '#38BDF8'];

      if (charts.s1) {
        try { charts.s1.destroy(); } catch (e) {}
      }
      const ctx = document.getElementById('chartSlide1').getContext('2d');
      charts.s1 = new ChartLib(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Share %',
            data: values,
            backgroundColor: colors,
            borderRadius: 6
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            horizontalDataLabels: { isPct: true }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: { callback: v => v + '%' },
              title: { display: true, text: 'Percentage of National Sales (%)' }
            },
            y: {
              ticks: { font: { weight: 'bold', size: 12 } }
            }
          }
        },
        plugins: [horizontalDataLabelsPlugin]
      });

      const diffVsGeo = p.contrDiff;
      const diffVs25 = p.c26 - p.c25;
      const isAboveGeo = diffVsGeo >= 0;
      const isAbove25 = diffVs25 >= 0;

      document.getElementById('s1BarLegendNotes').innerHTML =
        '<div style="display:flex; justify-content:space-between; margin-bottom:6px;">' +
          '<span><strong>Territory GEO Potential (2025):</strong> ' + p.geo.toFixed(2) + '%</span>' +
          '<span><strong>2026 Current Contribution:</strong> ' + p.c26.toFixed(2) + '%</span>' +
        '</div>' +
        '<div>' +
          '• <strong>Variance vs. GEO Potential:</strong> ' +
          '<span style="font-weight:700; color:' + (isAboveGeo ? 'var(--green-text)' : 'var(--red-text)') + ';">' +
            (isAboveGeo ? '+' : '') + diffVsGeo.toFixed(2) + '% (' + (isAboveGeo ? 'Exceeding Market Share Potential' : 'Untapped Opportunity Gap') + ')' +
          '</span>' +
        '</div>' +
        '<div>' +
          '• <strong>Year-over-Year Shift:</strong> ' +
          '<span style="font-weight:700; color:' + (isAbove25 ? 'var(--green-text)' : 'var(--red-text)') + ';">' +
            (isAbove25 ? '+' : '') + diffVs25.toFixed(2) + '% vs Full-Year 2025 (' + p.c25.toFixed(2) + '%)' +
          '</span>' +
        '</div>';

      const tbody = document.getElementById('tbodySlide1');
      tbody.innerHTML = '';
      rawData2026.forEach((r, idx) => {
        const r25 = rawData2025[idx];
        const c26 = (r.sum / company2026.sum) * 100;
        const c25 = (r25.sum / company2025.sum) * 100;
        const geo = r.geoShare * 100;
        const diffGeo = r.contrDiff * 100;
        const isPos = diffGeo >= 0;
        const isSelected = idx === p.idx;

        const tr = document.createElement('tr');
        if (isSelected) tr.className = 'highlight-row';
        tr.innerHTML =
          '<td><strong>' + (isSelected ? '👉 ' : '') + r.territory + '</strong><br><small style="color:var(--text-muted);">' + r.dm.split(' ')[0] + '</small></td>' +
          '<td class="num">' + geo.toFixed(1) + '%</td>' +
          '<td class="num"><strong>' + c26.toFixed(1) + '%</strong></td>' +
          '<td class="num">' + c25.toFixed(1) + '%</td>' +
          '<td class="num" style="color:' + (isPos ? 'var(--green-text)' : 'var(--red-text)') + '; font-weight:700;">' +
            (isPos ? '+' : '') + diffGeo.toFixed(2) + '%' +
          '</td>' +
          '<td>' +
            '<span class="' + (isPos ? 'badge-above' : 'badge-below') + '">' +
              (isPos ? '▲ Above Geo' : '▼ Below Geo') +
            '</span>' +
          '</td>';
        tbody.appendChild(tr);
      });
    }

    // SLIDE 2
    function renderSlide2() {
      const p = getChosenPerson();
      document.getElementById('s2TerritoryLabel').innerText = p.dm + ' (' + p.territory + ')';

      const coreKeys = ['p1', 'p2', 'ps1', 'ps2'];
      const labels = ['Pediamil 1', 'Pediamil 2', 'Pedia-Start 1', 'Pedia-Start 2'];

      const avg26Data = [];
      const avg25Data = [];
      const lnAvgData = [];

      const tbody = document.getElementById('tbodySlide2');
      tbody.innerHTML = '';

      coreKeys.forEach((key, idx) => {
        const v26 = p.r26[key];
        const v25 = p.r25[key];
        const avg26 = v26 / 6;
        const avg25 = v25 / 12;
        const ppg = avg25 > 0 ? ((avg26 / avg25) - 1) * 100 : 0;
        const lnAvg = compProductMetrics[key].lnAvgAdm;
        const vsLnAvg = ((avg26 / lnAvg) - 1) * 100;

        avg26Data.push(Math.round(avg26));
        avg25Data.push(Math.round(avg25));
        lnAvgData.push(Math.round(lnAvg));

        const isAboveLn = vsLnAvg >= 0;
        const isAboveCompPpg = ppg >= compProductMetrics[key].ppg;

        const tr = document.createElement('tr');
        tr.innerHTML =
          '<td><strong>' + labels[idx] + '</strong></td>' +
          '<td class="num"><strong>' + Math.round(avg26).toLocaleString() + '</strong></td>' +
          '<td class="num">' + Math.round(avg25).toLocaleString() + '</td>' +
          '<td class="num" style="font-weight:700; color:' + (isAboveCompPpg ? 'var(--green-text)' : 'var(--red-text)') + ';">' +
            (ppg > 0 ? '+' : '') + ppg.toFixed(1) + '%' +
          '</td>' +
          '<td class="num" style="color:var(--primary); font-weight:600;">' + Math.round(lnAvg).toLocaleString() + '</td>' +
          '<td>' +
            '<span class="' + (isAboveLn ? 'badge-above' : 'badge-below') + '">' +
              (isAboveLn ? '▲ +' + vsLnAvg.toFixed(1) + '%' : '▼ ' + vsLnAvg.toFixed(1) + '%') +
            '</span>' +
          '</td>';
        tbody.appendChild(tr);
      });

      if (charts.s2) {
        try { charts.s2.destroy(); } catch (e) {}
      }
      const ctx = document.getElementById('chartSlide2').getContext('2d');
      charts.s2 = new ChartLib(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            { label: '2026 Monthly Avg (Units)', data: avg26Data, backgroundColor: '#1B365D', borderRadius: 4 },
            { label: '2025 Monthly Avg (Units)', data: avg25Data, backgroundColor: '#60A5FA', borderRadius: 4 },
            { label: 'LN AVG 6 2026 (Line Avg/ADM)', data: lnAvgData, backgroundColor: '#F59E0B', borderRadius: 4 }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: { callback: v => v.toLocaleString() },
              title: { display: true, text: 'Monthly Volume (Cans / Month)' }
            },
            y: {
              ticks: { font: { weight: 'bold' } }
            }
          }
        },
        plugins: [horizontalDataLabelsPlugin]
      });
    }

    // SLIDE 3
    function renderSlide3() {
      const p = getChosenPerson();
      document.getElementById('s3TerritoryLabel').innerText = p.dm + ' (' + p.territory + ')';

      const specKeys = ['lf', 'ha', 'ar', 'ac', 'mum'];
      const labels = ['Pediamil LF', 'Pediamil HA', 'Pediamil AR', 'Pediamil AC', 'Pediamum'];

      const avg26Data = [];
      const avg25Data = [];
      const lnAvgData = [];

      const tbody = document.getElementById('tbodySlide3');
      tbody.innerHTML = '';

      specKeys.forEach((key, idx) => {
        const v26 = p.r26[key];
        const v25 = p.r25[key];
        const avg26 = v26 / 6;
        const avg25 = v25 / 12;
        const ppg = avg25 > 0 ? ((avg26 / avg25) - 1) * 100 : 0;
        const lnAvg = compProductMetrics[key].lnAvgAdm;
        const vsLnAvg = ((avg26 / lnAvg) - 1) * 100;

        avg26Data.push(Math.round(avg26));
        avg25Data.push(Math.round(avg25));
        lnAvgData.push(Math.round(lnAvg));

        const isAboveLn = vsLnAvg >= 0;
        const isAboveCompPpg = ppg >= compProductMetrics[key].ppg;

        const tr = document.createElement('tr');
        tr.innerHTML =
          '<td><strong>' + labels[idx] + '</strong></td>' +
          '<td class="num"><strong>' + Math.round(avg26).toLocaleString() + '</strong></td>' +
          '<td class="num">' + Math.round(avg25).toLocaleString() + '</td>' +
          '<td class="num" style="font-weight:700; color:' + (isAboveCompPpg ? 'var(--green-text)' : 'var(--red-text)') + ';">' +
            (ppg > 0 ? '+' : '') + ppg.toFixed(1) + '%' +
          '</td>' +
          '<td class="num" style="color:var(--primary); font-weight:600;">' + Math.round(lnAvg).toLocaleString() + '</td>' +
          '<td>' +
            '<span class="' + (isAboveLn ? 'badge-above' : 'badge-below') + '">' +
              (isAboveLn ? '▲ +' + vsLnAvg.toFixed(1) + '%' : '▼ ' + vsLnAvg.toFixed(1) + '%') +
            '</span>' +
          '</td>';
        tbody.appendChild(tr);
      });

      if (charts.s3) {
        try { charts.s3.destroy(); } catch (e) {}
      }
      const ctx = document.getElementById('chartSlide3').getContext('2d');
      charts.s3 = new ChartLib(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            { label: '2026 Monthly Avg (Units)', data: avg26Data, backgroundColor: '#0D9488', borderRadius: 4 },
            { label: '2025 Monthly Avg (Units)', data: avg25Data, backgroundColor: '#5EEAD4', borderRadius: 4 },
            { label: 'LN AVG 6 2026 (Line Avg/ADM)', data: lnAvgData, backgroundColor: '#F59E0B', borderRadius: 4 }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: { callback: v => v.toLocaleString() },
              title: { display: true, text: 'Monthly Volume (Cans / Month)' }
            },
            y: {
              ticks: { font: { weight: 'bold' } }
            }
          }
        },
        plugins: [horizontalDataLabelsPlugin]
      });
    }

    // SLIDE 4
    function renderSlide4() {
      const p = getChosenPerson();
      const personPpg = p.totalPpg;
      const isAbove = personPpg >= compTotalPpg;
      const gap = Math.abs(personPpg - compTotalPpg);

      document.getElementById('s4PersonTotalPpg').innerText = (personPpg > 0 ? '+' : '') + personPpg.toFixed(2) + '%';
      document.getElementById('s4PersonTotalPpg').style.color = isAbove ? 'var(--green-text)' : 'var(--red-text)';
      document.getElementById('s4ChartTitleText').innerText = p.territory + ' (' + p.dm.split(' ')[0] + '): Volume (Bars) vs PPG% Growth (Markers)';

      const box = document.getElementById('growthHighlightBox');
      const icon = document.getElementById('shapeIcon');
      const title = document.getElementById('shapeTitle');
      const desc = document.getElementById('shapeDesc');

      if (isAbove) {
        box.className = 'shape-highlight shape-green';
        icon.innerText = '🟢';
        title.innerText = 'GROWTH ABOVE COMPANY BENCHMARK (+' + gap.toFixed(2) + '% Ahead of Egypt Average)';
        desc.innerText = p.dm + ' (' + p.territory + ') achieved +' + personPpg.toFixed(1) + '% total PPG growth, outpacing the company benchmark rate (+33.79%). Outstanding commercial momentum.';
      } else {
        box.className = 'shape-highlight shape-red';
        icon.innerText = '🔻';
        title.innerText = 'GROWTH BELOW COMPANY BENCHMARK (-' + gap.toFixed(2) + '% Gap to Egypt Average)';
        desc.innerText = p.dm + ' (' + p.territory + ') recorded +' + personPpg.toFixed(1) + '% growth, trailing the company growth target of +33.79%. Urgent attention and action plan required.';
      }

      const displayProds = [
        { key: 'p1', name: 'Pediamil 1' },
        { key: 'p2', name: 'Pediamil 2' },
        { key: 'ps1', name: 'Pedia-Start 1' },
        { key: 'ps2', name: 'Pedia-Start 2' },
        { key: 'lf', name: 'Pediamil LF' },
        { key: 'ha', name: 'Pediamil HA' },
        { key: 'ar', name: 'Pediamil AR' },
        { key: 'ac', name: 'Pediamil AC' },
        { key: 'mum', name: 'Pediamum' }
      ];

      const labels = displayProds.map(p => p.name);
      const bars25 = [];
      const bars26 = [];
      const ppgPerson = [];
      const ppgCompany = [];

      const tbody = document.getElementById('tbodySlide4');
      tbody.innerHTML = '';

      displayProds.forEach(item => {
        const v26 = p.r26[item.key];
        const v25 = p.r25[item.key];
        const avg26 = v26 / 6;
        const avg25 = v25 / 12;
        const ppg = avg25 > 0 ? ((avg26 / avg25) - 1) * 100 : 0;
        const compPpg = compProductMetrics[item.key].ppg;
        const diffVol = avg26 - avg25;
        const diffPpg = ppg - compPpg;
        const pIsAbove = ppg >= compPpg;

        bars25.push(Math.round(avg25));
        bars26.push(Math.round(avg26));
        ppgPerson.push(Number(ppg.toFixed(1)));
        ppgCompany.push(Number(compPpg.toFixed(1)));

        const tr = document.createElement('tr');
        tr.innerHTML =
          '<td><strong>' + item.name + '</strong></td>' +
          '<td class="num">' + Math.round(avg25).toLocaleString() + '</td>' +
          '<td class="num"><strong>' + Math.round(avg26).toLocaleString() + '</strong></td>' +
          '<td class="num" style="color:' + (diffVol >= 0 ? 'var(--green-text)' : 'var(--red-text)') + '; font-weight:600;">' +
            (diffVol >= 0 ? '+' : '') + Math.round(diffVol).toLocaleString() +
          '</td>' +
          '<td class="num" style="font-weight:700; color:' + (pIsAbove ? 'var(--green-text)' : 'var(--red-text)') + ';">' +
            (ppg > 0 ? '+' : '') + ppg.toFixed(1) + '%' +
          '</td>' +
          '<td class="num" style="color:var(--primary);">' + (compPpg > 0 ? '+' : '') + compPpg.toFixed(1) + '%</td>' +
          '<td class="num" style="font-weight:700; color:' + (pIsAbove ? 'var(--green-text)' : 'var(--red-text)') + ';">' +
            (diffPpg > 0 ? '+' : '') + diffPpg.toFixed(1) + '%' +
          '</td>' +
          '<td>' +
            '<span class="' + (pIsAbove ? 'badge-above' : 'badge-below') + '">' +
              (pIsAbove ? '🟢 Above Company' : '🔻 Below Company') +
            '</span>' +
          '</td>';
        tbody.appendChild(tr);
      });

      const totAvg26 = p.r26.sum / 6;
      const totAvg25 = p.r25.sum / 12;
      const totDiffVol = totAvg26 - totAvg25;
      const totDiffPpg = personPpg - compTotalPpg;

      const totTr = document.createElement('tr');
      totTr.className = 'total-row';
      totTr.innerHTML =
        '<td>Total Units</td>' +
        '<td class="num">' + Math.round(totAvg25).toLocaleString() + '</td>' +
        '<td class="num">' + Math.round(totAvg26).toLocaleString() + '</td>' +
        '<td class="num">' + (totDiffVol >= 0 ? '+' : '') + Math.round(totDiffVol).toLocaleString() + '</td>' +
        '<td class="num">' + (personPpg > 0 ? '+' : '') + personPpg.toFixed(1) + '%</td>' +
        '<td class="num">+' + compTotalPpg.toFixed(1) + '%</td>' +
        '<td class="num">' + (totDiffPpg > 0 ? '+' : '') + totDiffPpg.toFixed(1) + '%</td>' +
        '<td>' +
          '<span class="' + (isAbove ? 'badge-above' : 'badge-below') + '">' +
            (isAbove ? '🟢 Overall Above' : '🔻 Overall Below') +
          '</span>' +
        '</td>';
      tbody.appendChild(totTr);

      if (charts.s4) {
        try { charts.s4.destroy(); } catch (e) {}
      }
      const ctx = document.getElementById('chartSlide4').getContext('2d');
      charts.s4 = new ChartLib(ctx, {
        data: {
          labels: labels,
          datasets: [
            {
              type: 'bar',
              label: '2025 Monthly Avg (Left)',
              data: bars25,
              backgroundColor: '#94A3B8',
              borderRadius: 4,
              yAxisID: 'y'
            },
            {
              type: 'bar',
              label: '2026 Monthly Avg (Left)',
              data: bars26,
              backgroundColor: '#1B365D',
              borderRadius: 4,
              yAxisID: 'y'
            },
            {
              type: 'line',
              label: p.dm.split(' ')[0] + ' PPG% (Right)',
              data: ppgPerson,
              borderColor: isAbove ? '#10B981' : '#EF4444',
              backgroundColor: isAbove ? '#10B981' : '#EF4444',
              pointRadius: 6,
              pointHoverRadius: 8,
              borderWidth: 3,
              yAxisID: 'y1'
            },
            {
              type: 'line',
              label: 'Company Benchmark PPG% (Right)',
              data: ppgCompany,
              borderColor: '#F59E0B',
              backgroundColor: '#F59E0B',
              borderDash: [5, 5],
              pointRadius: 4,
              borderWidth: 2,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' }
          },
          scales: {
            y: {
              type: 'linear',
              position: 'left',
              title: { display: true, text: 'Monthly Average Sales (Cans)' },
              ticks: { callback: v => v.toLocaleString() }
            },
            y1: {
              type: 'linear',
              position: 'right',
              grid: { drawOnChartArea: false },
              title: { display: true, text: 'Growth Rate (PPG%)' },
              ticks: { callback: v => v + '%' }
            }
          }
        }
      });
    }

    // SLIDES 5 TO 9
    function renderRankingSlide(slideNum, chartId, tbodyId, prodKey, prodName, compBenchmark) {
      const tbody = document.getElementById(tbodyId);
      tbody.innerHTML = '';

      const ranking = rawData2026.map((r, i) => {
        const r25 = rawData2025[i];
        let val26, val25;
        if (prodKey === 'total') {
          val26 = r.sum;
          val25 = r25.sum;
        } else {
          val26 = r[prodKey];
          val25 = r25[prodKey];
        }
        const avg26 = val26 / 6;
        const avg25 = val25 / 12;
        const ppg = avg25 > 0 ? ((avg26 / avg25) - 1) * 100 : 0;
        return {
          territory: r.territory,
          dm: r.dm,
          avg26,
          avg25,
          ppg,
          isAbove: ppg >= compBenchmark
        };
      });

      ranking.sort((a, b) => b.ppg - a.ppg);

      const compTr = document.createElement('tr');
      compTr.style.background = '#EFF6FF';
      compTr.style.fontWeight = '800';
      compTr.innerHTML =
        '<td><strong style="color:var(--primary);">TOP</strong></td>' +
        '<td><strong>EGYPT TOTAL (COMPANY)</strong><br><small style="color:var(--text-muted);">National Benchmark</small></td>' +
        '<td class="num">' + Math.round(prodKey === 'total' ? company2025.sum/12 : company2025[prodKey]/12).toLocaleString() + '</td>' +
        '<td class="num">' + Math.round(prodKey === 'total' ? company2026.sum/6 : company2026[prodKey]/6).toLocaleString() + '</td>' +
        '<td class="num" style="color:var(--primary); font-size:13px;">' + (compBenchmark > 0 ? '+' : '') + compBenchmark.toFixed(1) + '%</td>' +
        '<td><span class="badge-above" style="background:#DBEAFE; color:#1E40AF; border-color:#BFDBFE;">BENCHMARK</span></td>';
      tbody.appendChild(compTr);

      const chartLabels = ['COMP: TOTAL EGYPT', ...ranking.map(r => r.territory + ' (' + r.dm.split(' ')[0] + ')')];
      const chartValues = [Number(compBenchmark.toFixed(1)), ...ranking.map(r => Number(r.ppg.toFixed(1)))];
      const chartColors = ['#1B365D', ...ranking.map(r => r.isAbove ? '#10B981' : '#EF4444')];

      ranking.forEach((r, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML =
          '<td><strong>#' + (idx + 1) + '</strong></td>' +
          '<td><strong>' + r.territory + '</strong><br><small style="color:var(--text-muted);">' + r.dm.split(' ').slice(0, 2).join(' ') + '</small></td>' +
          '<td class="num">' + Math.round(r.avg25).toLocaleString() + '</td>' +
          '<td class="num">' + Math.round(r.avg26).toLocaleString() + '</td>' +
          '<td class="num" style="font-weight:700; color:' + (r.isAbove ? 'var(--green-text)' : 'var(--red-text)') + ';">' +
            (r.ppg > 0 ? '+' : '') + r.ppg.toFixed(1) + '%' +
          '</td>' +
          '<td>' +
            '<span class="' + (r.isAbove ? 'badge-above' : 'badge-below') + '">' +
              (r.isAbove ? '🟢 Above Company' : '🔻 Below Company') +
            '</span>' +
          '</td>';
        tbody.appendChild(tr);
      });

      if (charts[chartId]) {
        try { charts[chartId].destroy(); } catch (e) {}
      }
      const ctx = document.getElementById(chartId).getContext('2d');
      charts[chartId] = new ChartLib(ctx, {
        type: 'bar',
        data: {
          labels: chartLabels.slice().reverse(),
          datasets: [{
            label: prodName + ' PPG%',
            data: chartValues.slice().reverse(),
            backgroundColor: chartColors.slice().reverse(),
            borderRadius: 4
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              ticks: { callback: v => v + '%' }
            }
          }
        },
        plugins: [{
          id: 'rankingDataLabels',
          afterDatasetsDraw(chart) {
            try {
              if (!chart || !chart.chartArea) return;
              const { ctx, chartArea: { right, left } } = chart;
              ctx.save();
              ctx.font = 'bold 11px sans-serif';
              ctx.textBaseline = 'middle';
              chart.data.datasets.forEach(dataset => {
                const meta = chart.getDatasetMeta(0);
                if (!meta) return;
                meta.data.forEach((element, i) => {
                  const val = dataset.data[i];
                  if (val === undefined || val === null) return;
                  const text = (val > 0 ? '+' : '') + val.toFixed(1) + '%';
                  const xPos = element.x;
                  const yPos = element.y;
                  const barBase = element.base !== undefined ? element.base : left;
                  const barWidth = Math.abs(xPos - barBase);

                  if (barWidth >= 60) {
                    ctx.textAlign = 'right';
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillText(text, xPos - 8, yPos);
                  } else if (xPos + 55 < right) {
                    ctx.textAlign = 'left';
                    ctx.fillStyle = '#1E293B';
                    ctx.fillText(text, xPos + 6, yPos);
                  }
                });
              });
              ctx.restore();
            } catch (e) {
              console.warn(e);
            }
          }
        }]
      });
    }

    function renderSlide5() {
      renderRankingSlide(5, 'chartSlide5', 'tbodySlide5', 'total', 'Total Unit Sales', compTotalPpg);
    }
    function renderSlide6() {
      renderRankingSlide(6, 'chartSlide6', 'tbodySlide6', 'p1', 'Pediamil 1', compProductMetrics.p1.ppg);
    }
    function renderSlide7() {
      renderRankingSlide(7, 'chartSlide7', 'tbodySlide7', 'p2', 'Pediamil 2', compProductMetrics.p2.ppg);
    }
    function renderSlide8() {
      renderRankingSlide(8, 'chartSlide8', 'tbodySlide8', 'ps1', 'Pedia-Start 1', compProductMetrics.ps1.ppg);
    }
    function renderSlide9() {
      renderRankingSlide(9, 'chartSlide9', 'tbodySlide9', 'ps2', 'Pedia-Start 2', compProductMetrics.ps2.ppg);
    }

    // SLIDE 10
    function renderSlide10() {
      const chosenPerson = getChosenPerson();

      const diagCard = document.getElementById('chosenQuadDiagnosticCard');
      let quadTitle = '';
      let quadStrategy = '';
      let quadBadge = '';

      if (chosenPerson.quad === 'A') {
        quadTitle = 'QUADRANT A: COMPANY STAR 🌟';
        quadBadge = '<span class="badge-above">TOP PERFORMER</span>';
        quadStrategy = '<strong>' + chosenPerson.dm + ' (' + chosenPerson.territory + ')</strong> is positioned firmly in <strong>Quadrant A</strong> with outstanding volume momentum (<strong>+' + chosenPerson.totalPpg.toFixed(1) + '% PPG</strong> vs. Company +33.8%) and a positive contribution gain (<strong>+' + chosenPerson.contrDiff.toFixed(2) + '%</strong>).<br><strong>Commercial Mandate:</strong> Defend market share against competitor detailing, secure neonatal intensive care listings for Pedia-Start & LBW, and drive multi-can specialty pharmacy bundling.';
      } else if (chosenPerson.quad === 'B') {
        quadTitle = 'QUADRANT B: HIGH-GROWTH CHALLENGER 🚀';
        quadBadge = '<span class="badge-above" style="background:#DBEAFE; color:#1E40AF; border-color:#BFDBFE;">HIGH MOMENTUM</span>';
        quadStrategy = '<strong>' + chosenPerson.dm + ' (' + chosenPerson.territory + ')</strong> is positioned in <strong>Quadrant B</strong>, generating high growth of <strong>+' + chosenPerson.totalPpg.toFixed(1) + '% PPG</strong> (exceeding company pace) while working to close an initial potential gap (<strong>' + chosenPerson.contrDiff.toFixed(2) + '%</strong> vs. GEO share).<br><strong>Commercial Mandate:</strong> Capitalize on strong prescription velocity. Prioritize hospital tender listings and key chain pharmacy coverage to fully unlock geographic potential.';
      } else if (chosenPerson.quad === 'C') {
        quadTitle = 'QUADRANT C: VOLUME PILLAR & SHARE KEEPER 🛡️';
        quadBadge = '<span class="badge-above" style="background:#FEF3C7; color:#92400E; border-color:#FDE68A;">CORE BASELINE</span>';
        quadStrategy = '<strong>' + chosenPerson.dm + ' (' + chosenPerson.territory + ')</strong> is positioned in <strong>Quadrant C</strong> (Volume Pillars), delivering strong baseline share exceeding geographic potential (<strong>+' + chosenPerson.contrDiff.toFixed(2) + '%</strong>), but running at a moderate growth pace (<strong>+' + chosenPerson.totalPpg.toFixed(1) + '% PPG</strong> vs. Company +33.8%).<br><strong>Commercial Mandate:</strong> Accelerate growth rate back above national benchmark (+33.8%). Drive high-growth stage-2 formulas (Pediamil 2 & Pedia-Start 2) and high-margin specialty lines (Pediamil AC & LF).';
      } else {
        quadTitle = 'QUADRANT D: LOWEST PERFORMERS / CRITICAL ATTENTION ⚠️';
        quadBadge = '<span class="badge-below">CRITICAL LAGGARD</span>';
        quadStrategy = '<strong>' + chosenPerson.dm + ' (' + chosenPerson.territory + ')</strong> is in <strong>Quadrant D</strong> (Lowest Performers), experiencing sub-benchmark growth (<strong>+' + chosenPerson.totalPpg.toFixed(1) + '% PPG</strong> vs. +33.8%) alongside a severe contribution share gap (<strong>' + chosenPerson.contrDiff.toFixed(2) + '%</strong> vs. GEO share).<br><strong>Commercial Mandate:</strong> Immediate review with Commercial Director. Audit medical rep call frequency, re-align territory brick targets, and execute urgent pediatric symposiums to reverse competitor conversion.';
      }

      diagCard.innerHTML =
        '<div style="display:flex; justify-content:space-between; align-items:center;">' +
          '<h3>🎯 SELECTED ADM DIAGNOSTIC: ' + chosenPerson.dm.toUpperCase() + ' (' + chosenPerson.territory.toUpperCase() + ')</h3>' +
          quadBadge +
        '</div>' +
        '<p style="margin-top:6px;"><strong>Strategic Classification:</strong> ' + quadTitle + '</p>' +
        '<p style="margin-top:4px;"><strong>Performance Coordinates:</strong> X (Contribution Diff) = <strong>' + (chosenPerson.contrDiff > 0 ? '+' : '') + chosenPerson.contrDiff.toFixed(2) + '%</strong> | Y (Total PPG) = <strong>+' + chosenPerson.totalPpg.toFixed(1) + '%</strong> | YTD Sales = <strong>' + chosenPerson.r26.sum.toLocaleString() + ' cans</strong></p>' +
        '<p style="margin-top:8px; border-top:1px dashed #C4B5FD; padding-top:6px;">' + quadStrategy + '</p>';

      const regularBubbles = [];
      let chosenBubble = null;

      rawData2026.forEach((r, i) => {
        const r25 = rawData2025[i];
        const avg26 = r.sum / 6;
        const avg25 = r25.sum / 12;
        const ppg = ((avg26 / avg25) - 1) * 100;
        const x = r.contrDiff * 100;
        const y = ppg;
        const radius = 9 + (r.sum / 136700) * 18;
        const isSelected = i === chosenPerson.idx;

        let color = '#10B981';
        let quadName = 'Quadrant A (Stars)';
        if (x < 0 && y >= compTotalPpg) {
          color = '#3B82F6';
          quadName = 'Quadrant B (Challengers)';
        } else if (x >= 0 && y < compTotalPpg) {
          color = '#F59E0B';
          quadName = 'Quadrant C (Volume Pillars)';
        } else if (x < 0 && y < compTotalPpg) {
          color = '#EF4444';
          quadName = 'Quadrant D (Lowest Performers)';
        }

        const point = {
          x: Number(x.toFixed(2)),
          y: Number(y.toFixed(2)),
          r: radius,
          territory: r.territory,
          dm: r.dm,
          sales: r.sum,
          quadName,
          isSelected
        };

        if (isSelected) {
          chosenBubble = point;
        } else {
          regularBubbles.push(point);
        }
      });

      if (charts.s10) {
        try { charts.s10.destroy(); } catch (e) {}
      }
      const ctx = document.getElementById('chartSlide10').getContext('2d');
      charts.s10 = new ChartLib(ctx, {
        type: 'bubble',
        data: {
          datasets: [
            {
              label: 'Other Territories',
              data: regularBubbles,
              backgroundColor: regularBubbles.map(b => {
                if (b.x >= 0 && b.y >= compTotalPpg) return 'rgba(16, 185, 129, 0.65)';
                if (b.x < 0 && b.y >= compTotalPpg) return 'rgba(59, 130, 246, 0.65)';
                if (b.x >= 0 && b.y < compTotalPpg) return 'rgba(245, 158, 11, 0.65)';
                return 'rgba(239, 68, 68, 0.65)';
              }),
              borderColor: regularBubbles.map(b => {
                if (b.x >= 0 && b.y >= compTotalPpg) return '#059669';
                if (b.x < 0 && b.y >= compTotalPpg) return '#2563EB';
                if (b.x >= 0 && b.y < compTotalPpg) return '#D97706';
                return '#DC2626';
              }),
              borderWidth: 1.5
            },
            {
              label: 'Selected ADM (Focus)',
              data: chosenBubble ? [chosenBubble] : [],
              backgroundColor: '#8B5CF6',
              borderColor: '#4C1D95',
              borderWidth: 3.5,
              hoverBorderWidth: 5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                generateLabels: () => [
                  { text: '⭐ Selected ADM: ' + chosenPerson.dm.split(' ')[0] + ' (' + chosenPerson.territory + ')', fillStyle: '#8B5CF6', strokeStyle: '#4C1D95', lineWidth: 2 },
                  { text: 'Quadrant A (Stars)', fillStyle: '#10B981' },
                  { text: 'Quadrant B (Challengers)', fillStyle: '#3B82F6' },
                  { text: 'Quadrant C (Volume Pillars)', fillStyle: '#F59E0B' },
                  { text: 'Quadrant D (Lowest Performers)', fillStyle: '#EF4444' }
                ]
              }
            },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const d = ctx.raw;
                  return [
                    (d.isSelected ? '⭐ SELECTED: ' : '') + d.territory + ' (' + d.dm.split(' ')[0] + ')',
                    '• Quadrant: ' + d.quadName,
                    '• PPG Growth: +' + d.y + '% (vs Co. ' + compTotalPpg.toFixed(1) + '%)',
                    '• Contr. Diff: ' + (d.x > 0 ? '+' : '') + d.x + '% (vs 0% baseline)',
                    '• YTD Sales: ' + d.sales.toLocaleString() + ' cans'
                  ];
                }
              }
            }
          },
          scales: {
            x: {
              min: -10,
              max: 9,
              title: { display: true, text: 'Contribution Index Difference % (Vertical Crosshair at 0.00% Baseline)' },
              ticks: { callback: v => v + '%' }
            },
            y: {
              min: 0,
              max: 70,
              title: { display: true, text: 'Total PPG Growth % (Horizontal Intercept at Company PPG +33.79%)' },
              ticks: { callback: v => v + '%' }
            }
          }
        },
        plugins: [
          quadrantCrosshairPlugin,
          {
            id: 'chosenCalloutLabel',
            afterDatasetsDraw(chart) {
              try {
                if (!chart) return;
                const { ctx } = chart;
                const meta = chart.getDatasetMeta(1);
                if (meta && meta.data && meta.data[0]) {
                  const pt = meta.data[0];
                  const radius = pt.options && pt.options.radius ? pt.options.radius : 15;
                  ctx.save();
                  ctx.font = 'bold 12px sans-serif';
                  ctx.fillStyle = '#4C1D95';
                  ctx.textAlign = 'center';
                  ctx.fillText('★ ' + chosenPerson.dm.split(' ')[0] + ' (' + chosenPerson.territory + ')', pt.x, pt.y - radius - 8);
                  ctx.restore();
                }
              } catch (e) {
                console.warn(e);
              }
            }
          }
        ]
      });
    }

    /* ==========================================================================
       DATA EDITOR & MODEL UPDATE SYSTEM
       ========================================================================== */
    let tempEditData2026 = [];
    let tempEditData2025 = [];
    let editorActiveTab = '2026';

    const skuFields = [
      { key: 'p1', name: 'Pediamil 1' },
      { key: 'p2', name: 'Pediamil 2' },
      { key: 'pg3', name: 'PG3' },
      { key: 'lf', name: 'LF' },
      { key: 'ha', name: 'HA' },
      { key: 'ar', name: 'AR' },
      { key: 'ac', name: 'AC' },
      { key: 'mum', name: 'Mum' },
      { key: 'ps1', name: 'P-Start 1' },
      { key: 'ps2', name: 'P-Start 2' },
      { key: 'lbw', name: 'LBW' }
    ];

    function openDataEditor() {
      tempEditData2026 = JSON.parse(JSON.stringify(rawData2026));
      tempEditData2025 = JSON.parse(JSON.stringify(rawData2025));
      editorActiveTab = '2026';
      switchEditorTab('2026');
      const backdrop = document.getElementById('dataEditorBackdrop');
      if (backdrop) backdrop.classList.add('open');
    }

    function closeDataEditor() {
      const backdrop = document.getElementById('dataEditorBackdrop');
      if (backdrop) backdrop.classList.remove('open');
    }

    function switchEditorTab(tabKey) {
      editorActiveTab = tabKey;
      ['2026', '2025', 'meta', 'json'].forEach(k => {
        const btn = document.getElementById('modalTab' + (k.charAt(0).toUpperCase() + k.slice(1)));
        if (btn) btn.classList.toggle('active', k === tabKey);
      });
      renderEditorBody();
    }

    function renderEditorBody() {
      const container = document.getElementById('dataModalBody');
      if (!container) return;

      if (editorActiveTab === '2026' || editorActiveTab === '2025') {
        const yr = editorActiveTab;
        const dataset = (yr === '2026') ? tempEditData2026 : tempEditData2025;
        const divisor = (yr === '2026') ? 6 : 12;

        let thHtml = '<th>#</th><th>Territory</th><th>Manager (ADM)</th>';
        skuFields.forEach(f => {
          thHtml += '<th>' + f.name + '</th>';
        });
        thHtml += '<th style="background:#E2E8F0;">Total Vol</th><th style="background:#E2E8F0;">M. Avg</th>';

        let rowsHtml = '';
        dataset.forEach((r, idx) => {
          const rowSum = calculateRowSum(r);
          r.sum = rowSum;
          const rowAvg = rowSum / divisor;

          let skuInputs = '';
          skuFields.forEach(f => {
            const val = r[f.key] !== undefined ? r[f.key] : 0;
            skuInputs +=
              '<td>' +
                '<input type="number" min="0" value="' + val + '" ' +
                  'oninput="onEditorCellChange(&quot;' + yr + '&quot;, ' + idx + ', &quot;' + f.key + '&quot;, this.value)">' +
              '</td>';
          });

          rowsHtml +=
            '<tr>' +
              '<td><strong>' + (idx + 1) + '</strong></td>' +
              '<td><strong>' + r.territory + '</strong></td>' +
              '<td><small>' + (r.dm ? r.dm.split(' ').slice(0, 2).join(' ') : '') + '</small></td>' +
              skuInputs +
              '<td class="num" style="font-weight:700;" id="calc-' + yr + '-total-' + idx + '">' + Math.round(rowSum).toLocaleString() + '</td>' +
              '<td class="num" style="font-weight:700; color:var(--primary);" id="calc-' + yr + '-avg-' + idx + '">' + Math.round(rowAvg).toLocaleString() + '</td>' +
            '</tr>';
        });

        // Totals Footer Row
        let footerCols = '';
        let compSum = 0;
        skuFields.forEach(f => {
          let colSum = 0;
          dataset.forEach(r => { colSum += (Number(r[f.key]) || 0); });
          compSum += colSum;
          footerCols += '<td class="num" id="calc-' + yr + '-col-' + f.key + '">' + Math.round(colSum).toLocaleString() + '</td>';
        });

        const footerRow =
          '<tr class="total-calc-row">' +
            '<td colspan="3"><strong>TOTAL EGYPT (COMPANY)</strong></td>' +
            footerCols +
            '<td class="num" id="calc-' + yr + '-comp-total">' + Math.round(compSum).toLocaleString() + '</td>' +
            '<td class="num" id="calc-' + yr + '-comp-avg">' + Math.round(compSum / divisor).toLocaleString() + '</td>' +
          '</tr>';

        container.innerHTML =
          '<div style="margin-bottom:10px; font-size:12px; color:var(--text-muted); display:flex; justify-content:space-between; align-items:center;">' +
            '<span>Editing <strong>' + (yr === '2026' ? '2026 YTD June Actuals (6 Months)' : '2025 Full-Year Actuals (12 Months)') + '</strong>. Row totals and company benchmarks recalculate dynamically as you type.</span>' +
            '<span style="font-weight:700; color:var(--primary);">Divisor: ' + divisor + ' months</span>' +
          '</div>' +
          '<table class="data-edit-table">' +
            '<thead><tr>' + thHtml + '</tr></thead>' +
            '<tbody>' + rowsHtml + footerRow + '</tbody>' +
          '</table>';
      } else if (editorActiveTab === 'meta') {
        let rowsHtml = '';
        tempEditData2026.forEach((r, idx) => {
          const geoPct = (r.geoShare ? r.geoShare * 100 : 0).toFixed(2);
          rowsHtml +=
            '<tr>' +
              '<td><strong>' + (idx + 1) + '</strong></td>' +
              '<td>' +
                '<input type="text" value="' + r.territory + '" ' +
                  'oninput="tempEditData2026[' + idx + '].territory = this.value; if(tempEditData2025[' + idx + ']) tempEditData2025[' + idx + '].territory = this.value;">' +
              '</td>' +
              '<td>' +
                '<input type="text" value="' + r.dm + '" ' +
                  'oninput="tempEditData2026[' + idx + '].dm = this.value; if(tempEditData2025[' + idx + ']) tempEditData2025[' + idx + '].dm = this.value;">' +
              '</td>' +
              '<td>' +
                '<input type="number" step="0.01" min="0" max="100" value="' + geoPct + '" ' +
                  'oninput="tempEditData2026[' + idx + '].geoShare = (parseFloat(this.value) || 0) / 100;">' +
              '</td>' +
            '</tr>';
        });

        container.innerHTML =
          '<div style="margin-bottom:10px; font-size:12px; color:var(--text-muted);">' +
            'Customize territory names, assigned Assistant District Managers, and territorial Geo Share % potential.' +
          '</div>' +
          '<table class="data-edit-table" style="max-width:850px;">' +
            '<thead>' +
              '<tr>' +
                '<th style="width:40px;">#</th>' +
                '<th style="width:200px;">Territory Name</th>' +
                '<th>Manager (ADM) Name</th>' +
                '<th style="width:160px;">Geo Share % (2025 Market Potential)</th>' +
              '</tr>' +
            '</thead>' +
            '<tbody>' + rowsHtml + '</tbody>' +
          '</table>';
      } else if (editorActiveTab === 'json') {
        const fullPayload = {
          exportDate: new Date().toISOString(),
          data2026: tempEditData2026,
          data2025: tempEditData2025
        };
        const jsonStr = JSON.stringify(fullPayload, null, 2);

        container.innerHTML =
          '<div style="display:flex; flex-direction:column; gap:12px;">' +
            '<div style="font-size:12.5px; color:var(--text-muted);">' +
              'Export current model numbers to JSON or paste a new JSON dataset below to update the entire review template instantly.' +
            '</div>' +
            '<textarea id="jsonEditorArea" style="width:100%; height:320px; font-family:monospace; font-size:12px; padding:12px; border:1px solid #CBD5E1; border-radius:8px; resize:vertical;">' + jsonStr + '</textarea>' +
            '<div style="display:flex; gap:10px;">' +
              '<button class="nav-btn" style="background:#1B365D; color:white;" onclick="copyJsonToClipboard()">📋 Copy JSON to Clipboard</button>' +
              '<button class="nav-btn" style="background:#0D9488; color:white;" onclick="importJsonFromTextarea()">📥 Load Pasted JSON into Model</button>' +
            '</div>' +
          '</div>';
      }
    }

    function onEditorCellChange(year, rowIndex, field, value) {
      const val = parseFloat(value) || 0;
      const dataset = (year === '2026') ? tempEditData2026 : tempEditData2025;
      if (!dataset || !dataset[rowIndex]) return;
      dataset[rowIndex][field] = val;

      const rowSum = calculateRowSum(dataset[rowIndex]);
      dataset[rowIndex].sum = rowSum;
      const divisor = (year === '2026') ? 6 : 12;
      const rowAvg = rowSum / divisor;

      const totalCell = document.getElementById('calc-' + year + '-total-' + rowIndex);
      if (totalCell) totalCell.innerText = Math.round(rowSum).toLocaleString();

      const avgCell = document.getElementById('calc-' + year + '-avg-' + rowIndex);
      if (avgCell) avgCell.innerText = Math.round(rowAvg).toLocaleString();

      updateEditorColumnSums(year);
    }

    function updateEditorColumnSums(year) {
      const dataset = (year === '2026') ? tempEditData2026 : tempEditData2025;
      const divisor = (year === '2026') ? 6 : 12;
      let compSum = 0;

      skuFields.forEach(f => {
        let colSum = 0;
        dataset.forEach(r => { colSum += (Number(r[f.key]) || 0); });
        compSum += colSum;
        const colCell = document.getElementById('calc-' + year + '-col-' + f.key);
        if (colCell) colCell.innerText = Math.round(colSum).toLocaleString();
      });

      const compTotalCell = document.getElementById('calc-' + year + '-comp-total');
      if (compTotalCell) compTotalCell.innerText = Math.round(compSum).toLocaleString();

      const compAvgCell = document.getElementById('calc-' + year + '-comp-avg');
      if (compAvgCell) compAvgCell.innerText = Math.round(compSum / divisor).toLocaleString();
    }

    function applyDataEditorChanges() {
      rawData2026 = JSON.parse(JSON.stringify(tempEditData2026));
      rawData2025 = JSON.parse(JSON.stringify(tempEditData2025));

      try {
        localStorage.setItem('egy_nutri_data_2026', JSON.stringify(rawData2026));
        localStorage.setItem('egy_nutri_data_2025', JSON.stringify(rawData2025));
      } catch (e) {
        console.warn('localStorage save error:', e);
      }

      recalculateAllModelData();
      renderSlide(currentSlide);
      closeDataEditor();
      showToast('✅ Sales data saved & recalculated! All 10 slides and charts updated.', '✅');
    }

    function resetDataToBaseline() {
      if (!confirm('Are you sure you want to reset all data back to factory baseline figures?')) return;
      try {
        localStorage.removeItem('egy_nutri_data_2026');
        localStorage.removeItem('egy_nutri_data_2025');
      } catch (e) {}

      rawData2026 = JSON.parse(JSON.stringify(DEFAULT_DATA_2026));
      rawData2025 = JSON.parse(JSON.stringify(DEFAULT_DATA_2025));
      tempEditData2026 = JSON.parse(JSON.stringify(rawData2026));
      tempEditData2025 = JSON.parse(JSON.stringify(rawData2025));

      recalculateAllModelData();
      renderEditorBody();
      renderSlide(currentSlide);
      showToast('🔄 Restored verified factory baseline data.', '🔄');
    }

    function exportDataToJson() {
      const exportPayload = {
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        data2026: rawData2026,
        data2025: rawData2025
      };
      const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Egy_Nutri_Sales_Data_' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('📥 Data exported successfully to JSON.', '📥');
    }

    function copyJsonToClipboard() {
      const area = document.getElementById('jsonEditorArea');
      if (!area) return;
      area.select();
      navigator.clipboard.writeText(area.value).then(() => {
        showToast('📋 JSON copied to clipboard!', '📋');
      }).catch(() => {
        document.execCommand('copy');
        showToast('📋 JSON copied to clipboard!', '📋');
      });
    }

    function importJsonFromTextarea() {
      const area = document.getElementById('jsonEditorArea');
      if (!area) return;
      try {
        const parsed = JSON.parse(area.value);
        if (parsed.data2026 && Array.isArray(parsed.data2026)) {
          tempEditData2026 = parsed.data2026;
        } else if (Array.isArray(parsed)) {
          tempEditData2026 = parsed;
        }
        if (parsed.data2025 && Array.isArray(parsed.data2025)) {
          tempEditData2025 = parsed.data2025;
        }
        showToast('📥 JSON loaded into editor. Click Save to apply.', '📥');
        switchEditorTab('2026');
      } catch (err) {
        alert('Invalid JSON format: ' + err.message);
      }
    }

    /* Toast Notification Controller */
    let toastTimeout = null;
    function showToast(msg, icon = '✅') {
      const toast = document.getElementById('toastNotification');
      const iconSpan = document.getElementById('toastIcon');
      const textSpan = document.getElementById('toastText');
      if (!toast) return;

      if (iconSpan) iconSpan.innerText = icon;
      if (textSpan) textSpan.innerText = msg;

      toast.style.display = 'flex';
      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.style.display = 'none';
      }, 3500);
    }

    window.addEventListener('DOMContentLoaded', () => {
      initSlideTabs();
      recalculateAllModelData();
      renderSlideOutline();
      goToSlide(1);
    });
  </script>
</body>
</html>
`;

const distDir = path.join(__dirname, 'public');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const htmlPath = path.join(__dirname, 'Egy_Nutri_Business_Review.html');
const indexPath = path.join(__dirname, 'index.html');
const publicHtmlPath = path.join(distDir, 'Egy_Nutri_Business_Review.html');
const publicIndexPath = path.join(distDir, 'index.html');

fs.writeFileSync(htmlPath, htmlTemplate, 'utf8');
fs.writeFileSync(indexPath, htmlTemplate, 'utf8');
fs.writeFileSync(publicHtmlPath, htmlTemplate, 'utf8');
fs.writeFileSync(publicIndexPath, htmlTemplate, 'utf8');
console.log('Final standalone HTML successfully built and written to root and public/ directory!');
