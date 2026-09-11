const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');
const { getAccessToken } = require('./firebase-admin-rest.js');

const SITE_ID = 'adriellyti';

// Arquivos e pastas a ignorar no upload
const IGNORE_PATTERNS = [
  /^\.git/,
  /^\.gemini/,
  /^Rascunhos/,
  /firebase-adminsdk.*\.json$/,
  /^node_modules/,
  /^\.firebaserc$/,
  /^firebase\.json$/,
  /^firebase-admin-rest\.js$/,
  /^deploy\.js$/,
  /\.md$/
];

function shouldIgnore(relPath) {
  const normalized = relPath.replace(/\\/g, '/');
  return IGNORE_PATTERNS.some(pat => pat.test(normalized));
}

function getAllFiles(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (shouldIgnore(rel)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllFiles(full, rel));
    } else {
      results.push({ relPath: `/${rel}`, fullPath: full });
    }
  }
  return results;
}

async function deploy() {
  console.log('1. Obtendo token de autenticacao OAuth2...');
  const token = await getAccessToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  console.log('2. Coletando arquivos para deploy...');
  const files = getAllFiles(__dirname);
  console.log(`Encontrados ${files.length} arquivos para upload:`);
  files.forEach(f => console.log('  -', f.relPath));

  // Comprimir cada arquivo com gzip e calcular hash SHA256
  const fileHashMap = {};
  const hashToBuffer = {};

  for (const file of files) {
    const rawContent = fs.readFileSync(file.fullPath);
    const gzipped = zlib.gzipSync(rawContent, { level: 9 });
    const hash = crypto.createHash('sha256').update(gzipped).digest('hex');
    fileHashMap[file.relPath] = hash;
    hashToBuffer[hash] = gzipped;
  }

  console.log('\n3. Criando nova versao no Firebase Hosting...');
  const createVerRes = await fetch(`https://firebasehosting.googleapis.com/v1beta1/sites/${SITE_ID}/versions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      config: {
        headers: [
          {
            glob: '**',
            headers: {
              'Cache-Control': 'max-age=1800'
            }
          }
        ]
      }
    })
  });

  const verData = await createVerRes.json();
  if (!createVerRes.ok) {
    throw new Error('Falha ao criar versao: ' + JSON.stringify(verData));
  }
  const versionName = verData.name;
  console.log('Versao criada:', versionName);

  console.log('\n4. Registrando lista de arquivos (populateFiles)...');
  const popRes = await fetch(`https://firebasehosting.googleapis.com/v1beta1/${versionName}:populateFiles`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ files: fileHashMap })
  });

  const popData = await popRes.json();
  if (!popRes.ok) {
    throw new Error('Falha no populateFiles: ' + JSON.stringify(popData));
  }

  const uploadUrl = popData.uploadUrl;
  const requiredHashes = popData.uploadRequiredHashes || [];
  console.log(`Arquivos que precisam de upload: ${requiredHashes.length}`);

  if (requiredHashes.length > 0) {
    console.log('\n5. Fazendo upload dos arquivos comprimidos...');
    for (const hash of requiredHashes) {
      const gzippedData = hashToBuffer[hash];
      const upRes = await fetch(`${uploadUrl}/${hash}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/octet-stream'
        },
        body: gzippedData
      });
      if (!upRes.ok) {
        throw new Error(`Falha no upload do hash ${hash}: ${await upRes.text()}`);
      }
      console.log(`  Upload concluido para hash: ${hash.slice(0, 12)}...`);
    }
  }

  console.log('\n6. Finalizando versao (FINALIZED)...');
  const finalizeRes = await fetch(`https://firebasehosting.googleapis.com/v1beta1/${versionName}?update_mask=status`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status: 'FINALIZED' })
  });
  if (!finalizeRes.ok) {
    throw new Error('Falha ao finalizar versao: ' + (await finalizeRes.text()));
  }

  console.log('\n7. Publicando release para o site...');
  const releaseRes = await fetch(`https://firebasehosting.googleapis.com/v1beta1/sites/${SITE_ID}/releases?versionName=${encodeURIComponent(versionName)}`, {
    method: 'POST',
    headers
  });
  const releaseData = await releaseRes.json();
  if (!releaseRes.ok) {
    throw new Error('Falha no release: ' + JSON.stringify(releaseData));
  }

  console.log('\n=========================================');
  console.log('DEPLOY CONCLUIDO COM SUCESSO!');
  console.log(`Site no ar: https://${SITE_ID}.web.app/`);
  console.log(`URL alternativa: https://${SITE_ID}.firebaseapp.com/`);
  console.log('=========================================');
}

deploy().catch(err => {
  console.error('ERRO NO DEPLOY:', err);
});
