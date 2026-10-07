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

    /* Top App Header - Ultra-Slim & Compact */
    header {
      background: linear-gradient(135deg, var(--primary) 0%, #0F172A 100%);
      color: white;
      padding: 6px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 46px;
      box-sizing: border-box;
      box-shadow: 0 2px 4px rgba(0,0,0,0.12);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .brand-area {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    .brand-badge {
      background: var(--gold);
      color: #78350F;
      font-weight: 800;
      font-size: 11px;
      padding: 3px 7px;
      border-radius: 4px;
      letter-spacing: 0.5px;
    }

    .brand-title-compact {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: -0.2px;
      color: #F8FAFC;
      white-space: nowrap;
    }

    .header-center-selector {
      display: flex;
      align-items: center;
      flex: 1;
      max-width: 440px;
      margin: 0 12px;
    }

    .adm-selector-box {
      display: flex;
      align-items: center;
      background: rgba(255,255,255,0.18);
      border: 1px solid rgba(255,255,255,0.3);
      padding: 2px 8px;
      border-radius: 6px;
      width: 100%;
    }

    .adm-selector-box .adm-icon {
      font-size: 13px;
      margin-right: 6px;
      opacity: 0.85;
    }

    .adm-selector-box select {
      background: #FFFFFF;
      color: var(--primary);
      border: none;
      padding: 4px 8px;
      font-size: 12.5px;
      font-weight: 700;
      border-radius: 4px;
      cursor: pointer;
      outline: none;
      width: 100%;
      height: 30px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.15);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .nav-btn-compact {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.25);
      color: white;
      padding: 4px 9px;
      border-radius: 5px;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      height: 30px;
      transition: all 0.15s ease;
      white-space: nowrap;
      text-decoration: none;
    }

    .nav-btn-compact:hover {
      background: rgba(255,255,255,0.25);
      border-color: rgba(255,255,255,0.4);
    }

    /* Export Dropdown */
    .export-dropdown {
      position: relative;
      display: inline-block;
    }

    .export-menu {
      display: none;
      position: absolute;
      right: 0;
      top: 100%;
      margin-top: 4px;
      background: white;
      border: 1px solid var(--border);
      border-radius: 6px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      min-width: 190px;
      z-index: 1000;
      padding: 4px 0;
    }

    .export-menu.show {
      display: block;
    }

    .export-menu a, .export-menu button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      color: var(--text-main);
      font-size: 12px;
      font-weight: 600;
      text-decoration: none;
      background: none;
      border: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
    }

    .export-menu a:hover, .export-menu button:hover {
      background: #F1F5F9;
      color: var(--primary);
    }

    /* Subheader Tabs - Ultra Slim & Sticky */
    .slide-tabs {
      background: #FFFFFF;
      border-bottom: 1px solid var(--border);
      display: flex;
      overflow-x: auto;
      padding: 0 12px;
      gap: 3px;
      position: sticky;
      top: 46px;
      height: 34px;
      align-items: center;
      z-index: 90;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .slide-tabs::-webkit-scrollbar {
      display: none;
    }

    .tab-btn {
      padding: 4px 9px;
      border: none;
      background: transparent;
      font-size: 11.5px;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      white-space: nowrap;
      border-radius: 4px;
      transition: all 0.15s;
      height: 26px;
      display: inline-flex;
      align-items: center;
    }

    .tab-btn:hover {
      color: var(--primary);
      background: #F1F5F9;
    }

    .tab-btn.active {
      color: white;
      background: var(--primary);
      font-weight: 700;
    }

    /* Main Container - Compact Padding */
    main {
      flex: 1;
      padding: 10px 16px 24px 16px;
      max-width: 1600px;
      margin: 0 auto;
      width: 100%;
    }

    .slide-container {
      display: none;
    }

    .slide-container.active {
      display: block;
    }

    /* Slide Header - Sleek 1-Row Banner */
    .slide-header {
      background: white;
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid var(--border);
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 38px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }

    .slide-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .slide-header-left h2 {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--primary);
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
    }

    .slide-badge {
      background: var(--primary);
      color: white;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 3px;
      font-weight: 800;
    }

    .slide-header-left p {
      display: none; /* Hide multi-line descriptions to let analysis be the hero */
    }

    .kpi-pills {
      display: flex;
      gap: 8px;
    }

    .kpi-pill {
      background: #F1F5F9;
      padding: 3px 8px;
      border-radius: 5px;
      text-align: right;
    }

    .kpi-pill span {
      display: block;
      font-size: 9px;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 700;
    }

    .kpi-pill strong {
      font-size: 12.5px;
      color: var(--primary);
      line-height: 1.1;
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
      top: 80px;
      z-index: 80;
      background: white;
      border-radius: 8px;
      border: 1px solid var(--border);
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      padding: 10px 14px;
      margin-bottom: 12px;
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
      background: #0F172A;
      border-top: 1px solid rgba(255,255,255,0.1);
      padding: 6px 16px;
      font-size: 11px;
      color: #94A3B8;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
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

    /* Table Horizontal Scroll with Frozen Territory Column */
    .data-table-wrapper {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      position: relative;
      max-width: 100%;
      border-radius: 8px;
    }

    .data-table-wrapper table {
      min-width: 580px;
      border-collapse: separate;
      border-spacing: 0;
    }

    .data-table-wrapper table th:first-child,
    .data-table-wrapper table td:first-child {
      position: sticky;
      left: 0;
      background: #FFFFFF;
      z-index: 2;
      box-shadow: 2px 0 5px rgba(0,0,0,0.06);
    }

    .data-table-wrapper table thead th:first-child {
      background: #F1F5F9;
      z-index: 3;
    }

    .data-table-wrapper table tr.chosen-row td:first-child {
      background: #EDE9FE;
    }

    .data-table-wrapper table tr.company-top-row td:first-child {
      background: #1B365D;
      color: white;
    }

    .data-table-wrapper table tr:hover td:first-child {
      background: #F8FAFC;
    }

    /* Mobile Bottom Navigation Bar */
    .mobile-bottom-bar {
      display: none;
    }

    /* Drag & Drop Overlay */
    .drag-drop-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(8px);
      z-index: 5000;
      display: none;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    .drag-drop-overlay.active {
      display: flex;
    }

    .drag-drop-box {
      background: white;
      border: 3px dashed #2563EB;
      border-radius: 16px;
      padding: 36px 28px;
      text-align: center;
      max-width: 460px;
      width: 90vw;
      box-shadow: 0 25px 60px rgba(0,0,0,0.5);
      animation: modalFadeIn 0.2s ease-out;
    }

    .drag-drop-box h3 {
      font-size: 19px;
      color: var(--primary);
      margin-top: 14px;
      font-weight: 800;
    }

    .drag-drop-box p {
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 6px;
      line-height: 1.5;
    }

    /* Tablet & Medium Screens */
    @media (max-width: 1024px) {
      .grid-2 {
        grid-template-columns: 1fr;
      }
      .controls-area {
        flex-wrap: wrap;
      }
      .quadrant-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    /* Mobile Phone Responsive Rules (< 768px) - Maximum Screen Area for Analysis */
    @media (max-width: 768px) {
      header {
        height: 44px;
        padding: 4px 10px;
        gap: 8px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .brand-area {
        gap: 6px;
      }

      .brand-title-compact {
        display: none; /* Hide subtitle text on tiny mobile headers to save space */
      }

      .header-center-selector {
        margin: 0;
        max-width: 100%;
        flex: 1;
      }

      .adm-selector-box {
        padding: 1px 4px;
      }

      .adm-selector-box select {
        font-size: 12px;
        height: 30px;
        padding: 2px 4px;
      }

      .header-actions {
        display: none !important; /* Actions available in sticky bottom bar */
      }

      .desktop-only-controls {
        display: none !important;
      }

      .slide-tabs {
        top: 44px;
        height: 32px;
        padding: 0 6px;
        gap: 3px;
        background: #F8FAFC;
        border-bottom: 1px solid var(--border);
        -webkit-overflow-scrolling: touch;
      }

      .tab-btn {
        padding: 3px 8px;
        font-size: 10.5px;
        height: 24px;
        border-radius: 4px;
      }

      main {
        padding: 6px 8px 65px 8px !important;
      }

      .slide-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 4px 8px;
        margin-bottom: 8px;
        min-height: 32px;
      }

      .slide-header-left h2 {
        font-size: 11.5px;
        margin: 0;
      }

      .slide-badge {
        font-size: 9px;
        padding: 2px 5px;
      }

      .slide-header-left p {
        display: none !important;
      }

      .kpi-pills {
        gap: 4px;
      }

      .kpi-pill {
        padding: 2px 6px;
      }

      .kpi-pill span {
        font-size: 8px;
      }

      .kpi-pill strong {
        font-size: 11px;
      }

      .card {
        padding: 8px 10px;
        border-radius: 6px;
      }

      .card-title {
        font-size: 12px;
        margin-bottom: 6px;
        padding-bottom: 4px;
      }

      /* Slide 4 Frozen Chart becomes static on mobile to avoid covering screen */
      .sticky-chart-wrapper {
        position: static !important;
        padding: 10px 8px;
        margin-bottom: 10px;
        top: auto;
      }

      .chart-box {
        height: 260px !important;
      }

      .chart-box-tall {
        height: 310px !important;
      }

      /* Tables on Mobile */
      .data-table-wrapper {
        max-height: 340px;
      }

      table {
        font-size: 11px;
      }

      th, td {
        padding: 5px 6px;
      }

      /* Quadrant Matrix on mobile */
      .quadrant-grid {
        grid-template-columns: 1fr;
        gap: 8px;
      }

      /* Hide redundant desktop footer on mobile */
      footer {
        display: none !important;
      }

      /* Mobile Bottom Navigation Bar */
      .mobile-bottom-bar {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 48px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(14px);
        border-top: 1px solid rgba(255,255,255,0.15);
        z-index: 1500;
        align-items: center;
        justify-content: space-around;
        padding: 0 4px;
        box-shadow: 0 -4px 16px rgba(0,0,0,0.3);
      }

      .mob-nav-btn {
        background: transparent;
        border: none;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1px;
        padding: 3px 6px;
        font-size: 9.5px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 4px;
        min-width: 40px;
        transition: background 0.15s;
      }

      .mob-nav-btn:active {
        background: rgba(255,255,255,0.2);
      }

      .mob-nav-btn .mob-icon {
        font-size: 15px;
        line-height: 1;
      }

      .mob-counter-pill {
        background: rgba(255,255,255,0.12);
        border: 1px solid rgba(255,255,255,0.25);
        color: #38BDF8;
        padding: 6px 10px;
        border-radius: 16px;
        font-size: 11px;
        font-weight: 800;
        cursor: pointer;
        white-space: nowrap;
      }

      /* Outline Drawer on small screen */
      .outline-drawer {
        width: 85vw;
        max-width: 340px;
      }

      /* Fullscreen Data Editor Modal on Mobile */
      .modal-backdrop {
        padding: 0;
      }

      .data-modal {
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        border-radius: 0;
      }

      .data-modal-header {
        padding: 12px 14px;
      }

      .data-modal-header h2 {
        font-size: 14.5px;
      }

      .data-modal-tabs {
        padding: 0 8px;
      }

      .modal-tab-btn {
        padding: 10px 12px;
        font-size: 11.5px;
      }

      .data-modal-body {
        padding: 10px;
      }

      .data-modal-footer {
        padding: 10px 14px;
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
      }

      .footer-left-btns, .footer-right-btns {
        width: 100%;
        flex-wrap: wrap;
        gap: 6px;
      }

      .footer-left-btns button, .footer-right-btns button {
        flex: 1;
        min-width: 120px;
        justify-content: center;
        padding: 8px 10px;
        font-size: 11.5px;
      }
    }

    @media print {
      header, .slide-tabs, footer, .controls-area, .mobile-bottom-bar, .fullscreen-hud {
        display: none !important;
      }
      .slide-container {
        display: block !important;
        page-break-after: always;
      }
      main {
        padding: 0 !important;
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

  <!-- App Header - Ultra-Slim Single Row -->
  <header>
    <div class="brand-area">
      <div class="brand-badge">EGY NUTRI.</div>
      <span class="brand-title-compact">COMMERCIAL REVIEW</span>
    </div>

    <div class="header-center-selector">
      <div class="adm-selector-box">
        <span class="adm-icon">👤</span>
        <select id="chosenAdmSelect" onchange="onPersonChange()">
          <option value="0">Ahmed Hassan (Alx)</option>
          <option value="1">Ahmed Mohamed Sakr (Behera &amp; Dakahlia)</option>
          <option value="2">NOHER ADEL (Cairo)</option>
          <option value="3">Youstina Farag Allah (Guiza)</option>
          <option value="4">Shimaa Tarek El-Shamy (DELTA I)</option>
          <option value="5">Mohamed Yousef M. (Delta II)</option>
          <option value="6">UE North (Upper Egypt I)</option>
          <option value="7" selected>Beshoy Youhanna (Upper Egypt II)</option>
          <option value="8">Karim Shehab (KFR EL.SHK)</option>
        </select>
      </div>
    </div>

    <div class="header-actions">
      <button class="nav-btn-compact" id="btnUploadCsvTop" onclick="triggerCsvUpload()" title="Upload CSV">📁 CSV</button>
      <button class="nav-btn-compact" id="btnOpenDataEditor" onclick="openDataEditor()" title="Edit Data">✏️ Data</button>
      <button class="nav-btn-compact" id="btnToggleOutline" onclick="toggleSlideOutline()" title="Outline">📑 Outline</button>
      <button class="nav-btn-compact desktop-only-controls" id="fullscreenToggleBtn" onclick="toggleFullscreen()" title="Fullscreen">⛶ Full</button>
      <div class="export-dropdown desktop-only-controls">
        <button class="nav-btn-compact" onclick="toggleExportMenu(event)" title="Export Menu">⬇️ Export ▾</button>
        <div class="export-menu" id="exportMenu">
          <a href="Egy_Nutri_Business_Review_Deck.pptx" download>📥 PowerPoint (.pptx)</a>
          <a href="Egy_Nutri_Sales_Analysis_Template.xlsx" download>📊 Excel Model (.xlsx)</a>
          <button type="button" onclick="downloadCsvTemplate()">📁 Download CSV Template</button>
          <button type="button" onclick="window.print()">🖨️ Print / PDF</button>
        </div>
      </div>
    </div>
  </header>

  <!-- Hidden CSV File Input -->
  <input type="file" id="csvFileInput" accept=".csv,text/csv,text/plain" style="display:none;" onchange="handleCsvFileSelect(this)">

  <!-- Slide Tabs Navigation - Ultra-Slim -->
  <nav class="slide-tabs" id="slideTabs">
    <button class="tab-btn active" onclick="goToSlide(1)">01. Share %</button>
    <button class="tab-btn" onclick="goToSlide(2)">02. Core Formulas</button>
    <button class="tab-btn" onclick="goToSlide(3)">03. Specialty Lines</button>
    <button class="tab-btn" onclick="goToSlide(4)">04. Dual-Axis Deep Dive</button>
    <button class="tab-btn" onclick="goToSlide(5)">05. Total PPG%</button>
    <button class="tab-btn" onclick="goToSlide(6)">06. Pediamil 1</button>
    <button class="tab-btn" onclick="goToSlide(7)">07. Pediamil 2</button>
    <button class="tab-btn" onclick="goToSlide(8)">08. Pedia-Start 1</button>
    <button class="tab-btn" onclick="goToSlide(9)">09. Pedia-Start 2</button>
    <button class="tab-btn" onclick="goToSlide(10)">10. Quadrant Matrix</button>
  </nav>

  <!-- Main Slides Content Area -->
  <main>

    <!-- SLIDE 1 -->
    <section class="slide-container active" id="slide-1">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge">SLIDE 01</span> TERRITORIAL CONTRIBUTION &amp; GEO SHARE %</h2>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <span id="s1ChartTitle">3-Bar Territorial Share Analysis (GEO vs. 2026 vs. 2025)</span>
            <small style="color:var(--text-muted); font-size:11px;">Plotted on bars</small>
          </div>
          <div class="chart-box" style="height: 330px;">
            <canvas id="chartSlide1" width="600" height="330"></canvas>
          </div>
          <div id="s1BarLegendNotes" style="margin-top:10px; padding:8px 12px; background:#F8FAFC; border-radius:6px; font-size:11.5px; line-height:1.5;">
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>All Territories Share &amp; Potential Benchmark</span>
            <small style="color:var(--text-muted); font-size:11px;">Ranked by Geo Share</small>
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
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <span>Core Formulas: Monthly Volume (Horizontal Bars)</span>
            <small style="color:var(--text-muted); font-size:11px;">Values plotted directly on bars</small>
          </div>
          <div class="chart-box-tall" style="height: 400px;">
            <canvas id="chartSlide2" width="600" height="400"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>Monthly Average Breakdown &amp; Growth Rates</span>
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
          <div style="margin-top:10px; font-size:11px; color:var(--text-muted); line-height:1.4;">
            <strong>Flattening Rule:</strong> 2026 MoAvg = YTD/6 • 2025 MoAvg = Year/12 • LN AVG 6 2026 = National/9.
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 3 -->
    <section class="slide-container" id="slide-3">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge">SLIDE 03</span> SPECIALTY INFANT FORMULAS: MONTHLY SALES AVERAGES</h2>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <span>Specialty Lines: Monthly Volume (Horizontal Bars)</span>
            <small style="color:var(--text-muted); font-size:11px;">Values plotted directly on bars</small>
          </div>
          <div class="chart-box-tall" style="height: 420px;">
            <canvas id="chartSlide3" width="600" height="420"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>Specialty Breakdown &amp; Benchmark Comparison</span>
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
          <div style="margin-top:10px; font-size:11px; color:var(--text-muted); line-height:1.4;">
            <strong>Prescription Focus:</strong> AC &amp; LF drive margin contributions. AR &amp; Pediamum are key expansion targets.
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 4 -->
    <section class="slide-container" id="slide-4">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge">SLIDE 04</span> DUAL-AXIS DEEP DIVE: VOLUME vs. PPG% GROWTH</h2>
        </div>
        <div class="kpi-pills">
          <div class="kpi-pill">
            <span>National Benchmark</span>
            <strong id="s4CompanyBenchmarkPpg" style="color:var(--primary);">+33.79%</strong>
          </div>
          <div class="kpi-pill">
            <span>Territory Growth</span>
            <strong id="s4PersonTotalPpg">+50.11%</strong>
          </div>
        </div>
      </div>

      <!-- Dynamic Highlight Shape (Red / Green) -->
      <div id="growthHighlightBox" class="shape-highlight shape-green">
        <div class="shape-icon" id="shapeIcon">🟢</div>
        <div class="shape-content">
          <h3 id="shapeTitle">ABOVE COMPANY BENCHMARK (+16.33% Ahead of National Growth)</h3>
          <p id="shapeDesc">Achieved +50.11% PPG growth across all portfolios, outpacing the national company benchmark of +33.79%.</p>
        </div>
      </div>

      <!-- FROZEN / STICKY CHART CONTAINER -->
      <div class="sticky-chart-wrapper">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="sticky-badge">📌 FROZEN COMBO CHART</span>
            <span style="font-size:12.5px; font-weight:700; color:var(--primary);" id="s4ChartTitleText">Monthly Volume (Bars) vs PPG% Growth (Markers)</span>
          </div>
          <small style="color:var(--text-muted); font-size:11px;">Scroll down for product details</small>
        </div>
        <div class="chart-box" style="height: 290px;">
          <canvas id="chartSlide4" width="900" height="290"></canvas>
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
            <strong id="s5NationalBenchmarkPpg">+33.79%</strong>
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
          <p>Horizontal Axis Intercept positioned at <strong>Company Total PPG Benchmark</strong> | Vertical Axis at <strong>Contribution Diff (0.00%)</strong> | <strong>Selected ADM Bubble Highlighted</strong>.</p>
        </div>
        <div class="kpi-pills">
          <div class="kpi-pill">
            <span>X-Axis Intercept</span>
            <strong id="s10CompanyInterceptLabel" style="color:var(--primary);">+33.79% (Company PPG)</strong>
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

          <!-- Dynamic Quadrant Grid: ABCD Cards populated dynamically based on data -->
          <div class="quadrant-grid" id="quadrantCardsGrid">
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
                <li><em>Core Action:</em> Strong baseline share defenders. Focus detailing on high-growth formulations to re-ignite velocity above national target.</li>
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

  <!-- Dedicated Mobile Persistent Bottom Navigation Bar -->
  <nav class="mobile-bottom-bar" id="mobileBottomBar">
    <button class="mob-nav-btn" onclick="prevSlide()" title="Previous Slide">
      <span class="mob-icon">❮</span>
      <span>Prev</span>
    </button>
    <button class="mob-nav-btn" onclick="toggleSlideOutline()" title="Slide Outline">
      <span class="mob-icon">📑</span>
      <span>Outline</span>
    </button>
    <div class="mob-counter-pill" id="mobSlideIndicator" onclick="toggleSlideOutline()" title="View Outline">
      Slide 1 / 10
    </div>
    <button class="mob-nav-btn" onclick="triggerCsvUpload()" title="Upload Sales CSV">
      <span class="mob-icon">📁</span>
      <span>CSV</span>
    </button>
    <button class="mob-nav-btn" onclick="openDataEditor()" title="Edit Data">
      <span class="mob-icon">✏️</span>
      <span>Data</span>
    </button>
    <button class="mob-nav-btn" onclick="nextSlide()" title="Next Slide">
      <span class="mob-icon">❯</span>
      <span>Next</span>
    </button>
  </nav>

  <!-- Drag and Drop Fullscreen Dropzone Overlay -->
  <div class="drag-drop-overlay" id="dragDropOverlay">
    <div class="drag-drop-box">
      <div style="font-size: 54px;">📂</div>
      <h3>Drop Sales CSV Here</h3>
      <p>Release to parse 2026/2025 actuals and automatically recalculate all 10 slides!</p>
    </div>
  </div>

  <!-- Floating Fullscreen Presentation HUD -->
  <div class="fullscreen-hud" id="fullscreenHud">
    <button onclick="prevSlide()" title="Previous Slide (Left Arrow)">❮ Prev</button>
    <span class="hud-badge" id="hudSlideIndicator">Slide 1 / 10</span>
    <button onclick="nextSlide()" title="Next Slide (Right Arrow / Space)">Next ❯</button>
    <button onclick="triggerCsvUpload()" title="Upload Sales CSV">📁 CSV</button>
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
          <p>Modify territory volumes, upload newer CSV files, or customize manager assignments. All 10 slides and charts recalculate live.</p>
        </div>
        <button class="data-modal-close" onclick="closeDataEditor()" title="Close">✕</button>
      </div>

      <div class="data-modal-tabs">
        <button class="modal-tab-btn active" id="modalTab2026" onclick="switchEditorTab('2026')">📅 2026 YTD June Actuals (M06)</button>
        <button class="modal-tab-btn" id="modalTab2025" onclick="switchEditorTab('2025')">📅 2025 Full-Year Actuals (M12)</button>
        <button class="modal-tab-btn" id="modalTabMeta" onclick="switchEditorTab('meta')">👤 Managers & Geo Share %</button>
        <button class="modal-tab-btn" id="modalTabCsv" onclick="switchEditorTab('csv')">📁 CSV Import & Auto-Calculate</button>
        <button class="modal-tab-btn" id="modalTabJson" onclick="switchEditorTab('json')">💾 Backup / JSON Transfer</button>
      </div>

      <div class="data-modal-body" id="dataModalBody">
        <!-- Rendered dynamically by renderEditorBody() -->
      </div>

      <div class="data-modal-footer">
        <div class="footer-left-btns">
          <button class="btn-apply-data" onclick="applyDataEditorChanges()">💾 Save & Recalculate Dashboard</button>
          <button class="nav-btn" style="background:#0D9488; border-color:#0D9488; color:white;" onclick="triggerCsvUpload()">📁 Upload CSV File</button>
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

    /* CSV Parsing & Upload Engine */
    function parseCsvTokens(text) {
      const lines = [];
      let row = [];
      let cell = '';
      let inQuotes = false;
      
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        const next = text[i + 1];
        
        if (c === '"') {
          if (inQuotes && next === '"') {
            cell += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (c === ',' && !inQuotes) {
          row.push(cell.trim());
          cell = '';
        } else if ((c === String.fromCharCode(13) || c === String.fromCharCode(10)) && !inQuotes) {
          if (c === String.fromCharCode(13) && next === String.fromCharCode(10)) i++;
          row.push(cell.trim());
          if (row.some(x => x !== '')) {
            lines.push(row);
          }
          row = [];
          cell = '';
        } else {
          cell += c;
        }
      }
      if (cell !== '' || row.length > 0) {
        row.push(cell.trim());
        if (row.some(x => x !== '')) lines.push(row);
      }
      return lines;
    }

    function cleanNum(val) {
      if (val === undefined || val === null) return 0;
      if (typeof val === 'number') return isNaN(val) ? 0 : val;
      const s = String(val).replace(/["'\\s,]/g, '');
      if (s.endsWith('%')) {
        const p = parseFloat(s.slice(0, -1));
        return isNaN(p) ? 0 : p / 100;
      }
      const n = parseFloat(s);
      return isNaN(n) ? 0 : n;
    }

    function parseSalesCsv(text) {
      const rows = parseCsvTokens(text);
      let currentYear = '2026';
      const data2026 = [];
      const data2025 = [];
      let currentHeader = null;

      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const firstCell = (r[0] || '').trim();
        const joinedRow = r.join(' ').toLowerCase();

        // Check for section markers
        if (joinedRow.includes('total unit sales 2025') || (firstCell.toLowerCase().includes('total unit sales') && firstCell.includes('2025'))) {
          currentYear = '2025';
          currentHeader = null;
          continue;
        }
        if (joinedRow.includes('total unit sales ytd') || (firstCell.toLowerCase().includes('total unit sales') && firstCell.includes('2026'))) {
          currentYear = '2026';
          currentHeader = null;
          continue;
        }

        // Check for table header row
        if (joinedRow.includes('territory') && (joinedRow.includes('pediamil') || joinedRow.includes('dm'))) {
          currentHeader = r.map(c => c.trim().toLowerCase());
          continue;
        }

        // Skip summary / Total rows
        if (firstCell.toLowerCase().includes('total') || firstCell.toLowerCase() === 'egypt' || firstCell === '') {
          continue;
        }

        // Territory data row
        if (currentHeader) {
          const getColVal = (patterns) => {
            for (let colIdx = 0; colIdx < currentHeader.length; colIdx++) {
              const h = currentHeader[colIdx];
              for (let p of patterns) {
                if (p.test ? p.test(h) : h.includes(p)) {
                  return r[colIdx];
                }
              }
            }
            return undefined;
          };

          const territory = getColVal([/territory/i]) || firstCell;
          const dm = getColVal([/dm[\\s_]*name/i, /manager/i, /[^a-z]dm[^a-z]/i, /^dm$/i]) || (r[1] || territory);
          const p1 = cleanNum(getColVal([/pediamil[\\s_-]*1/i, /p1$/i, /p1[^0-9]/i]) || r[2]);
          const p2 = cleanNum(getColVal([/pediamil[\\s_-]*2/i, /p2$/i, /p2[^0-9]/i]) || r[3]);
          const pg3 = cleanNum(getColVal([/pediagrow[\\s_-]*3/i, /pg[\\s_-]*3/i, /grow[\\s_-]*3/i]) || r[4]);
          const lf = cleanNum(getColVal([/pediamil[\\s_-]*lf/i, /[^a-z]lf[^a-z]/i, /^lf$/i]) || r[5]);
          const ha = cleanNum(getColVal([/pediamil[\\s_-]*ha/i, /[^a-z]ha[^a-z]/i, /^ha$/i]) || r[6]);
          const ar = cleanNum(getColVal([/pediamil[\\s_-]*ar/i, /[^a-z]ar[^a-z]/i, /^ar$/i]) || r[7]);
          const ac = cleanNum(getColVal([/pediamil[\\s_-]*ac/i, /[^a-z]ac[^a-z]/i, /^ac$/i]) || r[8]);
          const mum = cleanNum(getColVal([/pediamum/i, /[^a-z]mum[^a-z]/i, /^mum$/i]) || r[9]);
          const ps1 = cleanNum(getColVal([/pedia[\\s_-]*start[\\s_-]*1/i, /ps[\\s_-]*1/i]) || r[10]);
          const ps2 = cleanNum(getColVal([/pedia[\\s_-]*start[\\s_-]*2/i, /ps[\\s_-]*2/i]) || r[11]);
          const lbw = cleanNum(getColVal([/lbw/i]) || r[12]);

          const sumVal = getColVal([/sum/i, /total/i]);
          const sum = sumVal !== undefined ? cleanNum(sumVal) : (p1 + p2 + pg3 + lf + ha + ar + ac + mum + ps1 + ps2 + lbw);

          const geoShareVal = getColVal([/geo[\\s_]*share/i]);
          const geoShare = geoShareVal !== undefined ? cleanNum(geoShareVal) : undefined;

          const contrIdxVal = getColVal([/controbution[\\s_]*index|contribution[\\s_]*index|contr.*idx/i]);
          const contrIdx = contrIdxVal !== undefined ? cleanNum(contrIdxVal) : undefined;

          const contrDiffVal = getColVal([/contribution[\\s_]*diff|contr.*diff/i]);
          const contrDiff = contrDiffVal !== undefined ? cleanNum(contrDiffVal) : undefined;

          const record = {
            territory,
            dm,
            p1, p2, pg3, lf, ha, ar, ac, mum, ps1, ps2, lbw,
            sum
          };
          if (geoShare !== undefined) record.geoShare = geoShare;
          if (contrIdx !== undefined) record.contrIdx = contrIdx;
          if (contrDiff !== undefined) record.contrDiff = contrDiff;

          if (currentYear === '2026') {
            data2026.push(record);
          } else {
            data2025.push(record);
          }
        }
      }

      return { data2026, data2025 };
    }

    function triggerCsvUpload() {
      const fileInput = document.getElementById('csvFileInput');
      if (fileInput) {
        fileInput.value = '';
        fileInput.click();
      }
    }

    function handleCsvFileSelect(input) {
      if (!input.files || input.files.length === 0) return;
      processCsvFile(input.files[0]);
    }

    function processCsvFile(file) {
      if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv' && file.type !== 'text/plain') {
        alert('Please select a valid CSV (.csv) file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = function(evt) {
        loadCsvText(evt.target.result, file.name);
      };
      reader.onerror = function() {
        alert('Error reading the selected file.');
      };
      reader.readAsText(file);
    }

    function loadCsvText(text, filename) {
      try {
        const parsed = parseSalesCsv(text);
        const c26 = parsed.data2026.length;
        const c25 = parsed.data2025.length;

        if (c26 === 0 && c25 === 0) {
          alert('Could not detect valid territory sales rows. Please ensure your CSV has territory names and SKU sales columns.');
          return;
        }

        if (c26 > 0) {
          parsed.data2026.forEach((r, idx) => {
            if (r.geoShare === undefined && rawData2026[idx]) {
              r.geoShare = rawData2026[idx].geoShare;
            }
          });
          rawData2026 = parsed.data2026;
          tempEditData2026 = JSON.parse(JSON.stringify(rawData2026));
          try { localStorage.setItem('egy_nutri_data_2026', JSON.stringify(rawData2026)); } catch(e) {}
        }

        if (c25 > 0) {
          rawData2025 = parsed.data2025;
          tempEditData2025 = JSON.parse(JSON.stringify(rawData2025));
          try { localStorage.setItem('egy_nutri_data_2025', JSON.stringify(rawData2025)); } catch(e) {}
        }

        recalculateAllModelData();
        renderSlide(currentSlide);
        if (document.getElementById('dataEditorBackdrop').classList.contains('open')) {
          renderEditorBody();
        }

        let msg = '✅ CSV Imported: ';
        if (c26 > 0) msg += c26 + ' territories (2026). ';
        if (c25 > 0) msg += c25 + ' territories (2025). ';
        msg += 'Egypt PPG updated to ' + (compTotalPpg >= 0 ? '+' : '') + compTotalPpg.toFixed(1) + '%.';
        showToast(msg, '📁');
      } catch (err) {
        console.error('Error importing CSV:', err);
        alert('Failed to parse CSV: ' + err.message);
      }
    }

    function downloadCsvTemplate() {
      let csv = 'Egy Nutri. Total Unit Sales YTD M06-2026,,,,,,,,,,,,,,,,,\\r\\n';
      csv += 'Territory Name,DM Name,Pediamil 1 400 GM,Pediamil 2 400 GM,PediaGrow 3 400 GM,Pediamil LF 400 GM,Pediamil HA 400 GM,Pediamil AR 400 GM,Pediamil AC 400 GM,Pediamum 400 GM,Pedia-Start 1,Pedia-Start 2,LBW- Egy,Sum YTD 6/2026,Contribution % YTD 6-2026, GEO Share % 2025,Controbution Index,Contribution Diff.\\r\\n';
      rawData2026.forEach(r => {
        const geo = (r.geoShare ? (r.geoShare * 100).toFixed(3) + '%' : '');
        const diff = (r.contrDiff !== undefined ? (r.contrDiff * 100).toFixed(2) + '%' : '');
        const idx = (r.contrIdx !== undefined ? r.contrIdx.toFixed(4) : '');
        csv += '"' + r.territory + '","' + r.dm + '",' + r.p1 + ',' + r.p2 + ',' + r.pg3 + ',' + r.lf + ',' + r.ha + ',' + r.ar + ',' + r.ac + ',' + r.mum + ',' + r.ps1 + ',' + r.ps2 + ',' + r.lbw + ',' + r.sum + ',,' + geo + ',' + idx + ',' + diff + '\\r\\n';
      });
      csv += '\\r\\n\\r\\n\\r\\n';
      csv += 'Egy Nutri. Total Unit Sales 2025,,,,,,,,,,,,,,,,,\\r\\n';
      csv += 'Territory Name,DM Name,Pediamil 1 400 GM,Pediamil 2 400 GM,PediaGrow 3 400 GM,Pediamil LF 400 GM,Pediamil HA 400 GM,Pediamil AR 400 GM,Pediamil AC 400 GM,Pediamum 400 GM,Pedia-Start 1,Pedia-Start 2,LBW- Egy,Sum 2025,Contribution % 2025,,,\\r\\n';
      rawData2025.forEach(r => {
        csv += '"' + r.territory + '","' + r.dm + '",' + r.p1 + ',' + r.p2 + ',' + r.pg3 + ',' + r.lf + ',' + r.ha + ',' + r.ar + ',' + r.ac + ',' + r.mum + ',' + r.ps1 + ',' + r.ps2 + ',' + r.lbw + ',' + r.sum + ',,,,\\r\\n';
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Egy_Nutri_Sales_Template.csv';
      a.click();
      URL.revokeObjectURL(url);
      showToast('📥 CSV template downloaded.', '📥');
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
        if (r.contrDiff === undefined) {
          const geoPct = (r.geoShare ? r.geoShare * 100 : c25);
          r.contrDiff = (c26 - geoPct) / 100;
        }
        if (r.contrIdx === undefined) {
          r.contrIdx = (r.geoShare && r.geoShare > 0) ? ((c26 / 100) / r.geoShare) : (c25 > 0 ? c26 / c25 : 1);
        }
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

      const mobInd = document.getElementById('mobSlideIndicator');
      if (mobInd) mobInd.innerText = 'Slide ' + slideNum + ' / ' + totalSlides;

      const tabs = document.querySelectorAll('.tab-btn');
      if (tabs[slideNum - 1]) {
        try { tabs[slideNum - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); } catch(e) {}
      }

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

    function toggleExportMenu(evt) {
      if (evt) evt.stopPropagation();
      const menu = document.getElementById('exportMenu');
      if (menu) menu.classList.toggle('show');
    }
    window.addEventListener('click', () => {
      const menu = document.getElementById('exportMenu');
      if (menu) menu.classList.remove('show');
    });

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

    /* Mobile Touch Swipe Gestures */
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
      if (e.target.closest('input, select, textarea, .data-edit-table, #outlineList, .data-table-wrapper')) return;
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (e.target.closest('input, select, textarea, .data-edit-table, #outlineList, .data-table-wrapper')) return;
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      if (Math.abs(deltaX) > 55 && Math.abs(deltaY) < 65) {
        if (deltaX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }, { passive: true });

    /* Global Window Drag & Drop for CSV */
    let globalDragCounter = 0;
    window.addEventListener('dragenter', (e) => {
      e.preventDefault();
      globalDragCounter++;
      const overlay = document.getElementById('dragDropOverlay');
      if (overlay) overlay.classList.add('active');
    });

    window.addEventListener('dragleave', (e) => {
      e.preventDefault();
      globalDragCounter--;
      if (globalDragCounter <= 0) {
        globalDragCounter = 0;
        const overlay = document.getElementById('dragDropOverlay');
        if (overlay) overlay.classList.remove('active');
      }
    });

    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    window.addEventListener('drop', (e) => {
      e.preventDefault();
      globalDragCounter = 0;
      const overlay = document.getElementById('dragDropOverlay');
      if (overlay) overlay.classList.remove('active');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processCsvFile(e.dataTransfer.files[0]);
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

              if (barWidth >= 55) {
                ctx.textAlign = 'right';
                ctx.fillStyle = '#FFFFFF';
                ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
                ctx.shadowBlur = 3;
                ctx.fillText(text, xPos - 8, yPos);
                ctx.shadowBlur = 0;
              } else if (xPos + 50 < right) {
                ctx.textAlign = 'left';
                ctx.fillStyle = '#0F172A';
                ctx.shadowBlur = 0;
                ctx.fillText(text, xPos + 6, yPos);
              } else {
                ctx.textAlign = 'right';
                ctx.fillStyle = '#0F172A';
                ctx.shadowBlur = 0;
                ctx.fillText(text, right - 4, yPos);
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
          ctx.fillText('(High Growth > +' + compTotalPpg.toFixed(1) + '%, Negative Diff < 0%)', left + 14, top + 46);

          ctx.font = 'bold 13px sans-serif';
          ctx.fillStyle = 'rgba(6, 95, 70, 0.75)';
          ctx.textAlign = 'right';
          ctx.fillText('QUADRANT A: STARS 🌟', right - 14, top + 30);
          ctx.font = '10.5px sans-serif';
          ctx.fillText('(High Growth > +' + compTotalPpg.toFixed(1) + '%, Positive Diff > 0%)', right - 14, top + 46);

          ctx.font = 'bold 13px sans-serif';
          ctx.fillStyle = 'rgba(153, 27, 27, 0.75)';
          ctx.textAlign = 'left';
          ctx.fillText('QUADRANT D: LOWEST PERFORMERS ⚠️', left + 14, bottom - 30);
          ctx.font = '10.5px sans-serif';
          ctx.fillText('(Low Growth < +' + compTotalPpg.toFixed(1) + '%, Negative Diff < 0%)', left + 14, bottom - 14);

          ctx.font = 'bold 13px sans-serif';
          ctx.fillStyle = 'rgba(146, 64, 14, 0.75)';
          ctx.textAlign = 'right';
          ctx.fillText('QUADRANT C: VOLUME PILLARS 🛡️', right - 14, bottom - 30);
          ctx.font = '10.5px sans-serif';
          ctx.fillText('(Moderate Growth < +' + compTotalPpg.toFixed(1) + '%, Positive Diff > 0%)', right - 14, bottom - 14);

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
      const s1Person = document.getElementById('s1PersonName');
      if (s1Person) s1Person.innerText = p.dm;
      const s1Terr = document.getElementById('s1TerritoryName');
      if (s1Terr) s1Terr.innerText = p.territory;
      const s1Title = document.getElementById('s1ChartTitle');
      if (s1Title) s1Title.innerText = '3-Bar Territorial Share Analysis (GEO Potential vs. 2026 vs. 2025)';

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
      const s2Label = document.getElementById('s2TerritoryLabel');
      if (s2Label) s2Label.innerText = p.dm + ' (' + p.territory + ')';

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
      const s3Label = document.getElementById('s3TerritoryLabel');
      if (s3Label) s3Label.innerText = p.dm + ' (' + p.territory + ')';

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

      const s4CompBench = document.getElementById('s4CompanyBenchmarkPpg');
      if (s4CompBench) s4CompBench.innerText = (compTotalPpg >= 0 ? '+' : '') + compTotalPpg.toFixed(2) + '%';

      document.getElementById('s4PersonTotalPpg').innerText = (personPpg > 0 ? '+' : '') + personPpg.toFixed(2) + '%';
      document.getElementById('s4PersonTotalPpg').style.color = isAbove ? 'var(--green-text)' : 'var(--red-text)';
      const s4Title = document.getElementById('s4ChartTitleText');
      if (s4Title) s4Title.innerText = 'Monthly Volume (Bars) vs PPG% Growth (Markers) vs Company Benchmark';

      const box = document.getElementById('growthHighlightBox');
      const icon = document.getElementById('shapeIcon');
      const title = document.getElementById('shapeTitle');
      const desc = document.getElementById('shapeDesc');

      if (isAbove) {
        if (box) box.className = 'shape-highlight shape-green';
        if (icon) icon.innerText = '🟢';
        if (title) title.innerText = 'GROWTH ABOVE COMPANY BENCHMARK (+' + gap.toFixed(2) + '% Ahead of Egypt Average)';
        if (desc) desc.innerText = 'Achieved +' + personPpg.toFixed(1) + '% total PPG growth, outpacing the national company benchmark of +' + compTotalPpg.toFixed(2) + '%. Commercial momentum is ahead of plan.';
      } else {
        if (box) box.className = 'shape-highlight shape-red';
        if (icon) icon.innerText = '🔻';
        if (title) title.innerText = 'GROWTH BELOW COMPANY BENCHMARK (-' + gap.toFixed(2) + '% Gap to Egypt Average)';
        if (desc) desc.innerText = 'Recorded +' + personPpg.toFixed(1) + '% total PPG growth, trailing the national company benchmark of +' + compTotalPpg.toFixed(2) + '%. Corrective commercial plan required.';
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

                  if (barWidth >= 55) {
                    ctx.textAlign = 'right';
                    ctx.fillStyle = '#FFFFFF';
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
                    ctx.shadowBlur = 3;
                    ctx.fillText(text, xPos - 8, yPos);
                    ctx.shadowBlur = 0;
                  } else if (xPos + 50 < right) {
                    ctx.textAlign = 'left';
                    ctx.fillStyle = '#0F172A';
                    ctx.shadowBlur = 0;
                    ctx.fillText(text, xPos + 6, yPos);
                  } else {
                    ctx.textAlign = 'right';
                    ctx.fillStyle = '#0F172A';
                    ctx.shadowBlur = 0;
                    ctx.fillText(text, right - 4, yPos);
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
      const s5CompBench = document.getElementById('s5NationalBenchmarkPpg');
      if (s5CompBench) s5CompBench.innerText = (compTotalPpg >= 0 ? '+' : '') + compTotalPpg.toFixed(2) + '%';
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

      const s10Intercept = document.getElementById('s10CompanyInterceptLabel');
      if (s10Intercept) s10Intercept.innerText = (compTotalPpg >= 0 ? '+' : '') + compTotalPpg.toFixed(2) + '% (Company PPG)';

      const diagCard = document.getElementById('chosenQuadDiagnosticCard');
      let quadTitle = '';
      let quadStrategy = '';
      let quadBadge = '';

      if (chosenPerson.quad === 'A') {
        quadTitle = 'QUADRANT A: COMPANY STAR 🌟';
        quadBadge = '<span class="badge-above">TOP PERFORMER</span>';
        quadStrategy = '<strong>' + chosenPerson.dm + ' (' + chosenPerson.territory + ')</strong> is positioned firmly in <strong>Quadrant A</strong> with outstanding volume momentum (<strong>+' + chosenPerson.totalPpg.toFixed(1) + '% PPG</strong> vs. Company +' + compTotalPpg.toFixed(1) + '%) and a positive contribution gain (<strong>+' + chosenPerson.contrDiff.toFixed(2) + '%</strong>).<br><strong>Commercial Mandate:</strong> Defend market share against competitor detailing, secure neonatal intensive care listings for Pedia-Start & LBW, and drive multi-can specialty pharmacy bundling.';
      } else if (chosenPerson.quad === 'B') {
        quadTitle = 'QUADRANT B: HIGH-GROWTH CHALLENGER 🚀';
        quadBadge = '<span class="badge-above" style="background:#DBEAFE; color:#1E40AF; border-color:#BFDBFE;">HIGH MOMENTUM</span>';
        quadStrategy = '<strong>' + chosenPerson.dm + ' (' + chosenPerson.territory + ')</strong> is positioned in <strong>Quadrant B</strong>, generating high growth of <strong>+' + chosenPerson.totalPpg.toFixed(1) + '% PPG</strong> (exceeding company pace +' + compTotalPpg.toFixed(1) + '%) while working to close an initial potential gap (<strong>' + chosenPerson.contrDiff.toFixed(2) + '%</strong> vs. GEO share).<br><strong>Commercial Mandate:</strong> Capitalize on strong prescription velocity. Prioritize hospital tender listings and key chain pharmacy coverage to fully unlock geographic potential.';
      } else if (chosenPerson.quad === 'C') {
        quadTitle = 'QUADRANT C: VOLUME PILLAR & SHARE KEEPER 🛡️';
        quadBadge = '<span class="badge-above" style="background:#FEF3C7; color:#92400E; border-color:#FDE68A;">CORE BASELINE</span>';
        quadStrategy = '<strong>' + chosenPerson.dm + ' (' + chosenPerson.territory + ')</strong> is positioned in <strong>Quadrant C</strong> (Volume Pillars), delivering strong baseline share exceeding geographic potential (<strong>+' + chosenPerson.contrDiff.toFixed(2) + '%</strong>), but running at a moderate growth pace (<strong>+' + chosenPerson.totalPpg.toFixed(1) + '% PPG</strong> vs. Company +' + compTotalPpg.toFixed(1) + '%).<br><strong>Commercial Mandate:</strong> Accelerate growth rate back above national benchmark (+' + compTotalPpg.toFixed(1) + '%). Drive high-growth stage-2 formulas (Pediamil 2 & Pedia-Start 2) and high-margin specialty lines (Pediamil AC & LF).';
      } else {
        quadTitle = 'QUADRANT D: LOWEST PERFORMERS / CRITICAL ATTENTION ⚠️';
        quadBadge = '<span class="badge-below">CRITICAL LAGGARD</span>';
        quadStrategy = '<strong>' + chosenPerson.dm + ' (' + chosenPerson.territory + ')</strong> is in <strong>Quadrant D</strong> (Lowest Performers), experiencing sub-benchmark growth (<strong>+' + chosenPerson.totalPpg.toFixed(1) + '% PPG</strong> vs. +' + compTotalPpg.toFixed(1) + '%) alongside a severe contribution share gap (<strong>' + chosenPerson.contrDiff.toFixed(2) + '%</strong> vs. GEO share).<br><strong>Commercial Mandate:</strong> Immediate review with Commercial Director. Audit medical rep call frequency, re-align territory brick targets, and execute urgent pediatric symposiums to reverse competitor conversion.';
      }

      diagCard.innerHTML =
        '<div style="display:flex; justify-content:space-between; align-items:center;">' +
          '<h3>🎯 SELECTED ADM DIAGNOSTIC: ' + chosenPerson.dm.toUpperCase() + ' (' + chosenPerson.territory.toUpperCase() + ')</h3>' +
          quadBadge +
        '</div>' +
        '<p style="margin-top:6px;"><strong>Strategic Classification:</strong> ' + quadTitle + '</p>' +
        '<p style="margin-top:4px;"><strong>Performance Coordinates:</strong> X (Contribution Diff) = <strong>' + (chosenPerson.contrDiff > 0 ? '+' : '') + chosenPerson.contrDiff.toFixed(2) + '%</strong> | Y (Total PPG) = <strong>+' + chosenPerson.totalPpg.toFixed(1) + '%</strong> | YTD Sales = <strong>' + chosenPerson.r26.sum.toLocaleString() + ' cans</strong></p>' +
        '<p style="margin-top:8px; border-top:1px dashed #C4B5FD; padding-top:6px;">' + quadStrategy + '</p>';

      const quadGrid = document.getElementById('quadrantCardsGrid');
      if (quadGrid) {
        const qA = [];
        const qB = [];
        const qC = [];
        const qD = [];

        rawData2026.forEach((r, idx) => {
          const r25 = rawData2025[idx] || { sum: 0 };
          const avg26 = r.sum / 6;
          const avg25 = r25.sum / 12;
          const ppg = avg25 > 0 ? ((avg26 / avg25) - 1) * 100 : 0;
          const diff = r.contrDiff * 100;
          const shortName = r.dm ? r.dm.split(' ').slice(0, 2).join(' ') : 'ADM';
          const isSel = (idx === chosenPerson.idx);
          const itemText = (isSel ? '⭐ <strong>' : '<strong>') + r.territory + ' (' + shortName + '):</strong> +' + ppg.toFixed(1) + '% PPG, ' + (diff >= 0 ? '+' : '') + diff.toFixed(2) + '% Diff (' + Math.round(r.sum/1000).toFixed(1) + 'k units).' + (isSel ? '</strong>' : '');

          if (diff >= 0 && ppg >= compTotalPpg) qA.push(itemText);
          else if (diff < 0 && ppg >= compTotalPpg) qB.push(itemText);
          else if (diff >= 0 && ppg < compTotalPpg) qC.push(itemText);
          else qD.push(itemText);
        });

        quadGrid.innerHTML =
          '<div class="quad-card quad-b">' +
            '<div class="quad-header">' +
              '<h4>QUADRANT B: CHALLENGERS 🚀</h4>' +
              '<small style="font-weight:700;">High Growth, Neg. Diff</small>' +
            '</div>' +
            '<ul>' +
              qB.map(t => '<li>' + t + '</li>').join('') +
              '<li style="margin-top:4px;"><em>Core Action:</em> Closing the potential gap. Expand pediatrician advocacy & key pharmacy accounts.</li>' +
            '</ul>' +
          '</div>' +
          '<div class="quad-card quad-a">' +
            '<div class="quad-header">' +
              '<h4>QUADRANT A: STARS 🌟</h4>' +
              '<small style="font-weight:700;">High Growth, Pos. Diff</small>' +
            '</div>' +
            '<ul>' +
              qA.map(t => '<li>' + t + '</li>').join('') +
              '<li style="margin-top:4px;"><em>Core Action:</em> Core volume engines. Protect baseline share and accelerate specialty cross-selling.</li>' +
            '</ul>' +
          '</div>' +
          '<div class="quad-card quad-d">' +
            '<div class="quad-header">' +
              '<h4>QUADRANT D: LOWEST PERFORMERS ⚠️</h4>' +
              '<small style="font-weight:700;">Low Growth, Neg. Diff</small>' +
            '</div>' +
            '<ul>' +
              qD.map(t => '<li>' + t + '</li>').join('') +
              '<li style="margin-top:4px;"><em>Core Action:</em> Urgent commercial turnaround, field activity re-structuring, key clinic targeting.</li>' +
            '</ul>' +
          '</div>' +
          '<div class="quad-card quad-c">' +
            '<div class="quad-header">' +
              '<h4>QUADRANT C: VOLUME PILLARS 🛡️</h4>' +
              '<small style="font-weight:700;">Moderate Growth, Pos. Diff</small>' +
            '</div>' +
            '<ul>' +
              qC.map(t => '<li>' + t + '</li>').join('') +
              '<li style="margin-top:4px;"><em>Core Action:</em> Strong baseline share defenders. Focus detailing on high-growth formulations to re-ignite velocity above +' + compTotalPpg.toFixed(1) + '%.</li>' +
            '</ul>' +
          '</div>';
      }

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
              title: { display: true, text: 'Total PPG Growth % (Horizontal Intercept at Company PPG +' + compTotalPpg.toFixed(1) + '%)' },
              ticks: { callback: v => v + '%' }
            }
          }
        },
        plugins: [
          quadrantCrosshairPlugin,
          {
            id: 'bubbleTerritoryLabels',
            afterDatasetsDraw(chart) {
              try {
                if (!chart) return;
                const { ctx } = chart;
                const meta0 = chart.getDatasetMeta(0);
                if (meta0 && meta0.data) {
                  ctx.save();
                  ctx.font = 'bold 10px -apple-system, sans-serif';
                  ctx.fillStyle = '#1E293B';
                  ctx.textAlign = 'center';
                  meta0.data.forEach((pt, i) => {
                    const bubble = regularBubbles[i];
                    if (bubble) {
                      const radius = pt.options && pt.options.radius ? pt.options.radius : 10;
                      ctx.fillText(bubble.territory.split(' ')[0], pt.x, pt.y + radius + 11);
                    }
                  });
                  ctx.restore();
                }
                const meta1 = chart.getDatasetMeta(1);
                if (meta1 && meta1.data && meta1.data[0]) {
                  const pt = meta1.data[0];
                  const radius = pt.options && pt.options.radius ? pt.options.radius : 15;
                  ctx.save();
                  ctx.font = 'bold 12px -apple-system, sans-serif';
                  ctx.fillStyle = '#6D28D9';
                  ctx.textAlign = 'center';
                  ctx.fillText('★ ' + chosenPerson.territory, pt.x, pt.y - radius - 7);
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
      ['2026', '2025', 'meta', 'csv', 'json'].forEach(k => {
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
      } else if (editorActiveTab === 'csv') {
        container.innerHTML =
          '<div style="max-width:760px; margin:0 auto; display:flex; flex-direction:column; gap:20px; padding:10px 0;">' +
            '<div style="text-align:center;">' +
              '<div style="font-size:36px; margin-bottom:8px;">📁</div>' +
              '<h3 style="margin:0 0 6px; font-size:18px; color:var(--primary);">Upload Updated Sales CSV File</h3>' +
              '<p style="font-size:13px; color:var(--text-muted); margin:0;">Upload the latest LN Commercial Sales Data CSV file (containing 2026 YTD June &amp; 2025 tables). All 10 slides, charts, rankings, and ABCD quadrants will recalculate dynamically.</p>' +
            '</div>' +
            '<div style="border:2px dashed #3B82F6; border-radius:12px; padding:32px 20px; text-align:center; background:#EFF6FF; cursor:pointer;" onclick="triggerCsvUpload()">' +
              '<div style="font-size:28px; margin-bottom:6px;">☁️</div>' +
              '<div style="font-size:15px; font-weight:700; color:var(--primary); margin-bottom:4px;">Drag &amp; Drop Sales CSV Here</div>' +
              '<div style="font-size:12.5px; color:#64748B; margin-bottom:14px;">or click anywhere in this box to browse from your device</div>' +
              '<button type="button" class="nav-btn" style="background:#2563EB; color:white; padding:8px 18px;" onclick="event.stopPropagation(); triggerCsvUpload();">📂 Choose File from Device</button>' +
            '</div>' +
            '<div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:14px 18px;">' +
              '<div>' +
                '<strong style="font-size:13px; color:var(--text-main);">Need a CSV template?</strong>' +
                '<div style="font-size:12px; color:var(--text-muted);">Download a pre-formatted CSV matching current model numbers to use as a baseline.</div>' +
              '</div>' +
              '<button type="button" class="nav-btn" style="background:#0D9488; color:white; font-size:12px; padding:7px 14px; white-space:nowrap;" onclick="downloadCsvTemplate()">⬇️ Download CSV Template</button>' +
            '</div>' +
            '<div style="background:#FFFBEB; border:1px solid #FCD34D; border-radius:10px; padding:14px 16px; font-size:12px; color:#92400E;">' +
              '<strong style="display:block; margin-bottom:4px;">⚙️ Automatic Calculation Specifications:</strong>' +
              '<ul style="margin:0; padding-left:18px; line-height:1.6;">' +
                '<li><strong>Shortage Flattening Rule:</strong> 2026 Monthly Average is calculated as <code>YTD &divide; 6</code>; 2025 Monthly Average is calculated as <code>Full Year &divide; 12</code>.</li>' +
                '<li><strong>Company Benchmark PPG:</strong> Weighted total growth comparing Egypt 2026 Monthly Average vs 2025 Monthly Average.</li>' +
                '<li><strong>ABCD Quadrants:</strong> Evaluates Contribution Index vs PPG with horizontal intercept set to Company Total PPG and vertical intercept set to 0.</li>' +
                '<li><strong>Persistence:</strong> Uploaded CSV data is automatically saved to your browser local storage.</li>' +
              '</ul>' +
            '</div>' +
          '</div>';
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
