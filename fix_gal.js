const fs = require('fs');
let html = fs.readFileSync('galerie.html', 'utf8');
html = html.replace('id="view-gallery"', 'id="view-galerie"');
html = html.replace('<div class="dept-intro reveal">', '');
html = html.replace(/<p>Momente surprinse(.*?)<\/p>/s, '<div class="dept-intro reveal">\n                    <p>Momente surprinse</p>\n                </div>');
fs.writeFileSync('galerie.html', html, 'utf8');
