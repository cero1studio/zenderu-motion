const fs = require('fs');
const words = JSON.parse(fs.readFileSync('stella_words.json', 'utf8'));

// Fix some whisper typos first
const fixes = {
    "Iste": "Estela",
    "Lamóns": "Moons",
    "desifrar": "descifrar",
    "húmitos.": "juntos."
};

let currentChunk = [];
let chunks = [];

for (let i = 0; i < words.length; i++) {
    let w = words[i];
    if (fixes[w.word]) w.word = fixes[w.word];
    currentChunk.push(w);
    
    // Break chunk if we have 3 words, or if there's punctuation, or if it's the last word
    let wordText = w.word;
    let hasPunc = wordText.includes('.') || wordText.includes(',') || wordText.includes('?');
    
    if (currentChunk.length >= 3 || hasPunc || i === words.length - 1) {
        let text = currentChunk.map(cw => cw.word).join(" ");
        let start = currentChunk[0].start;
        let end = currentChunk[currentChunk.length - 1].end;
        // Extend end a tiny bit so it flows into the next
        if (i < words.length - 1) {
            end = words[i+1].start;
        }
        chunks.push(`  { fromSec: ${start.toFixed(2)}, toSec: ${end.toFixed(2)}, text: "${text}" },`);
        currentChunk = [];
    }
}

console.log("const STELLA_SUBS = [\n" + chunks.join("\n") + "\n];");
