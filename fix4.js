const fs = require('fs');
let html = fs.readFileSync('discover.html', 'utf-8');

// 1. Fix Font URLs (relative)
html = html.replace(/url\('\/assets\/fonts\//g, "url('assets/fonts/");

// 2. Fix the Title Layout
html = html.replace(/\.ds-title-dates \{[\s\S]*?\}/, \.ds-title-dates {
    font-family: 'Stinger Fit', Impact, sans-serif;
    font-size: clamp(1.1rem, 5vw, 2rem);
    color: #0c2340;
    letter-spacing: 0.05em;
    white-space: nowrap;
    text-transform: uppercase;
}\);
html = html.replace(/\.ds-title-row2 \{[\s\S]*?\}/, \.ds-title-row2 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    flex-wrap: nowrap;
    margin-top: -10px;
}\);

// 3. Fix Stars & Stickers sizing
html = html.replace(/\.ds-star \{[\s\S]*?clip-path:[\s\S]*?transform: rotate\(-5deg\);\n    filter: drop-shadow\(4px 4px 0 #1a2a5e\);\n\}/, \.ds-star {
    flex: 0 0 80px;
    width: 80px;
    height: 80px;
    clip-path: polygon(50.0% 2.0%,57.6% 11.7%,65.5% 6.9%,69.8% 17.6%,79.4% 17.5%,79.8% 28.6%,88.0% 32.9%,85.0% 43.5%,95.1% 51.0%,89.0% 60.8%,97.6% 70.5%,89.4% 78.5%,95.1% 89.6%,85.0% 94.8%,88.0% 105.5%,76.6% 106.9%,74.8% 117.8%,62.6% 114.5%,55.7% 123.8%,45.0% 116.7%,34.5% 123.8%,30.1% 113.1%,18.4% 116.5%,18.0% 105.5%,6.0% 103.9%,10.0% 93.2%,-1.2% 86.7%,6.0% 76.8%,-3.7% 66.0%,5.8% 56.9%,-1.2% 45.1%,10.0% 40.2%,6.0% 28.8%,18.0% 27.8%,18.4% 16.8%,30.1% 20.2%,34.5% 9.4%,45.0% 16.5%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Stinger Fit', Impact, sans-serif;
    font-weight: bold;
    font-size: 1.8rem;
    color: #0c2340;
    line-height: 1;
    margin: 0 -16px;
    z-index: 3;
    flex-shrink: 0;
    transform: rotate(-5deg);
}\);
html = html.replace(/\.ds-star \.ds-day \{[\s\S]*?\}/, \.ds-star .ds-day {
    font-family: 'Stinger Fit', Impact, sans-serif;
    font-size: 0.6rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-top: 2px;
    color: #0c2340;
}\);

// Add wrapper for shadow
html = html.replace(/<div class="ds-star/g, '<div class="ds-star-wrapper"><div class="ds-star');
html = html.replace(/(<div class="ds-star.*?>[\\s\\S]*?<\\/div>)/g, '</div>');
html = html.replace(/\\.ds-star \\{/, \.ds-star-wrapper { filter: drop-shadow(4px 4px 0 #1a2a5e); z-index: 3; flex-shrink: 0; margin: 0 -16px; display: flex; align-items: center; justify-content: center; }
.ds-star {\);

html = html.replace(/\.ds-sticker \{[\s\S]*?\}/, \.ds-sticker {
    flex: 0 0 66px;
    width: 66px;
    height: 66px;
    object-fit: contain;
    animation: swayRot 3s ease-in-out infinite alternate;
    filter: drop-shadow(3px 4px 0 rgba(0,0,0,0.2));
    margin: 0 -6px;
    z-index: 4;
    flex-shrink: 0;
}\);

html = html.replace(/@media \\(max-width: 480px\\) \\{[\\s\\S]*?\\}/, \@media (max-width: 480px) {
    .ds-title-discover { font-size: clamp(3rem, 15vw, 6rem); margin-bottom: 0px; }
    .ds-title-ssic { font-size: clamp(3rem, 15vw, 6rem); }
    .ds-title-dates { font-size: clamp(0.9rem, 4.5vw, 1.4rem); }
    .ds-star-wrapper { flex: 0 0 66px; margin: 0 -12px; }
    .ds-star  { width: 66px; height: 66px; font-size: 1.5rem; margin: 0; }
    .ds-pill  { padding: 10px 14px; min-height: 60px; border-radius: 14px; }
    .ds-sticker { flex: 0 0 52px; width: 52px; height: 52px; margin: 0 -4px; }
    .ds-row   { padding: 0 6px; }
}\);

// 4. Fix Scramble
html = html.replace(/const LETTERS = '.*?';/, "const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';");
html = html.replace(/let interval = 180 \\+ Math\\.random\\(\\) \\* 100;/, "let interval = 800 + Math.random() * 400;");
html = html.replace(/function randomizeText\\(el, orig\\) \\{[\\s\\S]*?el\\.innerText = newText;\\s*\\}/, \unction randomizeText(el, orig) {
            let newText = '';
            for (let i = 0; i < orig.length; i++) {
                if (orig[i] === ' ') {
                    newText += ' ';
                } else {
                    newText += LETTERS[Math.floor(Math.random() * LETTERS.length)];
                }
            }
            el.innerText = newText;
        }\);

fs.writeFileSync('discover.html', html, 'utf-8');
console.log('Fixed discover.html');
