import https from 'https';
import fs from 'fs';

https.get('https://raw.githubusercontent.com/saulodsigner/bio-site/main/vite.config.ts', (res) => {
  let chunks = [];
  res.on('data', c => chunks.push(c));
  res.on('end', () => {
     let data = Buffer.concat(chunks);
     console.log("Size:", data.length);
     console.log("First 100 bytes (hex):", data.subarray(0, 100).toString('hex'));
     console.log("First 100 bytes (utf8):", data.subarray(0, 100).toString('utf8'));
  });
});
