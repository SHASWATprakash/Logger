const fs = require('fs/promises');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const LOG_FILE = path.join(DATA_DIR, 'logs.json');

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LOG_FILE);
  } catch {
    await fs.writeFile(LOG_FILE, '[]', 'utf8');
  }
}

async function readLogs() {
  await ensureFile();
  const raw = await fs.readFile(LOG_FILE, 'utf8');
  return JSON.parse(raw || '[]');
}

async function writeLogs(logs) {
  await ensureFile();
  await fs.writeFile(LOG_FILE, JSON.stringify(logs, null, 2));
}

module.exports = { readLogs, writeLogs, LOG_FILE };
