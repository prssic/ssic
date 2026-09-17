const express = require('express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const multer = require('multer');

const app = express();
const PORT = 4000;

const repoRoot = path.join(__dirname, '..');
const avizierDir = path.join(repoRoot, '_avizier');
const imagesDir = path.join(repoRoot, 'assets', 'avizier');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(repoRoot, 'assets')));

if (!fs.existsSync(avizierDir)) fs.mkdirSync(avizierDir, { recursive: true });
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, imagesDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '-').toLowerCase();
        cb(null, `${Date.now()}-${name}${ext}`);
    }
});
const upload = multer({ storage });

function parseMarkdownWithFrontmatter(fileContent) {
    const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { data: {}, content: fileContent };
    try {
        const data = yaml.load(match[1]);
        return { data, content: match[2].trim() };
    } catch (e) {
        console.error("YAML parse error:", e);
        return { data: {}, content: fileContent };
    }
}

function stringifyMarkdownWithFrontmatter(data, content) {
    data.layout = data.layout || 'avizier-post';
    const yamlString = yaml.dump(data, { lineWidth: -1 });
    return `---\n${yamlString}---\n${content}\n`;
}

app.get('/api/posts', (req, res) => {
    try {
        const files = fs.readdirSync(avizierDir).filter(f => f.endsWith('.md'));
        const posts = files.map(file => {
            const content = fs.readFileSync(path.join(avizierDir, file), 'utf-8');
            const parsed = parseMarkdownWithFrontmatter(content);
            return {
                slug: file.replace('.md', ''),
                data: parsed.data,
                content: parsed.content
            };
        });
        
        posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
        res.json(posts);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/posts', (req, res) => {
    try {
        const { originalSlug, slug, data, content } = req.body;
        const targetSlug = slug || `post-${Date.now()}`;
        const fileName = `${targetSlug}.md`;
        
        if (originalSlug && originalSlug !== targetSlug) {
            const oldPath = path.join(avizierDir, `${originalSlug}.md`);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        
        const fileContent = stringifyMarkdownWithFrontmatter(data, content);
        fs.writeFileSync(path.join(avizierDir, fileName), fileContent);
        
        res.json({ success: true, slug: targetSlug });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.delete('/api/posts/:slug', (req, res) => {
    try {
        const filePath = path.join(avizierDir, `${req.params.slug}.md`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const url = `/assets/avizier/${req.file.filename}`;
    res.json({ success: true, url });
});

app.listen(PORT, () => {
    console.log(`Local CMS is running at http://localhost:${PORT}`);
});
