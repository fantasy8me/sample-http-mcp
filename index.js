const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Set your predefined folder here
const BASE_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR);

// List files in BASE_DIR
app.get('/list', (req, res) => {
  fs.readdir(BASE_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ files });
  });
});

// Create a new file
app.post('/create', (req, res) => {
  const { filename, content = '' } = req.body;
  if (!filename) return res.status(400).json({ error: 'filename required' });
  const filePath = path.join(BASE_DIR, filename);
  fs.writeFile(filePath, content, err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Copy a file
app.post('/copy', (req, res) => {
  const { src, dest } = req.body;
  if (!src || !dest) return res.status(400).json({ error: 'src and dest required' });
  const srcPath = path.join(BASE_DIR, src);
  const destPath = path.join(BASE_DIR, dest);
  fs.copyFile(srcPath, destPath, err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// MCP protocol endpoint (basic initialize handler)
app.post('/mcp', (req, res) => {
  const { method, id } = req.body || {};
  if (method === 'initialize') {
    // Respond with MCP initialize result
    return res.json({
      jsonrpc: '2.0',
      id,
      result: {
        serverInfo: {
          name: 'httpmcpserver',
          version: '1.0.0'
        },
        capabilities: {
          listFiles: true,
          createFile: true,
          copyFile: true,
          // Add more capabilities as you implement them
        }
      }
    });
  }
  // res.status(400).json({ error: 'Unsupported method' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HTTP MCP server running on port ${PORT}`);
});
