// Data definitions for Egy Nutri. Business Review
const rawData2026 = [
  { territory: "Alx", dm: "Ahmed Hassan Abd-Elmonem Abdallah", p1: 19436, p2: 8869, pg3: 2538, lf: 1527, ha: 2260, ar: 1895, ac: 2136, mum: 350, ps1: 12955, ps2: 6562, lbw: 2707, sum: 61235, geoShare: 0.10101, contrIdx: 0.730478862, contrDiff: -0.0272 },
  { territory: "Behera & Dakahlia", dm: "Ahmed Mohamed Sakr", p1: 23500, p2: 11046, pg3: 2651, lf: 2578, ha: 4457, ar: 3572, ac: 4660, mum: 387, ps1: 17403, ps2: 10976, lbw: 4581, sum: 85811, geoShare: 0.09754, contrIdx: 1.06014107, contrDiff: 0.0059 },
  { territory: "Cairo", dm: "NOHER ADEL ABD EL- HAKEEM HASSAN", p1: 15452, p2: 11024, pg3: 3206, lf: 2574, ha: 2990, ar: 2240, ac: 3813, mum: 561, ps1: 5169, ps2: 3030, lbw: 2486, sum: 52545, geoShare: 0.14619, contrIdx: 0.433104767, contrDiff: -0.0829 },
  { territory: "Guiza", dm: "Youstina Farag Allah", p1: 20510, p2: 12243, pg3: 2582, lf: 4260, ha: 4196, ar: 3300, ac: 6343, mum: 1381, ps1: 11326, ps2: 7718, lbw: 3509, sum: 77368, geoShare: 0.14525, contrIdx: 0.641847568, contrDiff: -0.0520 },
  { territory: "DELTA I", dm: "Shimaa Tarek El- Shamy", p1: 32885, p2: 25206, pg3: 6882, lf: 3744, ha: 6222, ar: 5424, ac: 7790, mum: 421, ps1: 15401, ps2: 11553, lbw: 5349, sum: 120877, geoShare: 0.07317, contrIdx: 1.990588131, contrDiff: 0.0725 },
  { territory: "Delta II", dm: "Mohamed Yousef M.", p1: 36545, p2: 23057, pg3: 3777, lf: 5016, ha: 6509, ar: 3126, ac: 7430, mum: 358, ps1: 23588, ps2: 22111, lbw: 5183, sum: 136700, geoShare: 0.12271, contrIdx: 1.342339456, contrDiff: 0.0420 },
  { territory: "Upper Egypt I", dm: "UE North", p1: 26168, p2: 16847, pg3: 2530, lf: 2031, ha: 2240, ar: 3269, ac: 3832, mum: 137, ps1: 24150, ps2: 14570, lbw: 2978, sum: 98752, geoShare: 0.14039, contrIdx: 0.84761038, contrDiff: -0.0214 },
  { territory: "Upper Egypt II", dm: "Beshoy Youhanna", p1: 44494, p2: 28761, pg3: 4173, lf: 2908, ha: 4618, ar: 4106, ac: 6659, mum: 548, ps1: 20353, ps2: 11712, lbw: 5499, sum: 133831, geoShare: 0.15611, contrIdx: 1.033014434, contrDiff: 0.0052 },
  { territory: "KFR EL.SHK", dm: "Karim Shehab", p1: 15157, p2: 9447, pg3: 3685, lf: 1370, ha: 1902, ar: 1129, ac: 2450, mum: 185, ps1: 15329, ps2: 9174, lbw: 2935, sum: 62763, geoShare: 0.01763, contrIdx: 4.290709151, contrDiff: 0.0580 }
];

const rawData2025 = [
  { territory: "Alx", dm: "Ahmed Hassan Abd-Elmonem Abdallah", p1: 20546, p2: 9779, pg3: 2744, lf: 2121, ha: 3399, ar: 3693, ac: 3692, mum: 417, ps1: 29953, ps2: 11360, lbw: 0, sum: 87704 },
  { territory: "Behera & Dakahlia", dm: "Ahmed Mohamed Sakr", p1: 39810, p2: 16384, pg3: 4620, lf: 4913, ha: 8259, ar: 8974, ac: 7073, mum: 807, ps1: 42949, ps2: 15508, lbw: 0, sum: 149297 },
  { territory: "Cairo", dm: "NOHER ADEL ABD EL- HAKEEM HASSAN", p1: 23625, p2: 14442, pg3: 4076, lf: 3372, ha: 6241, ar: 8039, ac: 5551, mum: 1473, ps1: 11402, ps2: 7597, lbw: 0, sum: 85818 },
  { territory: "Guiza", dm: "Youstina Farag Allah", p1: 31300, p2: 19226, pg3: 5155, lf: 6125, ha: 8313, ar: 10328, ac: 8429, mum: 2570, ps1: 19302, ps2: 8663, lbw: 0, sum: 119411 },
  { territory: "DELTA I", dm: "Shimaa Tarek El- Shamy", p1: 48288, p2: 31681, pg3: 8808, lf: 5040, ha: 13724, ar: 14651, ac: 10957, mum: 1856, ps1: 30972, ps2: 16848, lbw: 0, sum: 182825 },
  { territory: "Delta II", dm: "Mohamed Yousef M.", p1: 45605, p2: 24543, pg3: 4768, lf: 4961, ha: 8799, ar: 7112, ac: 7895, mum: 730, ps1: 44410, ps2: 21863, lbw: 0, sum: 170686 },
  { territory: "Upper Egypt I", dm: "UE North", p1: 45199, p2: 23038, pg3: 4063, lf: 2816, ha: 5335, ar: 8089, ac: 6105, mum: 481, ps1: 41065, ps2: 18333, lbw: 0, sum: 154524 },
  { territory: "Upper Egypt II", dm: "Beshoy Youhanna", p1: 58524, p2: 23602, pg3: 4677, lf: 4282, ha: 6236, ar: 8468, ac: 8784, mum: 1150, ps1: 43061, ps2: 19528, lbw: 0, sum: 178312 },
  { territory: "KFR EL.SHK", dm: "Karim Shehab", p1: 21796, p2: 14599, pg3: 3268, lf: 3250, ha: 4931, ar: 5085, ac: 4643, mum: 508, ps1: 34372, ps2: 19586, lbw: 0, sum: 112038 }
];

module.exports = { rawData2026, rawData2025 };
