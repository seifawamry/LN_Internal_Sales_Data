// Data definitions for Egy Nutri. Business Review & Sales Analytics
// Updated to YTD M09-2026 (9 Months) and 2025 Full Year (12 Months)
// Plus Quarterly Performance Velocity: Q3 2026 vs H1 2026 Baseline

const rawData2026 = [
  { territory: "Alx", dm: "Ahmed Hassan Abd-Elmonem Abdallah", p1: 29499, p2: 13662, pg3: 2715, lf: 2005, ha: 4399, ar: 3000, ac: 3681, mum: 395, ps1: 20684, ps2: 9426, lbw: 2712, sum: 92178, geoShare: 0.1010, contrIdx: 0.702810642, contrDiff: -0.0300 },
  { territory: "Behera & Dakahlia", dm: "Ahmed Mohamed Sakr", p1: 38180, p2: 19137, pg3: 2965, lf: 3206, ha: 8740, ar: 5593, ac: 8843, mum: 456, ps1: 33181, ps2: 15054, lbw: 4581, sum: 139936, geoShare: 0.0975, contrIdx: 1.104977553, contrDiff: 0.0102 },
  { territory: "Cairo", dm: "NOHER ADEL ABD EL- HAKEEM HASSAN", p1: 27763, p2: 18621, pg3: 3521, lf: 3813, ha: 6153, ar: 3773, ac: 10022, mum: 731, ps1: 11332, ps2: 5989, lbw: 2523, sum: 94241, geoShare: 0.1462, contrIdx: 0.496482779, contrDiff: -0.0736 },
  { territory: "Guiza", dm: "Youstina Farag Allah", p1: 32690, p2: 18558, pg3: 2828, lf: 5047, ha: 8593, ar: 5391, ac: 11160, mum: 1943, ps1: 19064, ps2: 10118, lbw: 3557, sum: 118949, geoShare: 0.1453, contrIdx: 0.630716309, contrDiff: -0.0536 },
  { territory: "DELTA I", dm: "Shimaa Tarek El- Shamy", p1: 49126, p2: 36490, pg3: 7610, lf: 4465, ha: 11724, ar: 8538, ac: 14062, mum: 593, ps1: 22567, ps2: 16194, lbw: 5349, sum: 176718, geoShare: 0.0732, contrIdx: 1.86003562, contrDiff: 0.0629 },
  { territory: "Delta II", dm: "Mohamed Yousef M.", p1: 49947, p2: 30495, pg3: 4130, lf: 5819, ha: 11828, ar: 4760, ac: 14826, mum: 490, ps1: 31933, ps2: 27445, lbw: 5183, sum: 186856, geoShare: 0.1227, contrIdx: 1.172745094, contrDiff: 0.0212 },
  { territory: "Upper Egypt I", dm: "UE North", p1: 46960, p2: 29943, pg3: 2733, lf: 2926, ha: 4023, ar: 4666, ac: 7619, mum: 285, ps1: 44302, ps2: 22973, lbw: 3016, sum: 169446, geoShare: 0.1404, contrIdx: 0.929574974, contrDiff: -0.0099 },
  { territory: "Upper Egypt II", dm: "Beshoy Youhanna", p1: 71010, p2: 40225, pg3: 4564, lf: 3918, ha: 9156, ar: 7503, ac: 13651, mum: 871, ps1: 34858, ps2: 19639, lbw: 5516, sum: 210911, geoShare: 0.1561, contrIdx: 1.040522878, contrDiff: 0.0063 },
  { territory: "KFR EL.SHK", dm: "Karim Shehab", p1: 23468, p2: 16972, pg3: 4070, lf: 1805, ha: 6593, ar: 2745, ac: 6789, mum: 313, ps1: 26605, ps2: 16885, lbw: 2935, sum: 109180, geoShare: 0.0176, contrIdx: 4.770580276, contrDiff: 0.0665 }
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

// Q3 2026 Monthly Average Actuals (July, August, September 2026)
const rawAvgQ3_2026 = [
  { territory: "Alx", dm: "Ahmed Hassan Abd-Elmonem Abdallah", p1: 3354, p2: 1598, pg3: 59, lf: 159, ha: 713, ar: 368, ac: 515, mum: 15, ps1: 2576, ps2: 955, lbw: 2, sum: 10314 },
  { territory: "Behera & Dakahlia", dm: "Ahmed Mohamed Sakr", p1: 4893, p2: 2697, pg3: 105, lf: 209, ha: 1428, ar: 674, ac: 1394, mum: 23, ps1: 5259, ps2: 1359, lbw: 0, sum: 18041 },
  { territory: "Cairo", dm: "NOHER ADEL ABD EL- HAKEEM HASSAN", p1: 4104, p2: 2532, pg3: 105, lf: 413, ha: 1054, ar: 511, ac: 2070, mum: 57, ps1: 2054, ps2: 986, lbw: 12, sum: 13898 },
  { territory: "Guiza", dm: "Youstina Farag Allah", p1: 4060, p2: 2105, pg3: 82, lf: 262, ha: 1466, ar: 697, ac: 1606, mum: 187, ps1: 2579, ps2: 800, lbw: 16, sum: 13858 },
  { territory: "DELTA I", dm: "Shimaa Tarek El- Shamy", p1: 5414, p2: 3761, pg3: 243, lf: 240, ha: 1834, ar: 1038, ac: 2091, mum: 57, ps1: 2389, ps2: 1547, lbw: 0, sum: 18614 },
  { territory: "Delta II", dm: "Mohamed Yousef M.", p1: 4467, p2: 2479, pg3: 118, lf: 268, ha: 1773, ar: 545, ac: 2465, mum: 44, ps1: 2782, ps2: 1778, lbw: 0, sum: 16671 },
  { territory: "Upper Egypt I", dm: "UE North", p1: 6931, p2: 4365, pg3: 68, lf: 298, ha: 594, ar: 466, ac: 1262, mum: 49, ps1: 6717, ps2: 2801, lbw: 13, sum: 23564 },
  { territory: "Upper Egypt II", dm: "Beshoy Youhanna", p1: 8839, p2: 3821, pg3: 130, lf: 337, ha: 1513, ar: 1132, ac: 2331, mum: 108, ps1: 4835, ps2: 2642, lbw: 6, sum: 25694 },
  { territory: "KFR EL.SHK", dm: "Karim Shehab", p1: 2770, p2: 2508, pg3: 128, lf: 145, ha: 1564, ar: 539, ac: 1446, mum: 43, ps1: 3759, ps2: 2570, lbw: 0, sum: 15472 }
];

// H1 (YTD June) 2026 Monthly Average Baseline Actuals (Jan–Jun 2026)
const rawAvgH1_2026 = [
  { territory: "Alx", dm: "Ahmed Hassan Abd-Elmonem Abdallah", p1: 3239, p2: 1478, pg3: 423, lf: 254, ha: 377, ar: 316, ac: 356, mum: 58, ps1: 2159, ps2: 1094, lbw: 451, sum: 10206 },
  { territory: "Behera & Dakahlia", dm: "Ahmed Mohamed Sakr", p1: 3917, p2: 1841, pg3: 442, lf: 430, ha: 743, ar: 595, ac: 777, mum: 65, ps1: 2901, ps2: 1829, lbw: 763, sum: 14302 },
  { territory: "Cairo", dm: "NOHER ADEL ABD EL- HAKEEM HASSAN", p1: 2575, p2: 1837, pg3: 534, lf: 429, ha: 498, ar: 373, ac: 636, mum: 94, ps1: 862, ps2: 505, lbw: 414, sum: 8758 },
  { territory: "Guiza", dm: "Youstina Farag Allah", p1: 3418, p2: 2041, pg3: 430, lf: 710, ha: 699, ar: 550, ac: 1057, mum: 230, ps1: 1888, ps2: 1286, lbw: 585, sum: 12895 },
  { territory: "DELTA I", dm: "Shimaa Tarek El- Shamy", p1: 5481, p2: 4201, pg3: 1147, lf: 624, ha: 1037, ar: 904, ac: 1298, mum: 70, ps1: 2567, ps2: 1926, lbw: 892, sum: 20146 },
  { territory: "Delta II", dm: "Mohamed Yousef M.", p1: 6091, p2: 3843, pg3: 630, lf: 836, ha: 1085, ar: 521, ac: 1238, mum: 60, ps1: 3931, ps2: 3685, lbw: 864, sum: 22783 },
  { territory: "Upper Egypt I", dm: "UE North", p1: 4361, p2: 2808, pg3: 422, lf: 339, ha: 373, ar: 545, ac: 639, mum: 23, ps1: 4025, ps2: 2428, lbw: 496, sum: 16459 },
  { territory: "Upper Egypt II", dm: "Beshoy Youhanna", p1: 7416, p2: 4794, pg3: 696, lf: 485, ha: 770, ar: 684, ac: 1110, mum: 91, ps1: 3392, ps2: 1952, lbw: 917, sum: 22305 },
  { territory: "KFR EL.SHK", dm: "Karim Shehab", p1: 2526, p2: 1575, pg3: 614, lf: 228, ha: 317, ar: 188, ac: 408, mum: 31, ps1: 2555, ps2: 1529, lbw: 489, sum: 10461 }
];

module.exports = {
  rawData2026,
  rawData2025,
  rawAvgQ3_2026,
  rawAvgH1_2026
};
