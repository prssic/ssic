const fs = require('fs');
let html = fs.readFileSync('discover.html', 'utf8');

// 1. Fix fonts (restore absolute path because ssic.ro/discover/ needs /assets/fonts)
html = html.replace(/url\('assets\/fonts\//g, "url('/assets/fonts/");

// 2. Fix daisy image
html = html.replace(/flower\.png/g, 'daisy.png');

// 3. Remove negative margins from title so they don't overlap
html = html.replace(/margin-bottom:\s*-5px;/g, '');
html = html.replace(/margin-top:\s*-12px;/g, '');
html = html.replace(/margin-top:\s*-10px;/g, '');

// 4. Fix Star Shadow (Remove wrapper, put drop-shadow on the star itself)
// The clipping was fixed by the new polygon which leaves a 5% margin, so drop-shadow directly on it will work now without iOS clipping.
html = html.replace(/\.ds-star-wrapper \{[^\}]+\}/, '');
html = html.replace(/<div class="ds-star-wrapper"><div class="ds-star"/g, '<div class="ds-star"');
html = html.replace(/<\/div><\/div>\s*<div class="ds-pill">/g, '</div>\n                <div class="ds-pill">');
html = html.replace(/\.ds-star\s*\{/, '.ds-star {\n    filter: drop-shadow(4px 4px 0 #1a2a5e);');

// 5. Fix Scramble JS
// Make it super subtle and readable: only 15% of characters are scrambled, the rest are original.
const newScript = <script>
(function () {
    const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    function randChar() { return LETTERS[Math.floor(Math.random() * LETTERS.length)]; }

    document.querySelectorAll('.ds-glitch').forEach(el => {
        let orig = el.getAttribute('data-orig') || el.innerText;
        el.setAttribute('data-orig', orig);
        
        function randomizeText() {
            let newText = '';
            for (let i = 0; i < orig.length; i++) {
                if (orig[i] === ' ' || orig[i] === '-') {
                    newText += orig[i];
                } else {
                    // 85% chance to show the correct letter, 15% chance to glitch it
                    newText += Math.random() > 0.85 ? randChar() : orig[i];
                }
            }
            el.innerText = newText;
        }

        randomizeText();
        setInterval(randomizeText, 800 + Math.random() * 400); // Slow, readable glitch
    });
})();
</script>;

html = html.replace(/<script>[\s\S]*?<\/script>/, newScript);

fs.writeFileSync('discover.html', html, 'utf8');
