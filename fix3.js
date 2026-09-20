const fs = require('fs');
let html = fs.readFileSync('_layouts/default.raw.html', 'utf-8');

// Fix the missing bracket
const target = 'elementul .instagram-media e';
const replacement = '}\n        /* ==========================================================================\n           EXPERIMENT: fără borduri nicăieri în site (poze, carduri, butoane, inputuri,\n           tab-uri). Un singur switch global, ca să fie ușor de dat înapoi dacă nu place —\n           elementul .instagram-media e';
html = html.replace(target, replacement);

const eventPaddingFix = '\n    @media (max-width: 480px) {\n        #view-evenimente .event-content-wrapper,\n        #view-evenimente .evsub { padding-left: 20px !important; padding-right: 20px !important; }\n        #view-evenimente .carousel-container { max-width: calc(100vw - 40px) !important; margin: 0 auto !important; }\n    }\n';
html = html.replace('</style>', eventPaddingFix + '</style>');

fs.writeFileSync('_layouts/default.html', html, 'utf-8');
console.log('Fixed');
