/**
 * Regenerates content/beyond-work/index.json by reading every
 * content/beyond-work/*.json file. Run automatically via GitHub Actions
 * on every push to main (see .github/workflows/build-content-index.yml).
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'content', 'beyond-work');
const OUT = path.join(DIR, 'index.json');

if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json') && f !== 'index.json');
const articles = files.map(f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf-8')));

fs.writeFileSync(OUT, JSON.stringify(articles, null, 2));
console.log(`Built index.json with ${articles.length} article(s).`);
