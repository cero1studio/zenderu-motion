const fs = require('fs');
const svg = fs.readFileSync('public/logo_white.svg', 'utf8');
const p1 = svg.match(/<path d="([^"]+)" fill="white"\/>/g)[0].match(/d="([^"]+)"/)[1];
const p2 = svg.match(/<path d="([^"]+)" fill="white"\/>/g)[1].match(/d="([^"]+)"/)[1];
const subpaths = p2.split('M').filter(Boolean).map(s => 'M' + s);

function saveSvg(filename, d) {
    fs.writeFileSync(filename, `<svg viewBox="0 0 185 60" style="background:black" xmlns="http://www.w3.org/2000/svg"><path d="${d}" fill="white"/></svg>`);
}

saveSvg('debug_p1.html', p1);
saveSvg('debug_p2.html', p2);
subpaths.forEach((sp, i) => saveSvg(`debug_sub${i}.html`, sp));

console.log("Created debug SVGs.");
