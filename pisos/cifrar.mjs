// Cifra los pisos para la web: node cifrar.mjs <datos.json> <salida.json>
// La contraseña se lee de la variable PISOS_CLAVE (nunca se guarda en el repositorio).
// AES-GCM 256 con clave derivada por PBKDF2-SHA256; la página la descifra con WebCrypto.
import { readFileSync, writeFileSync } from 'node:fs';
import { webcrypto as crypto } from 'node:crypto';

const [src, out] = process.argv.slice(2);
const clave = process.env.PISOS_CLAVE;
if (!src || !out || !clave) {
  console.error('Uso: PISOS_CLAVE=... node cifrar.mjs datos.json pisos.enc.json');
  process.exit(1);
}

const ITER = 250000;
const enc = new TextEncoder();
const b64 = buf => Buffer.from(buf).toString('base64');

const datos = JSON.stringify(JSON.parse(readFileSync(src, 'utf8')));
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const base = await crypto.subtle.importKey('raw', enc.encode(clave), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' },
  base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(datos));

writeFileSync(out, JSON.stringify({ v: 1, iter: ITER, salt: b64(salt), iv: b64(iv), ct: b64(ct) }));
console.log('Cifrado ' + out);
