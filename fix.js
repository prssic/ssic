const fs = require('fs');

const map = {
    'Č›': 'ț',
    'Ă®': 'î',
    'Äƒ': 'ă',
    'Č™': 'ș',
    'Ă˘': 'â',
    'ĂŽ': 'Î',
    'Čš': 'Ț',
    'Č˜': 'Ș',
    'Ä‚': 'Ă',
    'Â ': ' ',
    'Ă ': 'à',
    'ĂĄ': 'á',
    'Ă¨': 'è',
    'ĂŠ': 'é',
    'Ă­': 'í',
    'ĂŻ': 'ï',
    'Ăł': 'ó',
    'Ăş': 'ú',
    'Ă§': 'ç'
};

const files = ['index.html', 'board.html', 'studenti.html', 'evenimente.html', 'facultate.html'];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    for (const [bad, good] of Object.entries(map)) {
        content = content.split(bad).join(good);
    }
    fs.writeFileSync(f, content);
});
console.log('Done');
