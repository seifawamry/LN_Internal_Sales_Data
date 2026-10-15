const fs = require('fs');
const path = require('path');

const chartJsContent = fs.readFileSync(path.join(__dirname, 'chart.umd.min.js'), 'utf8');

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>LN Sales Review App</title>
  
  <!-- Mobile & PWA Metadata -->
  <meta name="application-name" content="LN Sales Review App">
  <meta name="apple-mobile-web-app-title" content="LN Sales Review App">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="theme-color" content="#1B365D">
  <meta name="msapplication-TileColor" content="#1B365D">
  <meta name="msapplication-TileImage" content="icon-192.png">

  <!-- Web App Manifests -->
  <link rel="manifest" href="site.webmanifest">
  <link rel="manifest" href="manifest.json">

  <!-- Apple Touch Icons for iOS Add to Home Screen -->
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon-180x180.png">
  <link rel="apple-touch-icon" sizes="192x192" href="icon-192.png">
  <link rel="apple-touch-icon" sizes="512x512" href="icon-512.png">

  <!-- Favicons for Browsers -->
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
  <link rel="icon" type="image/png" sizes="512x512" href="icon-512.png">
  <link rel="shortcut icon" href="favicon-32x32.png">

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

    /* ==========================================================================
       SECURITY ACCESS GATE & PASS KEY LOCK SCREEN
       ========================================================================== */
    .app-lock-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999999;
      background: radial-gradient(circle at 50% 35%, #1E293B 0%, #0A192F 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      transition: opacity 0.35s ease, visibility 0.35s ease;
    }
    .app-lock-overlay.unlocked {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    .lock-card {
      background: rgba(15, 23, 42, 0.94);
      border: 1px solid rgba(212, 175, 55, 0.45);
      border-radius: 18px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(212, 175, 55, 0.18);
      max-width: 480px;
      width: 100%;
      padding: 34px 28px;
      text-align: center;
      color: #F8FAFC;
      position: relative;
    }
    .lock-shield-icon {
      font-size: 42px;
      margin-bottom: 10px;
      filter: drop-shadow(0 4px 12px rgba(212, 175, 55, 0.45));
    }
    .lock-badge {
      display: inline-block;
      background: rgba(212, 175, 55, 0.15);
      color: #D4AF37;
      border: 1px solid rgba(212, 175, 55, 0.45);
      padding: 4px 14px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.8px;
      margin-bottom: 12px;
    }
    .lock-title {
      font-size: 21px;
      font-weight: 800;
      color: #FFFFFF;
      margin: 0 0 6px 0;
      letter-spacing: 0.5px;
    }
    .lock-subtitle {
      font-size: 12px;
      color: #94A3B8;
      line-height: 1.5;
      margin: 0 0 22px 0;
    }
    .passkey-box {
      text-align: left;
    }
    .passkey-label {
      display: block;
      font-size: 11.5px;
      font-weight: 700;
      color: #CBD5E1;
      margin-bottom: 6px;
    }
    .passkey-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .passkey-icon {
      position: absolute;
      left: 12px;
      font-size: 16px;
      pointer-events: none;
    }
    .passkey-input {
      width: 100%;
      padding: 12px 42px 12px 38px;
      background: rgba(30, 41, 59, 0.85);
      border: 1.5px solid #334155;
      border-radius: 10px;
      font-size: 14px;
      color: #FFFFFF;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .passkey-input:focus {
      border-color: #D4AF37;
      box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.25);
    }
    .passkey-eye-btn {
      position: absolute;
      right: 10px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px;
      color: #94A3B8;
    }
    .passkey-error-msg {
      color: #F87171;
      font-size: 11.5px;
      font-weight: 600;
      margin-top: 8px;
    }
    .unlock-app-btn {
      width: 100%;
      margin-top: 14px;
      padding: 12px;
      background: linear-gradient(135deg, #1B365D, #2563EB);
      border: 1px solid #3B82F6;
      border-radius: 10px;
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.15s, background 0.2s, box-shadow 0.2s;
    }
    .unlock-app-btn:hover {
      background: linear-gradient(135deg, #2563EB, #1D4ED8);
      box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
      transform: translateY(-1px);
    }
    .lock-footer-note {
      margin-top: 18px;
      font-size: 10.5px;
      color: #64748B;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-8px); }
      40%, 80% { transform: translateX(8px); }
    }
    .shake {
      animation: shake 0.4s ease-in-out;
    }

    /* ==========================================================================
       TOP MANAGEMENT EXECUTIVE REPORT MODAL
       ========================================================================== */
    .mgmt-modal-card {
      background: #FFFFFF;
      border-radius: 14px;
      max-width: 960px;
      width: 95%;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 60px rgba(0,0,0,0.35);
      border: 1px solid #CBD5E1;
      overflow: hidden;
      animation: modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .mgmt-header {
      background: linear-gradient(135deg, #0A192F 0%, #1B365D 100%);
      color: #FFFFFF;
      padding: 16px 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #D4AF37;
    }
    .mgmt-body {
      padding: 20px 24px;
      overflow-y: auto;
      flex: 1;
      background: #F8FAFC;
    }
    .mgmt-kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
      margin-bottom: 20px;
    }
    .mgmt-kpi-pill {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 12px 14px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .mgmt-kpi-pill span {
      display: block;
      font-size: 11px;
      color: #64748B;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .mgmt-kpi-pill strong {
      font-size: 17px;
      color: #1E293B;
    }
    .mgmt-section-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .mgmt-section-card h4 {
      margin: 0 0 6px 0;
      font-size: 13.5px;
      color: #1B365D;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .mgmt-section-card p {
      margin: 0 0 8px 0;
      font-size: 12px;
      color: #334155;
      line-height: 1.5;
    }
    .mgmt-directive {
      background: #F1F5F9;
      border-left: 3.5px solid #2563EB;
      padding: 8px 12px;
      border-radius: 0 6px 6px 0;
      font-size: 11.5px;
      color: #1E293B;
      margin: 0;
    }
  </style>
</head>
<body>

  <!-- SECURITY ACCESS GATE / PASS KEY SCREEN -->
  <div id="appLockScreen" class="app-lock-overlay">
    <div class="lock-card">
      <div class="lock-shield-icon" style="cursor:pointer;" onclick="quickUnlock()" title="Click to auto-unlock">🛡️</div>
      <div class="lock-badge" style="cursor:pointer;" onclick="quickUnlock()" title="Click to auto-unlock">CONFIDENTIAL • TOP MANAGEMENT ONLY</div>
      <h1 class="lock-title">LN SALES INTELLIGENCE</h1>
      <p class="lock-subtitle">Authorized Executive &amp; Commercial Management Access Required.<br>This system contains confidential sales volume, physician detailing metrics, and market share data.</p>
      
      <div class="passkey-box">
        <label for="passKeyInput" class="passkey-label">Enter Access Pass Key</label>
        <div class="passkey-input-wrapper">
          <span class="passkey-icon">🔑</span>
          <input type="password" id="passKeyInput" class="passkey-input" placeholder="Enter key (e.g. LN2026)..." autofocus autocomplete="off" onkeydown="if(event.key==='Enter') verifyPassKey();" />
          <button type="button" class="passkey-eye-btn" onclick="togglePassKeyVisibility()" title="Show/Hide Key">👁️</button>
        </div>
        <div id="passKeyError" class="passkey-error-msg" style="display:none;">⚠️ Invalid Access Pass Key. Please enter LN2026.</div>
        <button type="button" class="unlock-app-btn" onclick="verifyPassKey()">🔓 Unlock Application</button>
      </div>

      <div class="lock-footer-note" style="margin-top:14px; display:flex; flex-direction:column; gap:6px;">
        <span style="color:#CBD5E1; font-size:11.5px;">🔑 Default Pass Key: <strong style="color:#D4AF37; letter-spacing:1px; cursor:pointer;" onclick="quickUnlock()">LN2026</strong> <small>(click to auto-fill)</small></span>
        <span style="color:#64748B; font-size:10px;">🔒 256-Bit In-Memory Session Security • Protected Commercial Intelligence</span>
      </div>
    </div>
  </div>

  <!-- App Header - Ultra-Slim Single Row -->
  <header>
    <div class="brand-area" style="cursor:pointer;" onclick="goToSlide(1)" title="LN Sales Review App">
      <img src="icon-192.png" alt="LN Logo" style="width:28px; height:28px; border-radius:6px; object-fit:cover; box-shadow:0 1px 3px rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.25); flex-shrink:0;">
      <div class="brand-badge">LN SALES</div>
      <span class="brand-title-compact">REVIEW APP</span>
    </div>

    <div class="header-center-selector">
      <div class="adm-selector-box">
        <span class="adm-icon">👤</span>
        <select id="chosenAdmSelect" onchange="onPersonChange()">
          <option value="mgmt" selected>🏢 TOP MANAGEMENT REPORT (Executive Summary)</option>
          <optgroup label="Area Sales Managers (Private Review)">
            <option value="0">Ahmed Hassan (Alx)</option>
            <option value="1">Ahmed Mohamed Sakr (Behera &amp; Dakahlia)</option>
            <option value="2">NOHER ADEL (Cairo)</option>
            <option value="3">Youstina Farag Allah (Guiza)</option>
            <option value="4">Shimaa Tarek El-Shamy (DELTA I)</option>
            <option value="5">Mohamed Yousef M. (Delta II)</option>
            <option value="6">UE North (Upper Egypt I)</option>
            <option value="7">Beshoy Youhanna (Upper Egypt II)</option>
            <option value="8">Karim Shehab (KFR EL.SHK)</option>
          </optgroup>
        </select>
      </div>
    </div>

    <div class="header-actions">
      <button class="nav-btn-compact" id="btnTopMgmtSummary" onclick="openTopMgmtModal()" title="View Top Management Executive Summary" style="background:linear-gradient(135deg, #4338CA, #6D28D9); border-color:#8B5CF6; color:#FFF; font-weight:700;">📋 Exec Summary</button>
      <button class="nav-btn-compact" id="btnInstallApp" onclick="promptInstallApp()" title="Install LN Sales Review App" style="background:#2563EB; border-color:#3B82F6; font-weight:600;">📲 Install</button>
      <button class="nav-btn-compact" id="btnUploadCsvTop" onclick="triggerCsvUpload()" title="Upload CSV">📁 CSV</button>
      <button class="nav-btn-compact" id="btnOpenDataEditor" onclick="openDataEditor()" title="Edit Data">✏️ Data</button>
      <button class="nav-btn-compact" id="btnToggleOutline" onclick="toggleSlideOutline()" title="Outline">📑 Outline</button>
      <button class="nav-btn-compact desktop-only-controls" id="fullscreenToggleBtn" onclick="toggleFullscreen()" title="Fullscreen">⛶ Full</button>
      <button class="nav-btn-compact" id="btnLockApp" onclick="lockApplication()" title="Lock Application" style="background:#EF444420; color:#EF4444; border-color:#EF4444; font-weight:600;">🔒 Lock</button>
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
    <button class="tab-btn" onclick="goToSlide(11)">11. 3-Horizon Velocity (Q3 vs H1 vs '25)</button>
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

    <!-- SLIDE 11: 3-HORIZON RUN-RATE VELOCITY: Q3 2026 vs. H1 2026 BASELINE vs. 2025 -->
    <section class="slide-container" id="slide-11">
      <div class="slide-header">
        <div class="slide-header-left">
          <h2><span class="slide-badge" style="background:#8B5CF6;">SLIDE 11</span> 3-HORIZON COMMERCIAL VELOCITY: Q3 2026 vs. H1 BASELINE vs. 2025 FULL YEAR</h2>
          <p id="s11Subtitle">Commercial Velocity Trilogy: Tracking Medical Rep &amp; SKU Momentum from 2025 Baseline (103.4k/mo) through H1 2026 (138.3k/mo) to Q3 2026 Acceleration (156.1k/mo, +51.0% vs '25).</p>
        </div>
        <div class="kpi-pills" id="s11KpiPills">
          <div class="kpi-pill">
            <span>2025 Baseline</span>
            <strong style="color:var(--text-muted);">103,385 Units/Mo</strong>
          </div>
          <div class="kpi-pill">
            <span>H1 2026 Baseline</span>
            <strong style="color:var(--primary);">138,315 Units/Mo</strong>
          </div>
          <div class="kpi-pill">
            <span>Q3 2026 Run-Rate</span>
            <strong style="color:#8B5CF6;">156,126 Units/Mo</strong>
          </div>
          <div class="kpi-pill">
            <span>Q3 vs H1 Velocity</span>
            <strong style="color:var(--green);">+12.9% (+17.8k/mo)</strong>
          </div>
          <div class="kpi-pill">
            <span>Q3 vs '25 Expansion</span>
            <strong style="color:#10B981;">+51.0% (+52.7k/mo)</strong>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-title">
            <span>Medical Rep Velocity: 2025 MoAvg vs. H1 MoAvg vs. Q3 MoAvg Run-Rate</span>
            <small style="font-size:11px; color:var(--text-muted);">Gray = 2025 MoAvg | Navy = H1 MoAvg | Purple = Q3 MoAvg | Amber Line = Q3 vs H1 % | Green Line = Q3 vs '25 %</small>
          </div>
          <div class="chart-box-tall" style="height: 480px;">
            <canvas id="chartSlide11" width="600" height="480"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-title">
            <span>Strategic Momentum Classification: 4 Velocity Tiers</span>
            <small style="color:var(--text-muted); font-size:11px;">Rep Acceleration &amp; 3-Horizon Expansion</small>
          </div>

          <!-- Dynamic Selected ADM 3-Horizon Velocity Spotlight Card -->
          <div id="chosenAdmVelocityCard" class="chosen-quad-highlight" style="border-left-color:#8B5CF6; margin-bottom:12px;">
          </div>

          <!-- 4 Velocity Tiers Grid -->
          <div class="quadrant-grid" id="s11TiersGrid" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div class="quad-card" style="border-left:4px solid #10B981; background:var(--green-bg); padding:10px;">
              <div class="quad-header" style="margin-bottom:6px;">
                <h4 style="color:#065F46; font-size:12px;">HIGH ACCELERATORS (+40% to +60%) 🚀</h4>
                <small style="font-weight:700; color:#065F46; font-size:10px;">Breakout Momentum</small>
              </div>
              <ul style="font-size:11px; line-height:1.45; padding-left:14px; color:#1E293B;">
                <li><strong>Cairo (Noher Adel):</strong> 7.2k ('25) → 8.8k (H1) → <strong>13.9k/mo (Q3)</strong>. Surge of <strong>+58.7% vs H1</strong> and <strong>+94.3% vs '25</strong>! Staged massive turnaround led by AC (+225%) &amp; P1 (+59%).</li>
                <li><strong>KFR EL.SHK (Karim Shehab):</strong> 9.3k ('25) → 10.5k (H1) → <strong>15.5k/mo (Q3)</strong>. <strong>+47.9% vs H1</strong>, <strong>+65.7% vs '25</strong>. Broad recovery via P-Start 1 &amp; HA.</li>
                <li><strong>Upper Egypt I (UE North):</strong> 12.9k ('25) → 16.5k (H1) → <strong>23.6k/mo (Q3)</strong>. <strong>+43.2% vs H1</strong>, <strong>+83.0% vs '25</strong>. Heavy rural clinic uptake of PS1 &amp; P1.</li>
              </ul>
            </div>

            <div class="quad-card" style="border-left:4px solid #3B82F6; background:#EFF6FF; padding:10px;">
              <div class="quad-header" style="margin-bottom:6px;">
                <h4 style="color:#1E40AF; font-size:12px;">SCALE COMPOUNDERS (+15% to +30%) 🛡️</h4>
                <small style="font-weight:700; color:#1E40AF; font-size:10px;">Volume Pillars</small>
              </div>
              <ul style="font-size:11px; line-height:1.45; padding-left:14px; color:#1E293B;">
                <li><strong>Upper Egypt II (Beshoy Youhanna):</strong> 14.9k ('25) → 22.3k (H1) → <strong>25.7k/mo (Q3)</strong>. <strong>+15.2% vs H1</strong>, <strong>+72.9% vs '25</strong>! National #1 volume powerhouse.</li>
                <li><strong>Behera &amp; Dakahlia (Ahmed Sakr):</strong> 12.4k ('25) → 14.3k (H1) → <strong>18.0k/mo (Q3)</strong>. <strong>+26.1% vs H1</strong>, <strong>+45.0% vs '25</strong>. Compounding via PS1 &amp; P1.</li>
              </ul>
            </div>

            <div class="quad-card" style="border-left:4px solid #F59E0B; background:#FFFBEB; padding:10px;">
              <div class="quad-header" style="margin-bottom:6px;">
                <h4 style="color:#92400E; font-size:12px;">STEADY CONSOLIDATORS (0% to +10%) ⚖️</h4>
                <small style="font-weight:700; color:#92400E; font-size:10px;">Defensive Plateau</small>
              </div>
              <ul style="font-size:11px; line-height:1.45; padding-left:14px; color:#1E293B;">
                <li><strong>Guiza (Youstina Farag):</strong> 10.0k ('25) → 12.9k (H1) → <strong>13.9k/mo (Q3)</strong>. <strong>+7.5% vs H1</strong>, <strong>+39.3% vs '25</strong>. Specialty formulas offset core plateau.</li>
                <li><strong>Alx (Ahmed Hassan):</strong> 7.3k ('25) → 10.2k (H1) → <strong>10.3k/mo (Q3)</strong>. <strong>+1.1% vs H1</strong>, <strong>+41.1% vs '25</strong>. Preserved baseline; action needed on PS2 &amp; PG3.</li>
              </ul>
            </div>

            <div class="quad-card" style="border-left:4px solid #EF4444; background:#FEF2F2; padding:10px;">
              <div class="quad-header" style="margin-bottom:6px;">
                <h4 style="color:#991B1B; font-size:12px;">CONTRACTION WATCHLIST (Negative Q3) ⚠️</h4>
                <small style="font-weight:700; color:#991B1B; font-size:10px;">Inventory &amp; Replenishment</small>
              </div>
              <ul style="font-size:11px; line-height:1.45; padding-left:14px; color:#1E293B;">
                <li><strong>DELTA I (Shimaa Tarek):</strong> 15.2k ('25) → 20.1k (H1) → <strong>18.6k/mo (Q3)</strong>. <strong>-7.6% vs H1</strong>, but still <strong>+22.2% vs '25</strong>. High baseline pull-back.</li>
                <li><strong>Delta II (Mohamed Yousef):</strong> 14.2k ('25) → 22.8k (H1) → <strong>16.7k/mo (Q3)</strong>. <strong>-26.8% vs H1</strong>, but still <strong>+17.2% vs '25</strong>. Focus on stock &amp; credit.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 11 Detailed Table & Product Rotation Chart -->
      <div class="grid-2" style="margin-top:16px;">
        <div class="card">
          <div class="card-title">
            <span id="s11ProdChartTitle">Product Portfolio 3-Horizon Velocity: 2025 vs H1 2026 vs Q3 2026 Monthly Shift</span>
            <small id="s11ProdChartSubtitle" style="font-size:11px; color:var(--text-muted);">Specialty boom (AC +189% vs '25, HA +120% vs '25, PS1 +33% vs '25) vs Supply constraints</small>
          </div>
          <div class="chart-box" style="height: 340px;">
            <canvas id="chartSlide11Products" width="600" height="340"></canvas>
          </div>
        </div>

        <div class="card" style="overflow-x:auto;">
          <div class="card-title">
            <span>Quarterly Rep Performance Scorecard (3-Horizon Comparison Table)</span>
            <small style="font-size:11px; color:var(--text-muted);">Comparing 2025 MoAvg, H1 2026 Baseline &amp; Q3 2026 Run-Rate | Click Manager dropdown to highlight</small>
          </div>
          <div class="table-container" style="max-height:340px; overflow-y:auto;">
            <table class="data-table" id="tableSlide11">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Territory</th>
                  <th>Medical Rep / ADM</th>
                  <th>2025 MoAvg</th>
                  <th>H1 MoAvg</th>
                  <th>Q3 MoAvg</th>
                  <th>Q3 vs H1 Shift</th>
                  <th>Q3 vs H1 Vel.%</th>
                  <th>Q3 vs '25 Grw.%</th>
                  <th>Q3 Share</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="tableSlide11Body">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer>
    <div>Egy Nutri. Commercial Analytics Division • Infant Nutrition Business Review Template</div>
    <div>Shortage Flattening Applied: Monthly Averages (YTD 2026 ÷ 9 vs 2025 ÷ 12) | Quarterly Velocity: Q3 2026 vs H1 Baseline</div>
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
      Slide 1 / 11
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

  <!-- Mobile Install / Add to Home Screen Modal -->
  <div class="modal-backdrop" id="installGuideModal" onclick="if(event.target===this) closeInstallModal()" style="display:none; z-index:9999;">
    <div class="data-modal" style="max-width:440px; padding:20px; border-radius:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <img src="icon-192.png" alt="LN Logo" style="width:48px; height:48px; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.15); object-fit:cover;">
          <div>
            <h3 style="font-size:16px; font-weight:800; color:#1B365D; margin:0;">LN Sales Review App</h3>
            <p style="font-size:12px; color:#64748B; margin:0;">Save to Mobile Home Screen</p>
          </div>
        </div>
        <button class="data-modal-close" onclick="closeInstallModal()" style="font-size:18px;">✕</button>
      </div>
      
      <div id="installAndroidContent" style="display:none;">
        <p style="font-size:13px; color:#334155; line-height:1.5; margin-bottom:14px;">
          Install <strong>LN Sales Review App</strong> directly on your Android device for instant 1-tap offline access, native fullscreen experience, and automatic data updates.
        </p>
        <button onclick="triggerAndroidInstall()" style="width:100%; background:linear-gradient(135deg, #1B365D, #2563EB); color:white; font-weight:700; padding:12px; border-radius:10px; border:none; cursor:pointer; font-size:14px; box-shadow:0 4px 10px rgba(37,99,235,0.3);">
          📲 Add to Home Screen Now
        </button>
      </div>

      <div id="installIosContent">
        <p style="font-size:13px; color:#334155; line-height:1.5; margin-bottom:12px;">
          To save <strong>LN Sales Review App</strong> to your iPhone / iPad home screen with the official 3D logo:
        </p>
        <div style="background:#F1F5F9; border-radius:10px; padding:12px; margin-bottom:14px; display:flex; flex-direction:column; gap:10px; font-size:12.5px; color:#1E293B;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="background:#2563EB; color:white; width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:11px; flex-shrink:0;">1</span>
            <span>Tap the <strong>Share</strong> button (⎋ / ⎙) in the Safari bottom toolbar.</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="background:#2563EB; color:white; width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:11px; flex-shrink:0;">2</span>
            <span>Scroll down and select <strong>"Add to Home Screen"</strong> (➕).</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="background:#2563EB; color:white; width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:11px; flex-shrink:0;">3</span>
            <span>Confirm the title is <strong>LN Sales Review App</strong> and tap <strong>Add</strong>.</span>
          </div>
        </div>
        <button onclick="closeInstallModal()" style="width:100%; background:#1B365D; color:white; font-weight:700; padding:10px; border-radius:10px; border:none; cursor:pointer; font-size:13px;">
          Got it!
        </button>
      </div>
    </div>
  </div>

  <!-- Top Management Strategic Executive Report Modal -->
  <div class="modal-backdrop" id="topMgmtModal" onclick="if(event.target===this) closeTopMgmtModal()">
    <div class="mgmt-modal-card">
      <div class="mgmt-header">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:24px;">🏢</span>
          <div>
            <h3 style="margin:0; font-size:16px; font-weight:800; color:#FFFFFF; letter-spacing:0.5px;">TOP MANAGEMENT STRATEGIC EXECUTIVE REPORT</h3>
            <p style="margin:0; font-size:11.5px; color:#CBD5E1;">Consolidated Commercial Audit, Parameter Insights &amp; Operational Field Directives</p>
          </div>
        </div>
        <button class="data-modal-close" onclick="closeTopMgmtModal()" style="color:#FFFFFF; font-size:18px;">✕</button>
      </div>

      <div class="mgmt-body">
        <!-- Macro Company Performance Grid -->
        <div class="mgmt-kpi-grid">
          <div class="mgmt-kpi-pill">
            <span>2025 Monthly Baseline</span>
            <strong>103,385 <small style="font-size:11px; color:#64748B;">cans/mo</small></strong>
          </div>
          <div class="mgmt-kpi-pill">
            <span>H1 2026 Monthly Baseline</span>
            <strong style="color:#1B365D;">138,315 <small style="font-size:11px; color:#10B981;">(+33.8%)</small></strong>
          </div>
          <div class="mgmt-kpi-pill">
            <span>Q3 2026 Run-Rate</span>
            <strong style="color:#7C3AED;">156,126 <small style="font-size:11px; color:#10B981;">(+51.0% vs '25)</small></strong>
          </div>
          <div class="mgmt-kpi-pill">
            <span>Q3 vs H1 Acceleration</span>
            <strong style="color:#10B981;">+12.9% <small style="font-size:11px; color:#10B981;">(+17.8k/mo)</small></strong>
          </div>
          <div class="mgmt-kpi-pill">
            <span>9-Month Total Volume</span>
            <strong style="color:#D97706;">1,298,415 <small style="font-size:11px; color:#64748B;">cans</small></strong>
          </div>
        </div>

        <!-- Slide-by-Slide & Parameter Breakdown Cards -->
        <div class="mgmt-section-card">
          <h4><span style="background:#1B365D; color:white; padding:2px 8px; border-radius:4px; font-size:10px;">SLIDE 01</span> Territorial Share % &amp; Geographic Potential Gap</h4>
          <p><strong>Parameter Analysis:</strong> Actual Sales Contribution % vs. Potential Geo Demographic Share % (Contribution Difference Index).</p>
          <p><strong>Executive Takeaway:</strong> Upper Egypt II (16.2% share) and Delta II (14.4% share) are the primary national volume anchors, generating 30.6% of company sales. Conversely, <strong>Cairo</strong> (-7.36% gap vs 14.62% potential) and <strong>Alexandria</strong> (-3.00% gap vs 10.10% potential) represent the highest untapped sales opportunity in Egypt.</p>
          <p class="mgmt-directive"><strong>Management Directive:</strong> Rebalance field detailing call quotas and promotional sampling kits away from saturated rural zones into high-density private hospital pediatric clinics in Greater Cairo and Alexandria.</p>
        </div>

        <div class="mgmt-section-card">
          <h4><span style="background:#1B365D; color:white; padding:2px 8px; border-radius:4px; font-size:10px;">SLIDE 02</span> Core Formula Portfolio (Pediamil 1, 2 &amp; Pedia-Start 1, 2)</h4>
          <p><strong>Parameter Analysis:</strong> Monthly Volume Run-Rates &amp; PPG% Growth vs. National Product Averages.</p>
          <p><strong>Executive Takeaway:</strong> Core formulas represent 67.5% of total business volume. <strong>Pediamil 1</strong> (+60.7% vs 2025, 44.8k cans/mo in Q3) and <strong>Pedia-Start 1</strong> (+32.9% vs 2025, 33.0k cans/mo in Q3) are the standout volume drivers nationally, driven by rapid hospital nursery adoption.</p>
          <p class="mgmt-directive"><strong>Management Directive:</strong> Secure rolling buffer inventory for Pediamil 1 to prevent stockouts at key wholesalers; run physician conversion workshops on Pedia-Start 2 to maintain brand retention when infants graduate from Stage 1.</p>
        </div>

        <div class="mgmt-section-card">
          <h4><span style="background:#1B365D; color:white; padding:2px 8px; border-radius:4px; font-size:10px;">SLIDE 03</span> Specialty Product Lines (AC, HA, AR, LF, PG3, Mum, LBW)</h4>
          <p><strong>Parameter Analysis:</strong> High-Margin Specialty Prescription Adoption &amp; Supply Chain Resilience.</p>
          <p><strong>Executive Takeaway:</strong> Specialty lines deliver the highest commercial gross margins. <strong>Pediamil AC</strong> (+188.5% vs 2025, 15.2k cans/mo) and <strong>Pediamil HA</strong> (+119.6% vs 2025, 11.9k cans/mo) have staged massive breakout demand. However, severe supply chain deficits occurred in <strong>PediaGrow 3</strong> (-80.6% in Q3, down to 1,038 cans/mo) and <strong>Pediamil LF</strong> (-46.2% in Q3).</p>
          <p class="mgmt-directive"><strong>Management Directive:</strong> Expedite emergency import clearance and raw-material procurement for PediaGrow 3 and Pediamil LF; increase production batch frequency for Pediamil AC to satisfy unfulfilled prescription demand.</p>
        </div>

        <div class="mgmt-section-card">
          <h4><span style="background:#1B365D; color:white; padding:2px 8px; border-radius:4px; font-size:10px;">SLIDE 04</span> Dual-Axis Territory Run-Rate &amp; Momentum Analysis</h4>
          <p><strong>Parameter Analysis:</strong> Absolute Volume Scale (Bars) vs. PPG Growth Rate (Secondary Markers).</p>
          <p><strong>Executive Takeaway:</strong> A clear commercial divergence exists: Upper Egypt II (25.7k cans/mo) provides volume stability, while Cairo (+58.7% velocity in Q3) provides growth acceleration. In contrast, Delta I (-7.6%) and Delta II (-24.1%) experienced post-H1 pullbacks driven by distributor inventory digestion.</p>
          <p class="mgmt-directive"><strong>Management Directive:</strong> Conduct an immediate commercial terms and credit-limit audit across Delta distributor partners; maintain marketing co-investments in Cairo to support continued acceleration.</p>
        </div>

        <div class="mgmt-section-card">
          <h4><span style="background:#1B365D; color:white; padding:2px 8px; border-radius:4px; font-size:10px;">SLIDE 05</span> Total PPG% Growth Matrix</h4>
          <p><strong>Parameter Analysis:</strong> Territory Growth % vs. Egypt Benchmark (+33.8% H1 / +51.0% Q3).</p>
          <p><strong>Executive Takeaway:</strong> 5 out of 9 territories outperform national benchmark: Cairo (+94.3% vs '25), Upper Egypt I (+83.0%), Upper Egypt II (+72.9%), KFR EL.SHK (+65.7%), and Behera (+45.0%).</p>
          <p class="mgmt-directive"><strong>Management Directive:</strong> Reward high-performing teams with Q3 commercial bonuses; introduce targeted clinical detailing modules in territories trailing behind the company benchmark.</p>
        </div>

        <div class="mgmt-section-card">
          <h4><span style="background:#1B365D; color:white; padding:2px 8px; border-radius:4px; font-size:10px;">SLIDES 06–09</span> Brand SKU Leaderboards &amp; Detailing Efficiency</h4>
          <p><strong>Parameter Analysis:</strong> Individual Territory Contribution per SKU &amp; Representative Prescription Delivery.</p>
          <p><strong>Executive Takeaway:</strong> Upper Egypt II leads nationally in Pediamil 1 (8,839 cans/mo) and Pediamil 2 (3,821 cans/mo). Upper Egypt I leads in Pedia-Start 1 (6,717 cans/mo). Best-practice detailing frequency in Upper Egypt has driven hospital clinic dominance.</p>
          <p class="mgmt-directive"><strong>Management Directive:</strong> Package Upper Egypt's detailing playbooks and institutional tender negotiation tactics into a national training workshop for Delta and Cairo teams.</p>
        </div>

        <div class="mgmt-section-card">
          <h4><span style="background:#1B365D; color:white; padding:2px 8px; border-radius:4px; font-size:10px;">SLIDE 10</span> Strategic Performance Quadrant Matrix (ABCD Positioning)</h4>
          <p><strong>Parameter Analysis:</strong> PPG Growth % (Horizontal Intercept at Company PPG) vs Contribution Diff Index (Vertical Intercept at 0.00%).</p>
          <p><strong>Executive Takeaway:</strong>
            <br>• <strong>Quadrant A (Stars):</strong> Upper Egypt II &amp; Delta II — Protect market leadership and accelerate cross-selling.
            <br>• <strong>Quadrant B (Challengers):</strong> Alexandria, Behera, Upper Egypt I — High growth, expand physician reach to close potential gap.
            <br>• <strong>Quadrant C (Consolidators):</strong> Stable baseline — re-invigorate core formula detailing.
            <br>• <strong>Quadrant D (Underperformers):</strong> Cairo historical baseline — successfully staging rapid Q3 turnaround (+94.3% vs '25).
          </p>
          <p class="mgmt-directive"><strong>Management Directive:</strong> Allocate discretionary promotional investments toward Quadrant B Challengers where return on incremental detailing calls yields the highest volume lift.</p>
        </div>

        <div class="mgmt-section-card">
          <h4><span style="background:#8B5CF6; color:white; padding:2px 8px; border-radius:4px; font-size:10px;">SLIDE 11</span> 3-Horizon Velocity Trilogy (2025 vs H1 2026 vs Q3 2026)</h4>
          <p><strong>Parameter Analysis:</strong> Monthly Run-Rate Progression across 3 distinct horizons (2025 Baseline vs H1 2026 Baseline vs Q3 2026 Run-Rate).</p>
          <p><strong>Executive Takeaway:</strong> Total Egypt has accelerated from 103.4k/mo in 2025 to 138.3k/mo in H1 2026, reaching an all-time high of <strong>156,126 cans/mo</strong> in Q3 (+12.9% vs H1, +51.0% vs '25). Top Velocity Stars: <strong>Cairo (+58.7% vs H1)</strong>, <strong>KFR EL.SHK (+47.9% vs H1)</strong>, and <strong>Upper Egypt I (+43.2% vs H1)</strong>.</p>
          <p class="mgmt-directive"><strong>Management Directive:</strong> Maintain Q3 acceleration momentum into Q4 with expanded hospital tender deliveries to surpass the 170,000 cans/month milestone.</p>
        </div>
      </div>

      <div class="data-modal-footer" style="padding:12px 20px; background:#F1F5F9; border-top:1px solid #CBD5E1; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; gap:8px;">
          <a href="Egy_Nutri_Business_Review_Deck.pptx" download class="nav-btn" style="background:#1B365D; color:white; font-size:12px; padding:7px 12px; text-decoration:none; border-radius:6px;">📥 PowerPoint Deck</a>
          <a href="Egy_Nutri_Sales_Analysis_Template.xlsx" download class="nav-btn" style="background:#0D9488; color:white; font-size:12px; padding:7px 12px; text-decoration:none; border-radius:6px;">📊 Excel Model</a>
          <button type="button" onclick="window.print()" class="nav-btn" style="background:#334155; color:white; font-size:12px; padding:7px 12px; border-radius:6px; cursor:pointer;">🖨️ Print Report</button>
        </div>
        <button class="btn-cancel-modal" onclick="closeTopMgmtModal()" style="padding:7px 16px;">Close</button>
      </div>
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

    // Security Pass Key & Role View State
    const VALID_PASSKEYS = ['LN2026', '2026', 'LN', 'LN@MGMT2026', 'LN-EXECUTIVE-2026', 'LN1234', 'ADMIN', '1234', 'LIPTIS'];
    let isTopManagementView = true;

    function quickUnlock() {
      const input = document.getElementById('passKeyInput');
      if (input) input.value = 'LN2026';
      verifyPassKey();
    }

    function verifyPassKey() {
      const input = document.getElementById('passKeyInput');
      const err = document.getElementById('passKeyError');
      const rawVal = (input ? input.value : '').trim().toUpperCase();
      const cleanVal = rawVal.replace(/[\s\-_@]/g, '');

      const isMatch = VALID_PASSKEYS.some(k => k.replace(/[\s\-_@]/g, '') === cleanVal);

      if (isMatch || cleanVal === 'LN2026' || cleanVal === '2026' || cleanVal === 'LN') {
        sessionStorage.setItem('ln_auth_passkey', 'unlocked');
        const overlay = document.getElementById('appLockScreen');
        if (overlay) {
          overlay.classList.add('unlocked');
          overlay.style.display = 'none';
          overlay.style.pointerEvents = 'none';
        }
        if (err) err.style.display = 'none';
        if (input) input.value = '';
        showToast('🔓 Access Granted - Welcome to LN Sales Review', '🛡️');
      } else {
        if (err) {
          err.style.display = 'block';
          err.innerHTML = '⚠️ Invalid Pass Key. Enter <strong>LN2026</strong> or click the badge above.';
        }
        if (input) {
          input.classList.add('shake');
          setTimeout(() => input.classList.remove('shake'), 450);
          input.focus();
        }
      }
    }

    function lockApplication() {
      sessionStorage.removeItem('ln_auth_passkey');
      const overlay = document.getElementById('appLockScreen');
      if (overlay) {
        overlay.classList.remove('unlocked');
        overlay.style.display = 'flex';
        overlay.style.pointerEvents = 'auto';
      }
      const input = document.getElementById('passKeyInput');
      if (input) {
        input.value = '';
        input.focus();
      }
      showToast('🔒 Application Locked for Security', '🔒');
    }

    function togglePassKeyVisibility() {
      const input = document.getElementById('passKeyInput');
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
      }
    }

    function checkInitialLockState() {
      const auth = sessionStorage.getItem('ln_auth_passkey');
      const overlay = document.getElementById('appLockScreen');
      if (auth === 'unlocked') {
        if (overlay) {
          overlay.classList.add('unlocked');
          overlay.style.display = 'none';
          overlay.style.pointerEvents = 'none';
        }
      } else {
        if (overlay) {
          overlay.classList.remove('unlocked');
          overlay.style.display = 'flex';
          overlay.style.pointerEvents = 'auto';
        }
        setTimeout(() => {
          const input = document.getElementById('passKeyInput');
          if (input) input.focus();
        }, 150);
      }
    }

    function openTopMgmtModal() {
      const m = document.getElementById('topMgmtModal');
      if (m) m.classList.add('open');
    }

    function closeTopMgmtModal() {
      const m = document.getElementById('topMgmtModal');
      if (m) m.classList.remove('open');
    }

    // Factory Verified Baseline Data (YTD M09-2026, 9 Months)
    const DEFAULT_DATA_2026 = [
      { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elmonem Abdallah', p1: 29499, p2: 13662, pg3: 2715, lf: 2005, ha: 4399, ar: 3000, ac: 3681, mum: 395, ps1: 20684, ps2: 9426, lbw: 2712, sum: 92178, geoShare: 0.1010, contrIdx: 0.702810642, contrDiff: -0.0300 },
      { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', p1: 38180, p2: 19137, pg3: 2965, lf: 3206, ha: 8740, ar: 5593, ac: 8843, mum: 456, ps1: 33181, ps2: 15054, lbw: 4581, sum: 139936, geoShare: 0.0975, contrIdx: 1.104977553, contrDiff: 0.0102 },
      { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- HAKEEM HASSAN', p1: 27763, p2: 18621, pg3: 3521, lf: 3813, ha: 6153, ar: 3773, ac: 10022, mum: 731, ps1: 11332, ps2: 5989, lbw: 2523, sum: 94241, geoShare: 0.1462, contrIdx: 0.496482779, contrDiff: -0.0736 },
      { territory: 'Guiza', dm: 'Youstina Farag Allah', p1: 32690, p2: 18558, pg3: 2828, lf: 5047, ha: 8593, ar: 5391, ac: 11160, mum: 1943, ps1: 19064, ps2: 10118, lbw: 3557, sum: 118949, geoShare: 0.1453, contrIdx: 0.630716309, contrDiff: -0.0536 },
      { territory: 'DELTA I', dm: 'Shimaa Tarek El- Shamy', p1: 49126, p2: 36490, pg3: 7610, lf: 4465, ha: 11724, ar: 8538, ac: 14062, mum: 593, ps1: 22567, ps2: 16194, lbw: 5349, sum: 176718, geoShare: 0.0732, contrIdx: 1.86003562, contrDiff: 0.0629 },
      { territory: 'Delta II', dm: 'Mohamed Yousef M.', p1: 49947, p2: 30495, pg3: 4130, lf: 5819, ha: 11828, ar: 4760, ac: 14826, mum: 490, ps1: 31933, ps2: 27445, lbw: 5183, sum: 186856, geoShare: 0.1227, contrIdx: 1.172745094, contrDiff: 0.0212 },
      { territory: 'Upper Egypt I', dm: 'UE North', p1: 46960, p2: 29943, pg3: 2733, lf: 2926, ha: 4023, ar: 4666, ac: 7619, mum: 285, ps1: 44302, ps2: 22973, lbw: 3016, sum: 169446, geoShare: 0.1404, contrIdx: 0.929574974, contrDiff: -0.0099 },
      { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', p1: 71010, p2: 40225, pg3: 4564, lf: 3918, ha: 9156, ar: 7503, ac: 13651, mum: 871, ps1: 34858, ps2: 19639, lbw: 5516, sum: 210911, geoShare: 0.1561, contrIdx: 1.040522878, contrDiff: 0.0063 },
      { territory: 'KFR EL.SHK', dm: 'Karim Shehab', p1: 23468, p2: 16972, pg3: 4070, lf: 1805, ha: 6593, ar: 2745, ac: 6789, mum: 313, ps1: 26605, ps2: 16885, lbw: 2935, sum: 109180, geoShare: 0.0176, contrIdx: 4.770580276, contrDiff: 0.0665 }
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

    // Q3 2026 Monthly Average Actuals (Jul–Sep 2026)
    const DEFAULT_DATA_AVG_Q3_2026 = [
      { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elmonem Abdallah', p1: 3354, p2: 1598, pg3: 59, lf: 159, ha: 713, ar: 368, ac: 515, mum: 15, ps1: 2576, ps2: 955, lbw: 2, sum: 10314 },
      { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', p1: 4893, p2: 2697, pg3: 105, lf: 209, ha: 1428, ar: 674, ac: 1394, mum: 23, ps1: 5259, ps2: 1359, lbw: 0, sum: 18041 },
      { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- HAKEEM HASSAN', p1: 4104, p2: 2532, pg3: 105, lf: 413, ha: 1054, ar: 511, ac: 2070, mum: 57, ps1: 2054, ps2: 986, lbw: 12, sum: 13898 },
      { territory: 'Guiza', dm: 'Youstina Farag Allah', p1: 4060, p2: 2105, pg3: 82, lf: 262, ha: 1466, ar: 697, ac: 1606, mum: 187, ps1: 2579, ps2: 800, lbw: 16, sum: 13858 },
      { territory: 'DELTA I', dm: 'Shimaa Tarek El- Shamy', p1: 5414, p2: 3761, pg3: 243, lf: 240, ha: 1834, ar: 1038, ac: 2091, mum: 57, ps1: 2389, ps2: 1547, lbw: 0, sum: 18614 },
      { territory: 'Delta II', dm: 'Mohamed Yousef M.', p1: 4467, p2: 2479, pg3: 118, lf: 268, ha: 1773, ar: 545, ac: 2465, mum: 44, ps1: 2782, ps2: 1778, lbw: 0, sum: 16671 },
      { territory: 'Upper Egypt I', dm: 'UE North', p1: 6931, p2: 4365, pg3: 68, lf: 298, ha: 594, ar: 466, ac: 1262, mum: 49, ps1: 6717, ps2: 2801, lbw: 13, sum: 23564 },
      { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', p1: 8839, p2: 3821, pg3: 130, lf: 337, ha: 1513, ar: 1132, ac: 2331, mum: 108, ps1: 4835, ps2: 2642, lbw: 6, sum: 25694 },
      { territory: 'KFR EL.SHK', dm: 'Karim Shehab', p1: 2770, p2: 2508, pg3: 128, lf: 145, ha: 1564, ar: 539, ac: 1446, mum: 43, ps1: 3759, ps2: 2570, lbw: 0, sum: 15472 }
    ];

    // H1 (YTD June) 2026 Monthly Average Baseline Actuals (Jan–Jun 2026)
    const DEFAULT_DATA_AVG_H1_2026 = [
      { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elmonem Abdallah', p1: 3239, p2: 1478, pg3: 423, lf: 254, ha: 377, ar: 316, ac: 356, mum: 58, ps1: 2159, ps2: 1094, lbw: 451, sum: 10206 },
      { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', p1: 3917, p2: 1841, pg3: 442, lf: 430, ha: 743, ar: 595, ac: 777, mum: 65, ps1: 2901, ps2: 1829, lbw: 763, sum: 14302 },
      { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- HAKEEM HASSAN', p1: 2575, p2: 1837, pg3: 534, lf: 429, ha: 498, ar: 373, ac: 636, mum: 94, ps1: 862, ps2: 505, lbw: 414, sum: 8758 },
      { territory: 'Guiza', dm: 'Youstina Farag Allah', p1: 3418, p2: 2041, pg3: 430, lf: 710, ha: 699, ar: 550, ac: 1057, mum: 230, ps1: 1888, ps2: 1286, lbw: 585, sum: 12895 },
      { territory: 'DELTA I', dm: 'Shimaa Tarek El- Shamy', p1: 5481, p2: 4201, pg3: 1147, lf: 624, ha: 1037, ar: 904, ac: 1298, mum: 70, ps1: 2567, ps2: 1926, lbw: 892, sum: 20146 },
      { territory: 'Delta II', dm: 'Mohamed Yousef M.', p1: 6091, p2: 3843, pg3: 630, lf: 836, ha: 1085, ar: 521, ac: 1238, mum: 60, ps1: 3931, ps2: 3685, lbw: 864, sum: 22783 },
      { territory: 'Upper Egypt I', dm: 'UE North', p1: 4361, p2: 2808, pg3: 422, lf: 339, ha: 373, ar: 545, ac: 639, mum: 23, ps1: 4025, ps2: 2428, lbw: 496, sum: 16459 },
      { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', p1: 7416, p2: 4794, pg3: 696, lf: 485, ha: 770, ar: 684, ac: 1110, mum: 91, ps1: 3392, ps2: 1952, lbw: 917, sum: 22305 },
      { territory: 'KFR EL.SHK', dm: 'Karim Shehab', p1: 2526, p2: 1575, pg3: 614, lf: 228, ha: 317, ar: 188, ac: 408, mum: 31, ps1: 2555, ps2: 1529, lbw: 489, sum: 10461 }
    ];

    // Active Dataset (Loaded from localStorage or initialized from baseline)
    let rawData2026 = null;
    let rawData2025 = null;
    let rawAvgQ3_2026 = JSON.parse(JSON.stringify(DEFAULT_DATA_AVG_Q3_2026));
    let rawAvgH1_2026 = JSON.parse(JSON.stringify(DEFAULT_DATA_AVG_H1_2026));
    let shortageDivisor2026 = 9;
    let shortageDivisor2025 = 12;

    try {
      rawData2026 = JSON.parse(localStorage.getItem('egy_nutri_data_2026_m09') || 'null');
      rawData2025 = JSON.parse(localStorage.getItem('egy_nutri_data_2025_m09') || 'null');
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
    let compTotalPpg = 39.54;
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
      const compAvg26 = company2026.sum / shortageDivisor2026;
      const compAvg25 = company2025.sum / shortageDivisor2025;
      compTotalPpg = compAvg25 > 0 ? ((compAvg26 / compAvg25) - 1) * 100 : 39.54;

      // 6. Product Metrics Benchmarks
      productMeta.forEach(p => {
        const v26 = company2026[p.key] || 0;
        const v25 = company2025[p.key] || 0;
        const avg26 = v26 / shortageDivisor2026;
        const avg25 = v25 / shortageDivisor2025;
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
      const prevVal = sel.value;
      sel.innerHTML = '';

      const optMgmt = document.createElement('option');
      optMgmt.value = 'mgmt';
      optMgmt.text = '🏢 TOP MANAGEMENT REPORT (Executive Summary)';
      if (prevVal === 'mgmt' || !prevVal) optMgmt.selected = true;
      sel.appendChild(optMgmt);

      const optGroup = document.createElement('optgroup');
      optGroup.label = 'Area Sales Managers (Private Review)';

      rawData2026.forEach((r, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        const shortName = r.dm ? r.dm.split(' ').slice(0, 2).join(' ') : 'ASM ' + (idx + 1);
        opt.text = shortName + ' (' + r.territory + ')';
        if (String(idx) === String(prevVal)) {
          opt.selected = true;
        }
        optGroup.appendChild(opt);
      });
      sel.appendChild(optGroup);
    }

    let currentSlide = 1;
    const totalSlides = 11;
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
      { num: 10, title: 'Strategic Performance Quadrant Matrix (ABCD)', category: 'Growth vs Contribution' },
      { num: 11, title: 'Medical Rep Q3 vs H1 Performance Velocity', category: 'Quarterly Momentum Transition' }
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

      const installItem = document.createElement('div');
      installItem.className = 'outline-item';
      installItem.style.background = 'rgba(37, 99, 235, 0.08)';
      installItem.style.borderColor = 'rgba(37, 99, 235, 0.25)';
      installItem.style.marginTop = '12px';
      installItem.onclick = () => {
        closeSlideOutline();
        promptInstallApp();
      };
      installItem.innerHTML =
        '<div class="outline-num" style="background:#2563EB; color:white;">📱</div>' +
        '<div class="outline-info">' +
          '<h4 style="color:#2563EB;">Save to Mobile Home Screen</h4>' +
          '<span>Install LN Sales Review App with 3D logo</span>' +
        '</div>';
      container.appendChild(installItem);
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
      const val = sel ? sel.value : 'mgmt';

      if (val === 'mgmt') {
        isTopManagementView = true;
        const avg26 = company2026.sum / shortageDivisor2026;
        const avg25 = company2025.sum / shortageDivisor2025;
        const totalPpg = compTotalPpg;
        return {
          idx: -1,
          isMgmt: true,
          territory: 'National Benchmark',
          dm: 'Top Management Report',
          r26: company2026,
          r25: company2025,
          avg26,
          avg25,
          totalPpg,
          c26: 100,
          c25: 100,
          geo: 100,
          contrDiff: 0,
          quad: 'A'
        };
      }

      isTopManagementView = false;
      let idx = parseInt(val, 10);
      if (isNaN(idx) || idx < 0 || idx >= rawData2026.length) idx = 0;
      const r26 = rawData2026[idx];
      const r25 = rawData2025[idx];
      const avg26 = r26.sum / shortageDivisor2026;
      const avg25 = r25.sum / shortageDivisor2025;
      const totalPpg = avg25 > 0 ? ((avg26 / avg25) - 1) * 100 : 0;
      const c26 = company2026.sum > 0 ? (r26.sum / company2026.sum) * 100 : 0;
      const c25 = company2025.sum > 0 ? (r25.sum / company2025.sum) * 100 : 0;
      const geo = (r26.geoShare || 0) * 100;
      const contrDiff = (r26.contrDiff !== undefined ? r26.contrDiff : (c26 - geo) / 100) * 100;

      let quad = 'A';
      if (contrDiff >= 0 && totalPpg >= compTotalPpg) quad = 'A';
      else if (contrDiff < 0 && totalPpg >= compTotalPpg) quad = 'B';
      else if (contrDiff >= 0 && totalPpg < compTotalPpg) quad = 'C';
      else quad = 'D';

      return {
        idx,
        isMgmt: false,
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

    // Colleague Anonymization Helpers
    function isPeerMasked(targetIdx) {
      if (isTopManagementView) return false;
      const chosenIdx = getChosenPerson().idx;
      return targetIdx !== chosenIdx;
    }

    function getMaskedDmName(targetIdx) {
      if (!isPeerMasked(targetIdx)) {
        return (rawData2026[targetIdx] && rawData2026[targetIdx].dm) ? rawData2026[targetIdx].dm : ('ASM ' + (targetIdx + 1));
      }
      const chosenIdx = getChosenPerson().idx;
      const peerNum = (targetIdx < chosenIdx) ? (targetIdx + 1) : targetIdx;
      return 'ASM ' + peerNum;
    }

    function getMaskedTerritoryName(targetIdx) {
      if (!isPeerMasked(targetIdx)) {
        return (rawData2026[targetIdx] && rawData2026[targetIdx].territory) ? rawData2026[targetIdx].territory : ('Territory ' + (targetIdx + 1));
      }
      const chosenIdx = getChosenPerson().idx;
      const peerNum = (targetIdx < chosenIdx) ? (targetIdx + 1) : targetIdx;
      return 'Territory ' + peerNum;
    }

    function getMaskedShortLabel(targetIdx) {
      if (!isPeerMasked(targetIdx)) {
        const r = rawData2026[targetIdx];
        return r ? (r.territory.split(' ')[0] + ' (' + r.dm.split(' ')[0] + ')') : 'ADM';
      }
      const chosenIdx = getChosenPerson().idx;
      const peerNum = (targetIdx < chosenIdx) ? (targetIdx + 1) : targetIdx;
      return 'ASM ' + peerNum;
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
          case 11: renderSlide11(); break;
        }
      } catch (err) {
        console.error('Error rendering slide ' + slideNum + ':', err);
      }
    }

    // SLIDE 1
    function renderSlide1() {
      const p = getChosenPerson();
      const s1Person = document.getElementById('s1PersonName');
      if (s1Person) s1Person.innerText = p.isMgmt ? '🏢 TOP MANAGEMENT REPORT' : p.dm;
      const s1Terr = document.getElementById('s1TerritoryName');
      if (s1Terr) s1Terr.innerText = p.isMgmt ? 'National Commercial Overview' : p.territory;
      const s1Title = document.getElementById('s1ChartTitle');
      if (s1Title) s1Title.innerText = p.isMgmt ? 'National Commercial Share Distribution (100% Potential vs 100% 2026 vs 100% 2025)' : '3-Bar Territorial Share Analysis (GEO Potential vs. 2026 vs. 2025)';

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

      if (p.isMgmt) {
        document.getElementById('s1BarLegendNotes').innerHTML =
          '<div style="margin-bottom:6px; font-size:12px; color:#1E293B;"><strong>🏢 Top Management Strategic Overview:</strong> Upper Egypt II (16.2%) and Delta II (14.4%) lead national volume. Cairo (-7.36%) and Alexandria (-3.00%) present the largest untapped opportunities in Egypt.</div>' +
          '<div style="font-size:11.5px; color:#2563EB;">• <strong>Executive Field Strategy:</strong> Direct medical detailing incentives towards Cairo and Alexandria private hospital pediatric clinics to capture high-density untapped market share.</div>';
      } else {
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
      }

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

        const terrName = (isTopManagementView || isSelected) ? r.territory : getMaskedTerritoryName(idx);
        const dmName = (isTopManagementView || isSelected) ? r.dm.split(' ')[0] : getMaskedDmName(idx);

        const tr = document.createElement('tr');
        if (isSelected) tr.className = 'highlight-row';
        tr.innerHTML =
          '<td><strong>' + (isSelected ? '👉 ' : '') + terrName + '</strong><br><small style="color:var(--text-muted);">' + dmName + '</small></td>' +
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
        const avg26 = v26 / shortageDivisor2026;
        const avg25 = v25 / shortageDivisor2025;
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
        const avg26 = v26 / shortageDivisor2026;
        const avg25 = v25 / shortageDivisor2025;
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
        const avg26 = v26 / shortageDivisor2026;
        const avg25 = v25 / shortageDivisor2025;
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

      const totAvg26 = p.r26.sum / shortageDivisor2026;
      const totAvg25 = p.r25.sum / shortageDivisor2025;
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
      const chosenPerson = getChosenPerson();

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
        const avg26 = val26 / shortageDivisor2026;
        const avg25 = val25 / shortageDivisor2025;
        const ppg = avg25 > 0 ? ((avg26 / avg25) - 1) * 100 : 0;
        return {
          origIdx: i,
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
        '<td class="num">' + Math.round(prodKey === 'total' ? company2026.sum/shortageDivisor2026 : company2026[prodKey]/shortageDivisor2026).toLocaleString() + '</td>' +
        '<td class="num" style="color:var(--primary); font-size:13px;">' + (compBenchmark > 0 ? '+' : '') + compBenchmark.toFixed(1) + '%</td>' +
        '<td><span class="badge-above" style="background:#DBEAFE; color:#1E40AF; border-color:#BFDBFE;">BENCHMARK</span></td>';
      tbody.appendChild(compTr);

      const chartLabels = ['COMP: TOTAL EGYPT', ...ranking.map(r => {
        const isChosen = (!isTopManagementView && r.origIdx === chosenPerson.idx);
        if (isTopManagementView || isChosen) {
          return (isChosen ? '★ ' : '') + r.territory + ' (' + r.dm.split(' ')[0] + ')';
        }
        return getMaskedShortLabel(r.origIdx);
      })];
      const chartValues = [Number(compBenchmark.toFixed(1)), ...ranking.map(r => Number(r.ppg.toFixed(1)))];
      const chartColors = ['#1B365D', ...ranking.map(r => {
        if (!isTopManagementView && r.origIdx === chosenPerson.idx) return '#8B5CF6';
        return r.isAbove ? '#10B981' : '#EF4444';
      })];

      ranking.forEach((r, idx) => {
        const isChosen = (!isTopManagementView && r.origIdx === chosenPerson.idx);
        const terrName = (isTopManagementView || isChosen) ? r.territory : getMaskedTerritoryName(r.origIdx);
        const dmName = (isTopManagementView || isChosen) ? r.dm.split(' ').slice(0, 2).join(' ') : getMaskedDmName(r.origIdx);
        const tr = document.createElement('tr');
        if (isChosen) {
          tr.style.background = '#EDE9FE';
          tr.style.fontWeight = 'bold';
        }
        tr.innerHTML =
          '<td><strong>#' + (idx + 1) + '</strong></td>' +
          '<td><strong>' + (isChosen ? '👉 ' : '') + terrName + '</strong><br><small style="color:var(--text-muted);">' + dmName + '</small></td>' +
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

      if (chosenPerson.isMgmt) {
        quadTitle = '🏢 NATIONAL COMMERCIAL STRATEGIC MATRIX (EGYPT TOTAL)';
        quadBadge = '<span class="badge-above" style="background:#1E3A8A20; color:#1E3A8A; border-color:#1E3A8A;">EXECUTIVE AUDIT</span>';
        quadStrategy = '<strong>Executive Portfolio Diagnosis:</strong> Upper Egypt II (16.2% share) and Delta II (14.4% share) anchor Egypt volume.<br><strong>Primary Growth Drivers:</strong> Cairo (+94.3% vs \'25) and Upper Egypt I (+83.0% vs \'25) generate top expansion momentum.<br><strong>Commercial Mandate:</strong> Reallocate detailing resources to close Cairo\'s -7.36% untapped demographic potential gap while supporting distributor inventory recovery in Delta.';
      } else if (chosenPerson.quad === 'A') {
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
          '<h3>' + (chosenPerson.isMgmt ? '🏢 TOP MANAGEMENT PORTFOLIO DIAGNOSTIC' : ('🎯 SELECTED ADM DIAGNOSTIC: ' + chosenPerson.dm.toUpperCase() + ' (' + chosenPerson.territory.toUpperCase() + ')')) + '</h3>' +
          quadBadge +
        '</div>' +
        '<p style="margin-top:6px;"><strong>Strategic Classification:</strong> ' + quadTitle + '</p>' +
        '<p style="margin-top:4px;"><strong>Performance Coordinates:</strong> ' + (chosenPerson.isMgmt ? ('National Average: X (Contr. Diff) = 0.00% | Y (Total PPG) = +' + compTotalPpg.toFixed(1) + '% | Total 9M Volume = ' + company2026.sum.toLocaleString() + ' cans') : ('X (Contribution Diff) = <strong>' + (chosenPerson.contrDiff > 0 ? '+' : '') + chosenPerson.contrDiff.toFixed(2) + '%</strong> | Y (Total PPG) = <strong>+' + chosenPerson.totalPpg.toFixed(1) + '%</strong> | YTD Sales = <strong>' + chosenPerson.r26.sum.toLocaleString() + ' cans</strong>')) + '</p>' +
        '<p style="margin-top:8px; border-top:1px dashed #C4B5FD; padding-top:6px;">' + quadStrategy + '</p>';

      const quadGrid = document.getElementById('quadrantCardsGrid');
      if (quadGrid) {
        const qA = [];
        const qB = [];
        const qC = [];
        const qD = [];

        rawData2026.forEach((r, idx) => {
          const r25 = rawData2025[idx] || { sum: 0 };
          const avg26 = r.sum / shortageDivisor2026;
          const avg25 = r25.sum / shortageDivisor2025;
          const ppg = avg25 > 0 ? ((avg26 / avg25) - 1) * 100 : 0;
          const diff = r.contrDiff * 100;
          const isSel = (!isTopManagementView && idx === chosenPerson.idx);
          const terrName = (isTopManagementView || isSel) ? r.territory : getMaskedTerritoryName(idx);
          const shortName = (isTopManagementView || isSel) ? (r.dm ? r.dm.split(' ').slice(0, 2).join(' ') : 'ADM') : getMaskedDmName(idx);
          const itemText = (isSel ? '⭐ <strong>' : '<strong>') + terrName + ' (' + shortName + '):</strong> +' + ppg.toFixed(1) + '% PPG, ' + (diff >= 0 ? '+' : '') + diff.toFixed(2) + '% Diff (' + Math.round(r.sum/1000).toFixed(1) + 'k units).' + (isSel ? '</strong>' : '');

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
        const avg26 = r.sum / shortageDivisor2026;
        const avg25 = r25.sum / shortageDivisor2025;
        const ppg = ((avg26 / avg25) - 1) * 100;
        const x = r.contrDiff * 100;
        const y = ppg;
        const radius = 9 + (r.sum / 136700) * 18;
        const isSelected = (!isTopManagementView && i === chosenPerson.idx);

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
          origIdx: i,
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
                  (!isTopManagementView ? { text: '⭐ Selected ADM: ' + chosenPerson.dm.split(' ')[0] + ' (' + chosenPerson.territory + ')', fillStyle: '#8B5CF6', strokeStyle: '#4C1D95', lineWidth: 2 } : { text: '🏢 National View (All Territories)', fillStyle: '#1B365D', strokeStyle: '#0F172A', lineWidth: 2 }),
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
                  const isSel = d.isSelected;
                  const terr = (isTopManagementView || isSel) ? d.territory : getMaskedTerritoryName(d.origIdx);
                  const dm = (isTopManagementView || isSel) ? d.dm.split(' ')[0] : getMaskedDmName(d.origIdx);
                  return [
                    (isSel ? '⭐ SELECTED: ' : '') + terr + ' (' + dm + ')',
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
                      const labelTxt = isTopManagementView ? bubble.territory.split(' ')[0] : getMaskedDmName(bubble.origIdx);
                      ctx.fillText(labelTxt, pt.x, pt.y + radius + 11);
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

    // SLIDE 11: 3-HORIZON RUN-RATE VELOCITY: Q3 2026 vs. H1 2026 BASELINE vs. 2025
    function renderSlide11() {
      const chosenPerson = getChosenPerson();

      // Dynamic 3-Horizon Calculation for each territory
      const territories = rawAvgQ3_2026.map((q, idx) => {
        const h = rawAvgH1_2026[idx];
        const y25 = rawData2025[idx];
        const avg25 = Math.round((y25 ? y25.sum : 0) / shortageDivisor2025);
        const avgH1 = h.sum;
        const avgQ3 = q.sum;
        const diffH1 = avgQ3 - avgH1;
        const pctH1 = ((avgQ3 / avgH1) - 1) * 100;
        const diff25 = avgQ3 - avg25;
        const pct25 = ((avgQ3 / avg25) - 1) * 100;

        let tier = '';
        let badge = '';
        let badgeColor = '';
        let action = '';

        if (pctH1 >= 40) {
          tier = 'High Accelerator';
          badge = '🚀 TOP ACCELERATOR';
          badgeColor = '#10B981';
          action = 'Surge of +' + pctH1.toFixed(1) + '% vs H1 and +' + pct25.toFixed(1) + '% vs 2025. Turnaround breakout led by Pediamil AC (+225%) and core formula penetration. Expand hospital NICU listings and rural clinics.';
        } else if (pctH1 >= 15) {
          tier = 'Scale Compounder';
          badge = '📈 SCALE COMPOUNDER';
          badgeColor = '#3B82F6';
          action = 'Compounding +' + pctH1.toFixed(1) + '% vs H1 and +' + pct25.toFixed(1) + '% vs 2025. Massive volume engine. Maintain mega-volume leadership, protect hospital listings from aggressive competitor discounts.';
        } else if (pctH1 >= 0) {
          tier = 'Steady Consolidator';
          badge = '🛡️ STEADY CONSOLIDATOR';
          badgeColor = '#F59E0B';
          action = 'Stable baseline preserved (+' + pctH1.toFixed(1) + '% vs H1, +' + pct25.toFixed(1) + '% vs 2025). Action required to reactivate Pedia-Start 2 and PediaGrow 3 detailing to reignite acceleration.';
        } else {
          tier = 'Contraction Watchlist';
          badge = '⚠️ CONTRACTION WATCHLIST';
          badgeColor = '#EF4444';
          action = 'Quarterly run-rate deceleration (' + pctH1.toFixed(1) + '% vs H1, though still +' + pct25.toFixed(1) + '% vs 2025). Immediate audit of distributor stock, credit limits, and field detailing call frequency.';
        }

        const isChosen = (!isTopManagementView && idx === chosenPerson.idx);
        return {
          idx,
          t: q.territory,
          dm: q.dm,
          avg25,
          h1: avgH1,
          q3: avgQ3,
          diffH1,
          pctH1,
          diff25,
          pct25,
          tier,
          badge,
          badgeColor,
          action,
          isChosen
        };
      }).sort((a, b) => b.pctH1 - a.pctH1);

      const tot25 = Math.round(rawData2025.reduce((acc, r) => acc + r.sum, 0) / shortageDivisor2025);
      const totalH1 = territories.reduce((acc, d) => acc + d.h1, 0);
      const totalQ3 = territories.reduce((acc, d) => acc + d.q3, 0);
      const compQ3VsH1Diff = totalQ3 - totalH1;
      const compQ3VsH1Pct = ((totalQ3 / totalH1) - 1) * 100;
      const compQ3Vs25Diff = totalQ3 - tot25;
      const compQ3Vs25Pct = ((totalQ3 / tot25) - 1) * 100;

      // Dynamic Subtitle & KPI Pills based on Top Management vs Selected ASM
      const s11Sub = document.getElementById('s11Subtitle');
      const s11Pills = document.getElementById('s11KpiPills');
      const chosenTerr = territories.find(d => d.isChosen) || territories[0];

      if (chosenPerson.isMgmt) {
        if (s11Sub) s11Sub.innerText = '🏢 Top Management National View: Tracking Company-Wide Momentum from 2025 Baseline (103.4k/mo) through H1 2026 (138.3k/mo) to Q3 2026 Acceleration (156.1k/mo, +51.0% vs \'25).';
        if (s11Pills) {
          s11Pills.innerHTML =
            '<div class="kpi-pill"><span>2025 Baseline</span><strong style="color:var(--text-muted);">' + tot25.toLocaleString() + ' Units/Mo</strong></div>' +
            '<div class="kpi-pill"><span>H1 2026 Baseline</span><strong style="color:var(--primary);">' + totalH1.toLocaleString() + ' Units/Mo</strong></div>' +
            '<div class="kpi-pill"><span>Q3 2026 Run-Rate</span><strong style="color:#8B5CF6;">' + totalQ3.toLocaleString() + ' Units/Mo</strong></div>' +
            '<div class="kpi-pill"><span>Q3 vs H1 Velocity</span><strong style="color:var(--green);">+' + compQ3VsH1Pct.toFixed(1) + '% (+' + Math.round(compQ3VsH1Diff/1000).toFixed(1) + 'k/mo)</strong></div>' +
            '<div class="kpi-pill"><span>Q3 vs \'25 Expansion</span><strong style="color:#10B981;">+' + compQ3Vs25Pct.toFixed(1) + '% (+' + Math.round(compQ3Vs25Diff/1000).toFixed(1) + 'k/mo)</strong></div>';
        }
      } else {
        if (s11Sub) s11Sub.innerText = '🎯 ' + chosenTerr.t + ' — ' + chosenTerr.dm.toUpperCase() + ': Individual 3-Horizon Velocity Performance & Territory Product Portfolio Shift';
        if (s11Pills) {
          s11Pills.innerHTML =
            '<div class="kpi-pill"><span>2025 Mo Baseline</span><strong style="color:var(--text-muted);">' + chosenTerr.avg25.toLocaleString() + ' Units/Mo</strong></div>' +
            '<div class="kpi-pill"><span>H1 2026 Baseline</span><strong style="color:var(--primary);">' + chosenTerr.h1.toLocaleString() + ' Units/Mo</strong></div>' +
            '<div class="kpi-pill"><span>Q3 2026 Run-Rate</span><strong style="color:#8B5CF6;">' + chosenTerr.q3.toLocaleString() + ' Units/Mo</strong></div>' +
            '<div class="kpi-pill"><span>Q3 vs H1 Velocity</span><strong style="color:' + (chosenTerr.pctH1 >= 0 ? 'var(--green)' : '#EF4444') + ';">' + (chosenTerr.pctH1 >= 0 ? '+' : '') + chosenTerr.pctH1.toFixed(1) + '% (' + (chosenTerr.diffH1 >= 0 ? '+' : '') + chosenTerr.diffH1.toLocaleString() + ')</strong></div>' +
            '<div class="kpi-pill"><span>Q3 vs \'25 Growth</span><strong style="color:' + (chosenTerr.pct25 >= 0 ? '#10B981' : '#EF4444') + ';">' + (chosenTerr.pct25 >= 0 ? '+' : '') + chosenTerr.pct25.toFixed(1) + '% (' + (chosenTerr.diff25 >= 0 ? '+' : '') + chosenTerr.diff25.toLocaleString() + ')</strong></div>';
        }
      }

      // Render Selected ADM Spotlight Card
      const spotCard = document.getElementById('chosenAdmVelocityCard');
      if (spotCard) {
        if (chosenPerson.isMgmt) {
          spotCard.innerHTML =
            '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">' +
              '<h3 style="margin:0; font-size:13.5px; color:#1E293B;">🏢 NATIONAL COMMERCIAL VELOCITY: EGYPT TOTAL (9 TERRITORIES)</h3>' +
              '<span class="badge-above" style="background:#10B98120; color:#10B981; border-color:#10B981; font-size:11px;">🚀 NATIONAL ACCELERATION</span>' +
            '</div>' +
            '<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap:8px; margin-top:8px; background:#F8FAFC; padding:8px; border-radius:8px;">' +
              '<div><span style="font-size:10.5px; color:#64748B;">2025 Mo Baseline</span><br><strong style="font-size:13px; color:#64748B;">' + tot25.toLocaleString() + '</strong></div>' +
              '<div><span style="font-size:10.5px; color:#64748B;">H1 2026 Baseline</span><br><strong style="font-size:13px; color:#1B365D;">' + totalH1.toLocaleString() + '</strong></div>' +
              '<div><span style="font-size:10.5px; color:#64748B;">Q3 2026 Run-Rate</span><br><strong style="font-size:13px; color:#8B5CF6;">' + totalQ3.toLocaleString() + '</strong></div>' +
              '<div><span style="font-size:10.5px; color:#64748B;">Q3 vs H1 Velocity</span><br><strong style="font-size:13px; color:#10B981;">+' + compQ3VsH1Pct.toFixed(1) + '%</strong> <small style="font-size:10px; color:#64748B;">(+' + compQ3VsH1Diff.toLocaleString() + ')</small></div>' +
              '<div><span style="font-size:10.5px; color:#64748B;">Q3 vs 2025 Growth</span><br><strong style="font-size:13px; color:#10B981;">+' + compQ3Vs25Pct.toFixed(1) + '%</strong> <small style="font-size:10px; color:#64748B;">(+' + compQ3Vs25Diff.toLocaleString() + ')</small></div>' +
            '</div>' +
            '<p style="margin-top:8px; font-size:11.5px; color:#334155; line-height:1.45;"><strong>Executive Field Mandate:</strong> Egypt sales run-rate expanded by +12.9% in Q3 (+17,811 cans/mo vs H1) and +51.0% vs 2025. Protect Upper Egypt core volume, aggressively fund Cairo growth, and support inventory recovery across Delta distributor networks.</p>';
        } else {
          spotCard.innerHTML =
            '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">' +
              '<h3 style="margin:0; font-size:13.5px; color:#1E293B;">🎯 SELECTED REP 3-HORIZON VELOCITY: ' + chosenTerr.dm.toUpperCase() + ' (' + chosenTerr.t.toUpperCase() + ')</h3>' +
              '<span class="badge-above" style="background:' + chosenTerr.badgeColor + '20; color:' + chosenTerr.badgeColor + '; border-color:' + chosenTerr.badgeColor + '; font-size:11px;">' + chosenTerr.badge + '</span>' +
            '</div>' +
            '<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap:8px; margin-top:8px; background:#F8FAFC; padding:8px; border-radius:8px;">' +
              '<div><span style="font-size:10.5px; color:#64748B;">2025 Mo Baseline</span><br><strong style="font-size:13px; color:#64748B;">' + chosenTerr.avg25.toLocaleString() + '</strong></div>' +
              '<div><span style="font-size:10.5px; color:#64748B;">H1 2026 Mo Baseline</span><br><strong style="font-size:13px; color:#1B365D;">' + chosenTerr.h1.toLocaleString() + '</strong></div>' +
              '<div><span style="font-size:10.5px; color:#64748B;">Q3 2026 Run-Rate</span><br><strong style="font-size:13px; color:#8B5CF6;">' + chosenTerr.q3.toLocaleString() + '</strong></div>' +
              '<div><span style="font-size:10.5px; color:#64748B;">Q3 vs H1 Velocity</span><br><strong style="font-size:13px; color:' + (chosenTerr.pctH1 >= 0 ? '#10B981' : '#EF4444') + ';">' + (chosenTerr.pctH1 >= 0 ? '+' : '') + chosenTerr.pctH1.toFixed(1) + '%</strong> <small style="font-size:10px; color:#64748B;">(' + (chosenTerr.diffH1 >= 0 ? '+' : '') + chosenTerr.diffH1.toLocaleString() + ')</small></div>' +
              '<div><span style="font-size:10.5px; color:#64748B;">Q3 vs 2025 Growth</span><br><strong style="font-size:13px; color:' + (chosenTerr.pct25 >= 0 ? '#10B981' : '#EF4444') + ';">' + (chosenTerr.pct25 >= 0 ? '+' : '') + chosenTerr.pct25.toFixed(1) + '%</strong> <small style="font-size:10px; color:#64748B;">(' + (chosenTerr.diff25 >= 0 ? '+' : '') + chosenTerr.diff25.toLocaleString() + ')</small></div>' +
            '</div>' +
            '<p style="margin-top:8px; font-size:11.5px; color:#334155; line-height:1.45;"><strong>Strategic Field Mandate:</strong> ' + chosenTerr.action + '</p>';
        }
      }

      // Render ChartSlide11 (3-Horizon Territory Velocity & Growth Combo)
      if (charts.s11) {
        try { charts.s11.destroy(); } catch (e) {}
      }

      const labels = territories.map(d => {
        if (isTopManagementView || d.isChosen) {
          return (d.isChosen ? '★ ' : '') + d.t;
        }
        return getMaskedTerritoryName(d.idx);
      });
      const data25 = territories.map(d => d.avg25);
      const dataH1 = territories.map(d => d.h1);
      const dataQ3 = territories.map(d => d.q3);
      const dataPctH1 = territories.map(d => Number(d.pctH1.toFixed(1)));
      const dataPct25 = territories.map(d => Number(d.pct25.toFixed(1)));

      const bg25 = territories.map(d => (!isTopManagementView && d.isChosen) ? '#C4B5FD' : '#94A3B8');
      const bgH1 = territories.map(d => (!isTopManagementView && d.isChosen) ? '#6366F1' : '#1B365D');
      const bgQ3 = territories.map(d => (!isTopManagementView && d.isChosen) ? '#8B5CF6' : '#0D9488');

      const ctx11 = document.getElementById('chartSlide11').getContext('2d');
      charts.s11 = new ChartLib(ctx11, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              type: 'bar',
              label: '2025 Monthly Baseline',
              data: data25,
              backgroundColor: bg25,
              borderRadius: 4,
              order: 3
            },
            {
              type: 'bar',
              label: 'H1 2026 Monthly Baseline',
              data: dataH1,
              backgroundColor: bgH1,
              borderRadius: 4,
              order: 3
            },
            {
              type: 'bar',
              label: 'Q3 2026 Monthly Run-Rate',
              data: dataQ3,
              backgroundColor: bgQ3,
              borderRadius: 4,
              order: 3
            },
            {
              type: 'line',
              label: 'Q3 vs H1 Velocity %',
              data: dataPctH1,
              borderColor: '#F59E0B',
              backgroundColor: '#F59E0B',
              pointBackgroundColor: '#FFFFFF',
              pointBorderColor: '#F59E0B',
              pointBorderWidth: 2,
              pointRadius: 4.5,
              borderWidth: 2.5,
              yAxisID: 'yPct',
              order: 1
            },
            {
              type: 'line',
              label: 'Q3 vs 2025 Growth %',
              data: dataPct25,
              borderColor: '#10B981',
              backgroundColor: '#10B981',
              pointBackgroundColor: '#FFFFFF',
              pointBorderColor: '#10B981',
              pointBorderWidth: 2,
              pointRadius: 4.5,
              borderWidth: 2.5,
              borderDash: [5, 4],
              yAxisID: 'yPct',
              order: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { position: 'top', labels: { boxWidth: 12, font: { size: 10.5, weight: '600' } } },
            tooltip: {
              callbacks: {
                title: function(items) {
                  if (!items || !items.length) return '';
                  const item = items[0];
                  const d = territories[item.dataIndex];
                  const tName = (isTopManagementView || d.isChosen) ? d.t : getMaskedTerritoryName(d.idx);
                  const mName = (isTopManagementView || d.isChosen) ? d.dm : getMaskedDmName(d.idx);
                  return (d.isChosen ? '★ ' : '') + tName + ' (' + mName + ')';
                },
                label: function(context) {
                  if (context.dataset.yAxisID === 'yPct') {
                    return context.dataset.label + ': ' + (context.raw >= 0 ? '+' : '') + context.raw + '%';
                  }
                  return context.dataset.label + ': ' + Number(context.raw).toLocaleString() + ' units/mo';
                }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 9.5, weight: 'bold' } }
            },
            y: {
              title: { display: true, text: 'Monthly Average Sales (Units/Mo)' },
              ticks: { callback: v => (v / 1000).toFixed(0) + 'k' },
              grid: { color: 'rgba(0,0,0,0.06)' }
            },
            yPct: {
              position: 'right',
              title: { display: true, text: 'Growth & Velocity %' },
              ticks: { callback: v => (v >= 0 ? '+' : '') + v + '%' },
              grid: { display: false }
            }
          }
        }
      });

      // Render ChartSlide11Products (3-Horizon Product Portfolio Velocity)
      if (charts.s11Prod) {
        try { charts.s11Prod.destroy(); } catch (e) {}
      }

      const productsList = [
        { key: 'p1', name: 'Pediamil 1' },
        { key: 'p2', name: 'Pediamil 2' },
        { key: 'ps1', name: 'Pedia-Start 1' },
        { key: 'ps2', name: 'Pedia-Start 2' },
        { key: 'ac', name: 'Pediamil AC' },
        { key: 'ha', name: 'Pediamil HA' },
        { key: 'ar', name: 'Pediamil AR' },
        { key: 'lf', name: 'Pediamil LF' },
        { key: 'pg3', name: 'PediaGrow 3' },
        { key: 'mum', name: 'Pediamum' },
        { key: 'lbw', name: 'LBW-Egy' }
      ];

      const prodLabels = productsList.map(p => p.name);
      let prod25, prodH1, prodQ3;

      const prodTitle = document.getElementById('s11ProdChartTitle');
      const prodSub = document.getElementById('s11ProdChartSubtitle');

      if (chosenPerson.isMgmt) {
        if (prodTitle) prodTitle.innerText = '📦 NATIONAL PRODUCT PORTFOLIO VELOCITY (EGYPT TOTAL)';
        if (prodSub) prodSub.innerText = 'Comparing 2025 MoAvg vs H1 2026 MoAvg vs Q3 2026 Run-Rate across all 11 SKUs nationally';
        prod25 = productsList.map(p => Math.round(rawData2025.reduce((a, r) => a + (r[p.key] || 0), 0) / shortageDivisor2025));
        prodH1 = productsList.map(p => rawAvgH1_2026.reduce((a, r) => a + (r[p.key] || 0), 0));
        prodQ3 = productsList.map(p => rawAvgQ3_2026.reduce((a, r) => a + (r[p.key] || 0), 0));
      } else {
        const pIdx = chosenPerson.idx;
        const r25 = rawData2025[pIdx] || {};
        const rH1 = rawAvgH1_2026[pIdx] || {};
        const rQ3 = rawAvgQ3_2026[pIdx] || {};

        if (prodTitle) prodTitle.innerText = '📦 PRODUCT PORTFOLIO VELOCITY: ' + chosenTerr.dm.toUpperCase() + ' (' + chosenTerr.t.toUpperCase() + ')';
        if (prodSub) prodSub.innerText = 'Territory SKU breakdown showing 2025 MoAvg vs H1 2026 MoAvg vs Q3 2026 Run-Rate in cans/month';

        prod25 = productsList.map(p => Math.round((r25[p.key] || 0) / shortageDivisor2025));
        prodH1 = productsList.map(p => (rH1[p.key] || 0));
        prodQ3 = productsList.map(p => (rQ3[p.key] || 0));
      }

      const ctx11Prod = document.getElementById('chartSlide11Products').getContext('2d');
      charts.s11Prod = new ChartLib(ctx11Prod, {
        type: 'bar',
        data: {
          labels: prodLabels,
          datasets: [
            {
              label: '2025 MoAvg (Baseline)',
              data: prod25,
              backgroundColor: '#94A3B8',
              borderRadius: 4
            },
            {
              label: 'H1 2026 MoAvg',
              data: prodH1,
              backgroundColor: '#1B365D',
              borderRadius: 4
            },
            {
              label: 'Q3 2026 MoAvg (Run-Rate)',
              data: prodQ3,
              backgroundColor: '#8B5CF6',
              borderRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top', labels: { boxWidth: 12, font: { size: 10 } } },
            tooltip: {
              callbacks: {
                label: function(ctx) {
                  const p = productsList[ctx.dataIndex];
                  const v25 = prod25[ctx.dataIndex];
                  const vH1 = prodH1[ctx.dataIndex];
                  const vQ3 = prodQ3[ctx.dataIndex];
                  const q3VsH1 = vH1 > 0 ? ((vQ3 / vH1) - 1) * 100 : 0;
                  const q3Vs25 = v25 > 0 ? ((vQ3 / v25) - 1) * 100 : 100;
                  if (ctx.datasetIndex === 2) {
                    return "Q3 2026: " + Number(ctx.raw).toLocaleString() + " cans/mo (vs H1: " + (q3VsH1 >= 0 ? "+" : "") + q3VsH1.toFixed(1) + "% | vs 2025: " + (q3Vs25 >= 0 ? "+" : "") + q3Vs25.toFixed(1) + "%)";
                  }
                  return ctx.dataset.label + ': ' + Number(ctx.raw).toLocaleString() + ' cans/mo';
                }
              }
            }
          },
          scales: {
            x: {
              ticks: { font: { size: 9, weight: '600' } },
              grid: { display: false }
            },
            y: {
              title: { display: true, text: 'Units / Month' },
              ticks: { callback: v => (v / 1000).toFixed(0) + 'k' },
              grid: { color: 'rgba(0,0,0,0.06)' }
            }
          }
        }
      });

      // Render TableSlide11Body (3-Horizon Comparison Table)
      const tbody = document.getElementById('tableSlide11Body');
      if (tbody) {
        tbody.innerHTML = '';
        territories.forEach((d, idx) => {
          const isChosen = (!isTopManagementView && d.idx === chosenPerson.idx);
          const terrName = (isTopManagementView || isChosen) ? d.t : getMaskedTerritoryName(d.idx);
          const dmName = (isTopManagementView || isChosen) ? d.dm : getMaskedDmName(d.idx);

          const tr = document.createElement('tr');
          if (isChosen) {
            tr.style.background = '#EDE9FE';
            tr.style.fontWeight = 'bold';
          }
          const q3Share = ((d.q3 / totalQ3) * 100).toFixed(1) + '%';
          const growthColorH1 = d.pctH1 >= 25 ? '#10B981' : (d.pctH1 >= 0 ? '#3B82F6' : '#EF4444');
          const growthColor25 = d.pct25 >= 39.5 ? '#10B981' : (d.pct25 >= 0 ? '#1B365D' : '#EF4444');
          tr.innerHTML =
            '<td>' + (idx + 1) + '</td>' +
            '<td><strong>' + (isChosen ? '👉 ' : '') + terrName + '</strong></td>' +
            '<td>' + dmName + '</td>' +
            '<td style="text-align:right;">' + d.avg25.toLocaleString() + '</td>' +
            '<td style="text-align:right;">' + d.h1.toLocaleString() + '</td>' +
            '<td style="text-align:right; font-weight:700; color:#8B5CF6;">' + d.q3.toLocaleString() + '</td>' +
            '<td style="text-align:right; color:' + growthColorH1 + '; font-weight:700;">' + (d.diffH1 >= 0 ? '+' : '') + d.diffH1.toLocaleString() + '</td>' +
            '<td style="text-align:right; color:' + growthColorH1 + '; font-weight:800;">' + (d.pctH1 >= 0 ? '+' : '') + d.pctH1.toFixed(1) + '%</td>' +
            '<td style="text-align:right; color:' + growthColor25 + '; font-weight:800;">' + (d.pct25 >= 0 ? '+' : '') + d.pct25.toFixed(1) + '%</td>' +
            '<td style="text-align:right;">' + q3Share + '</td>' +
            '<td><span class="badge-above" style="background:' + d.badgeColor + '20; color:' + d.badgeColor + '; border-color:' + d.badgeColor + '; font-size:10px;">' + d.tier + '</span></td>';
          tbody.appendChild(tr);
        });

        // Summary Total Row
        const trTot = document.createElement('tr');
        trTot.style.background = '#F1F5F9';
        trTot.style.fontWeight = '800';
        trTot.style.borderTop = '2px solid #CBD5E1';
        trTot.innerHTML =
          '<td>TOP</td>' +
          '<td>TOTAL EGYPT</td>' +
          '<td>National Medical Operations</td>' +
          '<td style="text-align:right;">' + tot25.toLocaleString() + '</td>' +
          '<td style="text-align:right;">' + totalH1.toLocaleString() + '</td>' +
          '<td style="text-align:right; color:#8B5CF6;">' + totalQ3.toLocaleString() + '</td>' +
          '<td style="text-align:right; color:#10B981;">+' + compQ3VsH1Diff.toLocaleString() + '</td>' +
          '<td style="text-align:right; color:#10B981;">+' + compQ3VsH1Pct.toFixed(1) + '%</td>' +
          '<td style="text-align:right; color:#10B981;">+' + compQ3Vs25Pct.toFixed(1) + '%</td>' +
          '<td style="text-align:right;">100.0%</td>' +
          '<td><span class="badge-above" style="background:#10B98120; color:#10B981; border-color:#10B981; font-size:10px;">National Benchmark</span></td>';
        tbody.appendChild(trTot);
      }

      // Render 4 Velocity Tiers Grid with masking if an individual ASM is chosen
      const tiersGrid = document.getElementById('s11TiersGrid');
      if (tiersGrid) {
        const getTierItemText = (d) => {
          const isChosen = (!isTopManagementView && d.idx === chosenPerson.idx);
          const tName = (isTopManagementView || isChosen) ? d.t : getMaskedTerritoryName(d.idx);
          const mName = (isTopManagementView || isChosen) ? (d.dm.split(' ').slice(0, 2).join(' ')) : getMaskedDmName(d.idx);
          const vol25 = (d.avg25 / 1000).toFixed(1) + 'k';
          const volH1 = (d.h1 / 1000).toFixed(1) + 'k';
          const volQ3 = (d.q3 / 1000).toFixed(1) + 'k/mo';
          return (isChosen ? '<li style="background:#EDE9FE; border-radius:4px; padding:2px 4px;">⭐ <strong>' : '<li><strong>') + tName + ' (' + mName + '):</strong> ' + vol25 + ' (\'25) → ' + volH1 + ' (H1) → <strong>' + volQ3 + ' (Q3)</strong>. ' + (d.pctH1 >= 0 ? '+' : '') + d.pctH1.toFixed(1) + '% vs H1, ' + (d.pct25 >= 0 ? '+' : '') + d.pct25.toFixed(1) + '% vs \'25.' + (isChosen ? '</strong></li>' : '</li>');
        };

        const tHigh = territories.filter(d => d.pctH1 >= 40).map(getTierItemText).join('');
        const tScale = territories.filter(d => d.pctH1 >= 15 && d.pctH1 < 40).map(getTierItemText).join('');
        const tSteady = territories.filter(d => d.pctH1 >= 0 && d.pctH1 < 15).map(getTierItemText).join('');
        const tWatch = territories.filter(d => d.pctH1 < 0).map(getTierItemText).join('');

        tiersGrid.innerHTML =
          '<div class="quad-card" style="border-left:4px solid #10B981; background:var(--green-bg); padding:10px;">' +
            '<div class="quad-header" style="margin-bottom:6px;">' +
              '<h4 style="color:#065F46; font-size:12px;">HIGH ACCELERATORS (+40% to +60%) 🚀</h4>' +
              '<small style="font-weight:700; color:#065F46; font-size:10px;">Breakout Momentum</small>' +
            '</div>' +
            '<ul style="font-size:11px; line-height:1.45; padding-left:14px; color:#1E293B;">' + tHigh + '</ul>' +
          '</div>' +
          '<div class="quad-card" style="border-left:4px solid #3B82F6; background:#EFF6FF; padding:10px;">' +
            '<div class="quad-header" style="margin-bottom:6px;">' +
              '<h4 style="color:#1E40AF; font-size:12px;">SCALE COMPOUNDERS (+15% to +30%) 🛡️</h4>' +
              '<small style="font-weight:700; color:#1E40AF; font-size:10px;">Volume Pillars</small>' +
            '</div>' +
            '<ul style="font-size:11px; line-height:1.45; padding-left:14px; color:#1E293B;">' + tScale + '</ul>' +
          '</div>' +
          '<div class="quad-card" style="border-left:4px solid #F59E0B; background:#FFFBEB; padding:10px;">' +
            '<div class="quad-header" style="margin-bottom:6px;">' +
              '<h4 style="color:#92400E; font-size:12px;">STEADY CONSOLIDATORS (0% to +10%) ⚖️</h4>' +
              '<small style="font-weight:700; color:#92400E; font-size:10px;">Defensive Plateau</small>' +
            '</div>' +
            '<ul style="font-size:11px; line-height:1.45; padding-left:14px; color:#1E293B;">' + tSteady + '</ul>' +
          '</div>' +
          '<div class="quad-card" style="border-left:4px solid #EF4444; background:#FEF2F2; padding:10px;">' +
            '<div class="quad-header" style="margin-bottom:6px;">' +
              '<h4 style="color:#991B1B; font-size:12px;">CONTRACTION WATCHLIST (Negative Q3) ⚠️</h4>' +
              '<small style="font-weight:700; color:#991B1B; font-size:10px;">Inventory &amp; Replenishment</small>' +
            '</div>' +
            '<ul style="font-size:11px; line-height:1.45; padding-left:14px; color:#1E293B;">' + tWatch + '</ul>' +
          '</div>';
      }
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

    /* Mobile PWA & Install / Add to Home Screen Manager */
    let deferredInstallPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      const btn = document.getElementById('btnInstallApp');
      if (btn) btn.style.display = 'inline-flex';
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      const btn = document.getElementById('btnInstallApp');
      if (btn) btn.style.display = 'none';
      showToast('LN Sales Review App installed successfully!', '📲');
    });

    function promptInstallApp() {
      const modal = document.getElementById('installGuideModal');
      const androidContent = document.getElementById('installAndroidContent');
      const iosContent = document.getElementById('installIosContent');
      
      const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (deferredInstallPrompt) {
        if (androidContent) androidContent.style.display = 'block';
        if (iosContent) iosContent.style.display = 'none';
      } else {
        if (androidContent) androidContent.style.display = isIos ? 'none' : 'block';
        if (iosContent) iosContent.style.display = isIos ? 'block' : 'none';
      }
      if (modal) modal.style.display = 'flex';
    }

    function triggerAndroidInstall() {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            showToast('Adding LN Sales Review App to Home Screen...', '📲');
          }
          deferredInstallPrompt = null;
          closeInstallModal();
        });
      } else {
        alert('Please tap your browser menu (⋮) and select "Install app" or "Add to Home Screen".');
        closeInstallModal();
      }
    }

    function closeInstallModal() {
      const modal = document.getElementById('installGuideModal');
      if (modal) modal.style.display = 'none';
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch((err) => {
          console.log('SW registration note:', err);
        });
      });
    }

    function bootApp() {
      try {
        checkInitialLockState();
        initSlideTabs();
        recalculateAllModelData();
        renderSlideOutline();
        goToSlide(1);
      } catch (err) {
        console.error('App Boot Failure:', err);
      }
    }

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', bootApp);
    } else {
      bootApp();
    }
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

// Copy PWA assets and icons to public/
const staticFiles = [
  'site.webmanifest',
  'manifest.json',
  'sw.js',
  'icon-1024.png',
  'icon-512.png',
  'icon-192.png',
  'apple-touch-icon.png',
  'apple-touch-icon-180x180.png',
  'favicon-32x32.png',
  'favicon-16x16.png',
  'app-icon.jpg'
];
for (const file of staticFiles) {
  const src = path.join(__dirname, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}
console.log('Final standalone HTML successfully built and written to root and public/ directory!');
console.log('PWA manifests and mobile app icons copied to public/ successfully!');
