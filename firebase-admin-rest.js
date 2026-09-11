// firebase-admin-rest.js
// Automação Node.js conectando à REST API do Firebase usando a chave Service Account JSON

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// 1. Carregar a chave de serviço
const keyPath = path.join(__dirname, 'adriellyti-firebase-adminsdk-fbsvc-cfd62e41ec.json');
if (!fs.existsSync(keyPath)) {
  console.error('Arquivo de chave não encontrado:', keyPath);
  process.exit(1);
}

const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

// Função auxiliar para codificação Base64URL
function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

/**
 * 2. Gera um Access Token OAuth2 usando a chave privada da Service Account
 */
async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: key.client_email,
    scope: [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/datastore',
      'https://www.googleapis.com/auth/firebase'
    ].join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const unsignedToken = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(key.private_key, 'base64url');
  const jwt = `${unsignedToken}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Erro ao obter token OAuth2: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

/**
 * 3. Consultar informações do projeto Firebase via REST API
 */
async function getProjectInfo() {
  const token = await getAccessToken();
  const url = `https://firebase.googleapis.com/v1beta1/projects/${key.project_id}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

/**
 * 4. Salvar um documento no Cloud Firestore via REST API
 * (Requer que o banco Firestore tenha sido criado no console do Firebase)
 */
async function saveFirestoreDocument(collection, docId, fields) {
  const token = await getAccessToken();
  const formattedFields = {};
  for (const [k, v] of Object.entries(fields)) {
    if (typeof v === 'string') formattedFields[k] = { stringValue: v };
    else if (typeof v === 'number') formattedFields[k] = { integerValue: v };
    else if (typeof v === 'boolean') formattedFields[k] = { booleanValue: v };
  }

  const url = `https://firestore.googleapis.com/v1/projects/${key.project_id}/databases/(default)/documents/${collection}?documentId=${docId}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fields: formattedFields })
  });

  return res.json();
}

/**
 * 5. Ler documentos do Cloud Firestore via REST API
 */
async function getFirestoreDocuments(collection) {
  const token = await getAccessToken();
  const url = `https://firestore.googleapis.com/v1/projects/${key.project_id}/databases/(default)/documents/${collection}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

// Execução de teste
async function main() {
  console.log('=== Conectando ao Firebase REST API ===');
  console.log('Projeto:', key.project_id);

  try {
    const info = await getProjectInfo();
    console.log('\nProjeto ativo com sucesso!');
    console.log('- Display Name:', info.displayName);
    console.log('- Project Number:', info.projectNumber);
    console.log('- Hosting Site:', info.resources?.hostingSite || 'Nenhum');
  } catch (err) {
    console.error('Erro na chamada REST:', err);
  }
}

main();

module.exports = {
  getAccessToken,
  getProjectInfo,
  saveFirestoreDocument,
  getFirestoreDocuments
};
