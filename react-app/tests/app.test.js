import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('React production build contains required assets', () => {
  const distPath = path.resolve(__dirname, '../dist');
  assert.ok(fs.existsSync(distPath), 'dist directory must exist after build');
  assert.ok(fs.existsSync(path.join(distPath, 'index.html')), 'index.html must exist in dist');
  
  const htmlContent = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
  assert.match(htmlContent, /DevOps Dashboard/i);
});
