import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../public/items');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Wrapper with 3D drop shadow filter and responsive 100x100 viewBox
function wrap3DIcon(id, content, defs = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <defs>
    <filter id="shadow-${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#1e293b" flood-opacity="0.35"/>
    </filter>
    ${defs}
  </defs>
  <g filter="url(#shadow-${id})">
    ${content}
  </g>
</svg>`;
}

const icons = {};

// ==========================================
// 1. 화덕 베이커리 (빵 - Bread & Bakery Chain)
// ==========================================

// Spawner: 화덕 베이커리 오븐 & 밀가루 포대 (bakery_gen)
icons['bakery_gen'] = wrap3DIcon('bakery_gen', `
  <!-- Stone Oven Base -->
  <path d="M16 88 C14 45 28 20 50 18 C72 20 86 45 84 88 Z" fill="url(#ovenStone)" stroke="#451a03" stroke-width="2.5"/>
  <!-- Oven Arch Opening -->
  <path d="M28 88 C26 55 36 38 50 36 C64 38 74 55 72 88 Z" fill="#1c1917" stroke="#78350f" stroke-width="2"/>
  <!-- Glowing Fire & Hot Coals inside -->
  <path d="M32 88 C32 68 40 54 50 54 C60 54 68 68 68 88 Z" fill="url(#fireGrad)"/>
  <!-- Baking Baguette on Hearth -->
  <ellipse cx="50" cy="76" rx="14" ry="5" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
  <path d="M42 74 Q44 77 46 75 M48 74 Q50 77 52 75 M54 74 Q56 77 58 75" stroke="#451a03" stroke-width="1.5" fill="none"/>
  <!-- Golden Oven Chimney Rim Highlight -->
  <path d="M30 26 C36 21 64 21 70 26" stroke="#fde68a" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8"/>
`, `
  <linearGradient id="ovenStone" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#b45309"/>
    <stop offset="50%" stop-color="#78350f"/>
    <stop offset="100%" stop-color="#451a03"/>
  </linearGradient>
  <radialGradient id="fireGrad" cx="50%" cy="80%" r="60%">
    <stop offset="0%" stop-color="#fef08a"/>
    <stop offset="40%" stop-color="#f97316"/>
    <stop offset="90%" stop-color="#dc2626"/>
    <stop offset="100%" stop-color="#1c1917"/>
  </radialGradient>
`);

// Lv.1: 유기농 밀가루 보울 (bakery_1)
icons['bakery_1'] = wrap3DIcon('bakery_1', `
  <!-- Ceramic Mixing Bowl -->
  <path d="M14 50 C14 84 86 84 86 50 Z" fill="url(#bowlGrad)" stroke="#1e293b" stroke-width="2.5"/>
  <ellipse cx="50" cy="50" rx="36" ry="12" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- Mounded Organic Flour -->
  <ellipse cx="50" cy="48" rx="30" ry="10" fill="#fefce8"/>
  <path d="M28 48 Q50 24 72 48 Z" fill="url(#flourGrad)"/>
  <!-- Wheat Stalk Decal -->
  <path d="M50 36 Q50 48 50 56" stroke="#d97706" stroke-width="2" fill="none"/>
  <ellipse cx="46" cy="40" rx="3" ry="5" transform="rotate(-30 46 40)" fill="#fbbf24"/>
  <ellipse cx="54" cy="40" rx="3" ry="5" transform="rotate(30 54 40)" fill="#fbbf24"/>
  <ellipse cx="46" cy="48" rx="3" ry="5" transform="rotate(-30 46 48)" fill="#fbbf24"/>
  <ellipse cx="54" cy="48" rx="3" ry="5" transform="rotate(30 54 48)" fill="#fbbf24"/>
  <!-- Specular Bowl Gloss -->
  <path d="M22 62 C24 76 40 80 50 80" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
`, `
  <linearGradient id="bowlGrad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#38bdf8"/>
    <stop offset="70%" stop-color="#0284c7"/>
    <stop offset="100%" stop-color="#0369a1"/>
  </linearGradient>
  <radialGradient id="flourGrad" cx="50%" cy="32%" r="50%">
    <stop offset="0%" stop-color="#ffffff"/>
    <stop offset="80%" stop-color="#fef08a"/>
    <stop offset="100%" stop-color="#fde047"/>
  </radialGradient>
`);

// Lv.2: 발효 반죽 (bakery_2)
icons['bakery_2'] = wrap3DIcon('bakery_2', `
  <!-- Wooden Board Base -->
  <ellipse cx="50" cy="80" rx="42" ry="12" fill="url(#woodBoard)" stroke="#78350f" stroke-width="2"/>
  <!-- Round Risen Dough Ball -->
  <ellipse cx="50" cy="54" rx="34" ry="26" fill="url(#doughGrad)" stroke="#d97706" stroke-width="2"/>
  <!-- Dough indentations / fermentation puff -->
  <ellipse cx="42" cy="46" rx="8" ry="4" fill="#ffffff" opacity="0.6"/>
  <ellipse cx="62" cy="52" rx="6" ry="3" fill="#ffffff" opacity="0.5"/>
  <!-- Flour Dusting Speckles -->
  <circle cx="34" cy="56" r="2" fill="#ffffff"/>
  <circle cx="48" cy="62" r="1.5" fill="#ffffff"/>
  <circle cx="64" cy="44" r="2" fill="#ffffff"/>
  <!-- Dough Surface Gloss -->
  <path d="M30 46 C34 34 50 32 60 36" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.7"/>
`, `
  <linearGradient id="woodBoard" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#b45309"/>
    <stop offset="50%" stop-color="#d97706"/>
    <stop offset="100%" stop-color="#78350f"/>
  </linearGradient>
  <radialGradient id="doughGrad" cx="42%" cy="42%" r="55%">
    <stop offset="0%" stop-color="#ffffff"/>
    <stop offset="30%" stop-color="#fef9c3"/>
    <stop offset="70%" stop-color="#fde047"/>
    <stop offset="100%" stop-color="#eab308"/>
  </radialGradient>
`);

// Lv.3: 노릇노릇 식빵 토스트 (bakery_3)
icons['bakery_3'] = wrap3DIcon('bakery_3', `
  <!-- Back Loaf Shadow/Crust -->
  <rect x="22" y="24" width="56" height="58" rx="14" fill="#92400e" stroke="#451a03" stroke-width="2.5"/>
  <!-- Top Loaf Puffs -->
  <circle cx="36" cy="24" r="14" fill="#b45309" stroke="#451a03" stroke-width="2"/>
  <circle cx="64" cy="24" r="14" fill="#b45309" stroke="#451a03" stroke-width="2"/>
  <circle cx="50" cy="22" r="16" fill="#d97706" stroke="#451a03" stroke-width="2"/>
  <!-- Sliced Bread Face -->
  <rect x="26" y="28" width="48" height="50" rx="10" fill="url(#breadCrumb)" stroke="#b45309" stroke-width="2"/>
  <!-- Golden Melting Butter Cube -->
  <rect x="42" y="44" width="16" height="12" rx="3" fill="url(#butterCube)" stroke="#ca8a04" stroke-width="1.5" transform="rotate(-8 50 50)"/>
  <!-- Melted Butter Drizzle -->
  <path d="M40 54 Q48 58 52 64 Q56 58 64 58" stroke="#facc15" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Crust Gloss -->
  <path d="M34 14 C44 10 56 10 66 14" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.6"/>
`, `
  <linearGradient id="breadCrumb" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fefce8"/>
    <stop offset="50%" stop-color="#fef08a"/>
    <stop offset="100%" stop-color="#fde047"/>
  </linearGradient>
  <linearGradient id="butterCube" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#fef08a"/>
    <stop offset="100%" stop-color="#eab308"/>
  </linearGradient>
`);

// Lv.4: 바삭 바게트 (bakery_4)
icons['bakery_4'] = wrap3DIcon('bakery_4', `
  <!-- Diagonal French Baguette -->
  <g transform="rotate(-32 50 50)">
    <rect x="14" y="36" width="72" height="28" rx="14" fill="url(#baguetteGrad)" stroke="#78350f" stroke-width="2.5"/>
    <!-- Diagonal Score Cuts with Pale Dough Center -->
    <ellipse cx="32" cy="48" rx="4" ry="9" fill="#fefce8" stroke="#92400e" stroke-width="1.5" transform="rotate(-15 32 48)"/>
    <ellipse cx="50" cy="48" rx="4" ry="9" fill="#fefce8" stroke="#92400e" stroke-width="1.5" transform="rotate(-15 50 48)"/>
    <ellipse cx="68" cy="48" rx="4" ry="9" fill="#fefce8" stroke="#92400e" stroke-width="1.5" transform="rotate(-15 68 48)"/>
    <!-- Golden Gloss Highlights -->
    <path d="M20 40 C40 37 60 37 80 40" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.65"/>
  </g>
`, `
  <linearGradient id="baguetteGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#f59e0b"/>
    <stop offset="40%" stop-color="#d97706"/>
    <stop offset="100%" stop-color="#78350f"/>
  </linearGradient>
`);

// Lv.5: 골든 버터 크루아상 (bakery_5)
icons['bakery_5'] = wrap3DIcon('bakery_5', `
  <!-- Crescent Flaky Body -->
  <!-- Center Main Crescent Swell -->
  <path d="M12 66 C10 32 32 18 50 18 C68 18 90 32 88 66 C76 74 68 62 50 64 C32 62 24 74 12 66 Z" fill="url(#croissantGrad)" stroke="#78350f" stroke-width="2.5"/>
  <!-- Swirled Flaky Layers -->
  <path d="M26 60 C28 42 38 30 50 30 C62 30 72 42 74 60" fill="none" stroke="#92400e" stroke-width="2.5"/>
  <path d="M34 56 C36 44 42 38 50 38 C58 38 64 44 66 56" fill="none" stroke="#78350f" stroke-width="2"/>
  <!-- Middle Puff Section -->
  <ellipse cx="50" cy="46" rx="16" ry="12" fill="url(#croissantPuff)" stroke="#92400e" stroke-width="1.5"/>
  <!-- Butter Glaze Gloss -->
  <path d="M34 26 C42 22 58 22 66 26" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.75"/>
  <path d="M42 42 C46 38 54 38 58 42" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7"/>
`, `
  <linearGradient id="croissantGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#f59e0b"/>
    <stop offset="60%" stop-color="#d97706"/>
    <stop offset="100%" stop-color="#78350f"/>
  </linearGradient>
  <radialGradient id="croissantPuff" cx="50%" cy="35%" r="60%">
    <stop offset="0%" stop-color="#fde047"/>
    <stop offset="70%" stop-color="#f59e0b"/>
    <stop offset="100%" stop-color="#b45309"/>
  </radialGradient>
`);

// Lv.6: 구운 소시지 핫도그 (bakery_6)
icons['bakery_6'] = wrap3DIcon('bakery_6', `
  <!-- Soft Golden Bun Bottom -->
  <path d="M12 50 C12 76 88 76 88 50 Z" fill="url(#bunGrad)" stroke="#78350f" stroke-width="2.5"/>
  <!-- Juicy Grilled Sausage -->
  <rect x="8" y="40" width="84" height="20" rx="10" fill="url(#sausageGrad)" stroke="#451a03" stroke-width="2"/>
  <!-- Mustard & Ketchup Zigzags -->
  <path d="M16 50 Q22 42 28 50 Q34 58 40 50 Q46 42 52 50 Q58 58 64 50 Q70 42 76 50 Q82 58 86 50" stroke="#facc15" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M18 52 Q24 44 30 52 Q36 60 42 52 Q48 44 54 52 Q60 60 66 52 Q72 44 78 52 Q84 60 86 52" stroke="#dc2626" stroke-width="2" stroke-linecap="round" fill="none"/>
  <!-- Bun Top Highlight -->
  <path d="M20 44 C34 40 66 40 80 44" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
`, `
  <linearGradient id="bunGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fde047"/>
    <stop offset="60%" stop-color="#f59e0b"/>
    <stop offset="100%" stop-color="#b45309"/>
  </linearGradient>
  <linearGradient id="sausageGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#f87171"/>
    <stop offset="50%" stop-color="#dc2626"/>
    <stop offset="100%" stop-color="#991b1b"/>
  </linearGradient>
`);

// Lv.7: 수플레 팬케이크 스택 (bakery_7)
icons['bakery_7'] = wrap3DIcon('bakery_7', `
  <!-- Bottom Pancake -->
  <ellipse cx="50" cy="74" rx="38" ry="14" fill="url(#pancakeGrad)" stroke="#78350f" stroke-width="2"/>
  <!-- Middle Pancake -->
  <ellipse cx="50" cy="58" rx="36" ry="13" fill="url(#pancakeGrad)" stroke="#78350f" stroke-width="2"/>
  <!-- Top Pancake -->
  <ellipse cx="50" cy="42" rx="34" ry="12" fill="url(#pancakeTop)" stroke="#78350f" stroke-width="2"/>
  <!-- Melting Butter Cube -->
  <rect x="42" y="24" width="16" height="12" rx="3" fill="#fde047" stroke="#ca8a04" stroke-width="1.5" transform="rotate(-6 50 30)"/>
  <!-- Maple Syrup Drip -->
  <path d="M44 38 C42 48 38 52 38 60 C38 64 42 66 46 64 C50 62 48 54 52 50 C56 46 62 52 64 62 C65 66 70 66 70 60 C70 50 66 44 62 38 Z" fill="url(#mapleSyrup)" opacity="0.9"/>
  <!-- Pancake Highlight -->
  <path d="M30 38 C40 34 60 34 70 38" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.7"/>
`, `
  <linearGradient id="pancakeGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fde047"/>
    <stop offset="50%" stop-color="#f59e0b"/>
    <stop offset="100%" stop-color="#b45309"/>
  </linearGradient>
  <radialGradient id="pancakeTop" cx="50%" cy="40%" r="55%">
    <stop offset="0%" stop-color="#fef08a"/>
    <stop offset="70%" stop-color="#f59e0b"/>
    <stop offset="100%" stop-color="#b45309"/>
  </radialGradient>
  <linearGradient id="mapleSyrup" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#f59e0b"/>
    <stop offset="100%" stop-color="#78350f"/>
  </linearGradient>
`);

// Lv.8: 브리오슈 수제버거 (bakery_8)
icons['bakery_8'] = wrap3DIcon('bakery_8', `
  <!-- Bottom Bun -->
  <path d="M18 72 C18 86 82 86 82 72 Z" fill="url(#bunGrad)" stroke="#78350f" stroke-width="2.5"/>
  <!-- Grilled Beef Patty -->
  <rect x="14" y="60" width="72" height="14" rx="7" fill="#451a03" stroke="#1c1917" stroke-width="2"/>
  <!-- Melted Cheddar Cheese -->
  <path d="M12 60 L24 68 L36 60 L48 70 L60 60 L72 68 L88 60 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
  <!-- Fresh Curly Green Lettuce -->
  <path d="M10 54 Q18 46 26 54 Q34 60 42 54 Q50 48 58 54 Q66 60 74 54 Q82 48 90 54 Z" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
  <!-- Red Juicy Tomato Slices -->
  <rect x="18" y="44" width="30" height="8" rx="4" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <rect x="52" y="44" width="30" height="8" rx="4" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <!-- Glossy Brioche Top Bun -->
  <path d="M14 44 C14 16 86 16 86 44 Z" fill="url(#topBunGrad)" stroke="#78350f" stroke-width="2.5"/>
  <!-- Sesame Seeds -->
  <ellipse cx="36" cy="28" rx="2" ry="3" fill="#fef08a" transform="rotate(25 36 28)"/>
  <ellipse cx="50" cy="24" rx="2" ry="3" fill="#fef08a"/>
  <ellipse cx="64" cy="28" rx="2" ry="3" fill="#fef08a" transform="rotate(-25 64 28)"/>
  <ellipse cx="44" cy="34" rx="2" ry="3" fill="#fef08a" transform="rotate(-15 44 34)"/>
  <ellipse cx="58" cy="34" rx="2" ry="3" fill="#fef08a" transform="rotate(15 58 34)"/>
  <!-- Top Bun Specular Shine -->
  <path d="M26 26 C36 18 64 18 74 26" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.65"/>
`, `
  <radialGradient id="topBunGrad" cx="50%" cy="25%" r="60%">
    <stop offset="0%" stop-color="#fef08a"/>
    <stop offset="35%" stop-color="#f59e0b"/>
    <stop offset="85%" stop-color="#d97706"/>
    <stop offset="100%" stop-color="#92400e"/>
  </radialGradient>
`);

// Lv.9: 화덕 바질 피자 (bakery_9)
icons['bakery_9'] = wrap3DIcon('bakery_9', `
  <!-- Round Wood Pizza Crust -->
  <ellipse cx="50" cy="52" rx="42" ry="34" fill="url(#pizzaCrust)" stroke="#78350f" stroke-width="2.5"/>
  <!-- Melted Mozzarella & Red Tomato Sauce Base -->
  <ellipse cx="50" cy="52" rx="35" ry="27" fill="url(#pizzaCheese)" stroke="#d97706" stroke-width="1.5"/>
  <!-- Pepperoni Slices -->
  <ellipse cx="35" cy="45" rx="7" ry="5" fill="#dc2626" stroke="#991b1b" stroke-width="1.5"/>
  <circle cx="34" cy="44" r="1.5" fill="#451a03" opacity="0.6"/>
  <ellipse cx="62" cy="46" rx="7" ry="5" fill="#dc2626" stroke="#991b1b" stroke-width="1.5"/>
  <circle cx="61" cy="45" r="1.5" fill="#451a03" opacity="0.6"/>
  <ellipse cx="48" cy="62" rx="8" ry="6" fill="#dc2626" stroke="#991b1b" stroke-width="1.5"/>
  <!-- Fresh Basil Leaves -->
  <path d="M46 44 C42 38 46 32 52 34 C56 38 52 46 46 44 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
  <path d="M60 58 C56 54 60 48 66 50 C70 54 66 60 60 58 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
  <path d="M30 58 C26 54 30 48 36 50 C40 54 36 60 30 58 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
  <!-- Crust Edge Gloss -->
  <path d="M22 40 C32 26 68 26 78 40" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
`, `
  <radialGradient id="pizzaCrust" cx="50%" cy="30%" r="65%">
    <stop offset="0%" stop-color="#fde047"/>
    <stop offset="60%" stop-color="#f59e0b"/>
    <stop offset="90%" stop-color="#b45309"/>
    <stop offset="100%" stop-color="#78350f"/>
  </radialGradient>
  <radialGradient id="pizzaCheese" cx="50%" cy="45%" r="55%">
    <stop offset="0%" stop-color="#fefce8"/>
    <stop offset="40%" stop-color="#fef08a"/>
    <stop offset="80%" stop-color="#facc15"/>
    <stop offset="100%" stop-color="#ea580c"/>
  </radialGradient>
`);

// Lv.10: 골든 베이커리 바구니 (bakery_10)
icons['bakery_10'] = wrap3DIcon('bakery_10', `
  <!-- Woven Bread Basket -->
  <!-- Breads sticking out -->
  <!-- Baguette -->
  <rect x="22" y="16" width="16" height="52" rx="8" fill="url(#baguetteGrad)" stroke="#78350f" stroke-width="2" transform="rotate(-20 30 42)"/>
  <!-- Croissant in basket -->
  <path d="M50 20 C62 20 74 30 76 46 C66 48 54 44 50 36 Z" fill="url(#croissantGrad)" stroke="#78350f" stroke-width="2"/>
  <!-- Pretzel in basket -->
  <circle cx="50" cy="30" r="10" fill="#b45309" stroke="#451a03" stroke-width="2"/>
  <circle cx="50" cy="30" r="5" fill="#fefce8"/>
  <!-- Basket Body -->
  <path d="M12 48 C14 86 86 86 88 48 Z" fill="url(#basketGrad)" stroke="#451a03" stroke-width="2.5"/>
  <!-- Wicker Weave Texture Lines -->
  <path d="M16 54 Q50 64 84 54 M18 64 Q50 74 82 64 M22 74 Q50 84 78 74" stroke="#78350f" stroke-width="2" fill="none"/>
  <!-- White Lace Napkin Rim -->
  <path d="M10 48 Q20 42 30 48 Q40 42 50 48 Q60 42 70 48 Q80 42 90 48" stroke="#ffffff" stroke-width="3" fill="#f8fafc"/>
`, `
  <linearGradient id="basketGrad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#d97706"/>
    <stop offset="50%" stop-color="#b45309"/>
    <stop offset="100%" stop-color="#78350f"/>
  </linearGradient>
`);

// Lv.11: 장인의 사워도우 깜파뉴 (bakery_11)
icons['bakery_11'] = wrap3DIcon('bakery_11', `
  <!-- Big Golden Boule Loaf -->
  <ellipse cx="50" cy="56" rx="42" ry="32" fill="url(#sourdoughGrad)" stroke="#451a03" stroke-width="3"/>
  <!-- Artisan Leaf/Wheat Scored Stencil Crust -->
  <path d="M22 56 Q50 28 78 56" stroke="#fefce8" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <path d="M34 46 Q40 38 46 44 M54 44 Q60 38 66 46 M42 58 Q50 50 58 58" stroke="#fefce8" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <!-- Golden Baker's Laurel Wreath Crown -->
  <circle cx="50" cy="22" r="10" fill="url(#goldCrown)" stroke="#b45309" stroke-width="1.5"/>
  <polygon points="50,14 53,20 60,20 55,24 57,30 50,26 43,30 45,24 40,20 47,20" fill="#facc15"/>
  <!-- Crust Highlight -->
  <path d="M24 42 C34 26 66 26 76 42" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.7"/>
`, `
  <radialGradient id="sourdoughGrad" cx="45%" cy="35%" r="65%">
    <stop offset="0%" stop-color="#fef08a"/>
    <stop offset="35%" stop-color="#f59e0b"/>
    <stop offset="75%" stop-color="#b45309"/>
    <stop offset="100%" stop-color="#451a03"/>
  </radialGradient>
  <linearGradient id="goldCrown" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#fef08a"/>
    <stop offset="100%" stop-color="#eab308"/>
  </linearGradient>
`);

// ==========================================
// 2. 바리스타 카페 (커피 - Coffee & Beverage Chain)
// ==========================================

// Spawner: 클래식 에스프레소 머신 (cafe_gen)
icons['cafe_gen'] = wrap3DIcon('cafe_gen', `
  <!-- Polished Chrome/Copper Machine Body -->
  <rect x="18" y="24" width="64" height="64" rx="8" fill="url(#chromeGrad)" stroke="#334155" stroke-width="2.5"/>
  <!-- Top Cup Warming Tray with Railing -->
  <rect x="22" y="16" width="56" height="10" rx="3" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
  <line x1="24" y1="18" x2="76" y2="18" stroke="#ffffff" stroke-width="2"/>
  <!-- Pressure Gauge (Dial) -->
  <circle cx="50" cy="38" r="9" fill="#f8fafc" stroke="#b45309" stroke-width="2"/>
  <line x1="50" y1="38" x2="55" y2="33" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
  <!-- Portafilter with Dual Spouts -->
  <rect x="36" y="52" width="28" height="12" rx="4" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
  <rect x="64" y="54" width="20" height="8" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <!-- Flowing Golden Crema Coffee Stream -->
  <line x1="44" y1="64" x2="44" y2="76" stroke="#b45309" stroke-width="3" stroke-linecap="round"/>
  <line x1="56" y1="64" x2="56" y2="76" stroke="#b45309" stroke-width="3" stroke-linecap="round"/>
  <!-- White Espresso Cup Catching Coffee -->
  <path d="M38 74 C38 86 62 86 62 74 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- Machine Specular Gloss -->
  <line x1="24" y1="26" x2="24" y2="84" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
`, `
  <linearGradient id="chromeGrad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#f1f5f9"/>
    <stop offset="40%" stop-color="#94a3b8"/>
    <stop offset="70%" stop-color="#64748b"/>
    <stop offset="100%" stop-color="#334155"/>
  </linearGradient>
`);

// Lv.1: 로스팅 커피 원두 (cafe_1)
icons['cafe_1'] = wrap3DIcon('cafe_1', `
  <!-- Cluster of 3 Shiny Roasted Coffee Beans -->
  <!-- Left Bean -->
  <ellipse cx="34" cy="58" rx="18" ry="13" fill="url(#coffeeBean1)" stroke="#1c1917" stroke-width="2" transform="rotate(-35 34 58)"/>
  <path d="M22 62 Q34 58 46 54" stroke="#1c1917" stroke-width="2.5" fill="none"/>
  <!-- Right Bean -->
  <ellipse cx="66" cy="58" rx="18" ry="13" fill="url(#coffeeBean1)" stroke="#1c1917" stroke-width="2" transform="rotate(35 66 58)"/>
  <path d="M54 54 Q66 58 78 62" stroke="#1c1917" stroke-width="2.5" fill="none"/>
  <!-- Center Top Bean -->
  <ellipse cx="50" cy="38" rx="20" ry="14" fill="url(#coffeeBeanTop)" stroke="#1c1917" stroke-width="2.5" transform="rotate(10 50 38)"/>
  <!-- Characteristic S-Curve Crease -->
  <path d="M34 40 Q46 36 54 40 Q62 44 66 38" stroke="#1c1917" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Bean Gloss Highlights -->
  <ellipse cx="45" cy="32" rx="8" ry="3" fill="#ffffff" opacity="0.6" transform="rotate(10 45 32)"/>
  <ellipse cx="30" cy="52" rx="6" ry="2.5" fill="#ffffff" opacity="0.5" transform="rotate(-35 30 52)"/>
`, `
  <radialGradient id="coffeeBeanTop" cx="40%" cy="30%" r="65%">
    <stop offset="0%" stop-color="#b45309"/>
    <stop offset="50%" stop-color="#78350f"/>
    <stop offset="100%" stop-color="#291206"/>
  </radialGradient>
  <radialGradient id="coffeeBean1" cx="45%" cy="35%" r="60%">
    <stop offset="0%" stop-color="#92400e"/>
    <stop offset="60%" stop-color="#451a03"/>
    <stop offset="100%" stop-color="#1c1917"/>
  </radialGradient>
`);

// Lv.2: 에스프레소 샷 (cafe_2)
icons['cafe_2'] = wrap3DIcon('cafe_2', `
  <!-- Ceramic Saucer -->
  <ellipse cx="50" cy="78" rx="38" ry="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <!-- Ceramic Demitasse Cup -->
  <path d="M26 44 C26 76 74 76 74 44 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="2.5"/>
  <!-- Cup Handle -->
  <path d="M72 48 C84 48 84 64 70 66" fill="none" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Top Coffee Surface with Rich Crema -->
  <ellipse cx="50" cy="44" rx="24" ry="8" fill="url(#espressoCrema)" stroke="#b45309" stroke-width="1.5"/>
  <!-- Golden Crema Swirls -->
  <circle cx="46" cy="43" r="3" fill="#fde047" opacity="0.8"/>
  <circle cx="56" cy="45" r="2" fill="#fde047" opacity="0.8"/>
  <!-- Cup Body Gloss -->
  <path d="M32 52 C34 68 46 72 50 72" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none"/>
`, `
  <radialGradient id="espressoCrema" cx="45%" cy="40%" r="55%">
    <stop offset="0%" stop-color="#fde047"/>
    <stop offset="40%" stop-color="#d97706"/>
    <stop offset="85%" stop-color="#92400e"/>
    <stop offset="100%" stop-color="#451a03"/>
  </radialGradient>
`);

// Lv.3: 아이스 아메리카노 (cafe_3)
icons['cafe_3'] = wrap3DIcon('cafe_3', `
  <!-- Clear Tall Glass -->
  <path d="M26 22 L32 84 C33 88 67 88 68 84 L74 22 Z" fill="url(#icedCoffeeGrad)" stroke="#0f172a" stroke-width="2.5"/>
  <!-- Floating Ice Cubes -->
  <rect x="36" y="32" width="14" height="12" rx="2" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.5" opacity="0.9" transform="rotate(12 43 38)"/>
  <rect x="52" y="44" width="14" height="12" rx="2" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.5" opacity="0.9" transform="rotate(-8 59 50)"/>
  <rect x="38" y="58" width="13" height="11" rx="2" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.5" opacity="0.9" transform="rotate(5 44 63)"/>
  <!-- Striped Drinking Straw -->
  <line x1="58" y1="10" x2="46" y2="76" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round"/>
  <line x1="58" y1="10" x2="46" y2="76" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="4,4" stroke-linecap="round"/>
  <!-- Condensation Water Drops & Glass Reflection -->
  <line x1="32" y1="26" x2="36" y2="80" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
`, `
  <linearGradient id="icedCoffeeGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#b45309" stop-opacity="0.8"/>
    <stop offset="50%" stop-color="#78350f" stop-opacity="0.95"/>
    <stop offset="100%" stop-color="#291206"/>
  </linearGradient>
`);

// Lv.4: 바닐라 카페라떼 (cafe_4)
icons['cafe_4'] = wrap3DIcon('cafe_4', `
  <!-- Glass Mug with Handle -->
  <path d="M28 26 L32 78 C33 84 67 84 68 78 L72 26 Z" fill="url(#latteGrad)" stroke="#475569" stroke-width="2.5"/>
  <path d="M70 34 C82 34 82 56 68 58" fill="none" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
  <!-- Latte Art Foam Surface -->
  <ellipse cx="50" cy="26" rx="22" ry="7" fill="#fefce8" stroke="#d97706" stroke-width="1.5"/>
  <!-- Heart Latte Art -->
  <path d="M50 30 C46 24 40 24 44 28 C48 32 50 34 50 34 C50 34 52 32 56 28 C60 24 54 24 50 30 Z" fill="#92400e"/>
  <!-- Glass Shine -->
  <line x1="33" y1="28" x2="36" y2="76" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>
`, `
  <linearGradient id="latteGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fefce8"/>
    <stop offset="35%" stop-color="#fde047" stop-opacity="0.9"/>
    <stop offset="70%" stop-color="#d97706"/>
    <stop offset="100%" stop-color="#78350f"/>
  </linearGradient>
`);

// Lv.5: 벨벳 카푸치노 (cafe_5)
icons['cafe_5'] = wrap3DIcon('cafe_5', `
  <!-- Saucer -->
  <ellipse cx="50" cy="78" rx="42" ry="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <!-- Ceramic Cup -->
  <path d="M20 40 C20 76 80 76 80 40 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="2.5"/>
  <path d="M78 44 C90 44 90 62 76 64" fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
  <!-- Mound of Velvety Milk Foam -->
  <ellipse cx="50" cy="40" rx="30" ry="12" fill="#ffffff"/>
  <path d="M26 40 Q50 20 74 40 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <!-- Cocoa / Cinnamon Dusting -->
  <circle cx="44" cy="32" r="1.5" fill="#78350f"/>
  <circle cx="50" cy="28" r="1.5" fill="#78350f"/>
  <circle cx="56" cy="34" r="1.5" fill="#78350f"/>
  <circle cx="48" cy="36" r="1.5" fill="#78350f"/>
  <!-- Rosette Leaf Latte Art Silhouette -->
  <path d="M50 38 Q50 26 50 24 M46 30 Q50 28 54 30 M44 34 Q50 32 56 34" stroke="#b45309" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <!-- Cup Gloss -->
  <path d="M28 52 C30 68 44 72 50 72" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none"/>
`, ``);

// Lv.6: 달콤 카라멜 마끼아또 (cafe_6)
icons['cafe_6'] = wrap3DIcon('cafe_6', `
  <!-- Tall Slender Glass -->
  <path d="M28 18 L34 82 C35 86 65 86 66 82 L72 18 Z" fill="url(#macchiatoLayers)" stroke="#334155" stroke-width="2.5"/>
  <!-- Whipped Cream Crown -->
  <path d="M28 18 C28 6 42 6 50 12 C58 6 72 6 72 18 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <!-- Caramel Drizzle Grid on Cream -->
  <path d="M34 14 Q50 20 66 14 M36 10 Q50 16 64 10" stroke="#d97706" stroke-width="2.5" fill="none"/>
  <path d="M42 6 Q44 18 46 22 M54 6 Q56 18 58 22" stroke="#d97706" stroke-width="2.5" fill="none"/>
  <!-- Glass Reflection -->
  <line x1="32" y1="22" x2="36" y2="80" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.7"/>
`, `
  <linearGradient id="macchiatoLayers" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#ffffff"/>
    <stop offset="25%" stop-color="#fef08a"/>
    <stop offset="45%" stop-color="#b45309"/>
    <stop offset="65%" stop-color="#78350f"/>
    <stop offset="85%" stop-color="#ffffff"/>
    <stop offset="100%" stop-color="#d97706"/>
  </linearGradient>
`);

// Lv.7: 바닐라 콜드브루 플로트 (cafe_7)
icons['cafe_7'] = wrap3DIcon('cafe_7', `
  <!-- Glass Cup -->
  <path d="M26 28 L30 80 C31 86 69 86 70 80 L74 28 Z" fill="url(#coldBrewGrad)" stroke="#1e293b" stroke-width="2.5"/>
  <!-- Vanilla Ice Cream Scoop Floating -->
  <circle cx="50" cy="28" r="18" fill="url(#vanillaScoop)" stroke="#fef08a" stroke-width="1.5"/>
  <!-- Maraschino Cherry on Top -->
  <circle cx="50" cy="14" r="6" fill="#dc2626" stroke="#991b1b" stroke-width="1.5"/>
  <path d="M50 12 Q58 6 62 4" stroke="#451a03" stroke-width="2" fill="none"/>
  <!-- Glass Specular Highlight -->
  <line x1="31" y1="32" x2="34" y2="78" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.75"/>
`, `
  <linearGradient id="coldBrewGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#78350f"/>
    <stop offset="60%" stop-color="#451a03"/>
    <stop offset="100%" stop-color="#1c1917"/>
  </linearGradient>
  <radialGradient id="vanillaScoop" cx="40%" cy="30%" r="60%">
    <stop offset="0%" stop-color="#ffffff"/>
    <stop offset="70%" stop-color="#fef9c3"/>
    <stop offset="100%" stop-color="#fef08a"/>
  </radialGradient>
`);

// Lv.8: 제주 유기농 말차라떼 (cafe_8)
icons['cafe_8'] = wrap3DIcon('cafe_8', `
  <!-- Glass Mug -->
  <path d="M28 26 L32 78 C33 84 67 84 68 78 L72 26 Z" fill="url(#matchaGrad)" stroke="#14532d" stroke-width="2.5"/>
  <path d="M70 34 C82 34 82 56 68 58" fill="none" stroke="#166534" stroke-width="4" stroke-linecap="round"/>
  <!-- Thick Matcha Foam Surface -->
  <ellipse cx="50" cy="26" rx="22" ry="7" fill="#86efac" stroke="#15803d" stroke-width="1.5"/>
  <!-- Whisked Matcha Leaf Powder Art -->
  <path d="M50 28 C45 22 42 24 45 27 C48 30 50 31 50 31 C50 31 52 30 55 27 C58 24 55 22 50 28 Z" fill="#14532d"/>
  <!-- Glass Shine -->
  <line x1="33" y1="28" x2="36" y2="76" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
`, `
  <linearGradient id="matchaGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#bbf7d0"/>
    <stop offset="40%" stop-color="#4ade80"/>
    <stop offset="80%" stop-color="#16a34a"/>
    <stop offset="100%" stop-color="#14532d"/>
  </linearGradient>
`);

// Lv.9: 로얄 얼그레이 티팟 (cafe_9)
icons['cafe_9'] = wrap3DIcon('cafe_9', `
  <!-- Fine Porcelain Teapot Body -->
  <ellipse cx="50" cy="56" rx="30" ry="24" fill="url(#teapotGrad)" stroke="#0284c7" stroke-width="2.5"/>
  <!-- Teapot Spout -->
  <path d="M22 52 C12 44 10 32 18 30 C22 36 24 44 26 48" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
  <!-- Teapot Handle -->
  <path d="M76 40 C90 44 90 70 74 72" fill="none" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
  <!-- Teapot Lid & Golden Finial -->
  <ellipse cx="50" cy="34" rx="16" ry="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
  <circle cx="50" cy="25" r="5" fill="#facc15" stroke="#b45309" stroke-width="1.5"/>
  <!-- Gold Filigree Floral Pattern -->
  <path d="M40 56 Q50 48 60 56 Q50 64 40 56" stroke="#eab308" stroke-width="2" fill="none"/>
  <!-- Porcelain Gloss -->
  <path d="M34 46 C42 40 58 40 66 46" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8"/>
`, `
  <radialGradient id="teapotGrad" cx="45%" cy="40%" r="60%">
    <stop offset="0%" stop-color="#ffffff"/>
    <stop offset="60%" stop-color="#e0f2fe"/>
    <stop offset="100%" stop-color="#bae6fd"/>
  </radialGradient>
`);

// Lv.10: 시그니처 구름 아인슈페너 (cafe_10)
icons['cafe_10'] = wrap3DIcon('cafe_10', `
  <!-- Tall Fluted Specialty Goblet -->
  <!-- Goblet Stem & Base -->
  <path d="M46 70 L46 84 L36 86 L64 86 L54 84 L54 70 Z" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
  <!-- Glass Bowl -->
  <path d="M24 28 C24 70 76 70 76 28 Z" fill="url(#einspannerCoffee)" stroke="#334155" stroke-width="2.5"/>
  <!-- Thick Fluffy Sweet Cream Cloud Top -->
  <path d="M20 28 C20 12 36 10 50 14 C64 10 80 12 80 28 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <!-- Gold Leaf Flakes on Cream -->
  <circle cx="46" cy="18" r="2.5" fill="#facc15"/>
  <circle cx="54" cy="16" r="2" fill="#facc15"/>
  <circle cx="50" cy="22" r="1.5" fill="#facc15"/>
  <!-- Cocoa Dusting -->
  <path d="M42 22 Q50 20 58 22" stroke="#78350f" stroke-width="2" stroke-linecap="round" fill="none"/>
  <!-- Glass Reflection -->
  <path d="M28 36 C30 54 42 62 48 64" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.75"/>
`, `
  <linearGradient id="einspannerCoffee" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#ffffff"/>
    <stop offset="25%" stop-color="#78350f"/>
    <stop offset="70%" stop-color="#451a03"/>
    <stop offset="100%" stop-color="#1c1917"/>
  </linearGradient>
`);

// ==========================================
// 3. 달콤 파티시에 제과 (제과 & 디저트 - Pastry & Cake Chain)
// ==========================================

// Spawner: 제과 오븐 & 디저트 쇼케이스 (seafood_gen)
icons['seafood_gen'] = wrap3DIcon('seafood_gen', `
  <!-- Glass Display Dome with Gold Base -->
  <ellipse cx="50" cy="82" rx="42" ry="12" fill="url(#goldCrown)" stroke="#b45309" stroke-width="2.5"/>
  <!-- Glass Cloche Dome -->
  <path d="M16 80 C16 32 30 20 50 18 C70 20 84 32 84 80 Z" fill="url(#domeGlass)" stroke="#0284c7" stroke-width="2"/>
  <!-- Gold Knob Handle -->
  <circle cx="50" cy="14" r="6" fill="#facc15" stroke="#b45309" stroke-width="2"/>
  <!-- Mini Strawberry Cake inside Dome -->
  <ellipse cx="50" cy="68" rx="20" ry="7" fill="#fb7185"/>
  <path d="M30 68 L30 56 C30 52 70 52 70 56 L70 68 Z" fill="#fff1f2" stroke="#f43f5e" stroke-width="1.5"/>
  <!-- Strawberry on cake -->
  <circle cx="50" cy="50" r="5" fill="#ef4444"/>
  <!-- Glass Curvature Reflection Highlight -->
  <path d="M24 72 C22 42 34 26 48 24" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8"/>
`, `
  <linearGradient id="domeGlass" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/>
    <stop offset="40%" stop-color="#e0f2fe" stop-opacity="0.3"/>
    <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.2"/>
  </linearGradient>
`);

// Lv.1: 무지개 마카롱 (seafood_1)
icons['seafood_1'] = wrap3DIcon('seafood_1', `
  <!-- Pink Macaron (Top) -->
  <g transform="translate(0, -6)">
    <ellipse cx="50" cy="38" rx="28" ry="10" fill="url(#macaronPink)" stroke="#e11d48" stroke-width="1.5"/>
    <ellipse cx="50" cy="42" rx="26" ry="4" fill="#ffffff" stroke="#f43f5e" stroke-width="1"/>
    <ellipse cx="50" cy="46" rx="28" ry="10" fill="url(#macaronPink)" stroke="#e11d48" stroke-width="1.5"/>
    <path d="M30 36 C36 32 58 32 66 36" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.7"/>
  </g>
  <!-- Pistachio Green Macaron (Bottom) -->
  <g transform="translate(0, 20)">
    <ellipse cx="50" cy="42" rx="30" ry="11" fill="url(#macaronGreen)" stroke="#15803d" stroke-width="1.5"/>
    <ellipse cx="50" cy="46" rx="28" ry="4" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
    <ellipse cx="50" cy="50" rx="30" ry="11" fill="url(#macaronGreen)" stroke="#15803d" stroke-width="1.5"/>
    <path d="M28 40 C34 36 60 36 68 40" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.7"/>
  </g>
`, `
  <linearGradient id="macaronPink" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fbcfe8"/>
    <stop offset="50%" stop-color="#f472b6"/>
    <stop offset="100%" stop-color="#db2777"/>
  </linearGradient>
  <linearGradient id="macaronGreen" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#bbf7d0"/>
    <stop offset="50%" stop-color="#4ade80"/>
    <stop offset="100%" stop-color="#16a34a"/>
  </linearGradient>
`);

// Lv.2: 딸기 글레이즈 도넛 (seafood_2)
icons['seafood_2'] = wrap3DIcon('seafood_2', `
  <!-- Golden Doughnut Torus Base -->
  <ellipse cx="50" cy="52" rx="40" ry="34" fill="url(#donutDough)" stroke="#78350f" stroke-width="2.5"/>
  <!-- Doughnut Hole -->
  <ellipse cx="50" cy="52" rx="14" ry="11" fill="#7fb0d8" stroke="#78350f" stroke-width="2"/>
  <!-- Glossy Strawberry Icing Glaze -->
  <path d="M12 50 C12 30 30 20 50 20 C70 20 88 30 88 50 C88 56 82 58 78 54 C74 50 72 56 68 62 C64 68 58 64 54 60 C50 56 46 62 42 66 C38 70 32 64 28 58 C24 54 18 60 12 50 Z" fill="url(#pinkGlaze)" stroke="#db2777" stroke-width="1.5"/>
  <!-- Inner Icing Ring -->
  <ellipse cx="50" cy="52" rx="14" ry="11" fill="#7fb0d8" stroke="#db2777" stroke-width="1.5"/>
  <!-- Colorful Sprinkles -->
  <rect x="30" y="32" width="6" height="2.5" rx="1.2" fill="#ffffff" transform="rotate(25 30 32)"/>
  <rect x="64" y="34" width="6" height="2.5" rx="1.2" fill="#facc15" transform="rotate(-30 64 34)"/>
  <rect x="44" y="24" width="6" height="2.5" rx="1.2" fill="#38bdf8" transform="rotate(10 44 24)"/>
  <rect x="70" y="48" width="6" height="2.5" rx="1.2" fill="#22c55e" transform="rotate(45 70 48)"/>
  <rect x="24" y="48" width="6" height="2.5" rx="1.2" fill="#fde047" transform="rotate(-20 24 48)"/>
  <!-- Glaze Gloss -->
  <path d="M26 30 C34 24 60 24 72 30" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.8"/>
`, `
  <radialGradient id="donutDough" cx="50%" cy="30%" r="65%">
    <stop offset="0%" stop-color="#fde047"/>
    <stop offset="60%" stop-color="#f59e0b"/>
    <stop offset="100%" stop-color="#b45309"/>
  </radialGradient>
  <radialGradient id="pinkGlaze" cx="50%" cy="25%" r="60%">
    <stop offset="0%" stop-color="#fbcfe8"/>
    <stop offset="40%" stop-color="#f472b6"/>
    <stop offset="90%" stop-color="#ec4899"/>
    <stop offset="100%" stop-color="#be185d"/>
  </radialGradient>
`);

// Lv.3: 초콜릿 에클레어 (seafood_3)
icons['seafood_3'] = wrap3DIcon('seafood_3', `
  <!-- Choux Pastry Base -->
  <g transform="rotate(-25 50 50)">
    <rect x="12" y="36" width="76" height="28" rx="14" fill="url(#doughGrad)" stroke="#78350f" stroke-width="2.5"/>
    <!-- Cream Filling Peeking out -->
    <rect x="14" y="44" width="72" height="12" rx="6" fill="#fefce8" stroke="#ca8a04" stroke-width="1"/>
    <!-- Rich Dark Chocolate Glaze Top -->
    <rect x="12" y="34" width="76" height="16" rx="8" fill="url(#chocGlaze)" stroke="#1c1917" stroke-width="1.5"/>
    <!-- Gold Leaf Flakes & White Drizzle -->
    <path d="M18 40 Q26 36 34 40 Q42 44 50 40 Q58 36 66 40 Q74 44 82 40" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.8"/>
    <circle cx="36" cy="38" r="2" fill="#facc15"/>
    <circle cx="62" cy="38" r="2" fill="#facc15"/>
  </g>
`, `
  <linearGradient id="chocGlaze" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#78350f"/>
    <stop offset="50%" stop-color="#451a03"/>
    <stop offset="100%" stop-color="#1c1917"/>
  </linearGradient>
`);

// Lv.4: 딸기 생크림 컵케이크 (seafood_4)
icons['seafood_4'] = wrap3DIcon('seafood_4', `
  <!-- Pastel Cupcake Liner -->
  <path d="M24 54 L30 84 C32 88 68 88 70 84 L76 54 Z" fill="url(#cupcakeLiner)" stroke="#db2777" stroke-width="2"/>
  <!-- Fluted Liner Folds -->
  <line x1="36" y1="54" x2="40" y2="85" stroke="#f472b6" stroke-width="2"/>
  <line x1="50" y1="54" x2="50" y2="86" stroke="#f472b6" stroke-width="2"/>
  <line x1="64" y1="54" x2="60" y2="85" stroke="#f472b6" stroke-width="2"/>
  <!-- Giant Swirled Pastel Cream Frosting -->
  <ellipse cx="50" cy="52" rx="34" ry="14" fill="#ffffff" stroke="#fbcfe8" stroke-width="2"/>
  <ellipse cx="50" cy="40" rx="26" ry="12" fill="#fff1f2" stroke="#fda4af" stroke-width="2"/>
  <circle cx="50" cy="28" r="16" fill="url(#frostingSwirl)" stroke="#fb7185" stroke-width="2"/>
  <!-- Glossy Red Strawberry on Top -->
  <path d="M50 12 C44 12 40 18 44 26 C48 32 50 34 50 34 C50 34 52 32 56 26 C60 18 56 12 50 12 Z" fill="url(#strawberryGrad)" stroke="#991b1b" stroke-width="1.5"/>
  <circle cx="47" cy="20" r="0.8" fill="#fde047"/>
  <circle cx="52" cy="22" r="0.8" fill="#fde047"/>
  <!-- Frosting Gloss -->
  <path d="M36 34 C42 26 56 26 62 34" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8"/>
`, `
  <linearGradient id="cupcakeLiner" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fce7f3"/>
    <stop offset="100%" stop-color="#f472b6"/>
  </linearGradient>
  <radialGradient id="frostingSwirl" cx="45%" cy="30%" r="60%">
    <stop offset="0%" stop-color="#ffffff"/>
    <stop offset="60%" stop-color="#ffe4e6"/>
    <stop offset="100%" stop-color="#fda4af"/>
  </radialGradient>
  <radialGradient id="strawberryGrad" cx="40%" cy="30%" r="60%">
    <stop offset="0%" stop-color="#f87171"/>
    <stop offset="60%" stop-color="#dc2626"/>
    <stop offset="100%" stop-color="#991b1b"/>
  </radialGradient>
`);

// Lv.5: 클래식 티라미수 (seafood_5)
icons['seafood_5'] = wrap3DIcon('seafood_5', `
  <!-- Layered Tiramisu Slice -->
  <!-- Bottom Coffee Sponge -->
  <path d="M14 68 L86 68 L80 82 L20 82 Z" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
  <!-- Mascarpone Cream Layer 1 -->
  <path d="M16 56 L84 56 L86 68 L14 68 Z" fill="#fefce8" stroke="#ca8a04" stroke-width="1"/>
  <!-- Coffee Sponge Layer 2 -->
  <path d="M18 46 L82 46 L84 56 L16 56 Z" fill="#78350f" stroke="#451a03" stroke-width="1"/>
  <!-- Top Mascarpone Cream Swirls -->
  <path d="M20 36 L80 36 L82 46 L18 46 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
  <!-- Piped Cream Puffs on Top -->
  <circle cx="28" cy="32" r="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <circle cx="42" cy="30" r="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <circle cx="58" cy="30" r="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <circle cx="72" cy="32" r="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <!-- Fine Dark Cocoa Powder Dusting -->
  <ellipse cx="50" cy="30" rx="28" ry="4" fill="#451a03" opacity="0.6"/>
  <!-- Mint Garnish & Chocolate Curl -->
  <path d="M46 22 C42 16 46 12 50 14 C54 16 50 22 46 22 Z" fill="#22c55e"/>
`, ``);

// Lv.6: 클래식 딸기 쇼트케이크 (seafood_6)
icons['seafood_6'] = wrap3DIcon('seafood_6', `
  <!-- Triangular Cake Wedge Shape -->
  <path d="M16 76 L84 76 L84 46 L16 46 Z" fill="url(#spongeGrad)" stroke="#78350f" stroke-width="2"/>
  <!-- Cream Layers in Sponge -->
  <rect x="16" y="58" width="68" height="6" fill="#ffffff"/>
  <!-- Fresh Strawberry Slices in Cream -->
  <circle cx="36" cy="61" r="4" fill="#ef4444"/>
  <circle cx="62" cy="61" r="4" fill="#ef4444"/>
  <!-- Thick Whipped Cream Topping -->
  <rect x="14" y="40" width="72" height="10" rx="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <!-- Piped Whipped Cream Rosettes -->
  <circle cx="34" cy="34" r="8" fill="#ffffff" stroke="#f1f5f9" stroke-width="1.5"/>
  <circle cx="66" cy="34" r="8" fill="#ffffff" stroke="#f1f5f9" stroke-width="1.5"/>
  <!-- Whole Ripe Strawberry Center -->
  <path d="M50 16 C42 16 38 24 44 34 C48 40 50 42 50 42 C50 42 52 40 56 34 C62 24 58 16 50 16 Z" fill="url(#strawberryGrad)" stroke="#991b1b" stroke-width="2"/>
  <!-- Strawberry Seeds -->
  <circle cx="47" cy="26" r="1" fill="#fde047"/>
  <circle cx="53" cy="28" r="1" fill="#fde047"/>
  <circle cx="49" cy="34" r="1" fill="#fde047"/>
  <!-- Strawberry Gloss -->
  <path d="M44 22 C46 18 52 18 54 22" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none"/>
`, `
  <linearGradient id="spongeGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fef9c3"/>
    <stop offset="100%" stop-color="#fde047"/>
  </linearGradient>
`);

// Lv.7: 프랑스 몽블랑 밤케이크 (seafood_7)
icons['seafood_7'] = wrap3DIcon('seafood_7', `
  <!-- Tart Shell Base -->
  <path d="M22 68 L26 82 C28 86 72 86 74 82 L78 68 Z" fill="url(#pizzaCrust)" stroke="#78350f" stroke-width="2"/>
  <!-- Domed Swirled Chestnut Puree Noodles -->
  <path d="M22 68 C22 36 34 26 50 26 C66 26 78 36 78 68 Z" fill="url(#chestnutGrad)" stroke="#78350f" stroke-width="2"/>
  <!-- Swirled Spaghetti Spaghetti Lines of Chestnut Cream -->
  <path d="M28 66 Q50 56 72 66 M26 56 Q50 46 74 56 M30 46 Q50 36 70 46 M36 38 Q50 32 64 38" stroke="#92400e" stroke-width="2" fill="none"/>
  <!-- Glazed Candied Chestnut (Marronglace) on Peak -->
  <circle cx="50" cy="24" r="9" fill="#451a03" stroke="#291206" stroke-width="1.5"/>
  <ellipse cx="48" cy="21" rx="4" ry="2" fill="#f59e0b" opacity="0.8"/>
  <!-- Powdered Sugar Snow -->
  <path d="M40 28 Q50 24 60 28" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.9"/>
`, `
  <radialGradient id="chestnutGrad" cx="50%" cy="35%" r="60%">
    <stop offset="0%" stop-color="#d97706"/>
    <stop offset="70%" stop-color="#b45309"/>
    <stop offset="100%" stop-color="#78350f"/>
  </radialGradient>
`);

// Lv.8: 3단 로열 파티 케이크 (seafood_8)
icons['seafood_8'] = wrap3DIcon('seafood_8', `
  <!-- Tier 1: Bottom Wide Cake -->
  <rect x="14" y="62" width="72" height="24" rx="6" fill="#fff1f2" stroke="#f43f5e" stroke-width="2"/>
  <line x1="14" y1="74" x2="86" y2="74" stroke="#fda4af" stroke-width="3"/>
  <!-- Tier 2: Middle Cake -->
  <rect x="24" y="42" width="52" height="22" rx="5" fill="#fdf2f8" stroke="#ec4899" stroke-width="2"/>
  <line x1="24" y1="52" x2="76" y2="52" stroke="#f472b6" stroke-width="3"/>
  <!-- Tier 3: Top Cake -->
  <rect x="34" y="24" width="32" height="20" rx="4" fill="#ffffff" stroke="#db2777" stroke-width="2"/>
  <!-- Royal Crown / Candle on Top -->
  <path d="M42 24 L46 12 L50 18 L54 12 L58 24 Z" fill="url(#goldCrown)" stroke="#ca8a04" stroke-width="1.5"/>
  <circle cx="50" cy="8" r="3" fill="#facc15"/>
  <!-- Cream Pearls along Tiers -->
  <circle cx="28" cy="42" r="2.5" fill="#ffffff"/>
  <circle cx="50" cy="42" r="2.5" fill="#ffffff"/>
  <circle cx="72" cy="42" r="2.5" fill="#ffffff"/>
  <circle cx="18" cy="62" r="2.5" fill="#ffffff"/>
  <circle cx="50" cy="62" r="2.5" fill="#ffffff"/>
  <circle cx="82" cy="62" r="2.5" fill="#ffffff"/>
`, ``);

// Lv.9: 명품 골든 샤인머스캣 타르트 (seafood_9)
icons['seafood_9'] = wrap3DIcon('seafood_9', `
  <!-- Fluted Golden Tart Shell -->
  <path d="M12 60 L18 80 C20 86 80 86 82 80 L88 60 Z" fill="url(#pizzaCrust)" stroke="#78350f" stroke-width="2.5"/>
  <!-- Vanilla Custard Cream Base -->
  <ellipse cx="50" cy="58" rx="36" ry="14" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
  <!-- Glistening Green Shine Muscat Grapes -->
  <circle cx="34" cy="52" r="9" fill="url(#muscatGrad)" stroke="#15803d" stroke-width="1.5"/>
  <circle cx="66" cy="52" r="9" fill="url(#muscatGrad)" stroke="#15803d" stroke-width="1.5"/>
  <circle cx="50" cy="46" r="10" fill="url(#muscatGrad)" stroke="#15803d" stroke-width="1.5"/>
  <circle cx="42" cy="60" r="9" fill="url(#muscatGrad)" stroke="#15803d" stroke-width="1.5"/>
  <circle cx="58" cy="60" r="9" fill="url(#muscatGrad)" stroke="#15803d" stroke-width="1.5"/>
  <!-- Grape Specular Highlights -->
  <ellipse cx="48" cy="42" rx="4" ry="2" fill="#ffffff" opacity="0.8"/>
  <ellipse cx="32" cy="48" rx="3" ry="1.5" fill="#ffffff" opacity="0.8"/>
  <ellipse cx="64" cy="48" rx="3" ry="1.5" fill="#ffffff" opacity="0.8"/>
  <!-- Gold Leaf Flakes -->
  <circle cx="50" cy="38" r="2.5" fill="#facc15" stroke="#ca8a04" stroke-width="1"/>
`, `
  <radialGradient id="muscatGrad" cx="35%" cy="30%" r="65%">
    <stop offset="0%" stop-color="#d9f99d"/>
    <stop offset="40%" stop-color="#84cc16"/>
    <stop offset="85%" stop-color="#4d7c0f"/>
    <stop offset="100%" stop-color="#365314"/>
  </radialGradient>
`);

// Lv.10: 그랜드 파티시에 디저트 타워 (seafood_10)
icons['seafood_10'] = wrap3DIcon('seafood_10', `
  <!-- Grand 3-Tier Crystal Buffet Stand -->
  <!-- Central Silver Pedestal -->
  <line x1="50" y1="14" x2="50" y2="86" stroke="#94a3b8" stroke-width="4"/>
  <ellipse cx="50" cy="86" rx="28" ry="6" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
  <!-- Tier 1: Bottom Tray filled with Macarons & Tarts -->
  <ellipse cx="50" cy="74" rx="44" ry="12" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
  <circle cx="26" cy="72" r="6" fill="#f472b6"/>
  <circle cx="40" cy="74" r="6" fill="#4ade80"/>
  <circle cx="60" cy="74" r="6" fill="#facc15"/>
  <circle cx="74" cy="72" r="6" fill="#a78bfa"/>
  <!-- Tier 2: Middle Tray filled with Cakes & Cupcakes -->
  <ellipse cx="50" cy="50" rx="34" ry="10" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
  <rect x="30" y="42" width="12" height="10" rx="2" fill="#ef4444"/>
  <circle cx="50" cy="46" r="7" fill="#fb7185"/>
  <rect x="58" y="42" width="12" height="10" rx="2" fill="#d97706"/>
  <!-- Tier 3: Top Tray with Royal Petit Fours & Golden Star -->
  <ellipse cx="50" cy="26" rx="22" ry="7" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
  <circle cx="44" cy="24" r="5" fill="#f43f5e"/>
  <circle cx="56" cy="24" r="5" fill="#eab308"/>
  <!-- Crown Top Finial -->
  <polygon points="50,6 53,12 60,12 55,16 57,22 50,18 43,22 45,16 40,12 47,12" fill="#facc15" stroke="#b45309" stroke-width="1"/>
`, ``);

// ==========================================
// 4. 비스트로 과일 & 텃밭 (과일 - Fresh Fruit Chain)
// ==========================================

// Spawner: 과일 바구니 (garden_gen)
icons['garden_gen'] = wrap3DIcon('garden_gen', `
  <!-- Woven Harvest Basket overflowing with fresh berries -->
  <path d="M12 48 C14 86 86 86 88 48 Z" fill="url(#basketGrad)" stroke="#451a03" stroke-width="2.5"/>
  <!-- Basket Handle -->
  <path d="M16 50 C16 12 84 12 84 50" fill="none" stroke="#78350f" stroke-width="4.5" stroke-linecap="round"/>
  <!-- Bountiful Fruits Overflowing -->
  <circle cx="34" cy="42" r="12" fill="url(#strawberryGrad)" stroke="#991b1b" stroke-width="1.5"/>
  <circle cx="66" cy="42" r="12" fill="url(#lemonGrad)" stroke="#ca8a04" stroke-width="1.5"/>
  <circle cx="50" cy="36" r="14" fill="url(#appleGrad)" stroke="#991b1b" stroke-width="2"/>
  <!-- Fresh Green Leaves -->
  <path d="M50 22 C44 14 50 8 58 12 C64 16 58 24 50 22 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
  <!-- Basket Texture -->
  <path d="M16 58 Q50 68 84 58 M20 68 Q50 78 80 68" stroke="#78350f" stroke-width="2" fill="none"/>
`, `
  <radialGradient id="appleGrad" cx="35%" cy="30%" r="65%">
    <stop offset="0%" stop-color="#f87171"/>
    <stop offset="60%" stop-color="#dc2626"/>
    <stop offset="100%" stop-color="#7f1d1d"/>
  </radialGradient>
  <radialGradient id="lemonGrad" cx="35%" cy="30%" r="65%">
    <stop offset="0%" stop-color="#fef9c3"/>
    <stop offset="50%" stop-color="#facc15"/>
    <stop offset="100%" stop-color="#ca8a04"/>
  </radialGradient>
`);

// Lv.1: 파릇파릇 새싹 (garden_1)
icons['garden_1'] = wrap3DIcon('garden_1', `
  <!-- Little Terracotta Pot -->
  <path d="M28 58 L34 84 C36 88 64 88 66 84 L72 58 Z" fill="#ea580c" stroke="#9a3412" stroke-width="2.5"/>
  <rect x="24" y="52" width="52" height="10" rx="3" fill="#f97316" stroke="#9a3412" stroke-width="2"/>
  <ellipse cx="50" cy="54" rx="22" ry="4" fill="#451a03"/>
  <!-- Sprouting Twin Leaves -->
  <path d="M50 54 Q50 36 50 32" stroke="#16a34a" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <path d="M50 34 C36 30 32 16 46 18 C52 24 50 32 50 34 Z" fill="url(#leafGrad)" stroke="#15803d" stroke-width="2"/>
  <path d="M50 34 C64 30 68 16 54 18 C48 24 50 32 50 34 Z" fill="url(#leafGrad)" stroke="#15803d" stroke-width="2"/>
  <!-- Morning Dewdrop on Leaf -->
  <circle cx="42" cy="22" r="2.5" fill="#ffffff" opacity="0.9"/>
`, `
  <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#86efac"/>
    <stop offset="50%" stop-color="#22c55e"/>
    <stop offset="100%" stop-color="#15803d"/>
  </linearGradient>
`);

// Lv.2: 스위트 바질 잎 (garden_2)
icons['garden_2'] = wrap3DIcon('garden_2', `
  <!-- Aromatic Herb Basil Sprig -->
  <path d="M50 82 Q50 52 50 34" stroke="#15803d" stroke-width="3" fill="none"/>
  <!-- Big Center Basil Leaf -->
  <path d="M50 60 C26 50 24 24 50 20 C76 24 74 50 50 60 Z" fill="url(#leafGrad)" stroke="#14532d" stroke-width="2.5"/>
  <!-- Veins -->
  <path d="M50 60 L50 24 M50 50 Q38 44 34 38 M50 50 Q62 44 66 38" stroke="#86efac" stroke-width="1.5" fill="none"/>
  <!-- Leaf Specular Shine -->
  <path d="M38 34 C42 26 58 26 62 34" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
`, ``);

// Lv.3: 허브 꽃 화분 (garden_3)
icons['garden_3'] = wrap3DIcon('garden_3', `
  <!-- Pot -->
  <path d="M26 54 L32 84 C34 88 66 88 68 84 L74 54 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5"/>
  <rect x="22" y="48" width="56" height="10" rx="3" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
  <!-- Blooming Pink Blossoms -->
  <circle cx="50" cy="30" r="14" fill="#f43f5e" stroke="#be123c" stroke-width="2"/>
  <circle cx="34" cy="38" r="11" fill="#fb7185" stroke="#be123c" stroke-width="1.5"/>
  <circle cx="66" cy="38" r="11" fill="#fb7185" stroke="#be123c" stroke-width="1.5"/>
  <!-- Flower Centers -->
  <circle cx="50" cy="30" r="4.5" fill="#facc15"/>
  <circle cx="34" cy="38" r="3.5" fill="#facc15"/>
  <circle cx="66" cy="38" r="3.5" fill="#facc15"/>
`, ``);

// Lv.4: 싱그러운 블루베리 클러스터 (garden_4)
icons['garden_4'] = wrap3DIcon('garden_4', `
  <!-- 3 Plump Dark Blueberries -->
  <circle cx="36" cy="56" r="16" fill="url(#blueberryGrad)" stroke="#1e1b4b" stroke-width="2"/>
  <circle cx="64" cy="56" r="16" fill="url(#blueberryGrad)" stroke="#1e1b4b" stroke-width="2"/>
  <circle cx="50" cy="40" r="18" fill="url(#blueberryGrad)" stroke="#1e1b4b" stroke-width="2.5"/>
  <!-- Star Calyx on Berry Crowns -->
  <polygon points="50,34 52,38 56,38 53,41 54,45 50,43 46,45 47,41 44,38 48,38" fill="#1e1b4b"/>
  <!-- Specular Shines -->
  <circle cx="44" cy="34" r="3.5" fill="#93c5fd" opacity="0.8"/>
  <circle cx="30" cy="50" r="3" fill="#93c5fd" opacity="0.8"/>
  <circle cx="58" cy="50" r="3" fill="#93c5fd" opacity="0.8"/>
  <!-- Green Leaves on Top -->
  <path d="M50 24 C40 14 46 8 54 10 C62 14 56 22 50 24 Z" fill="#22c55e"/>
`, `
  <radialGradient id="blueberryGrad" cx="35%" cy="30%" r="65%">
    <stop offset="0%" stop-color="#818cf8"/>
    <stop offset="50%" stop-color="#4338ca"/>
    <stop offset="100%" stop-color="#1e1b4b"/>
  </radialGradient>
`);

// Lv.5: 썬키스트 레몬 (garden_5)
icons['garden_5'] = wrap3DIcon('garden_5', `
  <!-- Bright Yellow Oval Lemon with Pointed Ends -->
  <g transform="rotate(-25 50 50)">
    <path d="M16 50 C22 30 78 30 84 50 C78 70 22 70 16 50 Z" fill="url(#lemonGrad)" stroke="#ca8a04" stroke-width="2.5"/>
    <circle cx="16" cy="50" r="2.5" fill="#ca8a04"/>
    <circle cx="84" cy="50" r="2.5" fill="#ca8a04"/>
    <!-- Specular Reflection -->
    <path d="M30 38 C42 32 60 32 70 38" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.75"/>
  </g>
  <!-- Green Lemon Leaf -->
  <path d="M60 28 C74 18 84 20 84 32 C74 38 66 32 60 28 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
`, ``);

// Lv.6: 달콤 꿀사과 (garden_6)
icons['garden_6'] = wrap3DIcon('garden_6', `
  <!-- Ripe Red Apple -->
  <path d="M50 28 C42 18 20 20 18 46 C16 72 36 84 50 82 C64 84 84 72 82 46 C80 20 58 18 50 28 Z" fill="url(#appleGrad)" stroke="#7f1d1d" stroke-width="2.5"/>
  <!-- Apple Stem & Leaf -->
  <path d="M50 26 Q52 14 56 10" stroke="#451a03" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M54 18 C64 12 70 14 68 22 C60 24 56 20 54 18 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
  <!-- Big Juicy Curved Specular Highlight -->
  <path d="M28 36 C32 26 44 24 50 28" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8"/>
`, ``);

// Lv.7: 루비 레드 체리 (garden_7)
icons['garden_7'] = wrap3DIcon('garden_7', `
  <!-- Twin Cherries with Joined Stem -->
  <!-- Left Cherry -->
  <circle cx="34" cy="62" r="18" fill="url(#appleGrad)" stroke="#7f1d1d" stroke-width="2.5"/>
  <ellipse cx="28" cy="54" rx="5" ry="3" fill="#ffffff" opacity="0.8" transform="rotate(-20 28 54)"/>
  <!-- Right Cherry -->
  <circle cx="66" cy="62" r="18" fill="url(#appleGrad)" stroke="#7f1d1d" stroke-width="2.5"/>
  <ellipse cx="60" cy="54" rx="5" ry="3" fill="#ffffff" opacity="0.8" transform="rotate(-20 60 54)"/>
  <!-- Joined Curved Stems -->
  <path d="M34 46 Q40 24 50 16" stroke="#15803d" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M66 46 Q60 24 50 16" stroke="#15803d" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Green Leaf at Join -->
  <path d="M50 16 C60 10 68 12 66 20 C58 22 52 18 50 16 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
`, ``);

// Lv.8: 수제 딸기잼 병 (garden_8)
icons['garden_8'] = wrap3DIcon('garden_8', `
  <!-- Hexagonal Glass Jam Jar -->
  <rect x="22" y="32" width="56" height="52" rx="10" fill="url(#jamGrad)" stroke="#1e293b" stroke-width="2.5"/>
  <!-- Gingham Fabric Cloth Lid with Tied Bow -->
  <ellipse cx="50" cy="30" rx="30" ry="10" fill="#f43f5e" stroke="#be123c" stroke-width="2"/>
  <path d="M20 30 Q35 38 50 30 Q65 38 80 30" stroke="#ffffff" stroke-width="2" fill="none"/>
  <rect x="24" y="32" width="52" height="4" fill="#e11d48"/>
  <!-- Hanging Tied Twine Bow -->
  <circle cx="50" cy="36" r="3" fill="#fde047"/>
  <!-- White Vintage Label with Strawberry -->
  <rect x="30" y="46" width="40" height="26" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <circle cx="50" cy="58" r="6" fill="#ef4444"/>
  <circle cx="50" cy="52" r="2" fill="#22c55e"/>
  <!-- Glass Reflection -->
  <line x1="28" y1="36" x2="28" y2="78" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>
`, `
  <linearGradient id="jamGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#f43f5e"/>
    <stop offset="60%" stop-color="#e11d48"/>
    <stop offset="100%" stop-color="#881337"/>
  </linearGradient>
`);

// Lv.9: 미라클 골든 과수 (garden_9)
icons['garden_9'] = wrap3DIcon('garden_9', `
  <!-- Majestic Golden Bonsai/Orchard Tree -->
  <!-- Swirled Trunk -->
  <path d="M46 84 C44 64 36 54 44 44 L56 44 C64 54 56 64 54 84 Z" fill="#78350f" stroke="#451a03" stroke-width="2.5"/>
  <!-- Golden Glowing Foliage Cloud -->
  <circle cx="36" cy="34" r="18" fill="url(#goldCrown)" stroke="#ca8a04" stroke-width="2"/>
  <circle cx="64" cy="34" r="18" fill="url(#goldCrown)" stroke="#ca8a04" stroke-width="2"/>
  <circle cx="50" cy="24" r="20" fill="url(#goldCrown)" stroke="#ca8a04" stroke-width="2.5"/>
  <!-- Sparkling Red Ruby Fruits on Branches -->
  <circle cx="38" cy="32" r="4" fill="#ef4444"/>
  <circle cx="62" cy="32" r="4" fill="#ef4444"/>
  <circle cx="50" cy="20" r="5" fill="#ef4444"/>
  <circle cx="50" cy="34" r="4" fill="#ef4444"/>
  <!-- Golden Sparkles -->
  <polygon points="50,4 51,7 54,7 52,9 53,12 50,10 47,12 48,9 46,7 49,7" fill="#ffffff"/>
  <polygon points="26,18 27,21 30,21 28,23 29,26 26,24 23,26 24,23 22,21 25,21" fill="#ffffff"/>
`, ``);

// ==========================================
// 5. 마스터 셰프 키친 도구 (도구 - Kitchen Utensils Chain)
// ==========================================

// Spawner: 앤틱 셰프 작업대 (ruins_gen)
icons['ruins_gen'] = wrap3DIcon('ruins_gen', `
  <!-- Chef Kitchen Counter with Marble Top -->
  <!-- Counter Base with Cabinet Doors -->
  <rect x="14" y="44" width="72" height="44" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="2.5"/>
  <rect x="20" y="52" width="26" height="30" rx="3" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
  <rect x="54" y="52" width="26" height="30" rx="3" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
  <circle cx="42" cy="66" r="2.5" fill="#facc15"/>
  <circle cx="58" cy="66" r="2.5" fill="#facc15"/>
  <!-- Carrara Marble Countertop Slab -->
  <rect x="10" y="36" width="80" height="12" rx="4" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
  <!-- Tools Resting on Bench: Whisk & Rolling Pin -->
  <line x1="28" y1="36" x2="48" y2="24" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
  <circle cx="64" cy="28" r="8" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>
  <!-- Countertop Gloss -->
  <line x1="14" y1="38" x2="86" y2="38" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
`, ``);

// Lv.1: 우드 롤링핀 (ruins_1)
icons['ruins_1'] = wrap3DIcon('ruins_1', `
  <!-- Diagonal French Baker's Wooden Rolling Pin -->
  <g transform="rotate(-35 50 50)">
    <!-- Handles on Both Sides -->
    <rect x="6" y="46" width="16" height="8" rx="3" fill="#78350f" stroke="#451a03" stroke-width="2"/>
    <rect x="78" y="46" width="16" height="8" rx="3" fill="#78350f" stroke="#451a03" stroke-width="2"/>
    <!-- Main Rolling Cylinder Body -->
    <rect x="20" y="38" width="60" height="24" rx="6" fill="url(#woodBoard)" stroke="#451a03" stroke-width="2.5"/>
    <!-- Woodgrain Lines -->
    <line x1="26" y1="44" x2="74" y2="44" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="24" y1="56" x2="76" y2="56" stroke="#92400e" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Cylinder Specular Highlight -->
    <line x1="22" y1="42" x2="78" y2="42" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.75"/>
  </g>
`, ``);

// Lv.2: 스테인리스 거품기 (ruins_2)
icons['ruins_2'] = wrap3DIcon('ruins_2', `
  <!-- Stainless Steel French Whisk -->
  <g transform="rotate(35 50 50)">
    <!-- Ergonomic Rubber/Steel Handle -->
    <rect x="44" y="56" width="12" height="34" rx="5" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
    <circle cx="50" cy="84" r="3" fill="#e2e8f0"/>
    <!-- Wire Loops Ball -->
    <ellipse cx="50" cy="34" rx="18" ry="24" fill="none" stroke="#94a3b8" stroke-width="2.5"/>
    <ellipse cx="50" cy="34" rx="12" ry="24" fill="none" stroke="#cbd5e1" stroke-width="2.5"/>
    <ellipse cx="50" cy="34" rx="6" ry="24" fill="none" stroke="#e2e8f0" stroke-width="2"/>
    <line x1="50" y1="10" x2="50" y2="56" stroke="#ffffff" stroke-width="2"/>
    <!-- Metal Specular Shine -->
    <circle cx="44" cy="26" r="3" fill="#ffffff" opacity="0.9"/>
  </g>
`, ``);

// Lv.3: 황동 앤틱 커피밀 (ruins_3)
icons['ruins_3'] = wrap3DIcon('ruins_3', `
  <!-- Vintage Brass Hand Coffee Grinder -->
  <!-- Wooden Box Base -->
  <rect x="22" y="44" width="56" height="42" rx="6" fill="url(#woodBoard)" stroke="#451a03" stroke-width="2.5"/>
  <!-- Little Ground Coffee Drawer -->
  <rect x="30" y="60" width="40" height="20" rx="3" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
  <circle cx="50" cy="70" r="3" fill="#facc15" stroke="#b45309" stroke-width="1"/>
  <!-- Polished Brass Hopper Bowl -->
  <ellipse cx="50" cy="44" rx="22" ry="8" fill="url(#goldCrown)" stroke="#b45309" stroke-width="2"/>
  <!-- Grinder Crank & Wooden Knob -->
  <line x1="50" y1="44" x2="50" y2="22" stroke="#b45309" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M50 22 C64 16 74 20 76 28" fill="none" stroke="#ca8a04" stroke-width="3" stroke-linecap="round"/>
  <circle cx="76" cy="28" r="4.5" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
`, ``);

// Lv.4: 파티시에 계량 스푼 (ruins_4)
icons['ruins_4'] = wrap3DIcon('ruins_4', `
  <!-- Fan of 4 Nested Measuring Spoons on Ring -->
  <circle cx="28" cy="72" r="6" fill="none" stroke="#64748b" stroke-width="3"/>
  <!-- Big Spoon -->
  <g transform="rotate(-30 28 72)">
    <rect x="28" y="24" width="6" height="48" rx="2" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
    <ellipse cx="31" cy="20" rx="14" ry="10" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
  </g>
  <!-- Medium Spoon -->
  <g transform="rotate(0 28 72)">
    <rect x="28" y="30" width="5" height="42" rx="2" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
    <ellipse cx="30" cy="26" rx="11" ry="8" fill="#f8fafc" stroke="#475569" stroke-width="2"/>
  </g>
  <!-- Small Spoon -->
  <g transform="rotate(30 28 72)">
    <rect x="28" y="36" width="4" height="36" rx="2" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
    <ellipse cx="30" cy="32" rx="8" ry="6" fill="#ffffff" stroke="#475569" stroke-width="2"/>
  </g>
  <!-- Stainless Steel Gleam -->
  <line x1="32" y1="16" x2="42" y2="22" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
`, ``);

// Lv.5: 셰프 구리 소스팬 (ruins_5)
icons['ruins_5'] = wrap3DIcon('ruins_5', `
  <!-- Heavy French Copper Saucepan with Cast Iron Handle -->
  <!-- Pan Body -->
  <path d="M14 46 L20 78 C22 84 66 84 68 78 L74 46 Z" fill="url(#copperGrad)" stroke="#78350f" stroke-width="2.5"/>
  <!-- Rim -->
  <ellipse cx="44" cy="46" rx="30" ry="8" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/>
  <ellipse cx="44" cy="46" rx="26" ry="6" fill="#9a3412"/>
  <!-- Heavy Black Iron Handle with Hanging Hole -->
  <path d="M68 48 L92 34 C95 32 98 34 96 38 L72 56 Z" fill="#0f172a" stroke="#334155" stroke-width="2"/>
  <circle cx="93" cy="36" r="2.5" fill="#ffffff"/>
  <!-- Copper High Specular Gloss -->
  <path d="M22 52 C24 72 38 78 46 78" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.75"/>
`, `
  <radialGradient id="copperGrad" cx="40%" cy="40%" r="65%">
    <stop offset="0%" stop-color="#ffedd5"/>
    <stop offset="35%" stop-color="#fb923c"/>
    <stop offset="75%" stop-color="#ea580c"/>
    <stop offset="100%" stop-color="#9a3412"/>
  </radialGradient>
`);

// Lv.6: 마스터 셰프 나이프 (ruins_6)
icons['ruins_6'] = wrap3DIcon('ruins_6', `
  <!-- Japanese Santoku Chef Knife with Wooden Handle -->
  <g transform="rotate(-35 50 50)">
    <!-- Wooden Handle with 3 Brass Rivets -->
    <rect x="12" y="44" width="28" height="12" rx="4" fill="#451a03" stroke="#1c1917" stroke-width="2"/>
    <circle cx="18" cy="50" r="1.5" fill="#facc15"/>
    <circle cx="26" cy="50" r="1.5" fill="#facc15"/>
    <circle cx="34" cy="50" r="1.5" fill="#facc15"/>
    <!-- Bolster -->
    <rect x="40" y="42" width="4" height="16" rx="1" fill="#94a3b8"/>
    <!-- Razor Sharp Steel Blade -->
    <path d="M44 42 L88 44 C90 44 92 48 88 54 L44 58 Z" fill="url(#chromeGrad)" stroke="#334155" stroke-width="2"/>
    <!-- Razor Cutting Edge Reflection -->
    <line x1="44" y1="58" x2="88" y2="54" stroke="#ffffff" stroke-width="2"/>
    <!-- Damascus Blade Shine -->
    <line x1="50" y1="46" x2="82" y2="48" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>
  </g>
`, ``);

// Lv.7: 크리스탈 케이크 돔 스탠드 (ruins_7)
icons['ruins_7'] = wrap3DIcon('ruins_7', `
  <!-- Tiered Pedestal Cake Plate with Glass Bell Dome -->
  <ellipse cx="50" cy="80" rx="36" ry="8" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>
  <!-- Stem -->
  <path d="M46 64 L46 80 L54 80 L54 64 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <!-- Crystal Plate -->
  <ellipse cx="50" cy="64" rx="42" ry="10" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
  <!-- Glass Dome -->
  <path d="M18 62 C18 28 32 18 50 16 C68 18 82 28 82 62 Z" fill="url(#domeGlass)" stroke="#38bdf8" stroke-width="2"/>
  <circle cx="50" cy="12" r="5" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
  <!-- Prismatic Rainbow Crystal Reflections -->
  <path d="M26 56 C24 34 36 24 48 22" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.85"/>
`, ``);

// Lv.8: 골든 셰프 마스터 트로피 (ruins_8)
icons['ruins_8'] = wrap3DIcon('ruins_8', `
  <!-- Grand Golden Chef Hat Trophy -->
  <!-- Marble Base Plinth -->
  <rect x="26" y="74" width="48" height="18" rx="4" fill="#0f172a" stroke="#334155" stroke-width="2"/>
  <rect x="34" y="80" width="32" height="8" rx="2" fill="#facc15" stroke="#b45309" stroke-width="1"/>
  <!-- Gold Stem -->
  <path d="M44 60 L44 74 L56 74 L56 60 Z" fill="url(#goldCrown)" stroke="#ca8a04" stroke-width="2"/>
  <!-- Trophy Cup Body -->
  <path d="M22 36 C22 62 78 62 78 36 Z" fill="url(#goldCrown)" stroke="#b45309" stroke-width="2.5"/>
  <!-- Trophy Handles -->
  <path d="M22 40 C10 40 10 56 24 58" fill="none" stroke="#b45309" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M78 40 C90 40 90 56 76 58" fill="none" stroke="#b45309" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Golden Chef Toque Blanche on Top -->
  <path d="M30 36 C30 20 40 16 50 16 C60 16 70 20 70 36 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <!-- Embossed 5-Point Star on Cup -->
  <polygon points="50,40 52,46 58,46 53,50 55,56 50,52 45,56 47,50 42,46 48,46" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
  <!-- Trophy Golden Gloss -->
  <path d="M30 44 C32 54 44 58 50 58" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.8"/>
`, ``);

// Write all generated SVG icons to public/items/
let count = 0;
for (const [key, svg] of Object.entries(icons)) {
  fs.writeFileSync(path.join(targetDir, `${key}.svg`), svg, 'utf-8');
  count++;
}

console.log(`Generated ${count} gourmet Bistro food icons in ${targetDir}`);
