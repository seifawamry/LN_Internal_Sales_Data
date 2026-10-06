const ExcelJS = require('exceljs');
const path = require('path');
const { rawData2026, rawData2025 } = require('./data');

async function createWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Egy Nutri Commercial Analytics';
  wb.lastModifiedBy = 'Business Review Template';
  wb.created = new Date();
  wb.modified = new Date();

  // Colors
  const NAVY = '1B365D';
  const LIGHT_BLUE = 'E8EEF5';
  const TEAL = '008080';
  const GREEN_FILL = 'D4EDDA';
  const GREEN_FONT = '155724';
  const RED_FILL = 'F8D7DA';
  const RED_FONT = '721C24';
  const GRAY_HEADER = 'F2F4F8';

  // 1. Executive Summary Sheet
  const wsSummary = wb.addWorksheet('Executive Summary', { views: [{ showGridLines: true }] });
  wsSummary.columns = [
    { width: 5 },
    { width: 32 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 22 }
  ];

  wsSummary.mergeCells('B2:G2');
  wsSummary.getCell('B2').value = 'EGY NUTRI. - BUSINESS REVIEW & SALES ANALYSIS TEMPLATE';
  wsSummary.getCell('B2').font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  wsSummary.getCell('B2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  wsSummary.getCell('B2').alignment = { vertical: 'middle', horizontal: 'center' };
  wsSummary.getRow(2).height = 35;

  wsSummary.mergeCells('B3:G3');
  wsSummary.getCell('B3').value = 'Comparison: YTD June 2026 (6 Months Monthly Avg) vs Full Year 2025 (12 Months Monthly Avg)';
  wsSummary.getCell('B3').font = { italic: true, size: 11, color: { argb: 'FF4A5568' } };
  wsSummary.getCell('B3').alignment = { vertical: 'middle', horizontal: 'center' };
  wsSummary.getRow(3).height = 24;

  // KPI Cards
  const kpis = [
    { label: 'Company YTD 2026 Units', val: 829882, fmt: '#,##0', sub: '6 Months (Jan-Jun 2026)' },
    { label: 'Company 2026 Monthly Avg', val: 138314, fmt: '#,##0', sub: '829,882 / 6 Months' },
    { label: 'Company 2025 Total Units', val: 1240615, fmt: '#,##0', sub: '12 Months (Full Year)' },
    { label: 'Company 2025 Monthly Avg', val: 103385, fmt: '#,##0', sub: '1,240,615 / 12 Months' },
    { label: 'Company Total PPG Growth', val: 0.33785, fmt: '+0.0%;-0.0%', sub: 'Benchmark Growth Rate' },
    { label: 'Total ADM Territories', val: 9, fmt: '0', sub: 'National Coverage' }
  ];

  let colIdx = 2;
  let rowIdx = 5;
  kpis.forEach((kpi, i) => {
    const c = colIdx + (i % 3) * 2;
    const r = rowIdx + Math.floor(i / 3) * 4;
    wsSummary.mergeCells(r, c, r, c + 1);
    wsSummary.getCell(r, c).value = kpi.label;
    wsSummary.getCell(r, c).font = { bold: true, size: 10, color: { argb: 'FF4A5568' } };
    wsSummary.getCell(r, c).alignment = { horizontal: 'center' };
    wsSummary.getCell(r, c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BLUE } };

    wsSummary.mergeCells(r + 1, c, r + 1, c + 1);
    wsSummary.getCell(r + 1, c).value = kpi.val;
    wsSummary.getCell(r + 1, c).numFmt = kpi.fmt;
    wsSummary.getCell(r + 1, c).font = { bold: true, size: 18, color: { argb: NAVY } };
    wsSummary.getCell(r + 1, c).alignment = { horizontal: 'center' };

    wsSummary.mergeCells(r + 2, c, r + 2, c + 1);
    wsSummary.getCell(r + 2, c).value = kpi.sub;
    wsSummary.getCell(r + 2, c).font = { size: 9, italic: true, color: { argb: 'FF718096' } };
    wsSummary.getCell(r + 2, c).alignment = { horizontal: 'center' };
  });

  // Table of Slide Guides
  const slideGuides = [
    ['Slide 1', 'Territorial Contribution Analysis', '3-Bar comparison: GEO Share % 2025 vs 2026 YTD Contribution % vs 2025 Contribution %.'],
    ['Slide 2', 'Core Nutrition Monthly Averages', 'Pediamil 1, Pediamil 2, Pedia-Start 1, Pedia-Start 2: 2026 MoAvg vs 2025 MoAvg vs Line Avg.'],
    ['Slide 3', 'Specialty Nutrition Monthly Averages', 'Pediamil LF, HA, AR, AC, Pediamum: 2026 MoAvg vs 2025 MoAvg vs Line Avg.'],
    ['Slide 4', 'Dual-Axis ADM Deep-Dive', 'Double axis: Left Axis Volume Bars, Right Axis PPG% with Red/Green indicator vs Company benchmark.'],
    ['Slide 5', 'Total PPG% Growth Ranking', 'All 9 ADMs ranked by Total PPG%. Company at top (+33.79%), Green above, Red below.'],
    ['Slide 6', 'Pediamil 1 PPG% Ranking', 'Ranked by Pediamil 1 growth. Company (+39.92%) at top, Green above, Red below.'],
    ['Slide 7', 'Pediamil 2 PPG% Ranking', 'Ranked by Pediamil 2 growth. Company (+65.26%) at top, Green above, Red below.'],
    ['Slide 8', 'Pedia-Start 1 PPG% Ranking', 'Ranked by Pedia-Start 1 growth. Company (-2.06%) at top, Green above, Red below.'],
    ['Slide 9', 'Pedia-Start 2 PPG% Ranking', 'Ranked by Pedia-Start 2 growth. Company (+39.86%) at top, Green above, Red below.'],
    ['Slide 10', 'Strategic Quadrant Matrix', 'Bubble matrix: X=Contribution Diff (0 baseline), Y=PPG% (+33.79% baseline). Quadrants A/B/C/D.']
  ];

  wsSummary.getCell('B14').value = 'BUSINESS REVIEW SLIDE DECK ARCHITECTURE';
  wsSummary.getCell('B14').font = { bold: true, size: 12, color: { argb: NAVY } };

  wsSummary.getRow(15).values = ['', 'Slide Number', 'Slide Title', 'Key Metrics & Presentation Purpose', '', '', ''];
  wsSummary.mergeCells('D15:G15');
  wsSummary.getRow(15).font = { bold: true };
  wsSummary.getRow(15).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_HEADER } };

  slideGuides.forEach((sg, idx) => {
    const row = 16 + idx;
    wsSummary.getCell(`B${row}`).value = sg[0];
    wsSummary.getCell(`C${row}`).value = sg[1];
    wsSummary.mergeCells(`D${row}:G${row}`);
    wsSummary.getCell(`D${row}`).value = sg[2];
    wsSummary.getCell(`B${row}`).font = { bold: true };
    wsSummary.getCell(`C${row}`).font = { bold: true };
  });

  // 2. Raw Data 2026 Sheet
  const ws2026 = wb.addWorksheet('Data_YTD_2026', { views: [{ showGridLines: true }] });
  const headers2026 = [
    'Territory Name', 'DM Name', 'Pediamil 1', 'Pediamil 2', 'PediaGrow 3',
    'Pediamil LF', 'Pediamil HA', 'Pediamil AR', 'Pediamil AC', 'Pediamum',
    'Pedia-Start 1', 'Pedia-Start 2', 'LBW- Egy', 'Sum YTD 6/2026',
    'Contribution % 2026', 'GEO Share % 2025', 'Contribution Index', 'Contribution Diff.'
  ];
  ws2026.addRow(headers2026);
  ws2026.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  ws2026.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  ws2026.getRow(1).height = 28;

  rawData2026.forEach(r => {
    ws2026.addRow([
      r.territory, r.dm, r.p1, r.p2, r.pg3, r.lf, r.ha, r.ar, r.ac, r.mum,
      r.ps1, r.ps2, r.lbw, r.sum, r.sum / 829882, r.geoShare, r.contrIdx, r.contrDiff
    ]);
  });
  // Total row
  ws2026.addRow([
    'Total Egypt', 'Total', 234147, 146500, 32024, 26008, 35394, 28061, 45113, 4328,
    145674, 97406, 35227, 829882, 1.0, 1.0, 1.0, 0.0
  ]);
  const totRow26 = ws2026.getRow(11);
  totRow26.font = { bold: true };
  totRow26.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BLUE } };

  // Format 2026
  ws2026.columns.forEach((col, idx) => {
    col.width = idx < 2 ? 26 : 16;
  });
  for (let r = 2; r <= 11; r++) {
    for (let c = 3; c <= 14; c++) {
      ws2026.getCell(r, c).numFmt = '#,##0';
    }
    ws2026.getCell(r, 15).numFmt = '0.0%';
    ws2026.getCell(r, 16).numFmt = '0.00%';
    ws2026.getCell(r, 17).numFmt = '0.00';
    ws2026.getCell(r, 18).numFmt = '+0.00%;-0.00%';
  }

  // 3. Raw Data 2025 Sheet
  const ws2025 = wb.addWorksheet('Data_2025', { views: [{ showGridLines: true }] });
  const headers2025 = [
    'Territory Name', 'DM Name', 'Pediamil 1', 'Pediamil 2', 'PediaGrow 3',
    'Pediamil LF', 'Pediamil HA', 'Pediamil AR', 'Pediamil AC', 'Pediamum',
    'Pedia-Start 1', 'Pedia-Start 2', 'LBW- Egy', 'Sum 2025', 'Contribution % 2025'
  ];
  ws2025.addRow(headers2025);
  ws2025.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  ws2025.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  ws2025.getRow(1).height = 28;

  rawData2025.forEach(r => {
    ws2025.addRow([
      r.territory, r.dm, r.p1, r.p2, r.pg3, r.lf, r.ha, r.ar, r.ac, r.mum,
      r.ps1, r.ps2, r.lbw, r.sum, r.sum / 1240615
    ]);
  });
  ws2025.addRow([
    'Total Egypt', 'Total', 334693, 177294, 42179, 36880, 65237, 74439, 63129, 9992,
    297486, 139286, 0, 1240615, 1.0
  ]);
  const totRow25 = ws2025.getRow(11);
  totRow25.font = { bold: true };
  totRow25.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BLUE } };

  ws2025.columns.forEach((col, idx) => {
    col.width = idx < 2 ? 26 : 16;
  });
  for (let r = 2; r <= 11; r++) {
    for (let c = 3; c <= 14; c++) {
      ws2025.getCell(r, c).numFmt = '#,##0';
    }
    ws2025.getCell(r, 15).numFmt = '0.0%';
  }

  // 4. Slide 1 Sheet: Contribution & GEO Share Analysis
  const wsS1 = wb.addWorksheet('Slide1_Contribution', { views: [{ showGridLines: true }] });
  wsS1.columns = [
    { width: 22 },
    { width: 32 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 22 }
  ];

  wsS1.mergeCells('A1:I1');
  wsS1.getCell('A1').value = 'SLIDE 1: GEO SHARE % vs YTD CONTRIBUTION % 2026 vs 2025 CONTRIBUTION %';
  wsS1.getCell('A1').font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  wsS1.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  wsS1.getRow(1).height = 30;

  wsS1.addRow([
    'Territory Name', 'DM Name', 'GEO Share % (2025)', 'Contribution % 2025',
    'Contribution % 2026', 'Contribution Index', 'Contribution Diff. (vs Geo)',
    'Contr. Diff (26 vs 25)', 'Performance Status'
  ]);
  wsS1.getRow(2).font = { bold: true };
  wsS1.getRow(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_HEADER } };
  wsS1.getRow(2).height = 25;

  rawData2026.forEach((r, i) => {
    const r25 = rawData2025[i];
    const c26 = r.sum / 829882;
    const c25 = r25.sum / 1240615;
    const diffGeo = r.contrDiff;
    const diff25 = c26 - c25;
    const status = diffGeo >= 0 ? 'Above Potential (Expanding)' : 'Below Potential (Gap)';

    const row = wsS1.addRow([
      r.territory, r.dm, r.geoShare, c25, c26, r.contrIdx, diffGeo, diff25, status
    ]);

    row.getCell(3).numFmt = '0.00%';
    row.getCell(4).numFmt = '0.00%';
    row.getCell(5).numFmt = '0.00%';
    row.getCell(6).numFmt = '0.00';
    row.getCell(7).numFmt = '+0.00%;-0.00%';
    row.getCell(8).numFmt = '+0.00%;-0.00%';

    if (diffGeo >= 0) {
      row.getCell(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN_FILL } };
      row.getCell(7).font = { color: { argb: GREEN_FONT }, bold: true };
      row.getCell(9).font = { color: { argb: GREEN_FONT }, bold: true };
    } else {
      row.getCell(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: RED_FILL } };
      row.getCell(7).font = { color: { argb: RED_FONT }, bold: true };
      row.getCell(9).font = { color: { argb: RED_FONT }, bold: true };
    }
  });

  // Total Row
  const s1Tot = wsS1.addRow([
    'Total Egypt', 'Total', 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 'National Baseline'
  ]);
  s1Tot.font = { bold: true };
  s1Tot.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BLUE } };
  s1Tot.getCell(3).numFmt = '0.00%';
  s1Tot.getCell(4).numFmt = '0.00%';
  s1Tot.getCell(5).numFmt = '0.00%';
  s1Tot.getCell(6).numFmt = '0.00';
  s1Tot.getCell(7).numFmt = '0.00%';
  s1Tot.getCell(8).numFmt = '0.00%';

  // 5. Slide 2 Sheet: Core Nutrition Monthly Averages (Pediamil 1, 2, Pedia-Start 1, 2)
  const wsS2 = wb.addWorksheet('Slide2_Core_Averages', { views: [{ showGridLines: true }] });
  wsS2.columns = [
    { width: 20 },
    { width: 30 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 }
  ];

  wsS2.mergeCells('A1:N1');
  wsS2.getCell('A1').value = 'SLIDE 2: CORE PRODUCTS MONTHLY AVERAGES (2026 MoAvg vs 2025 MoAvg vs Line Avg)';
  wsS2.getCell('A1').font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  wsS2.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  wsS2.getRow(1).height = 30;

  wsS2.addRow([
    'Territory', 'DM Name',
    'P1 MoAvg 26', 'P1 MoAvg 25', 'P1 LineAvg',
    'P2 MoAvg 26', 'P2 MoAvg 25', 'P2 LineAvg',
    'PS1 MoAvg 26', 'PS1 MoAvg 25', 'PS1 LineAvg',
    'PS2 MoAvg 26', 'PS2 MoAvg 25', 'PS2 LineAvg'
  ]);
  wsS2.getRow(2).font = { bold: true };
  wsS2.getRow(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_HEADER } };

  // Line averages per ADM:
  const lnP1 = (234147 / 6) / 9;
  const lnP2 = (146500 / 6) / 9;
  const lnPS1 = (145674 / 6) / 9;
  const lnPS2 = (97406 / 6) / 9;

  rawData2026.forEach((r, i) => {
    const r25 = rawData2025[i];
    const row = wsS2.addRow([
      r.territory, r.dm,
      r.p1 / 6, r25.p1 / 12, lnP1,
      r.p2 / 6, r25.p2 / 12, lnP2,
      r.ps1 / 6, r25.ps1 / 12, lnPS1,
      r.ps2 / 6, r25.ps2 / 12, lnPS2
    ]);
    for (let c = 3; c <= 14; c++) {
      row.getCell(c).numFmt = '#,##0';
    }
  });

  const s2Tot = wsS2.addRow([
    'Total Egypt (Per Month)', 'Line Average / ADM',
    234147 / 6, 334693 / 12, lnP1,
    146500 / 6, 177294 / 12, lnP2,
    145674 / 6, 297486 / 12, lnPS1,
    97406 / 6, 139286 / 12, lnPS2
  ]);
  s2Tot.font = { bold: true };
  s2Tot.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BLUE } };
  for (let c = 3; c <= 14; c++) {
    s2Tot.getCell(c).numFmt = '#,##0';
  }

  // 6. Slide 3 Sheet: Specialty Nutrition Monthly Averages (LF, HA, AR, AC, Pediamum)
  const wsS3 = wb.addWorksheet('Slide3_Specialty_Averages', { views: [{ showGridLines: true }] });
  wsS3.columns = [
    { width: 20 },
    { width: 30 },
    { width: 15 }, { width: 15 }, { width: 15 },
    { width: 15 }, { width: 15 }, { width: 15 },
    { width: 15 }, { width: 15 }, { width: 15 },
    { width: 15 }, { width: 15 }, { width: 15 },
    { width: 15 }, { width: 15 }, { width: 15 }
  ];

  wsS3.mergeCells('A1:Q1');
  wsS3.getCell('A1').value = 'SLIDE 3: SPECIALTY PRODUCTS MONTHLY AVERAGES (2026 MoAvg vs 2025 MoAvg vs Line Avg)';
  wsS3.getCell('A1').font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  wsS3.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  wsS3.getRow(1).height = 30;

  wsS3.addRow([
    'Territory', 'DM Name',
    'LF 26 Mo', 'LF 25 Mo', 'LF LnAvg',
    'HA 26 Mo', 'HA 25 Mo', 'HA LnAvg',
    'AR 26 Mo', 'AR 25 Mo', 'AR LnAvg',
    'AC 26 Mo', 'AC 25 Mo', 'AC LnAvg',
    'MUM 26 Mo', 'MUM 25 Mo', 'MUM LnAvg'
  ]);
  wsS3.getRow(2).font = { bold: true };
  wsS3.getRow(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_HEADER } };

  const lnLF = (26008 / 6) / 9;
  const lnHA = (35394 / 6) / 9;
  const lnAR = (28061 / 6) / 9;
  const lnAC = (45113 / 6) / 9;
  const lnMUM = (4328 / 6) / 9;

  rawData2026.forEach((r, i) => {
    const r25 = rawData2025[i];
    const row = wsS3.addRow([
      r.territory, r.dm,
      r.lf / 6, r25.lf / 12, lnLF,
      r.ha / 6, r25.ha / 12, lnHA,
      r.ar / 6, r25.ar / 12, lnAR,
      r.ac / 6, r25.ac / 12, lnAC,
      r.mum / 6, r25.mum / 12, lnMUM
    ]);
    for (let c = 3; c <= 17; c++) {
      row.getCell(c).numFmt = '#,##0';
    }
  });

  const s3Tot = wsS3.addRow([
    'Total Egypt (Per Month)', 'Line Average / ADM',
    26008 / 6, 36880 / 12, lnLF,
    35394 / 6, 65237 / 12, lnHA,
    28061 / 6, 74439 / 12, lnAR,
    45113 / 6, 63129 / 12, lnAC,
    4328 / 6, 9992 / 12, lnMUM
  ]);
  s3Tot.font = { bold: true };
  s3Tot.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BLUE } };
  for (let c = 3; c <= 17; c++) {
    s3Tot.getCell(c).numFmt = '#,##0';
  }

  // 7. Slide 4 Sheet: Dual-Axis Selected ADM Deep Dive Template
  const wsS4 = wb.addWorksheet('Slide4_Dual_Axis_DeepDive', { views: [{ showGridLines: true }] });
  wsS4.columns = [
    { width: 22 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 24 }
  ];

  wsS4.mergeCells('A1:G1');
  wsS4.getCell('A1').value = 'SLIDE 4: DUAL-AXIS PRODUCT ANALYSIS TEMPLATE (SELECTED ADM vs COMPANY PPG%)';
  wsS4.getCell('A1').font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  wsS4.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  wsS4.getRow(1).height = 30;

  // Example for Beshoy Youhanna (Upper Egypt II) showing how any ADM can be selected
  wsS4.getCell('A3').value = 'Selected ADM in Review:';
  wsS4.getCell('A3').font = { bold: true, size: 12 };
  wsS4.getCell('B3').value = 'Beshoy Youhanna (Upper Egypt II)';
  wsS4.getCell('B3').font = { bold: true, size: 12, color: { argb: NAVY } };

  wsS4.getCell('D3').value = 'Selected ADM PPG%:';
  wsS4.getCell('D3').font = { bold: true };
  wsS4.getCell('E3').value = 0.5011;
  wsS4.getCell('E3').numFmt = '+0.00%';
  wsS4.getCell('E3').font = { bold: true, size: 13, color: { argb: GREEN_FONT } };

  wsS4.getCell('F3').value = 'Company Total PPG%:';
  wsS4.getCell('F3').font = { bold: true };
  wsS4.getCell('G3').value = 0.33785;
  wsS4.getCell('G3').numFmt = '+0.00%';
  wsS4.getCell('G3').font = { bold: true, size: 13, color: { argb: NAVY } };

  wsS4.mergeCells('A5:G5');
  wsS4.getCell('A5').value = 'STATUS: 🟢 ABOVE COMPANY BENCHMARK (+16.33% ahead of Egypt Growth)';
  wsS4.getCell('A5').font = { bold: true, size: 12, color: { argb: GREEN_FONT } };
  wsS4.getCell('A5').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN_FILL } };
  wsS4.getCell('A5').alignment = { horizontal: 'center' };
  wsS4.getRow(5).height = 25;

  wsS4.addRow([]);
  wsS4.addRow([
    'Product Name', 'Avg Monthly 2025', 'Avg Monthly 2026', 'Volume Diff / Mo',
    'Selected ADM PPG%', 'Company PPG%', 'Performance Indicator'
  ]);
  wsS4.getRow(7).font = { bold: true };
  wsS4.getRow(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_HEADER } };

  const productsList = [
    { name: 'Pediamil 1', p26: 44494/6, p25: 58524/12, cPpg: 0.3992 },
    { name: 'Pediamil 2', p26: 28761/6, p25: 23602/12, cPpg: 0.6526 },
    { name: 'PediaGrow 3', p26: 4173/6, p25: 4677/12, cPpg: 0.5185 },
    { name: 'Pediamil LF', p26: 2908/6, p25: 4282/12, cPpg: 0.4104 },
    { name: 'Pediamil HA', p26: 4618/6, p25: 6236/12, cPpg: 0.0851 },
    { name: 'Pediamil AR', p26: 4106/6, p25: 8468/12, cPpg: -0.2461 },
    { name: 'Pediamil AC', p26: 6659/6, p25: 8784/12, cPpg: 0.4292 },
    { name: 'Pediamum', p26: 548/6, p25: 1150/12, cPpg: -0.1337 },
    { name: 'Pedia-Start 1', p26: 20353/6, p25: 43061/12, cPpg: -0.0206 },
    { name: 'Pedia-Start 2', p26: 11712/6, p25: 19528/12, cPpg: 0.3986 },
    { name: 'LBW- Egy', p26: 5499/6, p25: 0, cPpg: 1.0 }
  ];

  productsList.forEach(p => {
    const diff = p.p26 - p.p25;
    const ppg = p.p25 > 0 ? (p.p26 / p.p25 - 1) : 1.0;
    const isAbove = ppg >= p.cPpg;
    const ind = isAbove ? '🟢 Above Company' : '🔻 Below Company';
    const r = wsS4.addRow([
      p.name, p.p25, p.p26, diff, ppg, p.cPpg, ind
    ]);
    r.getCell(2).numFmt = '#,##0';
    r.getCell(3).numFmt = '#,##0';
    r.getCell(4).numFmt = '+#,##0;-#,##0';
    r.getCell(5).numFmt = '+0.0%;-0.0%';
    r.getCell(6).numFmt = '+0.0%;-0.0%';

    if (isAbove) {
      r.getCell(7).font = { color: { argb: GREEN_FONT }, bold: true };
    } else {
      r.getCell(7).font = { color: { argb: RED_FONT }, bold: true };
      r.getCell(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: RED_FILL } };
    }
  });

  // Total Row
  const s4Tot = wsS4.addRow([
    'Total Units', 178312 / 12, 133831 / 6, (133831/6) - (178312/12), 0.5011, 0.33785, '🟢 Overall Above Company'
  ]);
  s4Tot.font = { bold: true };
  s4Tot.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BLUE } };
  s4Tot.getCell(2).numFmt = '#,##0';
  s4Tot.getCell(3).numFmt = '#,##0';
  s4Tot.getCell(4).numFmt = '+#,##0;-#,##0';
  s4Tot.getCell(5).numFmt = '+0.0%;-0.0%';
  s4Tot.getCell(6).numFmt = '+0.0%;-0.0%';

  // 8. Slide 5 Sheet: Total PPG% Growth Ranking
  const wsS5 = wb.addWorksheet('Slide5_Total_PPG_Ranking', { views: [{ showGridLines: true }] });
  wsS5.columns = [
    { width: 8 }, { width: 22 }, { width: 32 },
    { width: 18 }, { width: 18 }, { width: 16 }, { width: 22 }, { width: 20 }
  ];

  wsS5.mergeCells('A1:H1');
  wsS5.getCell('A1').value = 'SLIDE 5: TOTAL PPG% GROWTH RANKING (COMPANY AT TOP, GREEN ABOVE, RED BELOW)';
  wsS5.getCell('A1').font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  wsS5.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  wsS5.getRow(1).height = 30;

  wsS5.addRow([
    'Rank', 'Territory Name', 'DM Name',
    'Monthly Avg 2025', 'Monthly Avg 2026', 'Total PPG%', 'Performance Indicator', 'Bar Color Coding'
  ]);
  wsS5.getRow(2).font = { bold: true };
  wsS5.getRow(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_HEADER } };

  // Company row at top
  const compRow = wsS5.addRow([
    'TOP', 'EGYPT TOTAL (COMPANY)', 'National Benchmark',
    1240615 / 12, 829882 / 6, 0.33785, 'NATIONAL BENCHMARK', 'BLUE / GOLD (BASELINE)'
  ]);
  compRow.font = { bold: true };
  compRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F4F8' } };
  compRow.getCell(4).numFmt = '#,##0';
  compRow.getCell(5).numFmt = '#,##0';
  compRow.getCell(6).numFmt = '+0.00%';

  const totalRanks = [
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', avg25: 14224, avg26: 22783, ppg: 0.6018 },
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', avg25: 14859, avg26: 22305, ppg: 0.5011 },
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elmonem', avg25: 7309, avg26: 10206, ppg: 0.3964 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Shamy', avg25: 15235, avg26: 20146, ppg: 0.3223 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', avg25: 9951, avg26: 12895, ppg: 0.2958 },
    { territory: 'Upper Egypt I', dm: 'UE North', avg25: 12877, avg26: 16459, ppg: 0.2781 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- HAKEEM', avg25: 7152, avg26: 8758, ppg: 0.2246 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', avg25: 12441, avg26: 14302, ppg: 0.1495 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', avg25: 9337, avg26: 10461, ppg: 0.1204 }
  ];

  totalRanks.forEach((r, idx) => {
    const isAbove = r.ppg >= 0.33785;
    const ind = isAbove ? '🟢 ABOVE COMPANY PPG' : '🔻 BELOW COMPANY PPG';
    const color = isAbove ? 'GREEN' : 'RED';
    const row = wsS5.addRow([
      idx + 1, r.territory, r.dm, r.avg25, r.avg26, r.ppg, ind, color
    ]);
    row.getCell(4).numFmt = '#,##0';
    row.getCell(5).numFmt = '#,##0';
    row.getCell(6).numFmt = '+0.00%';

    if (isAbove) {
      row.getCell(6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN_FILL } };
      row.getCell(6).font = { color: { argb: GREEN_FONT }, bold: true };
      row.getCell(7).font = { color: { argb: GREEN_FONT }, bold: true };
    } else {
      row.getCell(6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: RED_FILL } };
      row.getCell(6).font = { color: { argb: RED_FONT }, bold: true };
      row.getCell(7).font = { color: { argb: RED_FONT }, bold: true };
    }
  });

  // Helper function to build Product Ranking Sheets (Slides 6, 7, 8, 9)
  function addProductRankSheet(sheetName, title, prodKey, prodName, compPpg, compAvg25, compAvg26, rankData) {
    const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] });
    ws.columns = [
      { width: 8 }, { width: 22 }, { width: 32 },
      { width: 18 }, { width: 18 }, { width: 16 }, { width: 22 }, { width: 20 }
    ];

    ws.mergeCells('A1:H1');
    ws.getCell('A1').value = title;
    ws.getCell('A1').font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
    ws.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
    ws.getRow(1).height = 30;

    ws.addRow([
      'Rank', 'Territory Name', 'DM Name',
      'Monthly Avg 2025', 'Monthly Avg 2026', `${prodName} PPG%`, 'Performance Indicator', 'Bar Color'
    ]);
    ws.getRow(2).font = { bold: true };
    ws.getRow(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_HEADER } };

    const cRow = ws.addRow([
      'TOP', 'EGYPT TOTAL (COMPANY)', 'National Benchmark',
      compAvg25, compAvg26, compPpg, 'NATIONAL BENCHMARK', 'BLUE / GOLD (BASELINE)'
    ]);
    cRow.font = { bold: true };
    cRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F4F8' } };
    cRow.getCell(4).numFmt = '#,##0';
    cRow.getCell(5).numFmt = '#,##0';
    cRow.getCell(6).numFmt = '+0.00%';

    rankData.forEach((r, idx) => {
      const isAbove = r.ppg >= compPpg;
      const ind = isAbove ? `🟢 ABOVE COMPANY (${(compPpg*100).toFixed(1)}%)` : `🔻 BELOW COMPANY (${(compPpg*100).toFixed(1)}%)`;
      const color = isAbove ? 'GREEN' : 'RED';
      const row = ws.addRow([
        idx + 1, r.territory, r.dm, r.avg25, r.avg26, r.ppg, ind, color
      ]);
      row.getCell(4).numFmt = '#,##0';
      row.getCell(5).numFmt = '#,##0';
      row.getCell(6).numFmt = '+0.00%';

      if (isAbove) {
        row.getCell(6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN_FILL } };
        row.getCell(6).font = { color: { argb: GREEN_FONT }, bold: true };
        row.getCell(7).font = { color: { argb: GREEN_FONT }, bold: true };
      } else {
        row.getCell(6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: RED_FILL } };
        row.getCell(6).font = { color: { argb: RED_FONT }, bold: true };
        row.getCell(7).font = { color: { argb: RED_FONT }, bold: true };
      }
    });
  }

  // Slide 6: Pediamil 1 Ranking
  const p1Ranks = [
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elmonem', avg25: 1712, avg26: 3239, ppg: 0.8919 },
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', avg25: 3800, avg26: 6091, ppg: 0.6027 },
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', avg25: 4877, avg26: 7416, ppg: 0.5205 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', avg25: 1816, avg26: 2526, ppg: 0.3908 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Shamy', avg25: 4024, avg26: 5481, ppg: 0.3620 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', avg25: 2608, avg26: 3418, ppg: 0.3105 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- HAKEEM', avg25: 1969, avg26: 2575, ppg: 0.3081 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', avg25: 3318, avg26: 3917, ppg: 0.1806 },
    { territory: 'Upper Egypt I', dm: 'UE North', avg25: 3767, avg26: 4361, ppg: 0.1579 }
  ];
  addProductRankSheet(
    'Slide6_Pediamil1_Ranking',
    'SLIDE 6: PEDIAMIL 1 PPG% GROWTH RANKING (COMPANY AT TOP: +39.92%)',
    'p1', 'Pediamil 1', 0.3992, 334693/12, 234147/6, p1Ranks
  );

  // Slide 7: Pediamil 2 Ranking
  const p2Ranks = [
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', avg25: 1967, avg26: 4794, ppg: 1.4372 },
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', avg25: 2045, avg26: 3843, ppg: 0.8789 },
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elmonem', avg25: 815, avg26: 1478, ppg: 0.8139 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Shamy', avg25: 2640, avg26: 4201, ppg: 0.5912 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- HAKEEM', avg25: 1204, avg26: 1837, ppg: 0.5267 },
    { territory: 'Upper Egypt I', dm: 'UE North', avg25: 1920, avg26: 2808, ppg: 0.4625 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', avg25: 1365, avg26: 1841, ppg: 0.3484 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', avg25: 1217, avg26: 1575, ppg: 0.2942 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', avg25: 1602, avg26: 2041, ppg: 0.2736 }
  ];
  addProductRankSheet(
    'Slide7_Pediamil2_Ranking',
    'SLIDE 7: PEDIAMIL 2 PPG% GROWTH RANKING (COMPANY AT TOP: +65.26%)',
    'p2', 'Pediamil 2', 0.6526, 177294/12, 146500/6, p2Ranks
  );

  // Slide 8: Pedia-Start 1 Ranking
  const ps1Ranks = [
    { territory: 'Upper Egypt I', dm: 'UE North', avg25: 3422, avg26: 4025, ppg: 0.1762 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', avg25: 1609, avg26: 1888, ppg: 0.1736 },
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', avg25: 3701, avg26: 3931, ppg: 0.0623 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Shamy', avg25: 2581, avg26: 2567, ppg: -0.0055 },
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', avg25: 3588, avg26: 3392, ppg: -0.0547 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- HAKEEM', avg25: 950, avg26: 862, ppg: -0.0933 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', avg25: 2864, avg26: 2555, ppg: -0.1081 },
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elmonem', avg25: 2496, avg26: 2159, ppg: -0.1350 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', avg25: 3579, avg26: 2901, ppg: -0.1896 }
  ];
  addProductRankSheet(
    'Slide8_PediaStart1_Ranking',
    'SLIDE 8: PEDIA-START 1 PPG% GROWTH RANKING (COMPANY AT TOP: -2.06%)',
    'ps1', 'Pedia-Start 1', -0.0206, 297486/12, 145674/6, ps1Ranks
  );

  // Slide 9: Pedia-Start 2 Ranking
  const ps2Ranks = [
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', avg25: 1822, avg26: 3685, ppg: 1.0227 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', avg25: 722, avg26: 1286, ppg: 0.7818 },
    { territory: 'Upper Egypt I', dm: 'UE North', avg25: 1528, avg26: 2428, ppg: 0.5895 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', avg25: 1292, avg26: 1829, ppg: 0.4155 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Shamy', avg25: 1404, avg26: 1926, ppg: 0.3714 },
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', avg25: 1627, avg26: 1952, ppg: 0.1995 },
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elmonem', avg25: 947, avg26: 1094, ppg: 0.1553 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', avg25: 1632, avg26: 1529, ppg: -0.0632 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- HAKEEM', avg25: 633, avg26: 505, ppg: -0.2023 }
  ];
  addProductRankSheet(
    'Slide9_PediaStart2_Ranking',
    'SLIDE 9: PEDIA-START 2 PPG% GROWTH RANKING (COMPANY AT TOP: +39.86%)',
    'ps2', 'Pedia-Start 2', 0.3986, 139286/12, 97406/6, ps2Ranks
  );

  // 10. Slide 10 Sheet: Strategic Quadrant Matrix
  const wsS10 = wb.addWorksheet('Slide10_Quadrant_Matrix', { views: [{ showGridLines: true }] });
  wsS10.columns = [
    { width: 14 }, { width: 22 }, { width: 32 },
    { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 38 }
  ];

  wsS10.mergeCells('A1:H1');
  wsS10.getCell('A1').value = 'SLIDE 10: STRATEGIC QUADRANT MATRIX (CONTRIBUTION DIFF vs PPG%)';
  wsS10.getCell('A1').font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  wsS10.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  wsS10.getRow(1).height = 30;

  wsS10.mergeCells('A2:H2');
  wsS10.getCell('A2').value = 'Baselines: X-Axis Reference = 0.00% (Contribution Diff) | Y-Axis Reference = +33.79% (Company Total PPG)';
  wsS10.getCell('A2').font = { italic: true, size: 10, color: { argb: 'FF4A5568' } };
  wsS10.getCell('A2').alignment = { horizontal: 'center' };

  wsS10.addRow([
    'Quadrant', 'Territory Name', 'DM Name',
    'YTD 2026 Sales', 'MoAvg 2026', 'Contr. Diff (X)', 'Total PPG% (Y)', 'Strategic Classification & Recommendation'
  ]);
  wsS10.getRow(3).font = { bold: true };
  wsS10.getRow(3).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_HEADER } };

  const quadData = [
    { q: 'Quadrant A', territory: 'Delta II', dm: 'Mohamed Yousef M.', s26: 136700, avg26: 22783, x: 0.0420, y: 0.6018, strat: 'COMPANY STAR: Heavy volume, stellar growth (+60.2%), expanding market share.' },
    { q: 'Quadrant A', territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', s26: 133831, avg26: 22305, x: 0.0052, y: 0.5011, strat: 'COMPANY STAR: Giant territory, outstanding growth (+50.1%), strong execution.' },
    { q: 'Quadrant B', territory: 'Alx', dm: 'Ahmed Hassan Abd-Elmonem', s26: 61235, avg26: 10206, x: -0.0272, y: 0.3964, strat: 'FAST GROWER / CHALLENGER: High growth (+39.6%) exceeding company, closing GEO gap.' },
    { q: 'Quadrant C', territory: 'DELTA I', dm: 'Shimaa Tarek El- Shamy', s26: 120877, avg26: 20146, x: 0.0725, y: 0.3223, strat: 'PILLAR / CORE BACKBONE: Massive contribution gain (+7.25%), solid growth (+32.2%).' },
    { q: 'Quadrant C', territory: 'KFR EL.SHK', dm: 'Karim Shehab', s26: 62763, avg26: 10461, x: 0.0580, y: 0.1204, strat: 'SHARE GAINER: Contribution far outstripping GEO potential (7.6% vs 1.8% geo).' },
    { q: 'Quadrant C', territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', s26: 85811, avg26: 14302, x: 0.0059, y: 0.1495, strat: 'SHARE DEFENDER: Positive contribution diff, but growth (+14.9%) lagging company pace.' },
    { q: 'Quadrant D', territory: 'Guiza', dm: 'Youstina Farag Allah', s26: 77368, avg26: 12895, x: -0.0520, y: 0.2958, strat: 'LOWEST PERFORMER / ATTENTION: High potential territory (14.5%) losing share (-5.2%).' },
    { q: 'Quadrant D', territory: 'Upper Egypt I', dm: 'UE North', s26: 98752, avg26: 16459, x: -0.0214, y: 0.2781, strat: 'LOWEST PERFORMER / ATTENTION: Slower growth (+27.8%) and negative contribution diff.' },
    { q: 'Quadrant D', territory: 'Cairo', dm: 'NOHER ADEL ABD EL- HAKEEM', s26: 52545, avg26: 8758, x: -0.0829, y: 0.2246, strat: 'CRITICAL PRIORITY: Massive capital market losing share (-8.29% diff), urgent turnaround.' }
  ];

  quadData.forEach(d => {
    const row = wsS10.addRow([
      d.q, d.territory, d.dm, d.s26, d.avg26, d.x, d.y, d.strat
    ]);
    row.getCell(4).numFmt = '#,##0';
    row.getCell(5).numFmt = '#,##0';
    row.getCell(6).numFmt = '+0.00%;-0.00%';
    row.getCell(7).numFmt = '+0.00%';

    if (d.q === 'Quadrant A') {
      row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD4EDDA' } };
      row.getCell(1).font = { color: { argb: 'FF155724' }, bold: true };
    } else if (d.q === 'Quadrant B') {
      row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD1ECF1' } };
      row.getCell(1).font = { color: { argb: 'FF0C5460' }, bold: true };
    } else if (d.q === 'Quadrant C') {
      row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF3CD' } };
      row.getCell(1).font = { color: { argb: 'FF856404' }, bold: true };
    } else {
      row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8D7DA' } };
      row.getCell(1).font = { color: { argb: 'FF721C24' }, bold: true };
    }
  });

  const targetPath = path.resolve('C:/Users/seif.elawamry/.gemini/antigravity/scratch/egy_nutri_sales_review/Egy_Nutri_Sales_Analysis_Template.xlsx');
  await wb.xlsx.writeFile(targetPath);
  console.log(`Excel Workbook successfully generated at: ${targetPath}`);
}

createWorkbook().catch(err => console.error(err));
