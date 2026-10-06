const PptxGenJS = require('pptxgenjs');
const path = require('path');
const { rawData2026, rawData2025 } = require('./data');

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
      fontSize: 17, bold: true, color: 'FFFFFF', fontFace: 'Calibri'
    });

    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.5, y: 0.82, w: 10.5, h: 0.25,
        fontSize: 10.5, italic: true, color: 'D9E2EC', fontFace: 'Calibri'
      });
    }

    // Company Tag
    slide.addText('EGY NUTRI. BUSINESS REVIEW', {
      x: 10.2, y: 0.25, w: 2.8, h: 0.3,
      fontSize: 10, bold: true, color: 'D4AF37', align: 'right', fontFace: 'Calibri'
    });
    slide.addText('YTD M06-2026 vs 2025', {
      x: 10.2, y: 0.55, w: 2.8, h: 0.25,
      fontSize: 9, color: 'FFFFFF', align: 'right', fontFace: 'Calibri'
    });
  }

  // Chosen Person Example: Beshoy Youhanna (Upper Egypt II)
  const chosen = rawData2026[7]; // Beshoy
  const chosen25 = rawData2025[7];
  const chosenGeo = chosen.geoShare * 100;
  const chosenC26 = (chosen.sum / 829882) * 100;
  const chosenC25 = (chosen25.sum / 1240615) * 100;

  // ==================== SLIDE 1 (AMENDMENT 1: Horizontal 3-bars for selected ADM with values on/beside bars) ====================
  const s1 = pptx.addSlide();
  addHeader(s1, '01', 'TERRITORIAL CONTRIBUTION & GEO SHARE (SELECTED ADM)', 'Horizontal 3-Bar Share Analysis for Selected ADM (Beshoy Youhanna) with values plotted directly on the bars');

  const s1Labels = ['GEO Share % (2025 Potential)', 'YTD Contribution % 2026', 'Contribution % 2025'];
  const s1Values = [Number(chosenGeo.toFixed(2)), Number(chosenC26.toFixed(2)), Number(chosenC25.toFixed(2))];

  const chartS1Data = [
    { name: 'Share %', labels: s1Labels.reverse(), values: s1Values.reverse() }
  ];

  s1.addChart(pptx.ChartType.bar, chartS1Data, {
    x: 0.5, y: 1.3, w: 7.2, h: 4.0,
    barDir: 'bar', // Horizontal bars
    chartColors: ['38BDF8', '1B365D', '888888'],
    showLegend: false,
    showValue: true, // Values on/beside bars
    dataLabelFontSize: 11
  });

  // Notes box below chart
  s1.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 5.5, w: 7.2, h: 1.6,
    fill: { color: 'F0FDF4' }, line: { color: '28A745', width: 1.5 }
  });
  s1.addText('SELECTED ADM SHARE DIAGNOSTIC', {
    x: 0.7, y: 5.65, w: 6.8, h: 0.3,
    fontSize: 11, bold: true, color: '155724'
  });
  s1.addText(`• 2026 Current Contribution: 16.13% (Highest volume share in Egypt)\n• GEO Market Potential: 15.61% | Variance vs. Potential: +0.52% (Exceeding territory potential)\n• Year-over-Year Gain: +1.76% expansion vs Full-Year 2025 contribution (14.37%)`, {
    x: 0.7, y: 5.95, w: 6.8, h: 1.0,
    fontSize: 9.5, color: '155724'
  });

  // Table S1 with all territories on right
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
      { text: ((r.sum / 829882) * 100).toFixed(1) + '%', options: { fontSize: 8.5, bold: isChosen, fill: isChosen ? 'EFF6FF' : 'FFFFFF' } },
      { text: ((rawData2025[idx].sum / 1240615) * 100).toFixed(1) + '%', options: { fontSize: 8.5, fill: isChosen ? 'EFF6FF' : 'FFFFFF' } },
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

  // ==================== SLIDE 2 (AMENDMENT 2: Horizontal bars with values on bars for Core Products) ====================
  const s2 = pptx.addSlide();
  addHeader(s2, '02', 'CORE INFANT NUTRITION: MONTHLY SALES AVERAGES', 'Horizontal Bars with exact values on the bars: Beshoy Youhanna (Upper Egypt II) vs 2025 vs Line Avg/ADM');

  const coreProds = [
    { name: 'Pediamil 1', p26: chosen.p1/6, p25: chosen25.p1/12, ln: (234147/6)/9 },
    { name: 'Pediamil 2', p26: chosen.p2/6, p25: chosen25.p2/12, ln: (146500/6)/9 },
    { name: 'Pedia-Start 1', p26: chosen.ps1/6, p25: chosen25.ps1/12, ln: (145674/6)/9 },
    { name: 'Pedia-Start 2', p26: chosen.ps2/6, p25: chosen25.ps2/12, ln: (97406/6)/9 }
  ];

  const s2Labels = coreProds.map(p => p.name).reverse();
  const s2ChartData = [
    { name: '2026 MoAvg (Units)', labels: s2Labels, values: coreProds.map(p => Math.round(p.p26)).reverse() },
    { name: '2025 MoAvg (Units)', labels: s2Labels, values: coreProds.map(p => Math.round(p.p25)).reverse() },
    { name: 'Line Avg / ADM', labels: s2Labels, values: coreProds.map(p => Math.round(p.ln)).reverse() }
  ];

  s2.addChart(pptx.ChartType.bar, s2ChartData, {
    x: 0.5, y: 1.3, w: 7.2, h: 5.6,
    barDir: 'bar', // Horizontal bars
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
        options: { bold: true, fontSize: 9, color: ppg >= 33.79 ? C_GREEN : (ppg >= 0 ? C_NAVY : C_RED) }
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
  s2.addText('• Pediamil 2 showed extraordinary momentum (+143.7% PPG), reaching 4,794 cans/mo.\n• Pediamil 1 reached 7,416 cans/mo (+52.1% PPG), far above the Line Average (4,336 cans).\n• Pedia-Start 1 is 3,392 cans/mo, closely aligned with national Line Average quota.\n• Horizontal layout provides immediate visual comparison against team quota.', {
    x: 8.2, y: 5.45, w: 4.4, h: 1.25,
    fontSize: 8.5, color: C_SLATE
  });

  // ==================== SLIDE 3 (AMENDMENT 3: Horizontal bars with values on bars for Specialty Lines) ====================
  const s3 = pptx.addSlide();
  addHeader(s3, '03', 'SPECIALTY NUTRITION: MONTHLY SALES AVERAGES', 'Horizontal Bars with exact values on the bars: Beshoy Youhanna vs 2025 vs Line Avg/ADM');

  const specProds = [
    { name: 'Pediamil LF', p26: chosen.lf/6, p25: chosen25.lf/12, ln: (26008/6)/9 },
    { name: 'Pediamil HA', p26: chosen.ha/6, p25: chosen25.ha/12, ln: (35394/6)/9 },
    { name: 'Pediamil AR', p26: chosen.ar/6, p25: chosen25.ar/12, ln: (28061/6)/9 },
    { name: 'Pediamil AC', p26: chosen.ac/6, p25: chosen25.ac/12, ln: (45113/6)/9 },
    { name: 'Pediamum', p26: chosen.mum/6, p25: chosen25.mum/12, ln: (4328/6)/9 }
  ];

  const s3Labels = specProds.map(p => p.name).reverse();
  const s3ChartData = [
    { name: '2026 MoAvg (Units)', labels: s3Labels, values: specProds.map(p => Math.round(p.p26)).reverse() },
    { name: '2025 MoAvg (Units)', labels: s3Labels, values: specProds.map(p => Math.round(p.p25)).reverse() },
    { name: 'Line Avg / ADM', labels: s3Labels, values: specProds.map(p => Math.round(p.ln)).reverse() }
  ];

  s3.addChart(pptx.ChartType.bar, s3ChartData, {
    x: 0.5, y: 1.3, w: 7.2, h: 5.6,
    barDir: 'bar', // Horizontal bars
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
        options: { bold: true, fontSize: 9, color: ppg >= 33.79 ? C_GREEN : (ppg >= 0 ? C_NAVY : C_RED) }
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
  s3.addText('• Pediamil AC (1,110 cans/mo) and Pediamil HA (770 cans/mo) outpace line benchmarks.\n• Pediamil AR & Pediamum require targeted clinic detailing.\n• In the web dashboard, changing the dropdown updates these horizontal bars instantly for any manager.', {
    x: 8.2, y: 5.6, w: 4.4, h: 1.1,
    fontSize: 8.5, color: C_SLATE
  });

  // ==================== SLIDE 4 (AMENDMENT 5: Dual-Axis Frozen Deep Dive) ====================
  const s4 = pptx.addSlide();
  addHeader(s4, '04', 'DUAL-AXIS DEEP DIVE: SELECTED ADM vs COMPANY BENCHMARK', 'Dual-Axis Combo Chart: Volume (Bars, Primary Axis) & Growth Rate % (Lines, Secondary Axis) with figures table below');

  const s4Prods = [
    { name: 'Pediamil 1', p26: chosen.p1/6, p25: chosen25.p1/12, cPpg: 39.92, pPpg: 52.05 },
    { name: 'Pediamil 2', p26: chosen.p2/6, p25: chosen25.p2/12, cPpg: 65.26, pPpg: 143.72 },
    { name: 'Pedia-Start 1', p26: chosen.ps1/6, p25: chosen25.ps1/12, cPpg: -2.06, pPpg: -5.47 },
    { name: 'Pedia-Start 2', p26: chosen.ps2/6, p25: chosen25.ps2/12, cPpg: 39.86, pPpg: 19.95 },
    { name: 'Specialties', p26: 22464/6, p25: 28920/12, cPpg: 10.45, pPpg: 55.35 }
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

  // Callout Card: Status of Selected ADM
  s4.addShape(pptx.ShapeType.roundRect, {
    x: 8.0, y: 1.3, w: 4.8, h: 1.7,
    fill: { color: 'D4EDDA' }, line: { color: '28A745', width: 2 }
  });
  s4.addText('SELECTED ADM: BESHOY YOUHANNA (UPPER EGYPT II)', {
    x: 8.2, y: 1.45, w: 4.4, h: 0.3,
    fontSize: 10.5, bold: true, color: '155724'
  });
  s4.addText('🟢 TOTAL GROWTH: +50.11% PPG (vs Company: +33.79%)\nSTATUS: ABOVE COMPANY BENCHMARK (+16.3% AHEAD)', {
    x: 8.2, y: 1.8, w: 4.4, h: 0.55,
    fontSize: 11, bold: true, color: '155724'
  });
  s4.addText('Interactive Feature: In the web review sheet, this combo chart is frozen at the top of the screen as you scroll down through the figures.', {
    x: 8.2, y: 2.4, w: 4.4, h: 0.5,
    fontSize: 8, italic: true, color: '2C3E50'
  });

  // Red shape example callout card for a below-company person
  s4.addShape(pptx.ShapeType.roundRect, {
    x: 8.0, y: 3.1, w: 4.8, h: 1.7,
    fill: { color: 'F8D7DA' }, line: { color: 'DC3545', width: 2 }
  });
  s4.addText('BELOW-BENCHMARK RULE (RED SHAPE)', {
    x: 8.2, y: 3.2, w: 4.4, h: 0.3,
    fontSize: 10, bold: true, color: '721C24'
  });
  s4.addText('🔻 AUTOMATIC RED HIGHLIGHT WHEN SELECTED ADM < COMPANY:\nWhen selecting an underperforming territory (e.g. Cairo +22.5%, Behera +15.0%, KFR +12.0%), the alert box switches dynamically to RED with gap shortfall metrics.', {
    x: 8.2, y: 3.55, w: 4.4, h: 1.1,
    fontSize: 8.5, color: '721C24'
  });

  // Table S4 below the chart
  const tS4Rows = [
    [
      { text: 'Product Category', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Avg 2025 Mo.', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Avg 2026 Mo.', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
      { text: 'Chosen Person PPG%', options: { bold: true, fill: C_NAVY, color: 'FFFFFF' } },
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

  // ==================== SLIDES 5 to 9: RANKING SLIDES (Horizontal Bars) ====================
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
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', ppg: 60.18 },
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', ppg: 50.11 },
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elm', ppg: 39.64 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Sha', ppg: 32.23 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', ppg: 29.58 },
    { territory: 'Upper Egypt I', dm: 'UE North', ppg: 27.81 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- H', ppg: 22.46 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', ppg: 14.95 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', ppg: 12.04 }
  ];
  addRankingSlide('05', 'TOTAL PPG% GROWTH RANKING (COMPANY AT TOP)', 'National Benchmark: +33.79% | Green = Above Company | Red = Below Company', 'Total Sales', 33.79, totalRanks);

  // Slide 6: Pediamil 1
  const p1Ranks = [
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elm', ppg: 89.19 },
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', ppg: 60.27 },
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', ppg: 52.05 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', ppg: 39.08 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Sha', ppg: 36.20 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', ppg: 31.05 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- H', ppg: 30.81 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', ppg: 18.06 },
    { territory: 'Upper Egypt I', dm: 'UE North', ppg: 15.79 }
  ];
  addRankingSlide('06', 'PEDIAMIL 1 PPG% GROWTH RANKING (COMPANY AT TOP)', 'Pediamil 1 National Benchmark: +39.92% | Green = Above Company | Red = Below Company', 'Pediamil 1', 39.92, p1Ranks);

  // Slide 7: Pediamil 2
  const p2Ranks = [
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', ppg: 143.72 },
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', ppg: 87.89 },
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elm', ppg: 81.39 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Sha', ppg: 59.12 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- H', ppg: 52.67 },
    { territory: 'Upper Egypt I', dm: 'UE North', ppg: 46.25 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', ppg: 34.84 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', ppg: 29.42 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', ppg: 27.36 }
  ];
  addRankingSlide('07', 'PEDIAMIL 2 PPG% GROWTH RANKING (COMPANY AT TOP)', 'Pediamil 2 National Benchmark: +65.26% | Green = Above Company | Red = Below Company', 'Pediamil 2', 65.26, p2Ranks);

  // Slide 8: Pedia-Start 1
  const ps1Ranks = [
    { territory: 'Upper Egypt I', dm: 'UE North', ppg: 17.62 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', ppg: 17.36 },
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', ppg: 6.23 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Sha', ppg: -0.55 },
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', ppg: -5.47 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- H', ppg: -9.33 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', ppg: -10.81 },
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elm', ppg: -13.50 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', ppg: -18.96 }
  ];
  addRankingSlide('08', 'PEDIA-START 1 PPG% GROWTH RANKING (COMPANY AT TOP)', 'Pedia-Start 1 National Benchmark: -2.06% | Green = Above Company | Red = Below Company', 'Pedia-Start 1', -2.06, ps1Ranks);

  // Slide 9: Pedia-Start 2
  const ps2Ranks = [
    { territory: 'Delta II', dm: 'Mohamed Yousef M.', ppg: 102.27 },
    { territory: 'Guiza', dm: 'Youstina Farag Allah', ppg: 78.18 },
    { territory: 'Upper Egypt I', dm: 'UE North', ppg: 58.95 },
    { territory: 'Behera & Dakahlia', dm: 'Ahmed Mohamed Sakr', ppg: 41.55 },
    { territory: 'DELTA I', dm: 'Shimaa Tarek El- Sha', ppg: 37.14 },
    { territory: 'Upper Egypt II', dm: 'Beshoy Youhanna', ppg: 19.95 },
    { territory: 'Alx', dm: 'Ahmed Hassan Abd-Elm', ppg: 15.53 },
    { territory: 'KFR EL.SHK', dm: 'Karim Shehab', ppg: -6.32 },
    { territory: 'Cairo', dm: 'NOHER ADEL ABD EL- H', ppg: -20.23 }
  ];
  addRankingSlide('09', 'PEDIA-START 2 PPG% GROWTH RANKING (COMPANY AT TOP)', 'Pedia-Start 2 National Benchmark: +39.86% | Green = Above Company | Red = Below Company', 'Pedia-Start 2', 39.86, ps2Ranks);

  // ==================== SLIDE 10 (AMENDMENT 4: Matrix with X-axis intercept at Company PPG (+33.79%), selected ADM bubble highlighted) ====================
  const s10 = pptx.addSlide();
  addHeader(s10, '10', 'STRATEGIC PERFORMANCE QUADRANT MATRIX', 'Horizontal Intercept at Company Total PPG (+33.79%) | Vertical Intercept at 0.00% | Selected ADM Highlighted');

  // Selected ADM Diagnostic Card at Top
  s10.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 1.25, w: 12.3, h: 1.45,
    fill: { color: 'F5F3FF' }, line: { color: C_VIOLET, width: 2 }
  });
  s10.addText('🎯 SELECTED ADM STRATEGIC DIAGNOSTIC: BESHOY YOUHANNA (UPPER EGYPT II) — QUADRANT A: STAR 🌟', {
    x: 0.7, y: 1.35, w: 11.9, h: 0.35,
    fontSize: 12, bold: true, color: '4C1D95'
  });
  s10.addText('• Performance Coordinates: X (Contribution Diff vs GEO) = +0.52% | Y (Total PPG Growth) = +50.11% (vs Company +33.79%)\n• Portfolio Share: Delivers 16.13% of Egypt Total Sales (133,831 cans YTD). Exceeds geographic potential and leads the nation in volume.\n• Strategic Directives: Protect market dominance against aggressive competitor rep detailing, secure NICU hospital listings for Pedia-Start & LBW, and drive multi-can specialty bundling in community pharmacies.', {
    x: 0.7, y: 1.75, w: 11.9, h: 0.85,
    fontSize: 9.5, color: '3B0764'
  });

  // Quadrant Cards below
  // Top-Right: Quadrant A (Stars)
  s10.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 2.85, w: 5.9, h: 1.95,
    fill: { color: 'E8F8F0' }, line: { color: '28A745', width: 2 }
  });
  s10.addText('QUADRANT A: COMPANY STARS 🌟\n(High Growth > +33.8% PPG & Positive Contr. Diff > 0%)', {
    x: 7.0, y: 2.95, w: 5.5, h: 0.45,
    fontSize: 10, bold: true, color: '155724'
  });
  s10.addText('• Delta II (Mohamed Yousef): +60.2% PPG, +4.20% Diff, 136.7k units\n• Upper Egypt II (Beshoy Youhanna): +50.1% PPG, +0.52% Diff, 133.8k units [HIGHLIGHTED]\nStrategic Action: Maintain national volume engine, protect prescription share.', {
    x: 7.0, y: 3.45, w: 5.5, h: 1.25,
    fontSize: 8.5, color: '155724'
  });

  // Top-Left: Quadrant B (Challengers)
  s10.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 2.85, w: 6.0, h: 1.95,
    fill: { color: 'EBF5FB' }, line: { color: '2980B9', width: 2 }
  });
  s10.addText('QUADRANT B: HIGH-GROWTH CHALLENGERS 🚀\n(High Growth > +33.8% PPG & Negative Contr. Diff < 0%)', {
    x: 0.7, y: 2.95, w: 5.6, h: 0.45,
    fontSize: 10, bold: true, color: '1A5276'
  });
  s10.addText('• Alx (Ahmed Hassan): +39.6% PPG, -2.72% Diff, 61.2k units\nStrategic Action: Rapidly closing gap to 10.1% GEO potential. Accelerate key accounts and pharmacy stocking.', {
    x: 0.7, y: 3.45, w: 5.6, h: 1.25,
    fontSize: 8.5, color: '1A5276'
  });

  // Bottom-Left: Quadrant D (Lowest Performers)
  s10.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 4.95, w: 6.0, h: 1.95,
    fill: { color: 'FCECEE' }, line: { color: 'DC3545', width: 2 }
  });
  s10.addText('QUADRANT D: LOWEST PERFORMERS / CRITICAL ATTENTION ⚠️\n(Low Growth < +33.8% PPG & Negative Contr. Diff < 0%)', {
    x: 0.7, y: 5.05, w: 5.6, h: 0.45,
    fontSize: 10, bold: true, color: '721C24'
  });
  s10.addText('• Cairo (Noher Adel): +22.5% PPG, -8.29% Diff (6.3% contr vs 14.6% geo!)\n• Guiza (Youstina Farag): +29.6% PPG, -5.20% Diff | Upper Egypt I: +27.8% PPG\nStrategic Action: Immediate management review. Re-allocate detailing reps, audit pharmacy distribution.', {
    x: 0.7, y: 5.55, w: 5.6, h: 1.25,
    fontSize: 8.5, color: '721C24'
  });

  // Bottom-Right: Quadrant C (Volume Pillars & Share Keepers)
  s10.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 4.95, w: 5.9, h: 1.95,
    fill: { color: 'FEF9E7' }, line: { color: 'F39C12', width: 2 }
  });
  s10.addText('QUADRANT C: VOLUME PILLARS & SHARE KEEPERS 🛡️\n(Moderate Growth < +33.8% PPG & Positive Contr. Diff > 0%)', {
    x: 7.0, y: 5.05, w: 5.5, h: 0.45,
    fontSize: 10, bold: true, color: '7D6608'
  });
  s10.addText('• DELTA I (Shimaa Tarek): +32.2% PPG, +7.25% Diff, 120.9k units\n• KFR EL.SHK (Karim Shehab): +12.0% PPG, +5.80% Diff | Behera: +15.0% PPG\nStrategic Action: Strong contribution defenders. Drive specialty formulas to lift growth above +33.8%.', {
    x: 7.0, y: 5.55, w: 5.5, h: 1.25,
    fontSize: 8.5, color: '7D6608'
  });

  const targetPath = path.join(__dirname, 'Egy_Nutri_Business_Review_Deck.pptx');
  await pptx.writeFile({ fileName: targetPath });
  console.log(`PowerPoint Presentation successfully updated at: ${targetPath}`);
}

createPowerPoint().catch(err => console.error(err));
