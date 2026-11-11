import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../public/items');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Helper to wrap SVG
function wrapSvg(id, content, defs = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <defs>
    <filter id="glow-${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000" flood-opacity="0.25"/>
    </filter>
    ${defs}
  </defs>
  <g filter="url(#glow-${id})">
    ${content}
  </g>
</svg>`;
}

const svgMap = {};

// ==================== 1. BAKERY CHAIN ====================
// Gen: Flour Sack
svgMap['bakery_gen'] = wrapSvg('bakery_gen', `
  <path d="M28 84 C24 50 32 38 40 34 L60 34 C68 38 76 50 72 84 C50 88 50 88 28 84 Z" fill="url(#sackGrad)" stroke="#8D6E63" stroke-width="2"/>
  <ellipse cx="50" cy="34" rx="14" ry="5" fill="#D7CCC8" stroke="#8D6E63" stroke-width="2"/>
  <!-- Tied rope -->
  <path d="M38 34 Q50 38 62 34" stroke="#5D4037" stroke-width="3" fill="none"/>
  <circle cx="50" cy="35" r="3" fill="#8D6E63"/>
  <!-- Wheat sprig -->
  <path d="M50 48 Q54 62 58 72" stroke="#E65100" stroke-width="2" fill="none"/>
  <ellipse cx="48" cy="52" rx="3" ry="5" transform="rotate(-30 48 52)" fill="#FFA726"/>
  <ellipse cx="54" cy="56" rx="3" ry="5" transform="rotate(30 54 56)" fill="#FFA726"/>
  <ellipse cx="50" cy="62" rx="3" ry="5" transform="rotate(-25 50 62)" fill="#FFA726"/>
  <!-- Flour powder peak -->
  <path d="M42 32 Q50 25 58 32 Q54 28 50 28 Q46 28 42 32 Z" fill="#FFF9C4"/>
`, `
  <linearGradient id="sackGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#EFEBE9"/>
    <stop offset="100%" stop-color="#BCAAA4"/>
  </linearGradient>
`);

// Lv1: Flour Bowl
svgMap['bakery_1'] = wrapSvg('bakery_1', `
  <ellipse cx="50" cy="74" rx="28" ry="8" fill="#5D4037" opacity="0.3"/>
  <path d="M22 50 C22 75 78 75 78 50 Z" fill="url(#woodBowl)" stroke="#4E342E" stroke-width="2.5"/>
  <ellipse cx="50" cy="50" rx="28" ry="10" fill="#EFEBE9"/>
  <!-- Flour heap -->
  <path d="M30 50 Q50 32 70 50" fill="#FFFDE7" stroke="#FFF59D" stroke-width="2"/>
  <circle cx="45" cy="42" r="3" fill="#FFF"/>
  <circle cx="54" cy="44" r="2" fill="#FFF"/>
`, `
  <linearGradient id="woodBowl" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#A1887F"/>
    <stop offset="100%" stop-color="#6D4C41"/>
  </linearGradient>
`);

// Lv2: Dough
svgMap['bakery_2'] = wrapSvg('bakery_2', `
  <ellipse cx="50" cy="74" rx="26" ry="6" fill="#3E2723" opacity="0.25"/>
  <path d="M26 62 C22 45 36 34 50 34 C66 34 78 45 74 62 C72 74 28 74 26 62 Z" fill="url(#doughGrad)" stroke="#D7CCC8" stroke-width="2"/>
  <ellipse cx="44" cy="46" rx="8" ry="4" fill="#FFF" opacity="0.6"/>
  <ellipse cx="60" cy="54" rx="4" ry="2" fill="#FFF" opacity="0.5"/>
  <!-- Flour dusting -->
  <circle cx="40" cy="55" r="1.5" fill="#FFF"/>
  <circle cx="56" cy="45" r="1.5" fill="#FFF"/>
  <circle cx="52" cy="60" r="1.5" fill="#FFF"/>
`, `
  <linearGradient id="doughGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FFF9C4"/>
    <stop offset="70%" stop-color="#FFE082"/>
    <stop offset="100%" stop-color="#FFCA28"/>
  </linearGradient>
`);

// Lv3: Toast Bread
svgMap['bakery_3'] = wrapSvg('bakery_3', `
  <ellipse cx="50" cy="78" rx="24" ry="5" fill="#000" opacity="0.2"/>
  <path d="M26 44 C26 30 38 24 50 24 C62 24 74 30 74 44 L74 68 C74 74 70 76 64 76 L36 76 C30 76 26 74 26 68 Z" fill="url(#crustGrad)" stroke="#5D4037" stroke-width="2.5"/>
  <!-- Inner soft slice face -->
  <path d="M30 46 C30 35 40 30 50 30 C60 30 70 35 70 46 L70 66 C70 70 68 72 62 72 L38 72 C32 72 30 70 30 66 Z" fill="url(#crumbGrad)"/>
  <!-- Butter pat melting -->
  <rect x="42" y="44" width="16" height="12" rx="3" fill="#FFEE58" stroke="#FDD835" stroke-width="1.5"/>
  <path d="M44 56 Q50 64 54 56" fill="#FDD835" opacity="0.8"/>
`, `
  <linearGradient id="crustGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#8D6E63"/>
    <stop offset="100%" stop-color="#4E342E"/>
  </linearGradient>
  <linearGradient id="crumbGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FFF9C4"/>
    <stop offset="100%" stop-color="#FFE082"/>
  </linearGradient>
`);

// Lv4: French Baguette
svgMap['bakery_4'] = wrapSvg('bakery_4', `
  <ellipse cx="50" cy="76" rx="28" ry="6" fill="#000" opacity="0.2"/>
  <path d="M20 66 C14 58 20 40 32 32 C48 20 72 26 80 38 C86 48 82 62 70 70 C54 80 26 74 20 66 Z" fill="url(#baguetteGrad)" stroke="#5D4037" stroke-width="2.5"/>
  <!-- Diagonal score cuts -->
  <ellipse cx="36" cy="46" rx="6" ry="2.5" transform="rotate(-35 36 46)" fill="#FFF9C4" stroke="#8D6E63" stroke-width="1.5"/>
  <ellipse cx="50" cy="50" rx="7" ry="2.5" transform="rotate(-35 50 50)" fill="#FFF9C4" stroke="#8D6E63" stroke-width="1.5"/>
  <ellipse cx="64" cy="54" rx="6" ry="2.5" transform="rotate(-35 64 54)" fill="#FFF9C4" stroke="#8D6E63" stroke-width="1.5"/>
`, `
  <linearGradient id="baguetteGrad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#FFA726"/>
    <stop offset="50%" stop-color="#FB8C00"/>
    <stop offset="100%" stop-color="#6D4C41"/>
  </linearGradient>
`);

// Lv5: Butter Croissant
svgMap['bakery_5'] = wrapSvg('bakery_5', `
  <ellipse cx="50" cy="74" rx="28" ry="6" fill="#000" opacity="0.2"/>
  <!-- Crescent curved body -->
  <path d="M20 64 C16 48 28 32 50 32 C72 32 84 48 80 64 C74 56 66 52 50 52 C34 52 26 56 20 64 Z" fill="url(#croissantGrad)" stroke="#4E342E" stroke-width="2"/>
  <!-- Middle bulge -->
  <ellipse cx="50" cy="48" rx="14" ry="18" fill="url(#croissantLight)" stroke="#4E342E" stroke-width="2"/>
  <ellipse cx="40" cy="52" rx="9" ry="13" transform="rotate(-20 40 52)" fill="url(#croissantGrad)" stroke="#4E342E" stroke-width="1.5"/>
  <ellipse cx="60" cy="52" rx="9" ry="13" transform="rotate(20 60 52)" fill="url(#croissantGrad)" stroke="#4E342E" stroke-width="1.5"/>
  <!-- Butter shine -->
  <path d="M46 36 Q50 33 54 36" stroke="#FFF" stroke-width="2.5" stroke-linecap="round" fill="none"/>
`, `
  <linearGradient id="croissantGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FFB74D"/>
    <stop offset="70%" stop-color="#F57C00"/>
    <stop offset="100%" stop-color="#5D4037"/>
  </linearGradient>
  <linearGradient id="croissantLight" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FFE082"/>
    <stop offset="100%" stop-color="#FF9800"/>
  </linearGradient>
`);

// Lv6: Smoked Salmon Bagel
svgMap['bakery_6'] = wrapSvg('bakery_6', `
  <ellipse cx="50" cy="74" rx="26" ry="6" fill="#000" opacity="0.2"/>
  <!-- Bagel base -->
  <ellipse cx="50" cy="54" rx="26" ry="18" fill="#F57C00" stroke="#5D4037" stroke-width="2.5"/>
  <!-- Cream cheese layer -->
  <ellipse cx="50" cy="50" rx="27" ry="15" fill="#FFFDE7"/>
  <!-- Salmon slices -->
  <path d="M30 48 Q40 40 54 48 Q46 54 30 48 Z" fill="#FF7043" stroke="#D84315" stroke-width="1"/>
  <path d="M46 52 Q60 44 70 52 Q58 58 46 52 Z" fill="#FF8A65" stroke="#D84315" stroke-width="1"/>
  <!-- Top bagel ring with hole -->
  <path d="M26 42 C26 26 74 26 74 42 C74 54 26 54 26 42 Z" fill="url(#bagelTop)" stroke="#4E342E" stroke-width="2"/>
  <ellipse cx="50" cy="40" rx="8" ry="5" fill="#FFFDE7" stroke="#4E342E" stroke-width="2"/>
  <!-- Sesame seeds -->
  <circle cx="36" cy="34" r="1.2" fill="#FFF"/>
  <circle cx="44" cy="32" r="1.2" fill="#FFF"/>
  <circle cx="58" cy="33" r="1.2" fill="#FFF"/>
  <circle cx="64" cy="37" r="1.2" fill="#FFF"/>
`, `
  <linearGradient id="bagelTop" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FFB74D"/>
    <stop offset="100%" stop-color="#E65100"/>
  </linearGradient>
`);

// Lv7: Pancake Stack
svgMap['bakery_7'] = wrapSvg('bakery_7', `
  <ellipse cx="50" cy="78" rx="28" ry="6" fill="#000" opacity="0.2"/>
  <!-- Bottom pancake -->
  <path d="M22 64 C22 56 78 56 78 64 L78 68 C78 74 22 74 22 68 Z" fill="#FFA726" stroke="#5D4037" stroke-width="2"/>
  <!-- Middle pancake -->
  <path d="M24 52 C24 44 76 44 76 52 L76 56 C76 62 24 62 24 56 Z" fill="#FFB74D" stroke="#5D4037" stroke-width="2"/>
  <!-- Top pancake -->
  <path d="M26 40 C26 32 74 32 74 40 L74 44 C74 50 26 50 26 44 Z" fill="#FFE082" stroke="#5D4037" stroke-width="2"/>
  <ellipse cx="50" cy="38" rx="24" ry="8" fill="#FFE082" stroke="#5D4037" stroke-width="2"/>
  <!-- Melting butter cube -->
  <rect x="44" y="26" width="12" height="9" rx="2" fill="#FFF59D" stroke="#FBC02D" stroke-width="1.5"/>
  <!-- Dripping syrup -->
  <path d="M46 36 C46 48 50 54 50 56 Q52 46 54 36 Z" fill="#795548"/>
  <path d="M60 40 Q62 50 62 54" stroke="#795548" stroke-width="3" stroke-linecap="round"/>
`);

// Lv8: Strawberry Shortcake
svgMap['bakery_8'] = wrapSvg('bakery_8', `
  <ellipse cx="50" cy="78" rx="26" ry="6" fill="#000" opacity="0.2"/>
  <!-- Cake slice triangular base -->
  <path d="M22 68 L78 68 L64 36 L36 36 Z" fill="#FFE082" stroke="#5D4037" stroke-width="2"/>
  <!-- Cream layers -->
  <rect x="23" y="58" width="54" height="6" fill="#FFF" stroke="#D7CCC8" stroke-width="0.5"/>
  <rect x="29" y="44" width="42" height="6" fill="#FFF" stroke="#D7CCC8" stroke-width="0.5"/>
  <!-- Top whipped cream -->
  <path d="M34 36 Q40 28 50 34 Q60 28 66 36 Z" fill="#FFF" stroke="#E0E0E0" stroke-width="1"/>
  <!-- Glossy Strawberry -->
  <path d="M44 26 C40 20 44 14 50 14 C56 14 60 20 56 26 C53 30 47 30 44 26 Z" fill="#E53935" stroke="#B71C1C" stroke-width="1.5"/>
  <circle cx="47" cy="18" r="0.8" fill="#FFF"/>
  <circle cx="53" cy="20" r="0.8" fill="#FFF"/>
  <!-- Mint leaf -->
  <path d="M50 14 Q56 10 58 12 Q54 16 50 14 Z" fill="#4CAF50"/>
`);

// Lv9: Chocolate Fondant
svgMap['bakery_9'] = wrapSvg('bakery_9', `
  <ellipse cx="50" cy="78" rx="26" ry="6" fill="#000" opacity="0.25"/>
  <!-- Dark chocolate lava cake muffin -->
  <path d="M26 66 L30 40 C32 34 68 34 70 40 L74 66 C74 74 26 74 26 66 Z" fill="url(#chocGrad)" stroke="#271914" stroke-width="2.5"/>
  <ellipse cx="50" cy="40" rx="20" ry="7" fill="#4E342E"/>
  <!-- Molten chocolate lava flowing out -->
  <path d="M42 42 C40 54 36 68 34 74 Q50 78 54 72 C50 64 48 50 48 42 Z" fill="#211510"/>
  <!-- Powdered sugar dust -->
  <circle cx="38" cy="38" r="1.2" fill="#FFF" opacity="0.8"/>
  <circle cx="48" cy="36" r="1.2" fill="#FFF" opacity="0.8"/>
  <circle cx="58" cy="39" r="1.2" fill="#FFF" opacity="0.8"/>
  <!-- Red cherry on top -->
  <circle cx="50" cy="30" r="7" fill="#D32F2F" stroke="#B71C1C" stroke-width="1.5"/>
  <circle cx="48" cy="28" r="2" fill="#FFF"/>
  <path d="M50 24 Q56 16 62 18" stroke="#388E3C" stroke-width="2" fill="none"/>
`, `
  <linearGradient id="chocGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#4E342E"/>
    <stop offset="100%" stop-color="#2D1A14"/>
  </linearGradient>
`);

// Lv10: Woodfire Pizza
svgMap['bakery_10'] = wrapSvg('bakery_10', `
  <ellipse cx="50" cy="74" rx="28" ry="7" fill="#000" opacity="0.2"/>
  <!-- Round crust -->
  <ellipse cx="50" cy="50" rx="30" ry="22" fill="#D7A15C" stroke="#795548" stroke-width="2.5"/>
  <!-- Tomato sauce + cheese -->
  <ellipse cx="50" cy="50" rx="25" ry="17" fill="#FFC107" stroke="#E65100" stroke-width="2"/>
  <!-- Pepperoni rounds -->
  <ellipse cx="40" cy="44" rx="5" ry="3.5" fill="#D32F2F"/>
  <ellipse cx="58" cy="46" rx="5" ry="3.5" fill="#D32F2F"/>
  <ellipse cx="48" cy="56" rx="5" ry="3.5" fill="#C62828"/>
  <!-- Basil leaves -->
  <path d="M48 44 Q52 38 56 42 Q52 46 48 44 Z" fill="#4CAF50"/>
  <path d="M36 54 Q42 50 44 54 Q38 58 36 54 Z" fill="#2E7D32"/>
  <!-- Char marks -->
  <ellipse cx="32" cy="38" rx="2" ry="1" fill="#4E342E"/>
  <ellipse cx="64" cy="42" rx="2" ry="1" fill="#4E342E"/>
`);

// Lv11: Signature Fruit Tart
svgMap['bakery_11'] = wrapSvg('bakery_11', `
  <ellipse cx="50" cy="78" rx="30" ry="7" fill="#000" opacity="0.25"/>
  <!-- Fluted Golden Crust -->
  <ellipse cx="50" cy="56" rx="30" ry="18" fill="url(#tartCrust)" stroke="#5D4037" stroke-width="2.5"/>
  <!-- Vanilla Pastry Cream -->
  <ellipse cx="50" cy="52" rx="26" ry="14" fill="#FFF9C4"/>
  <!-- Strawberries & Berries Array -->
  <circle cx="50" cy="48" r="6" fill="#E53935" stroke="#B71C1C" stroke-width="1"/>
  <circle cx="41" cy="45" r="5" fill="#7B1FA2"/>
  <circle cx="59" cy="45" r="5" fill="#1976D2"/>
  <circle cx="36" cy="54" r="5" fill="#E53935"/>
  <circle cx="64" cy="54" r="5" fill="#E53935"/>
  <circle cx="50" cy="58" r="5" fill="#388E3C"/>
  <!-- Golden Glaze Sparkles -->
  <circle cx="48" cy="46" r="1.5" fill="#FFF"/>
  <circle cx="62" cy="52" r="1.5" fill="#FFF"/>
  <!-- Sparkle Stars -->
  <path d="M50 20 L52 24 L56 26 L52 28 L50 32 L48 28 L44 26 L48 24 Z" fill="#FFD700"/>
`, `
  <linearGradient id="tartCrust" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FFA726"/>
    <stop offset="100%" stop-color="#8D6E63"/>
  </linearGradient>
`);

// ==================== 2. CAFE CHAIN ====================
// Gen: Espresso Machine
svgMap['cafe_gen'] = wrapSvg('cafe_gen', `
  <rect x="26" y="24" width="48" height="54" rx="6" fill="url(#machineBody)" stroke="#37474F" stroke-width="2.5"/>
  <!-- Brass boiler dome & gauge -->
  <rect x="32" y="28" width="36" height="18" rx="3" fill="#FFE082" stroke="#FFB300" stroke-width="1.5"/>
  <circle cx="50" cy="37" r="5" fill="#FFF" stroke="#37474F" stroke-width="1.5"/>
  <line x1="50" y1="37" x2="52" y2="34" stroke="#D32F2F" stroke-width="1.5"/>
  <!-- Portafilter handle -->
  <rect x="36" y="50" width="28" height="6" rx="2" fill="#212121"/>
  <path d="M44 56 L44 64 L56 64 L56 56 Z" fill="#CFD8DC" stroke="#455A64" stroke-width="1.5"/>
  <!-- Drip tray -->
  <rect x="22" y="74" width="56" height="8" rx="2" fill="#455A64" stroke="#263238" stroke-width="1.5"/>
  <!-- Coffee cup under spout -->
  <rect x="44" y="66" width="12" height="8" rx="2" fill="#FFF" stroke="#B0BEC5" stroke-width="1"/>
`, `
  <linearGradient id="machineBody" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#E53935"/>
    <stop offset="70%" stop-color="#C62828"/>
    <stop offset="100%" stop-color="#37474F"/>
  </linearGradient>
`);

// Lv1: Coffee Beans
svgMap['cafe_1'] = wrapSvg('cafe_1', `
  <ellipse cx="44" cy="46" rx="12" ry="16" transform="rotate(-25 44 46)" fill="#4E342E" stroke="#271914" stroke-width="2"/>
  <path d="M40 34 Q45 46 39 58" stroke="#FFE082" stroke-width="2" fill="none"/>
  
  <ellipse cx="58" cy="54" rx="11" ry="15" transform="rotate(35 58 54)" fill="#3E2723" stroke="#271914" stroke-width="2"/>
  <path d="M52 44 Q59 54 55 65" stroke="#FFE082" stroke-width="2" fill="none"/>
`);

// Lv2: Espresso Shot
svgMap['cafe_2'] = wrapSvg('cafe_2', `
  <ellipse cx="50" cy="74" rx="24" ry="5" fill="#000" opacity="0.2"/>
  <!-- Saucer -->
  <ellipse cx="50" cy="68" rx="24" ry="7" fill="#ECEFF1" stroke="#90A4AE" stroke-width="2"/>
  <!-- Demitasse Cup -->
  <path d="M34 44 L38 64 C38 68 62 68 62 64 L66 44 Z" fill="#FFF" stroke="#B0BEC5" stroke-width="2"/>
  <!-- Handle -->
  <path d="M64 48 C72 48 72 60 62 60" fill="none" stroke="#B0BEC5" stroke-width="2.5"/>
  <!-- Golden Crema -->
  <ellipse cx="50" cy="44" rx="16" ry="6" fill="#D7A15C" stroke="#8D6E63" stroke-width="1.5"/>
  <ellipse cx="48" cy="44" rx="10" ry="3.5" fill="#4E342E"/>
`);

// Lv3: Iced Americano
svgMap['cafe_3'] = wrapSvg('cafe_3', `
  <ellipse cx="50" cy="78" rx="18" ry="5" fill="#000" opacity="0.2"/>
  <!-- Clear glass tumbler -->
  <path d="M34 26 L38 74 C38 76 62 76 62 74 L66 26 Z" fill="url(#iceCoffeeGrad)" stroke="#90A4AE" stroke-width="2"/>
  <!-- Ice cubes -->
  <rect x="42" y="34" width="10" height="10" rx="2" fill="#E1F5FE" opacity="0.8" stroke="#81D4FA" stroke-width="1"/>
  <rect x="46" y="48" width="11" height="11" rx="2" fill="#E1F5FE" opacity="0.8" stroke="#81D4FA" stroke-width="1"/>
  <rect x="39" y="54" width="9" height="9" rx="2" fill="#E1F5FE" opacity="0.8" stroke="#81D4FA" stroke-width="1"/>
  <!-- Glass shine -->
  <line x1="37" y1="30" x2="40" y2="70" stroke="#FFF" stroke-width="2" opacity="0.6"/>
`, `
  <linearGradient id="iceCoffeeGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#4E342E" stop-opacity="0.9"/>
    <stop offset="100%" stop-color="#1B0000" stop-opacity="0.95"/>
  </linearGradient>
`);

// Lv4: Vanilla Latte
svgMap['cafe_4'] = wrapSvg('cafe_4', `
  <ellipse cx="50" cy="76" rx="20" ry="5" fill="#000" opacity="0.2"/>
  <!-- Mug -->
  <path d="M32 32 L36 70 C36 74 64 74 64 70 L68 32 Z" fill="url(#latteGrad)" stroke="#B0BEC5" stroke-width="2"/>
  <path d="M66 40 C76 42 76 58 64 62" fill="none" stroke="#B0BEC5" stroke-width="3"/>
  <!-- Foam surface -->
  <ellipse cx="50" cy="32" rx="18" ry="6" fill="#FFFDE7" stroke="#FFE082" stroke-width="1.5"/>
  <!-- Heart Latte Art -->
  <path d="M50 34 C46 30 42 32 46 36 L50 40 L54 36 C58 32 54 30 50 34 Z" fill="#8D6E63"/>
`, `
  <linearGradient id="latteGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FFF8E1"/>
    <stop offset="40%" stop-color="#D7CCC8"/>
    <stop offset="100%" stop-color="#5D4037"/>
  </linearGradient>
`);

// Lv5: Velvet Cappuccino
svgMap['cafe_5'] = wrapSvg('cafe_5', `
  <ellipse cx="50" cy="74" rx="26" ry="6" fill="#000" opacity="0.2"/>
  <!-- Wide cup -->
  <path d="M26 42 C26 66 74 66 74 42 Z" fill="#4E342E" stroke="#3E2723" stroke-width="2.5"/>
  <ellipse cx="50" cy="42" rx="24" ry="7" fill="#EFEBE9"/>
  <!-- Froth dome -->
  <ellipse cx="50" cy="39" rx="21" ry="8" fill="#FFF"/>
  <!-- Cinnamon dusting swirl -->
  <path d="M40 38 Q50 33 60 38 Q52 44 42 41" stroke="#8D6E63" stroke-width="2" fill="none" stroke-dasharray="2,2"/>
  <!-- Handle -->
  <path d="M72 44 C82 46 82 58 70 60" fill="none" stroke="#3E2723" stroke-width="3"/>
`);

// Lv6: Caramel Macchiato
svgMap['cafe_6'] = wrapSvg('cafe_6', `
  <!-- Tall cup with layers -->
  <path d="M34 24 L38 76 C38 78 62 78 62 76 L66 24 Z" fill="url(#macchiatoGrad)" stroke="#B0BEC5" stroke-width="2"/>
  <!-- Whipped cream mountain -->
  <path d="M36 24 Q50 14 64 24 Z" fill="#FFF"/>
  <!-- Caramel crosshatch grid -->
  <line x1="40" y1="18" x2="60" y2="22" stroke="#FF8F00" stroke-width="2"/>
  <line x1="42" y1="23" x2="58" y2="17" stroke="#FF8F00" stroke-width="2"/>
`, `
  <linearGradient id="macchiatoGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FFE082"/>
    <stop offset="35%" stop-color="#4E342E"/>
    <stop offset="70%" stop-color="#FFF9C4"/>
    <stop offset="100%" stop-color="#FFA000"/>
  </linearGradient>
`);

// Lv7: Cold Brew Float
svgMap['cafe_7'] = wrapSvg('cafe_7', `
  <path d="M32 30 L36 76 C36 78 64 78 64 76 L68 30 Z" fill="#211510" stroke="#90A4AE" stroke-width="2"/>
  <!-- Vanilla ice cream scoop -->
  <circle cx="50" cy="28" r="14" fill="#FFFDE7" stroke="#FFF59D" stroke-width="1.5"/>
  <path d="M50 14 Q56 8 60 12" stroke="#4CAF50" stroke-width="2.5" fill="none"/>
  <circle cx="50" cy="22" r="2" fill="#FFF"/>
`);

// Lv8: Matcha Latte
svgMap['cafe_8'] = wrapSvg('cafe_8', `
  <ellipse cx="50" cy="74" rx="26" ry="6" fill="#000" opacity="0.2"/>
  <path d="M26 44 C26 68 74 68 74 44 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2.5"/>
  <ellipse cx="50" cy="44" rx="24" ry="8" fill="#81C784"/>
  <!-- Leaf latte art -->
  <path d="M50 48 Q50 40 50 38" stroke="#FFF" stroke-width="2" fill="none"/>
  <ellipse cx="46" cy="42" rx="3" ry="1.5" transform="rotate(-30 46 42)" fill="#FFF"/>
  <ellipse cx="54" cy="42" rx="3" ry="1.5" transform="rotate(30 54 42)" fill="#FFF"/>
`);

// Lv9: Royal Milk Tea
svgMap['cafe_9'] = wrapSvg('cafe_9', `
  <ellipse cx="50" cy="74" rx="26" ry="6" fill="#000" opacity="0.2"/>
  <!-- Saucer -->
  <ellipse cx="50" cy="68" rx="25" ry="6" fill="#E0F7FA" stroke="#00838F" stroke-width="1.5"/>
  <!-- Teacup -->
  <path d="M30 44 C30 64 70 64 70 44 Z" fill="#E0F7FA" stroke="#00838F" stroke-width="2"/>
  <path d="M68 46 C76 48 76 58 66 60" fill="none" stroke="#00838F" stroke-width="2.5"/>
  <!-- Amber milk tea -->
  <ellipse cx="50" cy="44" rx="19" ry="5.5" fill="#D7CCC8" stroke="#A1887F" stroke-width="1.5"/>
  <!-- Steam swirls -->
  <path d="M46 36 Q44 28 48 24" stroke="#FFF" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.8"/>
  <path d="M54 36 Q56 28 52 24" stroke="#FFF" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.8"/>
`);

// Lv10: Signature Cloud Einspanner
svgMap['cafe_10'] = wrapSvg('cafe_10', `
  <path d="M32 34 L36 74 C36 78 64 78 64 74 L68 34 Z" fill="#1B0000" stroke="#CFD8DC" stroke-width="2"/>
  <!-- Thick cloud cream peak -->
  <path d="M30 34 C30 20 40 16 50 16 C60 16 70 20 70 34 Z" fill="#FFF" stroke="#ECEFF1" stroke-width="1.5"/>
  <circle cx="50" cy="18" r="3" fill="#FFF"/>
  <!-- Cocoa dusting -->
  <circle cx="44" cy="24" r="1" fill="#4E342E"/>
  <circle cx="52" cy="22" r="1" fill="#4E342E"/>
  <circle cx="58" cy="26" r="1" fill="#4E342E"/>
  <!-- Golden sparkles -->
  <path d="M50 6 L52 10 L56 12 L52 14 L50 18 L48 14 L44 12 L48 10 Z" fill="#FFD700"/>
`);

// ==================== 3. SEAFOOD CHAIN ====================
// Gen: Seafood Basket
svgMap['seafood_gen'] = wrapSvg('seafood_gen', `
  <path d="M24 44 C26 72 74 72 76 44 Z" fill="#8D6E63" stroke="#4E342E" stroke-width="2.5"/>
  <!-- Woven basket texture lines -->
  <path d="M26 50 Q50 60 74 50 M28 58 Q50 68 72 58 M32 66 Q50 74 68 66" stroke="#5D4037" stroke-width="1.5" fill="none"/>
  <!-- Basket handle -->
  <path d="M24 44 C24 18 76 18 76 44" fill="none" stroke="#4E342E" stroke-width="3"/>
  <!-- Clam & Shrimp sticking out -->
  <ellipse cx="44" cy="40" rx="8" ry="6" fill="#90CAF9"/>
  <path d="M52 38 Q62 28 66 36" stroke="#FF7043" stroke-width="4" stroke-linecap="round" fill="none"/>
`);

// Lv1: Clam
svgMap['seafood_1'] = wrapSvg('seafood_1', `
  <ellipse cx="50" cy="74" rx="24" ry="5" fill="#000" opacity="0.2"/>
  <path d="M26 62 C26 40 50 28 74 62 C62 70 38 70 26 62 Z" fill="#90CAF9" stroke="#1565C0" stroke-width="2.5"/>
  <path d="M50 28 L50 66 M50 28 L36 64 M50 28 L64 64" stroke="#1565C0" stroke-width="1.5" fill="none"/>
  <circle cx="50" cy="58" r="4" fill="#FFF" stroke="#E0E0E0" stroke-width="1"/>
`);

// Lv2: Prawn Skewer
svgMap['seafood_2'] = wrapSvg('seafood_2', `
  <!-- Bamboo skewer -->
  <line x1="20" y1="80" x2="80" y2="20" stroke="#8D6E63" stroke-width="3" stroke-linecap="round"/>
  <!-- Prawn 1 -->
  <path d="M36 64 C30 52 44 48 50 56 C54 62 42 70 36 64 Z" fill="#FF7043" stroke="#D84315" stroke-width="2"/>
  <!-- Prawn 2 -->
  <path d="M50 50 C44 38 58 34 64 42 C68 48 56 56 50 50 Z" fill="#FF8A65" stroke="#D84315" stroke-width="2"/>
  <!-- Grill char marks -->
  <line x1="38" y1="56" x2="46" y2="62" stroke="#212121" stroke-width="2"/>
  <line x1="52" y1="42" x2="60" y2="48" stroke="#212121" stroke-width="2"/>
`);

// Lv3: Salmon Steak
svgMap['seafood_3'] = wrapSvg('seafood_3', `
  <ellipse cx="50" cy="74" rx="26" ry="6" fill="#000" opacity="0.2"/>
  <path d="M26 48 C30 32 70 32 74 48 C72 68 28 68 26 48 Z" fill="#FF8A65" stroke="#D84315" stroke-width="2.5"/>
  <!-- Crisp skin rim -->
  <path d="M26 48 C30 32 70 32 74 48" stroke="#37474F" stroke-width="4" fill="none"/>
  <!-- Salmon flesh rings -->
  <path d="M38 46 Q50 40 62 46 M42 54 Q50 48 58 54" stroke="#FFF" stroke-width="2" fill="none" opacity="0.8"/>
  <!-- Rosemary sprig -->
  <line x1="36" y1="36" x2="64" y2="44" stroke="#2E7D32" stroke-width="2"/>
`);

// Lv4: Octopus Salad
svgMap['seafood_4'] = wrapSvg('seafood_4', `
  <ellipse cx="50" cy="74" rx="26" ry="6" fill="#000" opacity="0.2"/>
  <ellipse cx="50" cy="56" rx="26" ry="12" fill="#ECEFF1" stroke="#90A4AE" stroke-width="2"/>
  <!-- Purple tentacle slices -->
  <circle cx="42" cy="52" r="7" fill="#7B1FA2" stroke="#4A148C" stroke-width="1.5"/>
  <circle cx="42" cy="52" r="3" fill="#FFF"/>
  <circle cx="58" cy="50" r="7" fill="#7B1FA2" stroke="#4A148C" stroke-width="1.5"/>
  <circle cx="58" cy="50" r="3" fill="#FFF"/>
  <circle cx="50" cy="58" r="6" fill="#8E24AA" stroke="#4A148C" stroke-width="1.5"/>
  <circle cx="50" cy="58" r="2.5" fill="#FFF"/>
  <!-- Olive oil & herbs -->
  <circle cx="34" cy="54" r="3" fill="#FDD835"/>
  <circle cx="64" cy="56" r="3" fill="#D32F2F"/>
`);

// Lv5: Butter Scallop
svgMap['seafood_5'] = wrapSvg('seafood_5', `
  <path d="M22 66 C22 36 78 36 78 66 Z" fill="#FFE0B2" stroke="#8D6E63" stroke-width="2"/>
  <!-- Scallop meat inside -->
  <ellipse cx="50" cy="54" rx="14" ry="10" fill="#FFFDE7" stroke="#FFB74D" stroke-width="1.5"/>
  <!-- Bubbling golden butter -->
  <ellipse cx="50" cy="58" rx="18" ry="4" fill="#FFD54F" opacity="0.8"/>
  <circle cx="44" cy="52" r="1.5" fill="#388E3C"/>
  <circle cx="56" cy="54" r="1.5" fill="#388E3C"/>
`);

// Lv6: Seafood Paella
svgMap['seafood_6'] = wrapSvg('seafood_6', `
  <ellipse cx="50" cy="74" rx="28" ry="6" fill="#000" opacity="0.2"/>
  <!-- Shallow black pan -->
  <ellipse cx="50" cy="52" rx="28" ry="14" fill="#212121" stroke="#000" stroke-width="2.5"/>
  <!-- Yellow saffron rice -->
  <ellipse cx="50" cy="52" rx="25" ry="11" fill="#FDD835"/>
  <!-- Mussels & Prawns -->
  <ellipse cx="40" cy="50" rx="5" ry="3" fill="#37474F"/>
  <ellipse cx="60" cy="50" rx="5" ry="3" fill="#37474F"/>
  <path d="M46 46 Q54 42 54 48" stroke="#FF5722" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Lemon wedge -->
  <path d="M46 54 L54 54 A4 4 0 0 1 46 54 Z" fill="#FFEE58" stroke="#FBC02D" stroke-width="1"/>
`);

// Lv7: Bouillabaisse
svgMap['seafood_7'] = wrapSvg('seafood_7', `
  <path d="M26 44 L30 68 C30 74 70 74 70 68 L74 44 Z" fill="#37474F" stroke="#212121" stroke-width="2.5"/>
  <!-- Rich red seafood broth -->
  <ellipse cx="50" cy="44" rx="23" ry="8" fill="#D32F2F"/>
  <!-- Fish chunks & mussel -->
  <circle cx="44" cy="42" r="4" fill="#FFAB91"/>
  <ellipse cx="56" cy="44" rx="4" ry="2.5" fill="#263238"/>
  <!-- Steam -->
  <path d="M44 32 Q42 24 46 20" stroke="#FFF" stroke-width="1.5" fill="none" opacity="0.8"/>
  <path d="M54 32 Q56 24 52 20" stroke="#FFF" stroke-width="1.5" fill="none" opacity="0.8"/>
`);

// Lv8: Tuna Tataki
svgMap['seafood_8'] = wrapSvg('seafood_8', `
  <!-- Plate -->
  <ellipse cx="50" cy="56" rx="28" ry="14" fill="#212121" stroke="#424242" stroke-width="2"/>
  <!-- Sliced ruby tuna pieces -->
  <rect x="32" y="46" width="10" height="14" rx="2" fill="#D32F2F" stroke="#B71C1C" stroke-width="1.5"/>
  <rect x="45" y="48" width="10" height="14" rx="2" fill="#C62828" stroke="#B71C1C" stroke-width="1.5"/>
  <rect x="58" y="50" width="10" height="14" rx="2" fill="#D32F2F" stroke="#B71C1C" stroke-width="1.5"/>
  <!-- White sesame edges -->
  <line x1="32" y1="46" x2="42" y2="46" stroke="#FFF" stroke-width="1.5"/>
  <line x1="45" y1="48" x2="55" y2="48" stroke="#FFF" stroke-width="1.5"/>
  <line x1="58" y1="50" x2="68" y2="50" stroke="#FFF" stroke-width="1.5"/>
`);

// Lv9: Lobster Tail
svgMap['seafood_9'] = wrapSvg('seafood_9', `
  <path d="M34 68 C28 50 36 32 50 28 C64 32 72 50 66 68 Z" fill="#D32F2F" stroke="#B71C1C" stroke-width="2.5"/>
  <!-- Tail fan -->
  <path d="M42 68 L36 78 M50 68 L50 80 M58 68 L64 78" stroke="#B71C1C" stroke-width="3" stroke-linecap="round"/>
  <!-- Split meat with melted cheese -->
  <ellipse cx="50" cy="46" rx="10" ry="14" fill="#FFFDE7" stroke="#FFD54F" stroke-width="2"/>
  <circle cx="50" cy="42" r="2" fill="#388E3C"/>
`);

// Lv10: Royal Seafood Platter
svgMap['seafood_10'] = wrapSvg('seafood_10', `
  <!-- Multi-tier Silver Tower -->
  <ellipse cx="50" cy="74" rx="28" ry="7" fill="#CFD8DC" stroke="#78909C" stroke-width="2"/>
  <rect x="48" y="48" width="4" height="26" fill="#B0BEC5"/>
  <ellipse cx="50" cy="48" rx="20" ry="5" fill="#CFD8DC" stroke="#78909C" stroke-width="2"/>
  <!-- Giant whole lobster on top -->
  <ellipse cx="50" cy="34" rx="10" ry="12" fill="#D32F2F" stroke="#B71C1C" stroke-width="1.5"/>
  <!-- Claws -->
  <circle cx="38" cy="26" r="5" fill="#C62828"/>
  <circle cx="62" cy="26" r="5" fill="#C62828"/>
  <!-- Golden Crown -->
  <path d="M44 14 L46 18 L50 14 L54 18 L56 14 L56 20 L44 20 Z" fill="#FFD700" stroke="#FFA000" stroke-width="1"/>
`);

// ==================== 4. GARDEN CHAIN ====================
// Gen: Seed Pouch
svgMap['garden_gen'] = wrapSvg('garden_gen', `
  <path d="M32 78 C26 48 34 38 42 34 L58 34 C66 38 74 48 68 78 Z" fill="#8D6E63" stroke="#4E342E" stroke-width="2.5"/>
  <!-- Tied neck with green ribbon -->
  <rect x="38" y="32" width="24" height="5" rx="2" fill="#4CAF50"/>
  <!-- Green Leaf Emblem -->
  <path d="M50 48 C44 54 44 64 50 66 C56 64 56 54 50 48 Z" fill="#81C784" stroke="#2E7D32" stroke-width="1.5"/>
`);

// Lv1: Sprout
svgMap['garden_1'] = wrapSvg('garden_1', `
  <!-- Soil Mound -->
  <ellipse cx="50" cy="72" rx="22" ry="7" fill="#5D4037" stroke="#3E2723" stroke-width="2"/>
  <!-- Sprout Stem -->
  <path d="M50 70 Q50 50 50 42" stroke="#4CAF50" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Two green leaves -->
  <path d="M50 42 C40 36 38 48 50 46 Z" fill="#81C784" stroke="#2E7D32" stroke-width="1.5"/>
  <path d="M50 42 C60 36 62 48 50 46 Z" fill="#66BB6A" stroke="#2E7D32" stroke-width="1.5"/>
`);

// Lv2: Basil
svgMap['garden_2'] = wrapSvg('garden_2', `
  <path d="M50 72 L50 36" stroke="#2E7D32" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="40" cy="46" rx="10" ry="7" transform="rotate(-30 40 46)" fill="#4CAF50" stroke="#1B5E20" stroke-width="1.5"/>
  <ellipse cx="60" cy="46" rx="10" ry="7" transform="rotate(30 60 46)" fill="#66BB6A" stroke="#1B5E20" stroke-width="1.5"/>
  <ellipse cx="50" cy="34" rx="8" ry="11" fill="#81C784" stroke="#1B5E20" stroke-width="1.5"/>
  <circle cx="48" cy="32" r="1.5" fill="#FFF" opacity="0.6"/>
`);

// Lv3: Rosemary
svgMap['garden_3'] = wrapSvg('garden_3', `
  <!-- Woody sprig -->
  <line x1="50" y1="78" x2="50" y2="24" stroke="#5D4037" stroke-width="3" stroke-linecap="round"/>
  <!-- Needles -->
  <line x1="50" y1="64" x2="38" y2="58" stroke="#2E7D32" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="50" y1="64" x2="62" y2="58" stroke="#2E7D32" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="50" y1="52" x2="36" y2="46" stroke="#388E3C" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="50" y1="52" x2="64" y2="46" stroke="#388E3C" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="50" y1="40" x2="38" y2="34" stroke="#4CAF50" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="50" y1="40" x2="62" y2="34" stroke="#4CAF50" stroke-width="2.5" stroke-linecap="round"/>
`);

// Lv4: Wild Mint
svgMap['garden_4'] = wrapSvg('garden_4', `
  <path d="M50 74 L50 34" stroke="#1B5E20" stroke-width="3"/>
  <ellipse cx="40" cy="46" rx="12" ry="8" transform="rotate(-25 40 46)" fill="#26A69A" stroke="#004D40" stroke-width="1.5"/>
  <ellipse cx="60" cy="46" rx="12" ry="8" transform="rotate(25 60 46)" fill="#4DB6AC" stroke="#004D40" stroke-width="1.5"/>
  <ellipse cx="50" cy="32" rx="9" ry="12" fill="#80CBC4" stroke="#004D40" stroke-width="1.5"/>
  <!-- Dew drop -->
  <circle cx="50" cy="30" r="2" fill="#E0F7FA"/>
`);

// Lv5: Chamomile
svgMap['garden_5'] = wrapSvg('garden_5', `
  <ellipse cx="50" cy="50" rx="9" ry="9" fill="#FDD835" stroke="#F57F17" stroke-width="2"/>
  <!-- Petals -->
  <ellipse cx="50" cy="32" rx="4" ry="8" fill="#FFF" stroke="#E0E0E0" stroke-width="1"/>
  <ellipse cx="50" cy="68" rx="4" ry="8" fill="#FFF" stroke="#E0E0E0" stroke-width="1"/>
  <ellipse cx="32" cy="50" rx="8" ry="4" fill="#FFF" stroke="#E0E0E0" stroke-width="1"/>
  <ellipse cx="68" cy="50" rx="8" ry="4" fill="#FFF" stroke="#E0E0E0" stroke-width="1"/>
  <ellipse cx="38" cy="38" rx="4" ry="7" transform="rotate(-45 38 38)" fill="#FFF"/>
  <ellipse cx="62" cy="38" rx="4" ry="7" transform="rotate(45 62 38)" fill="#FFF"/>
  <ellipse cx="38" cy="62" rx="4" ry="7" transform="rotate(45 38 62)" fill="#FFF"/>
  <ellipse cx="62" cy="62" rx="4" ry="7" transform="rotate(-45 62 62)" fill="#FFF"/>
`);

// Lv6: Lavender Bouquet
svgMap['garden_6'] = wrapSvg('garden_6', `
  <!-- Stems tied with ribbon -->
  <line x1="50" y1="84" x2="42" y2="40" stroke="#33691E" stroke-width="2"/>
  <line x1="50" y1="84" x2="50" y2="36" stroke="#33691E" stroke-width="2"/>
  <line x1="50" y1="84" x2="58" y2="40" stroke="#33691E" stroke-width="2"/>
  <!-- Purple flower beads -->
  <ellipse cx="42" cy="34" rx="4" ry="10" fill="#7E57C2"/>
  <ellipse cx="50" cy="28" rx="4" ry="12" fill="#9575CD"/>
  <ellipse cx="58" cy="34" rx="4" ry="10" fill="#7E57C2"/>
  <rect x="45" y="60" width="10" height="5" rx="2" fill="#E91E63"/>
`);

// Lv7: Herb Infusion Syrup
svgMap['garden_7'] = wrapSvg('garden_7', `
  <ellipse cx="50" cy="78" rx="18" ry="5" fill="#000" opacity="0.2"/>
  <path d="M38 38 L38 72 C38 76 62 76 62 72 L62 38 L56 34 L56 26 L44 26 L44 34 Z" fill="url(#syrupGrad)" stroke="#5D4037" stroke-width="2"/>
  <!-- Cork stopper -->
  <rect x="45" y="20" width="10" height="6" rx="1.5" fill="#8D6E63" stroke="#4E342E" stroke-width="1.5"/>
  <circle cx="48" cy="50" r="1.5" fill="#FFF" opacity="0.6"/>
`, `
  <linearGradient id="syrupGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FFE082"/>
    <stop offset="60%" stop-color="#FFB300"/>
    <stop offset="100%" stop-color="#E65100"/>
  </linearGradient>
`);

// Lv8: Aroma Herb Oil
svgMap['garden_8'] = wrapSvg('garden_8', `
  <path d="M38 36 L38 72 C38 76 62 76 62 72 L62 36 L54 30 L54 26 L46 26 L46 30 Z" fill="#A5D6A7" stroke="#2E7D32" stroke-width="2"/>
  <!-- Dropper rubber top -->
  <rect x="47" y="16" width="6" height="10" rx="3" fill="#212121"/>
  <!-- Shiny reflection -->
  <line x1="42" y1="40" x2="42" y2="68" stroke="#FFF" stroke-width="2" opacity="0.7"/>
`);

// Lv9: Miracle Golden Herb
svgMap['garden_9'] = wrapSvg('garden_9', `
  <ellipse cx="50" cy="74" rx="24" ry="6" fill="#000" opacity="0.2"/>
  <path d="M50 72 L50 30" stroke="#F57F17" stroke-width="3.5"/>
  <ellipse cx="38" cy="44" rx="12" ry="8" transform="rotate(-30 38 44)" fill="#FFD54F" stroke="#FF6F00" stroke-width="2"/>
  <ellipse cx="62" cy="44" rx="12" ry="8" transform="rotate(30 62 44)" fill="#FFE082" stroke="#FF6F00" stroke-width="2"/>
  <ellipse cx="50" cy="28" rx="10" ry="14" fill="#FFF59D" stroke="#FF6F00" stroke-width="2"/>
  <!-- Radiant stardust sparkles -->
  <path d="M50 8 L52 14 L58 16 L52 18 L50 24 L48 18 L42 16 L48 14 Z" fill="#FFD700"/>
`);

// ==================== 5. RUINS CHAIN ====================
// Gen: Workbench
svgMap['ruins_gen'] = wrapSvg('ruins_gen', `
  <!-- Heavy wood table -->
  <rect x="22" y="44" width="56" height="12" rx="3" fill="#6D4C41" stroke="#3E2723" stroke-width="2.5"/>
  <rect x="26" y="56" width="8" height="24" fill="#4E342E"/>
  <rect x="66" y="56" width="8" height="24" fill="#4E342E"/>
  <!-- Lantern on table -->
  <rect x="32" y="28" width="10" height="16" rx="2" fill="#FFE082" stroke="#263238" stroke-width="2"/>
  <path d="M37 20 Q37 28 37 28" stroke="#263238" stroke-width="2"/>
  <!-- Map blueprint scroll -->
  <ellipse cx="58" cy="38" rx="8" ry="4" fill="#E0F7FA" stroke="#00838F" stroke-width="1.5"/>
`);

// Lv1: Magnifying Glass
svgMap['ruins_1'] = wrapSvg('ruins_1', `
  <!-- Handle -->
  <line x1="56" y1="56" x2="78" y2="78" stroke="#6D4C41" stroke-width="6" stroke-linecap="round"/>
  <!-- Brass rim -->
  <circle cx="42" cy="42" r="22" fill="#E0F7FA" stroke="#F57F17" stroke-width="4"/>
  <!-- Lens reflection -->
  <path d="M32 30 Q44 26 52 38" stroke="#FFF" stroke-width="3" fill="none" opacity="0.8"/>
`);

// Lv2: Archeology Brush
svgMap['ruins_2'] = wrapSvg('ruins_2', `
  <line x1="28" y1="28" x2="62" y2="62" stroke="#8D6E63" stroke-width="5" stroke-linecap="round"/>
  <!-- Metal ferrule -->
  <rect x="56" y="56" width="10" height="8" transform="rotate(45 61 60)" fill="#B0BEC5"/>
  <!-- Bristles with gold dust -->
  <path d="M66 66 L78 78 L72 84 L60 72 Z" fill="#FFE082" stroke="#FFA000" stroke-width="1.5"/>
`);

// Lv3: Bronze Compass
svgMap['ruins_3'] = wrapSvg('ruins_3', `
  <ellipse cx="50" cy="74" rx="22" ry="5" fill="#000" opacity="0.2"/>
  <circle cx="50" cy="48" r="22" fill="#FFE082" stroke="#8D6E63" stroke-width="3"/>
  <circle cx="50" cy="48" r="18" fill="#FFFDE7" stroke="#8D6E63" stroke-width="1.5"/>
  <!-- Compass needle -->
  <path d="M50 32 L54 48 L46 48 Z" fill="#D32F2F"/>
  <path d="M50 64 L54 48 L46 48 Z" fill="#37474F"/>
  <circle cx="50" cy="48" r="3" fill="#F57F17"/>
`);

// Lv4: Flashlight
svgMap['ruins_4'] = wrapSvg('ruins_4', `
  <!-- Metallic Body -->
  <rect x="36" y="44" width="28" height="34" rx="4" fill="#37474F" stroke="#212121" stroke-width="2.5"/>
  <!-- Beveled Head -->
  <path d="M30 44 L36 32 L64 32 L70 44 Z" fill="#607D8B" stroke="#212121" stroke-width="2"/>
  <!-- Glass lens beaming light -->
  <ellipse cx="50" cy="32" rx="14" ry="4" fill="#FFF" stroke="#FFD54F" stroke-width="2"/>
`);

// Lv5: Ancient Key
svgMap['ruins_5'] = wrapSvg('ruins_5', `
  <!-- Star handle -->
  <circle cx="50" cy="32" r="12" fill="none" stroke="#F57F17" stroke-width="4"/>
  <circle cx="50" cy="32" r="5" fill="#FFD54F"/>
  <!-- Key shaft -->
  <line x1="50" y1="44" x2="50" y2="76" stroke="#F57F17" stroke-width="4" stroke-linecap="round"/>
  <!-- Teeth -->
  <line x1="50" y1="68" x2="62" y2="68" stroke="#F57F17" stroke-width="3" stroke-linecap="round"/>
  <line x1="50" y1="74" x2="60" y2="74" stroke="#F57F17" stroke-width="3" stroke-linecap="round"/>
`);

// Lv6: Rune Tablet
svgMap['ruins_6'] = wrapSvg('ruins_6', `
  <!-- Stone slab -->
  <rect x="28" y="24" width="44" height="56" rx="4" fill="#455A64" stroke="#263238" stroke-width="3"/>
  <!-- Glowing cyan runes -->
  <path d="M42 36 L50 44 L58 36 M50 44 L50 64 M40 54 L60 54" stroke="#00E5FF" stroke-width="3" stroke-linecap="round" fill="none"/>
`);

// Lv7: Chef's Diary
svgMap['ruins_7'] = wrapSvg('ruins_7', `
  <rect x="28" y="24" width="44" height="56" rx="4" fill="#4E342E" stroke="#271914" stroke-width="3"/>
  <!-- Gold corner brackets -->
  <path d="M28 36 L28 24 L40 24" stroke="#FFD700" stroke-width="3" fill="none"/>
  <path d="M72 36 L72 24 L60 24" stroke="#FFD700" stroke-width="3" fill="none"/>
  <!-- Red ribbon bookmark -->
  <path d="M50 24 L50 84 L46 80 L42 84 L42 24" fill="#D32F2F"/>
`);

// Lv8: Ruins Decoder
svgMap['ruins_8'] = wrapSvg('ruins_8', `
  <circle cx="50" cy="50" r="28" fill="none" stroke="#F57F17" stroke-width="3.5"/>
  <circle cx="50" cy="50" r="20" fill="none" stroke="#FFA000" stroke-width="2.5"/>
  <!-- Glowing crystal center -->
  <polygon points="50,34 62,46 56,64 44,64 38,46" fill="#9C27B0" stroke="#E1BEE7" stroke-width="2"/>
  <!-- Starlight rays -->
  <path d="M50 14 L50 22 M50 78 L50 86 M14 50 L22 50 M78 50 L86 50" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round"/>
`);

// Write each file into public/items/
let count = 0;
for (const [key, svg] of Object.entries(svgMap)) {
  const filePath = path.join(targetDir, `${key}.svg`);
  fs.writeFileSync(filePath, svg.trim(), 'utf-8');
  count++;
}

console.log(`Successfully generated ${count} optimized SVG item icons in ${targetDir}`);
