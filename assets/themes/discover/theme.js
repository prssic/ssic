<script>
        /* ==========================================================================
           JS: Temă site-wide (clasic ⇄ discover) + stickere în fundal
           ========================================================================== */
        (function () {
            const root = document.documentElement;
            const KEY = 'ssicTheme';
            const btn = document.getElementById('navThemeBtn');
            const IMAGES = [
                '/assets/events/discover/smiley.png',
                '/assets/events/discover/flower.png',
                '/assets/events/discover/heart.png'
            ];
            let layer = null;

            function rnd(min, max) { return Math.random() * (max - min) + min; }

            function buildLayer() {
                if (layer) return;
                layer = document.createElement('div');
                layer.className = 'ds-floaters';
                layer.setAttribute('aria-hidden', 'true');
                const isMobile = window.matchMedia('(max-width: 480px)').matches;
                const COUNT = isMobile ? 5 : 8;
                for (let i = 0; i < COUNT; i++) {
                    const size = isMobile ? rnd(38, 64) : rnd(50, 92);
                    const dur = rnd(34, 54);
                    const wrap = document.createElement('div');
                    wrap.className = 'ds-float';
                    wrap.style.width = wrap.style.height = size + 'px';
                    wrap.style.left = ((i + rnd(0.05, 0.85)) / COUNT * 96).toFixed(1) + 'vw';
                    wrap.style.setProperty('--dur', dur.toFixed(1) + 's');
                    wrap.style.setProperty('--delay', (-rnd(0, dur)).toFixed(1) + 's');
                    wrap.style.setProperty('--static-top', rnd(5, 85).toFixed(0) + 'vh');
                    const img = document.createElement('img');
                    img.src = IMAGES[i % IMAGES.length];
                    img.alt = '';
                    img.draggable = false;
                    img.onerror = function () { wrap.remove(); };
                    img.style.setProperty('--sway', rnd(14, 36).toFixed(0) + 'px');
                    img.style.setProperty('--tilt', rnd(8, 18).toFixed(0) + 'deg');
                    img.style.setProperty('--sway-dur', rnd(4.5, 8).toFixed(1) + 's');
                    img.style.setProperty('--sway-delay', (-rnd(0, 6)).toFixed(1) + 's');
                    wrap.appendChild(img);
                    layer.appendChild(wrap);
                }
                // Primul copil al <body>, cu z-index negativ: sub navbar, conținut și footer.
                document.body.insertBefore(layer, document.body.firstChild);
            }
            function removeLayer() { if (layer) { layer.remove(); layer = null; } }

            function sync() {
                const on = root.classList.contains('ds-theme');
                document.querySelectorAll('#navThemeBtn, .ft-theme-btn').forEach((b) => {
                    b.setAttribute('aria-pressed', String(on));
                    b.title = on ? 'Treci la tema clasică' : 'Treci la tema Discover SSIC';
                });
                if (on) buildLayer(); else removeLayer();
            }

            function setTheme(name) {
                root.classList.toggle('ds-theme', name === 'discover');
                try { localStorage.setItem(KEY, name); } catch (e) { /* ignorăm */ }
                sync();
            }

            if (btn) btn.addEventListener('click', () => {
                setTheme(root.classList.contains('ds-theme') ? 'classic' : 'discover');
                if (typeof haptic === 'function') haptic(10);
            });
            // Butonul din footer (poate exista în mai multe footere, deci delegare de eveniment)
            document.addEventListener('click', (e) => {
                if (!(e.target.closest && e.target.closest('.ft-theme-btn'))) return;
                setTheme(root.classList.contains('ds-theme') ? 'classic' : 'discover');
                if (typeof haptic === 'function') haptic(10);
            });
            window.ssicSetTheme = setTheme;   // folosit de popup-ul Discover (_includes/discover-popup.html)

            // bfcache: revenirea pe pagină trebuie să respecte tema salvată (mai puțin pe /discover/, unde e impusă)
            window.addEventListener('pageshow', (e) => {
                let unlocked = false;
                try { unlocked = localStorage.getItem('ssicThemeUnlocked') === '1'; } catch (err) { /* ignorăm */ }
                if ((!window.SSIC_THEME_SWITCH && !unlocked) || !e.persisted || root.classList.contains('ds-forced')) return;
                let saved = 'classic';
                try { saved = localStorage.getItem(KEY) || 'classic'; } catch (err) { /* ignorăm */ }
                root.classList.toggle('ds-theme', saved === 'discover');
                sync();
            });

            /* ── Comutator SECRET ──
               13 click-uri (cu pauze de max. 4 s între ele) pe poza lui Constantin Alexandru din Board
               schimbă tema, indiferent de SSIC_THEME_SWITCH. Nu există niciun indiciu vizual în timpul
               numărării; la al 13-lea click poza face un mic „pop" + vibrație pe mobil.
               Pe /discover/ (ds-forced) nu face nimic — acolo tema e impusă de pagină. */
            const SECRET_CLICKS = 13, SECRET_GAP_MS = 4000;
            let secretCount = 0, secretTimer = null;
            function isSecretPerson(member) {
                const n = member && member.querySelector('.team-name');
                if (!n) return false;
                const t = n.textContent.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                return /\bconstantin\b/.test(t) && /\balex/.test(t);
            }
            function toggleThemeSecret(photo) {
                if (root.classList.contains('ds-forced')) return;
                try { localStorage.setItem('ssicThemeUnlocked', '1'); } catch (e) { /* ignorăm */ }
                setTheme(root.classList.contains('ds-theme') ? 'classic' : 'discover');
                if (typeof haptic === 'function') haptic([30, 40, 30]);
                if (photo && photo.animate) {
                    photo.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.08) rotate(-2deg)' }, { transform: 'scale(1)' }],
                        { duration: 420, easing: 'cubic-bezier(0.2, 1, 0.2, 1)' });
                }
            }
            document.addEventListener('click', (e) => {
                const photo = e.target.closest && e.target.closest('.team-photo');
                if (!photo || !isSecretPerson(photo.closest('.team-member'))) return;
                clearTimeout(secretTimer);
                secretCount++;
                if (secretCount >= SECRET_CLICKS) { secretCount = 0; toggleThemeSecret(photo); return; }
                secretTimer = setTimeout(() => { secretCount = 0; }, SECRET_GAP_MS);
            });
            window.ssicToggleTheme = () => toggleThemeSecret(null);   // și din consolă, dacă e nevoie

            sync();
        })();
    </script>
