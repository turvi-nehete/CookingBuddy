import { useMemo } from "react";

/* ────────────────────────────────────────────────
   BackgroundDoodles
   Renders a fixed, full-viewport div with a repeating
   SVG tile of hand-drawn cooking doodles.
   Color: #BEBEBE · opacity 10-18% · thin outlines only
   ──────────────────────────────────────────────── */

// Each shape is drawn in a local ~24x28 coordinate space
const SHAPES = {
  chefHat:
    "M1 18h22v4H1zM4 18C4 6 20 6 20 18M8 18C8 10 16 10 16 18",
  whisk:
    "M12 28v-10M6 18C6 6 18 6 18 18M8 18C8 10 16 10 16 18M4 18C4 2 20 2 20 18",
  bowl:
    "M1 6C1 18 23 18 23 6M0 6h24",
  spatula:
    "M7 0v14M4 14h6c0 4-1 10-3 14c-2-4-3-10-3-14",
  carrot:
    "M10 28L4 6h12zM10 6c-3-5-7-3-5 1M10 6c3-5 7-3 5 1",
  mushroom:
    "M9 16v8h6v-8M2 16a10 8 0 0 1 20 0",
  garlic:
    "M10 22c-6 0-9-6-8-12c1-4 4-8 8-8s7 4 8 8c1 6-2 12-8 12M10 2v-3M7 3L5 0M13 3l2-3",
  tomato:
    "M11 3a9 9 0 1 0 .01 18A9 9 0 0 0 11 3M11 3c-2-3-5-2-4 1M11 3c2-3 5-2 4 1",
  leaf:
    "M3 24Q3 12 16 0Q10 10 3 24M3 24Q8 16 16 0",
  star:
    "M12 1l3 8h8l-6.5 5l2.5 8l-7-5l-7 5l2.5-8L2 9h8z",
  heart:
    "M12 20S3 14 3 8c0-4 3-6 5-6s3 2 4 4c1-2 2-4 4-4s5 2 5 6c0 6-9 12-9 12",
  sparkle:
    "M8 0v16M0 8h16M3 3l10 10M13 3L3 13",
  pot:
    "M4 8h18v10c0 4-18 4-18 0zM4 8H1M22 8h3M8 8V5h10v3",
  rollingPin:
    "M5 4h18v6H5zM5 7H1M23 7h4",
  spoon:
    "M10 0C5 0 1 3 1 7s4 7 9 7v14M10 0c5 0 9 3 9 7s-4 7-9 7",
  cup:
    "M3 2h16v14c0 4-16 4-16 0zM19 6c4 0 5 4 3 7h-3",
  bread:
    "M4 18h14c2-4 3-10 1-14C17 0 5 0 3 4C1 8 2 14 4 18z",
  cookie:
    "M12 2a10 10 0 1 0 .01 20A10 10 0 0 0 12 2M8 8v.5M15 10v.5M10 14v.5M14 7v.5M7 12v.5",
  pepper:
    "M10 22C4 22 0 16 0 10S4 0 10 0c4 0 6 2 6 4c0 4-4 18-6 18M10 0v-3c2 0 3-1 3-2",
  herb:
    "M6 28L12 0M9 18c-4-2-7 0-5 3M11 12c-5-2-7 0-5 3M10 22c4-2 6 0 4 3M12 8c4-2 7 0 5 3",
};

// Placement data: [shapeKey, x, y, rotation, opacity, scale]
const PLACEMENTS = [
  // Row 1
  ["chefHat",   55,  60, -15, 0.30, 1.4],
  ["whisk",    195, 100,  22, 0.26, 1.2],
  ["heart",    340,  45,  -8, 0.32, 1.0],
  ["carrot",   490,  80,  32, 0.28, 1.3],
  ["mushroom", 650,  55, -20, 0.30, 1.2],
  ["star",     810,  90,  12, 0.24, 1.1],

  // Row 2
  ["bowl",      80, 230,   6, 0.34, 1.3],
  ["spatula",  250, 260, -28, 0.28, 1.1],
  ["leaf",     420, 200,  18, 0.26, 1.2],
  ["pot",      590, 250, -10, 0.30, 1.3],
  ["bread",    770, 215,  24, 0.24, 1.1],

  // Row 3
  ["cup",       45, 390, -18, 0.28, 1.2],
  ["rollingPin",210,420,   9, 0.30, 1.1],
  ["garlic",   380, 370, -14, 0.34, 1.3],
  ["tomato",   545, 400,  27, 0.26, 1.2],
  ["cookie",   720, 360,  -6, 0.32, 1.1],
  ["herb",     870, 410,  20, 0.28, 1.2],

  // Row 4
  ["sparkle",  110, 540, -22, 0.24, 1.0],
  ["pepper",   280, 570,  14, 0.30, 1.2],
  ["chefHat",  450, 530,  -9, 0.34, 1.1],
  ["whisk",    630, 550,  30, 0.28, 1.3],
  ["heart",    800, 510, -15, 0.32, 1.0],

  // Row 5
  ["carrot",    60, 690,  20, 0.30, 1.2],
  ["star",     225, 720, -10, 0.24, 1.1],
  ["mushroom", 400, 670,  16, 0.28, 1.3],
  ["bowl",     575, 720, -22, 0.34, 1.2],
  ["spatula",  740, 680,   8, 0.30, 1.1],
  ["leaf",     895, 730, -26, 0.26, 1.2],

  // Row 6
  ["pot",       95, 850,  13, 0.30, 1.2],
  ["spoon",    260, 880, -18, 0.24, 1.1],
  ["garlic",   430, 830,  24, 0.34, 1.3],
  ["tomato",   610, 870,  -5, 0.28, 1.2],
  ["cup",      780, 840,  17, 0.32, 1.1],
  ["cookie",   920, 890, -12, 0.26, 1.2],

  // // Extra
  // ["bread",    145, 150,  10, 0.28, 1.0],
  // ["pepper",   685, 155, -24, 0.32, 1.2],
  // ["rollingPin",340,480,   5, 0.26, 1.1],
  // ["sparkle",  530, 610,  -8, 0.24, 0.9],
  // ["herb",     830, 445,  18, 0.30, 1.2],
  // ["heart",    470, 940, -16, 0.34, 1.0],
  // ["star",     160, 470,  28, 0.28, 0.9],
  // ["spoon",    720, 160, -30, 0.26, 1.1],
];

function buildSvgTile() {
  const groups = PLACEMENTS.map(([key, x, y, rot, opacity, scale]) => {
    const d = SHAPES[key];
    if (!d) return "";
    return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${scale * 4})" opacity="${opacity}"><path d="${d}"/></g>`;
  }).join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="960" viewBox="0 0 960 960">
  <g fill="none" stroke="#C6C6C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${groups}
  </g>
</svg>`;
}

function BackgroundDoodles() {
  const bgUrl = useMemo(() => {
    const svg = buildSvgTile();
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage: bgUrl,
        backgroundRepeat: "repeat",
        backgroundSize: "960px 960px",
      }}
    />
  );
}

export default BackgroundDoodles;
