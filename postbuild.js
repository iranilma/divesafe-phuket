import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist/index.html');
const rootCopyPath = path.resolve('../divesafe-phuket.html');

if (fs.existsSync(distPath)) {
  let html = fs.readFileSync(distPath, 'utf8');

  // Replace type="module" with defer to ensure file:// execution in Chrome/Safari/Edge without CORS module restrictions
  html = html.replace(/<script type="module" crossorigin>/g, '<script defer>');

  // Remove the redirect snippet inside the distributed self-contained file
  html = html.replace(/<script>\s*\/\/ If root source[\s\S]*?<\/script>/g, '');

  fs.writeFileSync(distPath, html, 'utf8');
  console.log('✓ Successfully patched dist/index.html with script defer for file:// compatibility');

  try {
    fs.copyFileSync(distPath, rootCopyPath);
    console.log('✓ Successfully copied standalone bundle to', rootCopyPath);
  } catch (err) {
    // Parent directory copy is only needed for local artifact viewing
  }
} else {
  console.error('dist/index.html not found!');
}
