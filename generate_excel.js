const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');
const { rawData2026, rawData2025, rawAvgQ3_2026, rawAvgH1_2026 } = require('./data');

async function createWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Egy Nutri Commercial Analytics';
  wb.lastModifiedBy = 'Business Review Template (YTD M09-2026)';
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
  const YELLOW_FILL = 'FFF3CD';
  const YELLOW_FONT = '856404';
  const GRAY_HEADER = 'F2F4F8';

  const totUnits26 = rawData2026.reduce((acc, r) => acc + r.sum, 0);
  const totUnits25 = rawData2025.reduce((acc, r) => acc + r.sum, 0);
  const moAvg26 = totUnits26 / 9;
  const moAvg25 = totUnits25 / 12;
  const companyPpg = (moAvg26 / moAvg25) - 1;

  // 1. Executive Summary Sheet
  const wsSummary = wb.addWorksheet('Executive Summary', { views: [{ showGridLines: true }] });
  wsSummary.columns = [
    { width: 5 },
    { width: 34 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 24 }
  ];

  wsSummary.mergeCells('B2:G2');
  wsSummary.getCell('B2').value = 'EGY NUTRI. - BUSINESS REVIEW & SALES ANALYSIS MODEL';
  wsSummary.getCell('B2').font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  wsSummary.getCell('B2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  wsSummary.getCell('B2').alignment = { vertical: 'middle', horizontal: 'center' };
  wsSummary.getRow(2).height = 35;

  wsSummary.mergeCells('B3:G3');
  wsSummary.getCell('B3').value = 'Updated Review: YTD September 2026 (9 Months Monthly Avg) vs Full Year 2025 (12 Months Monthly Avg) + Q3 vs H1 Rep Velocity';
  wsSummary.getCell('B3').font = { italic: true, size: 11, color: { argb: 'FF4A5568' } };
  wsSummary.getCell('B3').alignment = { vertical: 'middle', horizontal: 'center' };
  wsSummary.getRow(3).height = 24;

  // KPI Cards
  const kpis = [
    { label: 'Company YTD 2026 Units', val: totUnits26, fmt: '#,##0', sub: '9 Months (Jan-Sep 2026)' },
    { label: 'Company 2026 Monthly Avg', val: Math.round(moAvg26), fmt: '#,##0', sub: '1,298,415 / 9 Months' },
    { label: 'Company 2025 Total Units', val: totUnits25, fmt: '#,##0', sub: '12 Months (Full Year)' },
    { label: 'Company 2025 Monthly Avg', val: Math.round(moAvg25), fmt: '#,##0', sub: '1,240,615 / 12 Months' },
    { label: 'Company Total PPG Growth', val: companyPpg, fmt: '+0.0%;-0.0%', sub: 'Benchmark Growth Rate (+39.5%)' },
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
    ['Slide 5', 'Total PPG% Growth Ranking', 'All 9 ADMs ranked by Total PPG%. Company at top (+39.5%), Green above, Red below.'],
    ['Slide 6', 'Pediamil 1 PPG% Ranking', 'Ranked by Pediamil 1 growth. Company (+46.9%) at top, Green above, Red below.'],
    ['Slide 7', 'Pediamil 2 PPG% Ranking', 'Ranked by Pediamil 2 growth. Company (+68.5%) at top, Green above, Red below.'],
    ['Slide 8', 'Pedia-Start 1 PPG% Ranking', 'Ranked by Pedia-Start 1 growth. Company (+9.6%) at top, Green above, Red below.'],
    ['Slide 9', 'Pedia-Start 2 PPG% Ranking', 'Ranked by Pedia-Start 2 growth. Company (+37.6%) at top, Green above, Red below.'],
    ['Slide 10', 'Strategic Quadrant Matrix', 'Bubble matrix: X=Contribution Diff (0 baseline), Y=PPG% (+39.5% baseline). Quadrants A/B/C/D.'],
    ['Slide 11', 'Rep Performance Velocity (Q3 vs H1)', 'Quarterly Run-Rate Comparison: Average Monthly Sales Q3 2026 vs H1 2026 baseline. 4 Velocity Tiers.']
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
    'Pedia-Start 1', 'Pedia-Start 2', 'LBW- Egy', 'Sum YTD 9/2026',
    'Contribution % 2026', 'GEO Share % 2025', 'Contribution Index', 'Contribution Diff.'
  ];
  ws2026.addRow(headers2026);
  ws2026.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  ws2026.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  ws2026.getRow(1).height = 28;

  rawData2026.forEach(r => {
    ws2026.addRow([
      r.territory, r.dm, r.p1, r.p2, r.pg3, r.lf, r.ha, r.ar, r.ac, r.mum,
      r.ps1, r.ps2, r.lbw, r.sum, r.sum / totUnits26, r.geoShare, r.contrIdx, r.contrDiff
    ]);
  });

  // Total row for 2026
  const totals26 = [
    'Total Egypt', 'Total',
    rawData2026.reduce((a, r) => a + r.p1, 0),
    rawData2026.reduce((a, r) => a + r.p2, 0),
    rawData2026.reduce((a, r) => a + r.pg3, 0),
    rawData2026.reduce((a, r) => a + r.lf, 0),
    rawData2026.reduce((a, r) => a + r.ha, 0),
    rawData2026.reduce((a, r) => a + r.ar, 0),
    rawData2026.reduce((a, r) => a + r.ac, 0),
    rawData2026.reduce((a, r) => a + r.mum, 0),
    rawData2026.reduce((a, r) => a + r.ps1, 0),
    rawData2026.reduce((a, r) => a + r.ps2, 0),
    rawData2026.reduce((a, r) => a + r.lbw, 0),
    totUnits26, 1.0, 1.0, 1.0, 0.0
  ];
  const totRow26 = ws2026.addRow(totals26);
  totRow26.font = { bold: true };
  totRow26.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BLUE } };

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
      r.ps1, r.ps2, r.lbw, r.sum, r.sum / totUnits25
    ]);
  });
  const totals25 = [
    'Total Egypt', 'Total',
    rawData2025.reduce((a, r) => a + r.p1, 0),
    rawData2025.reduce((a, r) => a + r.p2, 0),
    rawData2025.reduce((a, r) => a + r.pg3, 0),
    rawData2025.reduce((a, r) => a + r.lf, 0),
    rawData2025.reduce((a, r) => a + r.ha, 0),
    rawData2025.reduce((a, r) => a + r.ar, 0),
    rawData2025.reduce((a, r) => a + r.ac, 0),
    rawData2025.reduce((a, r) => a + r.mum, 0),
    rawData2025.reduce((a, r) => a + r.ps1, 0),
    rawData2025.reduce((a, r) => a + r.ps2, 0),
    0, totUnits25, 1.0
  ];
  const totRow25 = ws2025.addRow(totals25);
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

  // 4. Raw Data Q3 2026 & H1 2026 Sheets
  const wsQ3 = wb.addWorksheet('Data_Avg_Q3_2026', { views: [{ showGridLines: true }] });
  wsQ3.addRow(headers2025.slice(0, 14));
  wsQ3.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  wsQ3.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  rawAvgQ3_2026.forEach(r => {
    wsQ3.addRow([r.territory, r.dm, r.p1, r.p2, r.pg3, r.lf, r.ha, r.ar, r.ac, r.mum, r.ps1, r.ps2, r.lbw, r.sum]);
  });
  wsQ3.columns.forEach((col, idx) => { col.width = idx < 2 ? 26 : 14; });

  const wsH1 = wb.addWorksheet('Data_Avg_H1_2026', { views: [{ showGridLines: true }] });
  wsH1.addRow(headers2025.slice(0, 14));
  wsH1.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  wsH1.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  rawAvgH1_2026.forEach(r => {
    wsH1.addRow([r.territory, r.dm, r.p1, r.p2, r.pg3, r.lf, r.ha, r.ar, r.ac, r.mum, r.ps1, r.ps2, r.lbw, r.sum]);
  });
  wsH1.columns.forEach((col, idx) => { col.width = idx < 2 ? 26 : 14; });

  // 5. Slide 1 Sheet: Contribution & GEO Share Analysis
  const wsS1 = wb.addWorksheet('Slide1_Contribution', { views: [{ showGridLines: true }] });
  wsS1.columns = [
    { width: 22 }, { width: 32 }, { width: 16 }, { width: 16 },
    { width: 16 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 22 }
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
    const c26 = r.sum / totUnits26;
    const c25 = r25.sum / totUnits25;
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

  // 6. Slide 2 Sheet: Core Nutrition Monthly Averages
  const wsS2 = wb.addWorksheet('Slide2_Core_Averages', { views: [{ showGridLines: true }] });
  wsS2.columns = [
    { width: 20 }, { width: 30 },
    { width: 16 }, { width: 16 }, { width: 16 },
    { width: 16 }, { width: 16 }, { width: 16 },
    { width: 16 }, { width: 16 }, { width: 16 },
    { width: 16 }, { width: 16 }, { width: 16 }
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

  const totP1_26 = rawData2026.reduce((a, r) => a + r.p1, 0);
  const totP2_26 = rawData2026.reduce((a, r) => a + r.p2, 0);
  const totPS1_26 = rawData2026.reduce((a, r) => a + r.ps1, 0);
  const totPS2_26 = rawData2026.reduce((a, r) => a + r.ps2, 0);

  const totP1_25 = rawData2025.reduce((a, r) => a + r.p1, 0);
  const totP2_25 = rawData2025.reduce((a, r) => a + r.p2, 0);
  const totPS1_25 = rawData2025.reduce((a, r) => a + r.ps1, 0);
  const totPS2_25 = rawData2025.reduce((a, r) => a + r.ps2, 0);

  const lnP1 = (totP1_26 / 9) / 9;
  const lnP2 = (totP2_26 / 9) / 9;
  const lnPS1 = (totPS1_26 / 9) / 9;
  const lnPS2 = (totPS2_26 / 9) / 9;

  rawData2026.forEach((r, i) => {
    const r25 = rawData2025[i];
    const row = wsS2.addRow([
      r.territory, r.dm,
      r.p1 / 9, r25.p1 / 12, lnP1,
      r.p2 / 9, r25.p2 / 12, lnP2,
      r.ps1 / 9, r25.ps1 / 12, lnPS1,
      r.ps2 / 9, r25.ps2 / 12, lnPS2
    ]);
    for (let c = 3; c <= 14; c++) {
      row.getCell(c).numFmt = '#,##0';
    }
  });

  const s2Tot = wsS2.addRow([
    'Total Egypt (Per Month)', 'Line Average / ADM',
    totP1_26 / 9, totP1_25 / 12, lnP1,
    totP2_26 / 9, totP2_25 / 12, lnP2,
    totPS1_26 / 9, totPS1_25 / 12, lnPS1,
    totPS2_26 / 9, totPS2_25 / 12, lnPS2
  ]);
  s2Tot.font = { bold: true };
  s2Tot.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BLUE } };
  for (let c = 3; c <= 14; c++) {
    s2Tot.getCell(c).numFmt = '#,##0';
  }

  // 7. Slide 3 Sheet: Specialty Nutrition Monthly Averages
  const wsS3 = wb.addWorksheet('Slide3_Specialty_Averages', { views: [{ showGridLines: true }] });
  wsS3.columns = [
    { width: 20 }, { width: 30 },
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

  const totLF_26 = rawData2026.reduce((a, r) => a + r.lf, 0);
  const totHA_26 = rawData2026.reduce((a, r) => a + r.ha, 0);
  const totAR_26 = rawData2026.reduce((a, r) => a + r.ar, 0);
  const totAC_26 = rawData2026.reduce((a, r) => a + r.ac, 0);
  const totMUM_26 = rawData2026.reduce((a, r) => a + r.mum, 0);

  const totLF_25 = rawData2025.reduce((a, r) => a + r.lf, 0);
  const totHA_25 = rawData2025.reduce((a, r) => a + r.ha, 0);
  const totAR_25 = rawData2025.reduce((a, r) => a + r.ar, 0);
  const totAC_25 = rawData2025.reduce((a, r) => a + r.ac, 0);
  const totMUM_25 = rawData2025.reduce((a, r) => a + r.mum, 0);

  const lnLF = (totLF_26 / 9) / 9;
  const lnHA = (totHA_26 / 9) / 9;
  const lnAR = (totAR_26 / 9) / 9;
  const lnAC = (totAC_26 / 9) / 9;
  const lnMUM = (totMUM_26 / 9) / 9;

  rawData2026.forEach((r, i) => {
    const r25 = rawData2025[i];
    const row = wsS3.addRow([
      r.territory, r.dm,
      r.lf / 9, r25.lf / 12, lnLF,
      r.ha / 9, r25.ha / 12, lnHA,
      r.ar / 9, r25.ar / 12, lnAR,
      r.ac / 9, r25.ac / 12, lnAC,
      r.mum / 9, r25.mum / 12, lnMUM
    ]);
    for (let c = 3; c <= 17; c++) {
      row.getCell(c).numFmt = '#,##0';
    }
  });

  const s3Tot = wsS3.addRow([
    'Total Egypt (Per Month)', 'Line Average / ADM',
    totLF_26 / 9, totLF_25 / 12, lnLF,
    totHA_26 / 9, totHA_25 / 12, lnHA,
    totAR_26 / 9, totAR_25 / 12, lnAR,
    totAC_26 / 9, totAC_25 / 12, lnAC,
    totMUM_26 / 9, totMUM_25 / 12, lnMUM
  ]);
  s3Tot.font = { bold: true };
  s3Tot.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BLUE } };
  for (let c = 3; c <= 17; c++) {
    s3Tot.getCell(c).numFmt = '#,##0';
  }

  // 8. Slide 4 Sheet: Dual-Axis Selected ADM Deep Dive Template
  const wsS4 = wb.addWorksheet('Slide4_Dual_Axis_DeepDive', { views: [{ showGridLines: true }] });
  wsS4.columns = [
    { width: 22 }, { width: 18 }, { width: 18 }, { width: 18 },
    { width: 18 }, { width: 18 }, { width: 24 }
  ];

  wsS4.mergeCells('A1:G1');
  wsS4.getCell('A1').value = 'SLIDE 4: DUAL-AXIS PRODUCT ANALYSIS TEMPLATE (SELECTED ADM vs COMPANY PPG%)';
  wsS4.getCell('A1').font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  wsS4.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  wsS4.getRow(1).height = 30;

  const chosen26 = rawData2026[7]; // Beshoy Youhanna (Upper Egypt II)
  const chosen25 = rawData2025[7];
  const chosenMo26 = chosen26.sum / 9;
  const chosenMo25 = chosen25.sum / 12;
  const chosenPpg = (chosenMo26 / chosenMo25) - 1;

  wsS4.getCell('A3').value = 'Selected ADM in Review:';
  wsS4.getCell('A3').font = { bold: true, size: 12 };
  wsS4.getCell('B3').value = `${chosen26.dm} (${chosen26.territory})`;
  wsS4.getCell('B3').font = { bold: true, size: 12, color: { argb: NAVY } };

  wsS4.getCell('D3').value = 'Selected ADM PPG%:';
  wsS4.getCell('D3').font = { bold: true };
  wsS4.getCell('E3').value = chosenPpg;
  wsS4.getCell('E3').numFmt = '+0.00%';
  wsS4.getCell('E3').font = { bold: true, size: 13, color: { argb: GREEN_FONT } };

  wsS4.getCell('F3').value = 'Company Total PPG%:';
  wsS4.getCell('F3').font = { bold: true };
  wsS4.getCell('G3').value = companyPpg;
  wsS4.getCell('G3').numFmt = '+0.00%';
  wsS4.getCell('G3').font = { bold: true, size: 13, color: { argb: NAVY } };

  wsS4.mergeCells('A5:G5');
  wsS4.getCell('A5').value = `STATUS: 🟢 ABOVE COMPANY BENCHMARK (+${((chosenPpg - companyPpg)*100).toFixed(1)}% ahead of Egypt Growth)`;
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
    { name: 'Pediamil 1', p26: chosen26.p1/9, p25: chosen25.p1/12, cPpg: (totP1_26/9)/(totP1_25/12) - 1 },
    { name: 'Pediamil 2', p26: chosen26.p2/9, p25: chosen25.p2/12, cPpg: (totP2_26/9)/(totP2_25/12) - 1 },
    { name: 'PediaGrow 3', p26: chosen26.pg3/9, p25: chosen25.pg3/12, cPpg: ((rawData2026.reduce((a,r)=>a+r.pg3,0)/9)/(rawData2025.reduce((a,r)=>a+r.pg3,0)/12)) - 1 },
    { name: 'Pediamil LF', p26: chosen26.lf/9, p25: chosen25.lf/12, cPpg: (totLF_26/9)/(totLF_25/12) - 1 },
    { name: 'Pediamil HA', p26: chosen26.ha/9, p25: chosen25.ha/12, cPpg: (totHA_26/9)/(totHA_25/12) - 1 },
    { name: 'Pediamil AR', p26: chosen26.ar/9, p25: chosen25.ar/12, cPpg: (totAR_26/9)/(totAR_25/12) - 1 },
    { name: 'Pediamil AC', p26: chosen26.ac/9, p25: chosen25.ac/12, cPpg: (totAC_26/9)/(totAC_25/12) - 1 },
    { name: 'Pediamum', p26: chosen26.mum/9, p25: chosen25.mum/12, cPpg: (totMUM_26/9)/(totMUM_25/12) - 1 },
    { name: 'Pedia-Start 1', p26: chosen26.ps1/9, p25: chosen25.ps1/12, cPpg: (totPS1_26/9)/(totPS1_25/12) - 1 },
    { name: 'Pedia-Start 2', p26: chosen26.ps2/9, p25: chosen25.ps2/12, cPpg: (totPS2_26/9)/(totPS2_25/12) - 1 },
    { name: 'LBW- Egy', p26: chosen26.lbw/9, p25: 0, cPpg: 1.0 }
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

  const s4Tot = wsS4.addRow([
    'Total Units', chosenMo25, chosenMo26, chosenMo26 - chosenMo25, chosenPpg, companyPpg, '🟢 Overall Above Company'
  ]);
  s4Tot.font = { bold: true };
  s4Tot.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BLUE } };
  s4Tot.getCell(2).numFmt = '#,##0';
  s4Tot.getCell(3).numFmt = '#,##0';
  s4Tot.getCell(4).numFmt = '+#,##0;-#,##0';
  s4Tot.getCell(5).numFmt = '+0.0%;-0.0%';
  s4Tot.getCell(6).numFmt = '+0.0%;-0.0%';

  // 9. Slide 5 Sheet: Total PPG% Growth Ranking
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

  const compRow = wsS5.addRow([
    'TOP', 'EGYPT TOTAL (COMPANY)', 'National Benchmark',
    moAvg25, moAvg26, companyPpg, 'NATIONAL BENCHMARK', 'BLUE / GOLD (BASELINE)'
  ]);
  compRow.font = { bold: true };
  compRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F4F8' } };
  compRow.getCell(4).numFmt = '#,##0';
  compRow.getCell(5).numFmt = '#,##0';
  compRow.getCell(6).numFmt = '+0.00%';

  const totalRanks = rawData2026.map((r, i) => {
    const r25 = rawData2025[i];
    const avg25 = r25.sum / 12;
    const avg26 = r.sum / 9;
    const ppg = (avg26 / avg25) - 1;
    return { territory: r.territory, dm: r.dm, avg25, avg26, ppg };
  }).sort((a, b) => b.ppg - a.ppg);

  totalRanks.forEach((r, idx) => {
    const isAbove = r.ppg >= companyPpg;
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

  // Helper for Product Rank Sheets (Slides 6, 7, 8, 9)
  function addProductRankSheet(sheetName, title, prodKey, prodName, compPpgVal, compAvg25Val, compAvg26Val) {
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
      compAvg25Val, compAvg26Val, compPpgVal, 'NATIONAL BENCHMARK', 'BLUE / GOLD (BASELINE)'
    ]);
    cRow.font = { bold: true };
    cRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F4F8' } };
    cRow.getCell(4).numFmt = '#,##0';
    cRow.getCell(5).numFmt = '#,##0';
    cRow.getCell(6).numFmt = '+0.00%';

    const pRanks = rawData2026.map((r, i) => {
      const r25 = rawData2025[i];
      const a25 = (r25[prodKey] || 0) / 12;
      const a26 = (r[prodKey] || 0) / 9;
      const ppg = a25 > 0 ? (a26 / a25 - 1) : 1.0;
      return { territory: r.territory, dm: r.dm, avg25: a25, avg26: a26, ppg };
    }).sort((a, b) => b.ppg - a.ppg);

    pRanks.forEach((r, idx) => {
      const isAbove = r.ppg >= compPpgVal;
      const ind = isAbove ? `🟢 ABOVE COMPANY (${(compPpgVal*100).toFixed(1)}%)` : `🔻 BELOW COMPANY (${(compPpgVal*100).toFixed(1)}%)`;
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
  const p1CompPpg = (totP1_26/9)/(totP1_25/12) - 1;
  addProductRankSheet(
    'Slide6_Pediamil1_Ranking',
    `SLIDE 6: PEDIAMIL 1 PPG% GROWTH RANKING (COMPANY AT TOP: +${(p1CompPpg*100).toFixed(1)}%)`,
    'p1', 'Pediamil 1', p1CompPpg, totP1_25/12, totP1_26/9
  );

  // Slide 7: Pediamil 2 Ranking
  const p2CompPpg = (totP2_26/9)/(totP2_25/12) - 1;
  addProductRankSheet(
    'Slide7_Pediamil2_Ranking',
    `SLIDE 7: PEDIAMIL 2 PPG% GROWTH RANKING (COMPANY AT TOP: +${(p2CompPpg*100).toFixed(1)}%)`,
    'p2', 'Pediamil 2', p2CompPpg, totP2_25/12, totP2_26/9
  );

  // Slide 8: Pedia-Start 1 Ranking
  const ps1CompPpg = (totPS1_26/9)/(totPS1_25/12) - 1;
  addProductRankSheet(
    'Slide8_PediaStart1_Ranking',
    `SLIDE 8: PEDIA-START 1 PPG% GROWTH RANKING (COMPANY AT TOP: +${(ps1CompPpg*100).toFixed(1)}%)`,
    'ps1', 'Pedia-Start 1', ps1CompPpg, totPS1_25/12, totPS1_26/9
  );

  // Slide 9: Pedia-Start 2 Ranking
  const ps2CompPpg = (totPS2_26/9)/(totPS2_25/12) - 1;
  addProductRankSheet(
    'Slide9_PediaStart2_Ranking',
    `SLIDE 9: PEDIA-START 2 PPG% GROWTH RANKING (COMPANY AT TOP: +${(ps2CompPpg*100).toFixed(1)}%)`,
    'ps2', 'Pedia-Start 2', ps2CompPpg, totPS2_25/12, totPS2_26/9
  );

  // 10. Slide 10 Sheet: Strategic Quadrant Matrix
  const wsS10 = wb.addWorksheet('Slide10_Quadrant_Matrix', { views: [{ showGridLines: true }] });
  wsS10.columns = [
    { width: 14 }, { width: 22 }, { width: 32 },
    { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 42 }
  ];

  wsS10.mergeCells('A1:H1');
  wsS10.getCell('A1').value = 'SLIDE 10: STRATEGIC QUADRANT MATRIX (CONTRIBUTION DIFF vs PPG%)';
  wsS10.getCell('A1').font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  wsS10.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  wsS10.getRow(1).height = 30;

  wsS10.mergeCells('A2:H2');
  wsS10.getCell('A2').value = `Baselines: X-Axis Reference = 0.00% (Contribution Diff) | Y-Axis Reference = +${(companyPpg*100).toFixed(2)}% (Company Total PPG)`;
  wsS10.getCell('A2').font = { italic: true, size: 10, color: { argb: 'FF4A5568' } };
  wsS10.getCell('A2').alignment = { horizontal: 'center' };

  wsS10.addRow([
    'Quadrant', 'Territory Name', 'DM Name',
    'YTD 2026 Sales', 'MoAvg 2026', 'Contr. Diff (X)', 'Total PPG% (Y)', 'Strategic Classification & Recommendation'
  ]);
  wsS10.getRow(3).font = { bold: true };
  wsS10.getRow(3).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_HEADER } };

  rawData2026.forEach((r, i) => {
    const r25 = rawData2025[i];
    const avg25 = r25.sum / 12;
    const avg26 = r.sum / 9;
    const ppg = (avg26 / avg25) - 1;
    const x = r.contrDiff;
    const y = ppg;

    let q = 'Quadrant A';
    let strat = '';
    if (x >= 0 && y >= companyPpg) {
      q = 'Quadrant A';
      strat = 'COMPANY STAR: Heavy volume, high growth exceeding company benchmark, expanding market share.';
    } else if (x < 0 && y >= companyPpg) {
      q = 'Quadrant B';
      strat = 'CHALLENGER: High growth outstripping company pace, rapidly closing territorial potential gap.';
    } else if (x >= 0 && y < companyPpg) {
      q = 'Quadrant C';
      strat = 'VOLUME PILLAR: High market contribution defender; growth moderate, focus on specialty formulas.';
    } else {
      q = 'Quadrant D';
      strat = 'CRITICAL ATTENTION: Lowest performer; lagging growth and contribution gap below geographic share.';
    }

    const row = wsS10.addRow([
      q, r.territory, r.dm, r.sum, avg26, x, y, strat
    ]);
    row.getCell(4).numFmt = '#,##0';
    row.getCell(5).numFmt = '#,##0';
    row.getCell(6).numFmt = '+0.00%;-0.00%';
    row.getCell(7).numFmt = '+0.00%';

    if (q === 'Quadrant A') {
      row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN_FILL } };
      row.getCell(1).font = { color: { argb: GREEN_FONT }, bold: true };
    } else if (q === 'Quadrant B') {
      row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD1ECF1' } };
      row.getCell(1).font = { color: { argb: 'FF0C5460' }, bold: true };
    } else if (q === 'Quadrant C') {
      row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: YELLOW_FILL } };
      row.getCell(1).font = { color: { argb: YELLOW_FONT }, bold: true };
    } else {
      row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: RED_FILL } };
      row.getCell(1).font = { color: { argb: RED_FONT }, bold: true };
    }
  });

  // 11. Slide 11 Sheet: Medical Rep Performance Velocity (Q3 2026 vs H1 2026 Baseline)
  const wsS11 = wb.addWorksheet('11-Q3 vs H1 Rep Velocity', { views: [{ showGridLines: true }] });
  wsS11.columns = [
    { width: 8 }, { width: 22 }, { width: 34 },
    { width: 16 }, { width: 16 }, { width: 16 }, { width: 16 }, { width: 24 }, { width: 44 }
  ];

  wsS11.mergeCells('A1:I1');
  wsS11.getCell('A1').value = 'SLIDE 11: MEDICAL REP / ADM QUARTERLY VELOCITY (AVERAGE MONTHLY Q3 2026 vs H1 2026 BASELINE)';
  wsS11.getCell('A1').font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  wsS11.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
  wsS11.getRow(1).height = 30;

  const totH1 = rawAvgH1_2026.reduce((acc, r) => acc + r.sum, 0);
  const totQ3 = rawAvgQ3_2026.reduce((acc, r) => acc + r.sum, 0);
  const compVelocity = (totQ3 / totH1) - 1;

  wsS11.mergeCells('A2:I2');
  wsS11.getCell('A2').value = `National Velocity Benchmark: H1 Monthly Avg = ${totH1.toLocaleString()} cans/mo | Q3 Monthly Avg = ${totQ3.toLocaleString()} cans/mo | Acceleration = +${(compVelocity*100).toFixed(1)}% (+${(totQ3 - totH1).toLocaleString()} cans/mo)`;
  wsS11.getCell('A2').font = { italic: true, size: 10.5, color: { argb: 'FF4A5568' } };
  wsS11.getCell('A2').alignment = { horizontal: 'center' };

  wsS11.addRow([
    'Rank', 'Territory Name', 'Medical Rep / ADM Name',
    'H1 MoAvg (Jan-Jun)', 'Q3 MoAvg (Jul-Sep)', 'Net Diff / Mo', 'Velocity %', 'Performance Tier', 'Strategic Velocity Assessment'
  ]);
  wsS11.getRow(3).font = { bold: true };
  wsS11.getRow(3).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_HEADER } };
  wsS11.getRow(3).height = 25;

  const compVelRow = wsS11.addRow([
    'TOP', 'EGYPT TOTAL (COMPANY)', 'National Medical Rep Team Benchmark',
    totH1, totQ3, totQ3 - totH1, compVelocity, 'NATIONAL BENCHMARK', 'Overall company run-rate accelerated by +12.9% in Q3'
  ]);
  compVelRow.font = { bold: true };
  compVelRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F4F8' } };
  compVelRow.getCell(4).numFmt = '#,##0';
  compVelRow.getCell(5).numFmt = '#,##0';
  compVelRow.getCell(6).numFmt = '+#,##0;-#,##0';
  compVelRow.getCell(7).numFmt = '+0.0%';

  const repVelocityData = rawAvgQ3_2026.map((q, idx) => {
    const h = rawAvgH1_2026[idx];
    const diff = q.sum - h.sum;
    const vel = (q.sum / h.sum) - 1;
    let tier = '';
    let assessment = '';

    if (vel >= 0.40) {
      tier = 'Tier 1: High Accelerator 🚀';
      assessment = 'Exceptional momentum; staged dramatic turnaround driven by core and specialty clinic expansion.';
    } else if (vel >= 0.15) {
      tier = 'Tier 2: Scale Compounder 📈';
      assessment = 'High-volume scale compounder; continues building market leadership at heavy volume.';
    } else if (vel >= 0.0) {
      tier = 'Tier 3: Steady Consolidator 🛡️';
      assessment = 'Stable baseline preserved; requires activation of secondary core & specialty products to reignite growth.';
    } else {
      tier = 'Tier 4: Contraction Watchlist ⚠️';
      assessment = 'Quarterly run-rate deceleration; urgent trade stock replenishment and rep detailing call review.';
    }

    return {
      territory: q.territory,
      dm: q.dm,
      h1: h.sum,
      q3: q.sum,
      diff,
      vel,
      tier,
      assessment
    };
  }).sort((a, b) => b.vel - a.vel);

  repVelocityData.forEach((r, idx) => {
    const isAbove = r.vel >= compVelocity;
    const row = wsS11.addRow([
      idx + 1, r.territory, r.dm, r.h1, r.q3, r.diff, r.vel, r.tier, r.assessment
    ]);
    row.getCell(4).numFmt = '#,##0';
    row.getCell(5).numFmt = '#,##0';
    row.getCell(6).numFmt = '+#,##0;-#,##0';
    row.getCell(7).numFmt = '+0.0%';

    if (r.vel >= 0.40) {
      row.getCell(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN_FILL } };
      row.getCell(7).font = { color: { argb: GREEN_FONT }, bold: true };
      row.getCell(8).font = { color: { argb: GREEN_FONT }, bold: true };
    } else if (r.vel >= 0.15) {
      row.getCell(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD1ECF1' } };
      row.getCell(7).font = { color: { argb: 'FF0C5460' }, bold: true };
      row.getCell(8).font = { color: { argb: 'FF0C5460' }, bold: true };
    } else if (r.vel >= 0.0) {
      row.getCell(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: YELLOW_FILL } };
      row.getCell(7).font = { color: { argb: YELLOW_FONT }, bold: true };
      row.getCell(8).font = { color: { argb: YELLOW_FONT }, bold: true };
    } else {
      row.getCell(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: RED_FILL } };
      row.getCell(7).font = { color: { argb: RED_FONT }, bold: true };
      row.getCell(8).font = { color: { argb: RED_FONT }, bold: true };
    }
  });

  // Add Product Velocity Breakdown below Rep Table
  wsS11.addRow([]);
  wsS11.addRow(['', 'PRODUCT PORTFOLIO VELOCITY BREAKDOWN (Q3 2026 vs H1 2026)', '', '', '', '', '', '', '']);
  const prodHeadRowIdx = wsS11.lastRow.number;
  wsS11.mergeCells(`B${prodHeadRowIdx}:I${prodHeadRowIdx}`);
  wsS11.getCell(`B${prodHeadRowIdx}`).font = { bold: true, size: 12, color: { argb: NAVY } };

  wsS11.addRow([
    'SKU Code', 'Product Description', 'Category', 'H1 MoAvg (Units)', 'Q3 MoAvg (Units)', 'Diff / Mo', 'Velocity %', 'Supply / Demand Dynamic', ''
  ]);
  const pSubHead = wsS11.lastRow;
  pSubHead.font = { bold: true };
  pSubHead.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY_HEADER } };

  const prodVelocityKeys = [
    { key: 'p1', name: 'Pediamil 1', cat: 'Core Infant', supply: 'Strong demand (+10.5%), supply stable' },
    { key: 'p2', name: 'Pediamil 2', cat: 'Core Follow-up', supply: 'Slight dip (-8.4%) from peak Q2 promotions' },
    { key: 'pg3', name: 'PediaGrow 3', cat: 'Growing Up Milk', supply: 'Supply constraint in Q3 (-80.6%)' },
    { key: 'lf', name: 'Pediamil LF', cat: 'Specialty Lactose Free', supply: 'Supply quota restricted (-46.2%)' },
    { key: 'ha', name: 'Pediamil HA', cat: 'Specialty Hypoallergenic', supply: 'Surge in hospital demand (+102.4%)' },
    { key: 'ar', name: 'Pediamil AR', cat: 'Specialty Anti-Regurgitation', supply: 'Steady pediatric adoption (+30.1%)' },
    { key: 'ac', name: 'Pediamil AC', cat: 'Specialty Anti-Colic', supply: 'Massive surge across clinics (+101.9%)' },
    { key: 'mum', name: 'Pediamum', cat: 'Maternal Nutrition', supply: 'Niche pharmacy detailing (-10.4%)' },
    { key: 'ps1', name: 'Pedia-Start 1', cat: 'Economy Infant', supply: 'Heavy clinic uptake across Upper Egypt (+35.7%)' },
    { key: 'ps2', name: 'Pedia-Start 2', cat: 'Economy Follow-up', supply: 'Stable rural demand (-6.3%)' },
    { key: 'lbw', name: 'LBW- Egy', cat: 'Specialty Low Birth Weight', supply: 'Severe temporary stockout in Q3 (-98.8%)' }
  ];

  prodVelocityKeys.forEach(p => {
    const sumH1 = rawAvgH1_2026.reduce((acc, r) => acc + (r[p.key] || 0), 0);
    const sumQ3 = rawAvgQ3_2026.reduce((acc, r) => acc + (r[p.key] || 0), 0);
    const diff = sumQ3 - sumH1;
    const vel = sumH1 > 0 ? (sumQ3 / sumH1 - 1) : 0;

    const pr = wsS11.addRow([
      p.key.toUpperCase(), p.name, p.cat, sumH1, sumQ3, diff, vel, p.supply, ''
    ]);
    pr.getCell(4).numFmt = '#,##0';
    pr.getCell(5).numFmt = '#,##0';
    pr.getCell(6).numFmt = '+#,##0;-#,##0';
    pr.getCell(7).numFmt = '+0.0%';

    if (vel >= 0.20) {
      pr.getCell(7).font = { color: { argb: GREEN_FONT }, bold: true };
    } else if (vel < 0) {
      pr.getCell(7).font = { color: { argb: RED_FONT }, bold: true };
    }
  });

  const targetPath = path.join(__dirname, 'Egy_Nutri_Sales_Analysis_Template.xlsx');
  await wb.xlsx.writeFile(targetPath);
  const distDir = path.join(__dirname, 'public');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  fs.copyFileSync(targetPath, path.join(distDir, 'Egy_Nutri_Sales_Analysis_Template.xlsx'));
  console.log(`Excel Workbook successfully generated at root and public/: ${targetPath}`);
}

createWorkbook().catch(err => {
  console.error(err);
  process.exit(1);
});
