# Site SSIC — ghid de publicare pe GitHub Pages

## 1. Structura proiectului

```
ssic-site/
├── index.html                     ← site-ul, un singur fișier
├── assets/
│   ├── video/
│   │   ├── hero-background.mp4    ← pune tu videoclipul (vezi PUNE-VIDEO-AICI.txt)
│   │   └── hero-poster.jpg        ← opțional, thumbnail static
│   └── img/                       ← pentru poze din galerie, echipă etc. dacă adaugi ulterior
└── README.md                      ← acest fișier
```

## 2. Publicare pe GitHub Pages (gratuit, ~5 minute)

1. **Creează un repository nou** pe github.com → butonul verde "New".
   - Nume sugerat: `ssic-site` (sau orice altul).
   - Public (Pages gratuit merge doar pe repo public, dacă nu ai GitHub Pro/organizație).
   - Nu bifa "Add README" — ai deja unul.

2. **Încarcă fișierele.** Cea mai simplă variantă, direct din browser:
   - Deschide repo-ul → "Add file" → "Upload files".
   - Trage tot folderul `ssic-site` (sau fiecare fișier/folder în parte, păstrând structura de mai sus).
   - Commit.

   Sau din terminal, dacă preferi git:
   ```bash
   cd ssic-site
   git init
   git add .
   git commit -m "Primul commit — site SSIC"
   git branch -M main
   git remote add origin https://github.com/NUME-UTILIZATOR/ssic-site.git
   git push -u origin main
   ```

3. **Activează Pages.**
   - În repo → Settings → Pages (meniul din stânga).
   - La "Source", alege branch-ul `main` și folderul `/ (root)`.
   - Save.
   - După ~1 minut, GitHub îți dă un link: `https://NUME-UTILIZATOR.github.io/ssic-site/`

4. **(Opțional) Domeniu propriu** — dacă aveți ceva de tipul `ssic.ro`:
   - Settings → Pages → "Custom domain", introdu domeniul.
   - La furnizorul de DNS, adaugi un CNAME către `NUME-UTILIZATOR.github.io`.
   - GitHub îți oferă și HTTPS automat (poate dura până la 24h prima activare).

## 3. Videoclipul de fundal

Vezi `assets/video/PUNE-VIDEO-AICI.txt` — pe scurt: exportă reel-ul ca `.mp4`,
denumește-l exact `hero-background.mp4`, pune-l în `assets/video/`. Fără el,
fundalul rămâne gradientul + blob-urile animate (arată bine oricum, deci nu blochează lansarea).

## 4. Tema light/dark

E deja funcțională — un buton (soare/lună) în navbar, sus dreapta. Reține alegerea
utilizatorului (localStorage) și pornește automat pe tema preferată a sistemului
de operare la prima vizită.

## 5. După ce publici

Orice modificare ulterioară a `index.html` (sau a fișierelor din `assets/`) se
încarcă din nou în același repo (upload sau `git push`) — GitHub Pages se
actualizează automat în ~1 minut, fără nicio configurare suplimentară.
