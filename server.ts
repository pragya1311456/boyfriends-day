import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// High body size limit to support user uploaded images and audio data URLs
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure data directory exists for persistent story storage
const DATA_DIR = path.join(__dirname, 'data', 'stories');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// REST API for Stories
app.post('/api/stories', (req, res) => {
  try {
    const story = req.body;
    if (!story) {
      return res.status(400).json({ error: 'No story data provided' });
    }

    let id = story.id;
    if (!id || id === 'template-default' || id.trim() === '') {
      id = `love-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
    }

    // Clean safe filename
    const safeId = id.replace(/[^a-zA-Z0-9_-]/g, '');
    const storyToSave = {
      ...story,
      id: safeId,
      updatedAt: Date.now()
    };

    const filePath = path.join(DATA_DIR, `${safeId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(storyToSave, null, 2), 'utf8');

    return res.json({
      success: true,
      id: safeId,
      shareUrl: `/?story=${safeId}`
    });
  } catch (err: any) {
    console.error('Error saving story:', err);
    return res.status(500).json({ error: 'Failed to save story', details: err?.message });
  }
});

app.get('/api/stories/:id', (req, res) => {
  try {
    const safeId = req.params.id.replace(/[^a-zA-Z0-9_-]/g, '');
    const filePath = path.join(DATA_DIR, `${safeId}.json`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Story not found' });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const story = JSON.parse(fileContent);
    return res.json({ success: true, story });
  } catch (err: any) {
    console.error('Error fetching story:', err);
    return res.status(500).json({ error: 'Failed to retrieve story', details: err?.message });
  }
});

app.get('/api/health', (_req, res) => {
  return res.json({ status: 'ok', service: 'Create Your Love Story API' });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`❤️ Romantic Love Story app running on http://localhost:${PORT}`);
  });
}

startServer();
