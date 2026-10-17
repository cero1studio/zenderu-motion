const fs = require('fs');
const svg = fs.readFileSync('public/logo_white.svg', 'utf8');
const match = svg.match(/<path d="([^"]+)" fill="white"\/>/g);
if (match && match.length >= 2) {
  const p1 = match[0].match(/d="([^"]+)"/)[1];
  const p2 = match[1].match(/d="([^"]+)"/)[1];
  const subpaths = p2.split('M').filter(Boolean).map(s => 'M' + s);
  console.log("Total subpaths in P2:", subpaths.length);
  subpaths.forEach((sp, i) => {
    const preview = sp.substring(0, 30) + '...';
    console.log(`Subpath ${i}: length=${sp.length}, starts=${preview}`);
  });
}
