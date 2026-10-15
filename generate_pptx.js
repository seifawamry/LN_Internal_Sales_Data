const PptxGenJS = require('pptxgenjs');
const path = require('path');
const fs = require('fs');
const { rawData2026, rawData2025, rawAvgQ3_2026, rawAvgH1_2026 } = require('./data');

async function createPowerPoint() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 16:9 widescreen layout

  // Color Palette
  const C_NAVY = '1B365D';
  const C_SLATE = '2C3E50';
  const C_TEAL = '008080';
  const C_GREEN = '28A745';
  const C_RED = 'DC3545';
  const C_LIGHT_GRAY = 'F8F9FA';
  const C_BORDER_GRAY = 'E2E8F0';
  const C_GOLD = 'D4AF37';
  const C_VIOLET = '8B5CF6';

  const totUnits26 = rawData2026.reduce((acc, r) => acc + r.sum, 0); // 1,298,415
  const totUnits25 = rawData2025.reduce((acc, r) => acc + r.sum, 0); // 1,240,615
  const compMoAvg26 = totUnits26 / 9; // 144,268
  const compMoAvg25 = totUnits25 / 12; // 103,385
  const compTotalPpg = ((compMoAvg26 / compMoAvg25) - 1) * 100; // 39.54%

  // Helper: Slide Header
  function addHeader(slide, slideNum, title, subtitle) {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: '100%', h: 1.1,
      fill: { color: C_NAVY }
    });

    slide.addText(`SLIDE ${slideNum}`, {
      x: 0.5, y: 0.15, w: 2.5, h: 0.3,
      fontSize: 10, bold: true, color: 'A0C4E2', fontFace: 'Calibri'
    });

    slide.addText(title, {
      x: 0.5, y: 0.38, w: 10.5, h: 0.45,
      fontSize: 16.5, bold: true, color: 'FFFFFF', fontFace: 'Calibri'
    });

    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.5, y: 0.82, w: 10.5, h: 0.25,
        fontSize: 10, italic: true, color: 'D9E2EC', fontFace: 'Calibri'
      });
    }

    // Company Tag
    slide.addText('EGY NUTRI. BUSINESS REVIEW', {
      x: 10.2, y: 0.25, w: 2.8, h: 0.3,
      fontSize: 10, bold: true, color: 'D4AF37', align: 'right', fontFace: 'Calibri'
    });
    slide.addText('YTD M09-2026 vs 2025', {
      x: 10.2, y: 0.55, w: 2.8, h: 0.25,
      fontSize: 9, color: 'FFFFFF', align: 'right', fontFace: 'Calibri'
    });
  }

  // Chosen Person Example: Beshoy Youhanna (Upper Egypt II)
  const chosen = rawData2026[7]; // Beshoy
  const chosen25 = rawData2025[7];
  const chosenGeo = chosen.geoShare * 100;
  const chosenC26 = (chosen.sum / totUnits26) * 100;
  const chosenC25 = (chosen25.sum / totUnits25) * 100;

  // ==================== SLIDE 1 ====================
  const s1 = pptx.addSlide();
  addHeader(s1, '01', 'TERRITORIAL CONTRIBUTION & GEO SHARE (SELECTED ADM)', 'Horizontal 3-Bar Share Analysis for Selected ADM (Beshoy Youhanna) with values plotted directly on the bars');

  const s1Labels = ['GEO Share % (2025 Potential)', 'YTD Contribution % 2026', 'Contribution % 2025'];
  const s1Values = [Number(chosenGeo.toFixed(2)), Number(chosenC26.toFixed(2)), Number(chosenC25.toFixed(2))];

  const chartS1Data = [
    { name: 'Share %', labels: s1Labels.reverse(), values: s1Values.reverse() }
  ];

  s1.addChart(pptx.ChartType.bar, chartS1Data, {
    x: 0.5, y: 1.3, w: 7.2, h: 4.0,
    barDir: 'bar',
    chartColors: ['38BDF8', '1B365D', '888888'],
    showLegend: false,
    showValue: true,
    dataLabelFontSize: 11
  });

  s1.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 5.5, w: 7.2, h: 1.6,
    fill: { color: 'F0FDF4' }, line: { color: '28A745', width: 1.5 }
  });
  s1.addText('SELECTED ADM SHARE DIAGNOSTIC', {
    x: 0.7, y: 5.65, w: 6.8, h: 0.3,
    fontSize: 11, bold: true, color: '155724'
  });
  s1.addText(`• 2026 Current Contribution: 16.24% (National volume leader, 210,911 cans YTD)\n• GEO Market Potential: 15.61% | Variance vs. Potential: +0.63% (Exceeding territory potential)\n• Year-over-Year Gain: +1.87% expansion vs Full-Year 2025 contribution (14.37%)`, {
    x: 0.7, y: 5.95, w: 6.8, h: 1.0,
    fontSize: 9.5, color: '155724'
  });

  const tS1Rows = [
    [
      { text: 'Territory', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'GEO %', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Contr 26', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Contr 25', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Diff (Geo)', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } }
    ]
  ];

  rawData2026.forEach((r, idx) => {
    const isPos = r.contrDiff >= 0;
    const isChosen = idx === 7;
    tS1Rows.push([
      { text: (isChosen ? '👉 ' : '') + r.territory, options: { fontSize: 8.5, bold: isChosen, fill: isChosen ? 'EFF6FF' : 'FFFFFF' } },
      { text: (r.geoShare * 100).toFixed(1) + '%', options: { fontSize: 8.5, fill: isChosen ? 'EFF6FF' : 'FFFFFF' } },
      { text: ((r.sum / totUnits26) * 100).toFixed(1) + '%', options: { fontSize: 8.5, bold: isChosen, fill: isChosen ? 'EFF6FF' : 'FFFFFF' } },
      { text: ((rawData2025[idx].sum / totUnits25) * 100).toFixed(1) + '%', options: { fontSize: 8.5, fill: isChosen ? 'EFF6FF' : 'FFFFFF' } },
      {
        text: (r.contrDiff * 100 > 0 ? '+' : '') + (r.contrDiff * 100).toFixed(2) + '%',
        options: { fontSize: 8.5, bold: true, color: isPos ? C_GREEN : C_RED, fill: isChosen ? 'EFF6FF' : 'FFFFFF' }
      }
    ]);
  });

  s1.addTable(tS1Rows, {
    x: 8.0, y: 1.3, w: 4.8, h: 5.8,
    colW: [1.4, 0.8, 0.85, 0.85, 0.9],
    border: { pt: '0.5', color: C_BORDER_GRAY },
    align: 'center', valign: 'middle'
  });

  // ==================== SLIDE 2 ====================
  const s2 = pptx.addSlide();
  addHeader(s2, '02', 'CORE INFANT NUTRITION: MONTHLY SALES AVERAGES', 'Horizontal Bars with exact values: Beshoy Youhanna (Upper Egypt II) vs 2025 vs Line Avg/ADM');

  const totP1_26 = rawData2026.reduce((a, r) => a + r.p1, 0);
  const totP2_26 = rawData2026.reduce((a, r) => a + r.p2, 0);
  const totPS1_26 = rawData2026.reduce((a, r) => a + r.ps1, 0);
  const totPS2_26 = rawData2026.reduce((a, r) => a + r.ps2, 0);

  const coreProds = [
    { name: 'Pediamil 1', p26: chosen.p1/9, p25: chosen25.p1/12, ln: (totP1_26/9)/9 },
    { name: 'Pediamil 2', p26: chosen.p2/9, p25: chosen25.p2/12, ln: (totP2_26/9)/9 },
    { name: 'Pedia-Start 1', p26: chosen.ps1/9, p25: chosen25.ps1/12, ln: (totPS1_26/9)/9 },
    { name: 'Pedia-Start 2', p26: chosen.ps2/9, p25: chosen25.ps2/12, ln: (totPS2_26/9)/9 }
  ];

  const s2Labels = coreProds.map(p => p.name).reverse();
  const s2ChartData = [
    { name: '2026 MoAvg (Units)', labels: s2Labels, values: coreProds.map(p => Math.round(p.p26)).reverse() },
    { name: '2025 MoAvg (Units)', labels: s2Labels, values: coreProds.map(p => Math.round(p.p25)).reverse() },
    { name: 'Line Avg / ADM', labels: s2Labels, values: coreProds.map(p => Math.round(p.ln)).reverse() }
  ];

  s2.addChart(pptx.ChartType.bar, s2ChartData, {
    x: 0.5, y: 1.3, w: 7.2, h: 5.6,
    barDir: 'bar',
    chartColors: ['1B365D', '4A90E2', 'D4AF37'],
    showLegend: true, legendPos: 't',
    showValue: true, dataLabelFontSize: 8
  });

  const tS2Rows = [
    [
      { text: 'Core Product', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: '2026 MoAvg', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: '2025 MoAvg', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'PPG Growth', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Line Avg/ADM', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } }
    ]
  ];

  coreProds.forEach(p => {
    const ppg = ((p.p26 / p.p25) - 1) * 100;
    tS2Rows.push([
      { text: p.name, options: { bold: true, fontSize: 9 } },
      { text: Math.round(p.p26).toLocaleString(), options: { fontSize: 9 } },
      { text: Math.round(p.p25).toLocaleString(), options: { fontSize: 9 } },
      {
        text: (ppg > 0 ? '+' : '') + ppg.toFixed(1) + '%',
        options: { bold: true, fontSize: 9, color: ppg >= compTotalPpg ? C_GREEN : (ppg >= 0 ? C_NAVY : C_RED) }
      },
      { text: Math.round(p.ln).toLocaleString(), options: { fontSize: 9, bold: true, color: '2B6CB0' } }
    ]);
  });

  s2.addTable(tS2Rows, {
    x: 8.0, y: 1.5, w: 4.8, h: 3.2,
    colW: [1.3, 0.85, 0.85, 0.9, 0.9],
    border: { pt: '0.5', color: C_BORDER_GRAY },
    align: 'center', valign: 'middle'
  });

  s2.addShape(pptx.ShapeType.roundRect, {
    x: 8.0, y: 5.0, w: 4.8, h: 1.8,
    fill: { color: 'F0F4F8' }, line: { color: C_NAVY, width: 1.5 }
  });
  s2.addText('KEY BENCHMARK INSIGHTS', {
    x: 8.2, y: 5.15, w: 4.4, h: 0.3,
    fontSize: 10, bold: true, color: C_NAVY
  });
  s2.addText('• Pediamil 1 reached 7,890 cans/mo (+61.8% PPG), dominating the line average (4,551 cans).\n• Pediamil 2 achieved 4,469 cans/mo (+127.2% PPG), doubling 2025 run-rates.\n• Pedia-Start 1 is 3,873 cans/mo, exceeding national line average (3,142 cans).\n• Pedia-Start 2 is 2,182 cans/mo, up +34.1% over 2025 baseline.', {
    x: 8.2, y: 5.45, w: 4.4, h: 1.25,
    fontSize: 8.5, color: C_SLATE
  });

  // ==================== SLIDE 3 ====================
  const s3 = pptx.addSlide();
  addHeader(s3, '03', 'SPECIALTY NUTRITION: MONTHLY SALES AVERAGES', 'Horizontal Bars with exact values: Beshoy Youhanna vs 2025 vs Line Avg/ADM');

  const totLF_26 = rawData2026.reduce((a, r) => a + r.lf, 0);
  const totHA_26 = rawData2026.reduce((a, r) => a + r.ha, 0);
  const totAR_26 = rawData2026.reduce((a, r) => a + r.ar, 0);
  const totAC_26 = rawData2026.reduce((a, r) => a + r.ac, 0);
  const totMUM_26 = rawData2026.reduce((a, r) => a + r.mum, 0);

  const specProds = [
    { name: 'Pediamil LF', p26: chosen.lf/9, p25: chosen25.lf/12, ln: (totLF_26/9)/9 },
    { name: 'Pediamil HA', p26: chosen.ha/9, p25: chosen25.ha/12, ln: (totHA_26/9)/9 },
    { name: 'Pediamil AR', p26: chosen.ar/9, p25: chosen25.ar/12, ln: (totAR_26/9)/9 },
    { name: 'Pediamil AC', p26: chosen.ac/9, p25: chosen25.ac/12, ln: (totAC_26/9)/9 },
    { name: 'Pediamum', p26: chosen.mum/9, p25: chosen25.mum/12, ln: (totMUM_26/9)/9 }
  ];

  const s3Labels = specProds.map(p => p.name).reverse();
  const s3ChartData = [
    { name: '2026 MoAvg (Units)', labels: s3Labels, values: specProds.map(p => Math.round(p.p26)).reverse() },
    { name: '2025 MoAvg (Units)', labels: s3Labels, values: specProds.map(p => Math.round(p.p25)).reverse() },
    { name: 'Line Avg / ADM', labels: s3Labels, values: specProds.map(p => Math.round(p.ln)).reverse() }
  ];

  s3.addChart(pptx.ChartType.bar, s3ChartData, {
    x: 0.5, y: 1.3, w: 7.2, h: 5.6,
    barDir: 'bar',
    chartColors: ['0D9488', '5EEAD4', 'F59E0B'],
    showLegend: true, legendPos: 't',
    showValue: true, dataLabelFontSize: 8
  });

  const tS3Rows = [
    [
      { text: 'Specialty SKU', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: '2026 MoAvg', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: '2025 MoAvg', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'PPG Growth', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Line Avg/ADM', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } }
    ]
  ];

  specProds.forEach(p => {
    const ppg = ((p.p26 / p.p25) - 1) * 100;
    tS3Rows.push([
      { text: p.name, options: { bold: true, fontSize: 9 } },
      { text: Math.round(p.p26).toLocaleString(), options: { fontSize: 9 } },
      { text: Math.round(p.p25).toLocaleString(), options: { fontSize: 9 } },
      {
        text: (ppg > 0 ? '+' : '') + ppg.toFixed(1) + '%',
        options: { bold: true, fontSize: 9, color: ppg >= compTotalPpg ? C_GREEN : (ppg >= 0 ? C_NAVY : C_RED) }
      },
      { text: Math.round(p.ln).toLocaleString(), options: { fontSize: 9, bold: true, color: '2B6CB0' } }
    ]);
  });

  s3.addTable(tS3Rows, {
    x: 8.0, y: 1.5, w: 4.8, h: 3.5,
    colW: [1.3, 0.85, 0.85, 0.9, 0.9],
    border: { pt: '0.5', color: C_BORDER_GRAY },
    align: 'center', valign: 'middle'
  });

  s3.addShape(pptx.ShapeType.roundRect, {
    x: 8.0, y: 5.2, w: 4.8, h: 1.6,
    fill: { color: 'F0F4F8' }, line: { color: C_NAVY, width: 1.5 }
  });
  s3.addText('SPECIALTY SEGMENT STRATEGY', {
    x: 8.2, y: 5.3, w: 4.4, h: 0.3,
    fontSize: 10, bold: true, color: C_NAVY
  });
  s3.addText('• Pediamil AC (1,517 cans/mo) surged +107.2% PPG, establishing clear pediatric leadership.\n• Pediamil HA (1,017 cans/mo) is up +95.7% PPG, outpacing national quota.\n• Specialty portfolio provides superior margins and clinical prescription stickiness.', {
    x: 8.2, y: 5.6, w: 4.4, h: 1.1,
    fontSize: 8.5, color: C_SLATE
  });

  // ==================== SLIDE 4 ====================
  const s4 = pptx.addSlide();
  addHeader(s4, '04', 'DUAL-AXIS DEEP DIVE: SELECTED ADM vs COMPANY BENCHMARK', 'Dual-Axis Combo Chart: Volume (Bars, Primary Axis) & Growth Rate % (Lines, Secondary Axis)');

  const s4Prods = [
    { name: 'Pediamil 1', p26: chosen.p1/9, p25: chosen25.p1/12, cPpg: 46.86, pPpg: 61.76 },
    { name: 'Pediamil 2', p26: chosen.p2/9, p25: chosen25.p2/12, cPpg: 68.54, pPpg: 127.23 },
    { name: 'Pedia-Start 1', p26: chosen.ps1/9, p25: chosen25.ps1/12, cPpg: 9.60, pPpg: 7.93 },
    { name: 'Pedia-Start 2', p26: chosen.ps2/9, p25: chosen25.ps2/12, cPpg: 37.58, pPpg: 34.10 },
    { name: 'Specialties', p26: 39714/9, p25: 28920/12, cPpg: 43.50, pPpg: 83.25 }
  ];

  const s4Labels = s4Prods.map(p => p.name);
  const s4ComboTypes = [
    {
      type: pptx.ChartType.bar,
      data: [
        { name: '2025 MoAvg (Left)', labels: s4Labels, values: s4Prods.map(p => Math.round(p.p25)) },
        { name: '2026 MoAvg (Left)', labels: s4Labels, values: s4Prods.map(p => Math.round(p.p26)) }
      ],
      options: { barDir: 'col', chartColors: ['94A3B8', '1B365D'] }
    },
    {
      type: pptx.ChartType.line,
      data: [
        { name: 'Selected ADM PPG% (Right)', labels: s4Labels, values: s4Prods.map(p => p.pPpg) },
        { name: 'Company Benchmark PPG% (Right)', labels: s4Labels, values: s4Prods.map(p => p.cPpg) }
      ],
      options: { secondaryValAxis: true, chartColors: ['10B981', 'F59E0B'] }
    }
  ];

  s4.addChart(s4ComboTypes, null, {
    x: 0.5, y: 1.3, w: 7.2, h: 3.5,
    showLegend: true, legendPos: 't',
    valAxes: [
      { showValAxisTitle: true, valAxisTitle: 'Monthly Sales Volume (Cans)' },
      { showValAxisTitle: true, valAxisTitle: 'Growth Rate (PPG%)' }
    ]
  });

  s4.addShape(pptx.ShapeType.roundRect, {
    x: 8.0, y: 1.3, w: 4.8, h: 1.7,
    fill: { color: 'D4EDDA' }, line: { color: '28A745', width: 2 }
  });
  s4.addText('SELECTED ADM: BESHOY YOUHANNA (UPPER EGYPT II)', {
    x: 8.2, y: 1.45, w: 4.4, h: 0.3,
    fontSize: 10.5, bold: true, color: '155724'
  });
  s4.addText('🟢 TOTAL GROWTH: +57.71% PPG (vs Company: +39.54%)\nSTATUS: ABOVE COMPANY BENCHMARK (+18.2% AHEAD)', {
    x: 8.2, y: 1.8, w: 4.4, h: 0.55,
    fontSize: 11, bold: true, color: '155724'
  });
  s4.addText('Interactive Feature: In the web review dashboard, selecting any ADM from the header updates this dual-axis combo chart instantly.', {
    x: 8.2, y: 2.4, w: 4.4, h: 0.5,
    fontSize: 8, italic: true, color: '2C3E50'
  });

  s4.addShape(pptx.ShapeType.roundRect, {
    x: 8.0, y: 3.1, w: 4.8, h: 1.7,
    fill: { color: 'F8D7DA' }, line: { color: 'DC3545', width: 2 }
  });
  s4.addText('BELOW-BENCHMARK RULE (DYNAMIC RED SHAPE)', {
    x: 8.2, y: 3.2, w: 4.4, h: 0.3,
    fontSize: 10, bold: true, color: '721C24'
  });
  s4.addText('🔻 AUTOMATIC RED HIGHLIGHT WHEN SELECTED ADM < COMPANY:\nWhen selecting an underperforming territory (e.g. Behera +25.0%, Delta I +28.9%, Kfr El.Shk +29.9%, Guiza +32.8%), the card switches to RED with gap metrics.', {
    x: 8.2, y: 3.55, w: 4.4, h: 1.1,
    fontSize: 8.5, color: '721C24'
  });

  const tS4Rows = [
    [
      { text: 'Product Category', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Avg 2025 Mo.', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Avg 2026 Mo.', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Selected ADM PPG%', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Company PPG%', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Growth Variance vs Benchmark', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } }
    ]
  ];

  s4Prods.forEach(p => {
    const isAbove = p.pPpg >= p.cPpg;
    const varPpg = p.pPpg - p.cPpg;
    tS4Rows.push([
      { text: p.name, options: { bold: true, fontSize: 8.5 } },
      { text: Math.round(p.p25).toLocaleString(), options: { fontSize: 8.5 } },
      { text: Math.round(p.p26).toLocaleString(), options: { fontSize: 8.5 } },
      { text: (p.pPpg > 0 ? '+' : '') + p.pPpg.toFixed(1) + '%', options: { bold: true, fontSize: 8.5, color: isAbove ? C_GREEN : C_RED } },
      { text: (p.cPpg > 0 ? '+' : '') + p.cPpg.toFixed(1) + '%', options: { fontSize: 8.5, color: C_NAVY } },
      {
        text: (varPpg > 0 ? '+' : '') + varPpg.toFixed(1) + '% ' + (isAbove ? '🟢 Ahead' : '🔻 Below'),
        options: { bold: true, fontSize: 8.5, color: isAbove ? C_GREEN : C_RED }
      }
    ]);
  });

  s4.addTable(tS4Rows, {
    x: 0.5, y: 5.0, w: 12.3, h: 1.9,
    colW: [2.0, 1.8, 1.8, 2.2, 2.0, 2.5],
    border: { pt: '0.5', color: C_BORDER_GRAY },
    align: 'center', valign: 'middle'
  });

  // ==================== SLIDES 5 to 9: RANKINGS ====================
  function addRankingSlide(slideNum, title, subtitle, prodName, compPpg, ranks) {
    const s = pptx.addSlide();
    addHeader(s, slideNum, title, subtitle);

    const labels = [ 'COMP: EGYPT TOTAL', ...ranks.map(r => `${r.territory} (${r.dm.split(' ')[0]})`) ];
    const values = [ Number(compPpg.toFixed(1)), ...ranks.map(r => Number(r.ppg.toFixed(1))) ];
    const colors = [ '1B365D', ...ranks.map(r => r.ppg >= compPpg ? '28A745' : 'DC3545') ];

    const chartData = [
      { name: `${prodName} PPG%`, labels: labels.reverse(), values: values.reverse() }
    ];

    s.addChart(pptx.ChartType.bar, chartData, {
      x: 0.5, y: 1.3, w: 7.2, h: 5.6,
      barDir: 'bar',
      chartColors: colors.reverse(),
      showLegend: false,
      showValue: true, dataLabelFontSize: 8
    });

    const tRows = [
      [
        { text: 'Rank', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
        { text: 'Territory', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
        { text: 'District Manager', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
        { text: `${prodName} PPG%`, options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
        { text: 'Status vs Company', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } }
      ],
      [
        { text: 'TOP', options: { bold: true, fill: 'E8EEF5' } },
        { text: 'EGYPT TOTAL', options: { bold: true, fill: 'E8EEF5' } },
        { text: 'Company Benchmark', options: { italic: true, fill: 'E8EEF5' } },
        { text: (compPpg > 0 ? '+' : '') + compPpg.toFixed(1) + '%', options: { bold: true, fill: 'E8EEF5', color: C_NAVY } },
        { text: 'NATIONAL BENCHMARK', options: { bold: true, fill: 'E8EEF5', color: C_NAVY } }
      ]
    ];

    ranks.forEach((r, idx) => {
      const isAbove = r.ppg >= compPpg;
      tRows.push([
        { text: String(idx + 1), options: { fontSize: 8.5, bold: true } },
        { text: r.territory, options: { fontSize: 8.5 } },
        { text: r.dm.split(' ').slice(0, 2).join(' '), options: { fontSize: 8.5 } },
        {
          text: (r.ppg > 0 ? '+' : '') + r.ppg.toFixed(1) + '%',
          options: { fontSize: 8.5, bold: true, color: isAbove ? C_GREEN : C_RED }
        },
        {
          text: isAbove ? '🟢 ABOVE COMPANY' : '🔻 BELOW COMPANY',
          options: { fontSize: 8, bold: true, color: isAbove ? C_GREEN : C_RED }
        }
      ]);
    });

    s.addTable(tRows, {
      x: 8.0, y: 1.3, w: 4.8, h: 5.6,
      colW: [0.6, 1.2, 1.3, 0.85, 0.85],
      border: { pt: '0.5', color: C_BORDER_GRAY },
      align: 'center', valign: 'middle'
    });
  }

  // Slide 5: Total PPG%
  const totalRanks = [
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', ppg: 57.71 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- H', ppg: 46.42 },
    { territory: 'Upper Egypt I', dm: 'UE North', ppg: 46.21 },
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', ppg: 45.96 },
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elm', ppg: 40.13 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', ppg: 32.82 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', ppg: 29.93 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Sha', ppg: 28.88 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', ppg: 24.97 }
  ];
  addRankingSlide('05', 'TOTAL PPG% GROWTH RANKING (COMPANY AT TOP)', `National Benchmark: +${compTotalPpg.toFixed(1)}% | Green = Above Company | Red = Below Company`, 'Total Sales', compTotalPpg, totalRanks);

  // Slide 6: Pediamil 1
  const p1Ranks = [
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elm', ppg: 91.43 },
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', ppg: 61.76 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- H', ppg: 56.70 },
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', ppg: 46.03 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', ppg: 43.56 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', ppg: 39.37 },
    { territory: 'Upper Egypt I', dm: 'UE North', ppg: 38.60 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Sha', ppg: 35.65 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', ppg: 27.87 }
  ];
  addRankingSlide('06', 'PEDIAMIL 1 PPG% GROWTH RANKING (COMPANY AT TOP)', 'Pediamil 1 National Benchmark: +46.9% | Green = Above Company | Red = Below Company', 'Pediamil 1', 46.86, p1Ranks);

  // Slide 7: Pediamil 2
  const p2Ranks = [
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', ppg: 127.23 },
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elm', ppg: 86.26 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- H', ppg: 71.91 },
    { territory: 'Upper Egypt I', dm: 'UE North', ppg: 73.30 },
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', ppg: 65.66 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Sha', ppg: 53.58 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', ppg: 55.74 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', ppg: 55.02 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', ppg: 28.70 }
  ];
  addRankingSlide('07', 'PEDIAMIL 2 PPG% GROWTH RANKING (COMPANY AT TOP)', 'Pediamil 2 National Benchmark: +68.5% | Green = Above Company | Red = Below Company', 'Pediamil 2', 68.54, p2Ranks);

  // Slide 8: Pedia-Start 1
  const ps1Ranks = [
    { territory: 'Upper Egypt I', dm: 'UE North', ppg: 43.87 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', ppg: 31.69 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- H', ppg: 32.53 },
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', ppg: 7.93 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', ppg: 3.20 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Sha', ppg: -2.85 },
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', ppg: -4.12 },
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elm', ppg: -7.93 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', ppg: 3.01 }
  ];
  addRankingSlide('08', 'PEDIA-START 1 PPG% GROWTH RANKING (COMPANY AT TOP)', 'Pedia-Start 1 National Benchmark: +9.6% | Green = Above Company | Red = Below Company', 'Pedia-Start 1', 9.60, ps1Ranks);

  // Slide 9: Pedia-Start 2
  const ps2Ranks = [
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', ppg: 67.38 },
    { territory: 'Upper Egypt I', dm: 'UE North', ppg: 67.04 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', ppg: 55.72 },
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', ppg: 34.10 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', ppg: 29.43 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Sha', ppg: 28.16 },
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elm', ppg: 10.64 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', ppg: 14.94 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- H', ppg: 5.11 }
  ];
  addRankingSlide('09', 'PEDIA-START 2 PPG% GROWTH RANKING (COMPANY AT TOP)', 'Pedia-Start 2 National Benchmark: +37.6% | Green = Above Company | Red = Below Company', 'Pedia-Start 2', 37.58, ps2Ranks);

  // ==================== SLIDE 10 ====================
  const s10 = pptx.addSlide();
  addHeader(s10, '10', 'STRATEGIC PERFORMANCE QUADRANT MATRIX', `Horizontal Intercept at Company PPG (+${compTotalPpg.toFixed(1)}%) | Vertical Intercept at 0.00% | Selected ADM Highlighted`);

  s10.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 1.25, w: 12.3, h: 1.45,
    fill: { color: 'F5F3FF' }, line: { color: C_VIOLET, width: 2 }
  });
  s10.addText('🎯 SELECTED ADM STRATEGIC DIAGNOSTIC: BESHOY YOUHANNA (UPPER EGYPT II) — QUADRANT A: STAR 🌟', {
    x: 0.7, y: 1.35, w: 11.9, h: 0.35,
    fontSize: 12, bold: true, color: '4C1D95'
  });
  s10.addText(`• Performance Coordinates: X (Contribution Diff vs GEO) = +0.63% | Y (Total PPG Growth) = +57.71% (vs Company +${compTotalPpg.toFixed(1)}%)\n• Portfolio Share: Delivers 16.24% of Egypt Total Sales (210,911 cans YTD). Exceeds geographic potential and leads the nation in volume.\n• Strategic Directives: Protect market dominance against aggressive competitor rep detailing, secure NICU hospital listings for Pedia-Start & LBW, and drive multi-can specialty bundling in community pharmacies.`, {
    x: 0.7, y: 1.75, w: 11.9, h: 0.85,
    fontSize: 9.5, color: '3B0764'
  });

  // Top-Right: Quadrant A (Stars)
  s10.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 2.85, w: 5.9, h: 1.95,
    fill: { color: 'E8F8F0' }, line: { color: '28A745', width: 2 }
  });
  s10.addText('QUADRANT A: COMPANY STARS 🌟\n(High Growth > +39.5% PPG & Positive Contr. Diff > 0%)', {
    x: 7.0, y: 2.95, w: 5.5, h: 0.45,
    fontSize: 10, bold: true, color: '155724'
  });
  s10.addText('• Upper Egypt II (Beshoy Youhanna): +57.7% PPG, +0.63% Diff, 210.9k units [HIGHLIGHTED]\n• Delta II (Mohamed Yousef): +46.0% PPG, +2.12% Diff, 186.9k units\nStrategic Action: Maintain national volume engine, protect prescription share in clinics.', {
    x: 7.0, y: 3.45, w: 5.5, h: 1.25,
    fontSize: 8.5, color: '155724'
  });

  // Top-Left: Quadrant B (Challengers)
  s10.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 2.85, w: 6.0, h: 1.95,
    fill: { color: 'EBF5FB' }, line: { color: '2980B9', width: 2 }
  });
  s10.addText('QUADRANT B: HIGH-GROWTH CHALLENGERS 🚀\n(High Growth > +39.5% PPG & Negative Contr. Diff < 0%)', {
    x: 0.7, y: 2.95, w: 5.6, h: 0.45,
    fontSize: 10, bold: true, color: '1A5276'
  });
  s10.addText('• Cairo (Noher Adel): +46.4% PPG, -7.36% Diff, 94.2k units (Major turnaround!)\n• Upper Egypt I (UE North): +46.2% PPG, -0.99% Diff, 169.4k units\n• Alx (Ahmed Hassan): +40.1% PPG, -3.00% Diff, 92.2k units\nStrategic Action: Closing the geographic share gap rapidly. Expand key pharmacy accounts.', {
    x: 0.7, y: 3.45, w: 5.6, h: 1.25,
    fontSize: 8.5, color: '1A5276'
  });

  // Bottom-Left: Quadrant D (Lowest Performers)
  s10.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 4.95, w: 6.0, h: 1.95,
    fill: { color: 'FCECEE' }, line: { color: 'DC3545', width: 2 }
  });
  s10.addText('QUADRANT D: LOWEST PERFORMERS / CRITICAL ATTENTION ⚠️\n(Low Growth < +39.5% PPG & Negative Contr. Diff < 0%)', {
    x: 0.7, y: 5.05, w: 5.6, h: 0.45,
    fontSize: 10, bold: true, color: '721C24'
  });
  s10.addText('• Guiza (Youstina Farag): +32.8% PPG, -5.36% Diff, 118.9k units\nStrategic Action: High potential territory (14.5% GEO) lagging behind national pace. Re-evaluate medical rep detailing frequency and key pharmacy availability.', {
    x: 0.7, y: 5.55, w: 5.6, h: 1.25,
    fontSize: 8.5, color: '721C24'
  });

  // Bottom-Right: Quadrant C (Volume Pillars & Share Keepers)
  s10.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 4.95, w: 5.9, h: 1.95,
    fill: { color: 'FEF9E7' }, line: { color: 'F39C12', width: 2 }
  });
  s10.addText('QUADRANT C: VOLUME PILLARS & SHARE KEEPERS 🛡️\n(Moderate Growth < +39.5% PPG & Positive Contr. Diff > 0%)', {
    x: 7.0, y: 5.05, w: 5.5, h: 0.45,
    fontSize: 10, bold: true, color: '7D6608'
  });
  s10.addText('• KFR EL.SHK (Karim Shehab): +29.9% PPG, +6.65% Diff, 109.2k units\n• DELTA I (Shimaa Tarek): +28.9% PPG, +6.29% Diff, 176.7k units\n• Behera & Dakahlia (Ahmed Sakr): +25.0% PPG, +1.02% Diff, 139.9k units\nStrategic Action: Strong contribution defenders. Drive specialty formulas to lift growth above +39.5%.', {
    x: 7.0, y: 5.55, w: 5.5, h: 1.25,
    fontSize: 8.5, color: '7D6608'
  });

  // ==================== SLIDE 11 (NEW: Rep Velocity Q3 vs H1) ====================
  const s11 = pptx.addSlide();
  addHeader(s11, '11', 'MEDICAL REP / ADM QUARTERLY VELOCITY: Q3 2026 vs H1 2026 BASELINE', 'Evaluating Run-Rate Acceleration: National Monthly Average grew from 138,315 to 156,126 cans/mo (+12.9%)');

  const totH1 = rawAvgH1_2026.reduce((acc, r) => acc + r.sum, 0);
  const totQ3 = rawAvgQ3_2026.reduce((acc, r) => acc + r.sum, 0);
  const compVel = ((totQ3 / totH1) - 1) * 100;

  // 4 Top KPI Cards
  const kpiData = [
    { title: 'H1 2026 BASELINE', val: '138,315', sub: 'National Monthly Avg', bg: 'F0F4F8', border: 'B0C4DE', col: C_NAVY },
    { title: 'Q3 2026 RUN-RATE', val: '156,126', sub: `+12.9% (+${(totQ3 - totH1).toLocaleString()} cans/mo)`, bg: 'ECFDF5', border: '10B981', col: '065F46' },
    { title: 'TOP ACCELERATOR REP', val: 'Cairo (+58.7%)', sub: 'Noher Adel: 8,758 → 13,898', bg: 'EFF6FF', border: '3B82F6', col: '1E40AF' },
    { title: 'NATIONAL VOLUME LEADER', val: 'UE II (25,694/mo)', sub: 'Beshoy Youhanna (+15.2%)', bg: 'FAF5FF', border: '8B5CF6', col: '5B21B6' }
  ];

  kpiData.forEach((kpi, idx) => {
    const x = 0.5 + idx * 3.12;
    s11.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.22, w: 2.95, h: 0.95,
      fill: { color: kpi.bg }, line: { color: kpi.border, width: 1.5 }
    });
    s11.addText(kpi.title, {
      x: x + 0.1, y: 1.30, w: 2.75, h: 0.2,
      fontSize: 8.5, bold: true, color: '64748B', align: 'center'
    });
    s11.addText(kpi.val, {
      x: x + 0.1, y: 1.50, w: 2.75, h: 0.35,
      fontSize: 13, bold: true, color: kpi.col, align: 'center'
    });
    s11.addText(kpi.sub, {
      x: x + 0.1, y: 1.85, w: 2.75, h: 0.25,
      fontSize: 8, italic: true, color: '64748B', align: 'center'
    });
  });

  // Table on Left: Rep Velocity Scorecard
  const repVelocityRows = rawAvgQ3_2026.map((q, idx) => {
    const h = rawAvgH1_2026[idx];
    const diff = q.sum - h.sum;
    const vel = ((q.sum / h.sum) - 1) * 100;
    let tier = '';
    if (vel >= 40) tier = 'Tier 1: Accelerator 🚀';
    else if (vel >= 15) tier = 'Tier 2: Compounder 📈';
    else if (vel >= 0) tier = 'Tier 3: Consolidator 🛡️';
    else tier = 'Tier 4: Contraction ⚠️';

    return {
      territory: q.territory,
      dm: q.dm.split(' ').slice(0, 2).join(' '),
      h1: h.sum,
      q3: q.sum,
      diff,
      vel,
      tier
    };
  }).sort((a, b) => b.vel - a.vel);

  const tS11Rows = [
    [
      { text: 'Rank', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Territory', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Medical Rep / ADM', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'H1 MoAvg', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Q3 MoAvg', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Diff / Mo', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Velocity %', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Performance Tier', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } }
    ],
    [
      { text: 'TOP', options: { bold: true, fill: 'E8EEF5' } },
      { text: 'EGYPT TOTAL', options: { bold: true, fill: 'E8EEF5' } },
      { text: 'National Rep Benchmark', options: { italic: true, fill: 'E8EEF5' } },
      { text: totH1.toLocaleString(), options: { bold: true, fill: 'E8EEF5' } },
      { text: totQ3.toLocaleString(), options: { bold: true, fill: 'E8EEF5' } },
      { text: '+' + (totQ3 - totH1).toLocaleString(), options: { bold: true, fill: 'E8EEF5' } },
      { text: '+' + compVel.toFixed(1) + '%', options: { bold: true, fill: 'E8EEF5', color: C_GREEN } },
      { text: 'NATIONAL BENCHMARK', options: { bold: true, fill: 'E8EEF5', color: C_NAVY } }
    ]
  ];

  repVelocityRows.forEach((r, idx) => {
    const isAbove = r.vel >= compVel;
    const isPos = r.vel >= 0;
    tS11Rows.push([
      { text: String(idx + 1), options: { fontSize: 8, bold: true } },
      { text: r.territory, options: { fontSize: 8 } },
      { text: r.dm, options: { fontSize: 8 } },
      { text: r.h1.toLocaleString(), options: { fontSize: 8 } },
      { text: r.q3.toLocaleString(), options: { fontSize: 8, bold: true } },
      { text: (r.diff > 0 ? '+' : '') + r.diff.toLocaleString(), options: { fontSize: 8, color: isPos ? C_GREEN : C_RED } },
      {
        text: (r.vel > 0 ? '+' : '') + r.vel.toFixed(1) + '%',
        options: { fontSize: 8.5, bold: true, color: isAbove ? C_GREEN : (isPos ? 'B45309' : C_RED) }
      },
      { text: r.tier, options: { fontSize: 7.5, bold: true } }
    ]);
  });

  s11.addTable(tS11Rows, {
    x: 0.5, y: 2.30, w: 7.3, h: 4.8,
    colW: [0.5, 1.2, 1.2, 0.8, 0.8, 0.8, 0.8, 1.2],
    border: { pt: '0.5', color: C_BORDER_GRAY },
    align: 'center', valign: 'middle'
  });

  // Right Side: 4 Strategic Velocity Tiers Boxes
  const tiers = [
    {
      title: 'TIER 1: HIGH ACCELERATORS (+40% to +60%) 🚀',
      color: '155724', bg: 'D4EDDA', border: '28A745',
      bullets: '• Cairo (Noher Adel): 8,758 → 13,898 (+58.7%) | Pediamil AC (+225%)\n• KFR EL.SHK (Karim Shehab): 10,461 → 15,472 (+47.9%)\n• Upper Egypt I (UE North): 16,459 → 23,564 (+43.2%)\nStrategic Action: Capitalize on doctor adoption; expand clinic quotas.'
    },
    {
      title: 'TIER 2: SCALE COMPOUNDERS (+15% to +30%) 📈',
      color: '0C5460', bg: 'D1ECF1', border: '17A2B8',
      bullets: '• Behera & Dakahlia (Ahmed Sakr): 14,302 → 18,041 (+26.1%)\n• Upper Egypt II (Beshoy Youhanna): 22,305 → 25,694 (+15.2%)\nStrategic Action: Maintain mega-volume leadership, defend hospital listings.'
    },
    {
      title: 'TIER 3: STEADY CONSOLIDATORS (0% to +10%) 🛡️',
      color: '856404', bg: 'FFF3CD', border: 'FFC107',
      bullets: '• Guiza (Youstina Farag): 12,895 → 13,858 (+7.5%)\n• Alexandria (Ahmed Hassan): 10,206 → 10,314 (+1.1%)\nStrategic Action: Stable run-rates preserved; activate P1 & PS2 detailing.'
    },
    {
      title: 'TIER 4: CONTRACTION WATCHLIST (NEGATIVE Q3) ⚠️',
      color: '721C24', bg: 'F8D7DA', border: 'DC3545',
      bullets: '• DELTA I (Shimaa Tarek): 20,146 → 18,614 (-7.6%)\n• Delta II (Mohamed Yousef): 22,783 → 16,671 (-26.8%)\nStrategic Action: High H1 baseline dip; audit stock availability & rep calls.'
    }
  ];

  tiers.forEach((tier, i) => {
    const y = 2.30 + i * 1.20;
    s11.addShape(pptx.ShapeType.roundRect, {
      x: 8.0, y, w: 4.8, h: 1.12,
      fill: { color: tier.bg }, line: { color: tier.border, width: 1.5 }
    });
    s11.addText(tier.title, {
      x: 8.15, y: y + 0.08, w: 4.5, h: 0.25,
      fontSize: 9.5, bold: true, color: tier.color
    });
    s11.addText(tier.bullets, {
      x: 8.15, y: y + 0.35, w: 4.5, h: 0.70,
      fontSize: 8, color: tier.color
    });
  });

  const targetPath = path.join(__dirname, 'Egy_Nutri_Business_Review_Deck.pptx');
  await pptx.writeFile({ fileName: targetPath });
  const distDir = path.join(__dirname, 'public');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  fs.copyFileSync(targetPath, path.join(distDir, 'Egy_Nutri_Business_Review_Deck.pptx'));
  console.log(`PowerPoint Presentation successfully updated at root and public/: ${targetPath}`);
}

createPowerPoint().catch(err => {
  console.error(err);
  process.exit(1);
});
