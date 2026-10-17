const fs = require('fs');
const words = JSON.parse(fs.readFileSync('violeta_words.json', 'utf8'));

const fixes = {
    "mi": "en tu",
    "emocionante,": "emocional,",
    "ayudar": "ayudarte",
    "sendero": "Zenderu",
    "conversense.": "conversemos."
};

let currentChunk = [];
let chunks = [];

for (let i = 0; i < words.length; i++) {
    let w = words[i];
    if (fixes[w.word]) w.word = fixes[w.word];
    // manual compound fixes (like 'en tu' replacing 'mi')
    if (w.word === "en tu" && currentChunk.length === 0) {
      // just push it
    }
    
    currentChunk.push(w);
    
    let wordText = w.word;
    let hasPunc = wordText.includes('.') || wordText.includes(',') || wordText.includes('?');
    
    if (currentChunk.length >= 3 || hasPunc || i === words.length - 1) {
        let text = currentChunk.map(cw => cw.word).join(" ");
        let start = currentChunk[0].start;
        let end = currentChunk[currentChunk.length - 1].end;
        if (i < words.length - 1) {
            end = words[i+1].start;
        }
        chunks.push(`  { fromSec: ${start.toFixed(2)}, toSec: ${end.toFixed(2)}, text: "${text}" },`);
        currentChunk = [];
    }
}

console.log("const VIOLETA_SUBS = [\n" + chunks.join("\n") + "\n];");
