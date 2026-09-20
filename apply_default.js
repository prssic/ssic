
const fs = require("fs");
let html = fs.readFileSync("C:\\Users\\patru\\Downloads\\default (28).html", "utf8");

html = html.replace(
    /<li><a class="nav-link hover-target\{% if page\.view == \x27gallery\x27 %\} active\{% endif %\}" data-target="gallery" href="\/gallery\/">Galerie<\/a><\/li>/,
    `<li><a class="nav-link hover-target{% if page.view == \x27galerie\x27 %} active{% endif %}" data-target="galerie" href="/galerie/">Galerie</a></li>`
);

html = html.replace(
    /gallery: \x27\/gallery\/\x27/,
    `galerie: \x27/galerie/\x27`
);

html = html.replace(
    /\x27facultate\x27, \x27studenti\x27, \x27gallery\x27/,
    `\x27facultate\x27, \x27studenti\x27, \x27galerie\x27`
);

html = html.replace(
    /view: \x27gallery\x27/g,
    `view: \x27galerie\x27`
);

const oldImages = `            const images = [
                \x27/assets/events/chemistry-fest-1.jpg\x27, \x27/assets/events/chemex-1.jpg\x27, \x27/assets/events/poli-fest-1.jpg\x27,
                \x27/assets/events/chemistry-fest-2.jpg\x27, \x27/assets/events/chemex-2.jpg\x27, \x27/assets/events/poli-fest-2.jpg\x27,
                \x27/assets/events/chemistry-fest-3.jpg\x27, \x27/assets/events/chemex-3.jpg\x27, \x27/assets/events/poli-fest-3.jpg\x27,
                \x27/assets/events/chemistry-fest-4.jpg\x27, \x27/assets/events/poli-fest-4.jpg\x27,
                \x27/assets/events/chemistry-fest-5.jpg\x27, \x27/assets/events/poli-fest-5.jpg\x27
            ];`;

const newImages = `            const images = [
                \x27/assets/events/chemistry-fest-1.jpg\x27, \x27/assets/events/poli-fest-1.jpg\x27, \x27/assets/events/chemistry-fest-2.jpg\x27, \x27/assets/events/poli-fest-2.jpg\x27,
                \x27/assets/events/chemistry-fest-3.jpg\x27, \x27/assets/events/poli-fest-3.jpg\x27, \x27/assets/events/chemistry-fest-4.jpg\x27, \x27/assets/events/poli-fest-4.jpg\x27,
                \x27/assets/events/chemistry-fest-5.jpg\x27, \x27/assets/events/poli-fest-5.jpg\x27,
                \x27/assets/events/chemex-1.jpg\x27, \x27/assets/events/chemex-2.jpg\x27, \x27/assets/events/chemex-3.jpg\x27
            ];`;

html = html.replace(oldImages, newImages);

fs.writeFileSync("_layouts/default.html", html, "utf8");

