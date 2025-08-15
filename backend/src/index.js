const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');

const logsRouter = require('./routes/logs');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/logs', logsRouter);

// --- Socket.IO server ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// make io accessible inside routes via app
app.set('io', io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
