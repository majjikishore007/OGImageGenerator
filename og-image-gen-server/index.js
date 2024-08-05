import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { launch } from 'puppeteer';
import { join } from 'path';
import { readFileSync, unlinkSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/generate-og-image', upload.single('image'), async (req, res) => {
  console.log('Request body-------------------:', req.body);
  const { title, content } = req.body;
  const imagePath = req.file ? req.file.path : null;
  console.log('Image path:', imagePath);
  // Generate a unique filename for the OG image
  const ogImageName = `${uuidv4()}.png`;
  const ogImagePath = join(__dirname, 'public', ogImageName);
  console.log('Generating OG image:=======================', ogImagePath);

  try {
    const browser = await launch();
    const page = await browser.newPage();

    // Set the content of the page
    await page.setContent(`
    <html>
    <head>
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${content.slice(0, 100)}" />
      <meta property="og:image" content="data:image/png;base64,${readFileSync(
        imagePath,
        'base64'
      )}" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://example.com/post" />
      <style>
        body {
          width: 1200px;
          height: 630px;
          font-family: Arial, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: #f0f0f0;
        }
        .container {
          width: 1100px;
          height: 580px;
          background: white;
          border-radius: 15px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        h1 {
          font-size: 48px;
          margin: 0;
        }
        p {
          font-size: 24px;
          color: #666;
        }
        .image {
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>${title}</h1>
        <p>${content}</p>
        ${
          imagePath
            ? `<div class="image"><img src="data:image/png;base64,${readFileSync(
                imagePath,
                'base64'
              )}" alt="Post Image" /></div>`
            : ''
        }
      </div>
    </body>
    </html>
  `);

    // Set the viewport size
    await page.setViewport({ width: 1200, height: 630 });

    // Screenshot the content
    await page.screenshot({ path: ogImagePath });

    await browser.close();
    console.log('Image generated successfully', ogImagePath);
    // Send the image URL back to the client
    res.json({ imageUrl: `http://localhost:${port}/${ogImageName}` });
  } catch (error) {
    console.error('Error generating OG image:', error);
    res.status(500).send('Error generating OG image');
  } finally {
    if (imagePath) {
      unlinkSync(imagePath);
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
