const express = require('express');
const dayjs = require('dayjs');
const { readLogs, writeLogs } = require('../utils/store');
const { logSchema } = require('../utils/validate');

const router = express.Router();

router.post('/', async (req, res) => {
  const { error, value } = logSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(d => d.message)
    });
  }
  const logs = await readLogs();
  logs.push(value);
  await writeLogs(logs);

  // Emit to clients
  const io = req.app.get('io');
  if (io) io.emit('log:new', value);

  return res.status(201).json(value);
});

// Query logs with filters
router.get('/', async (req, res) => {
  const q = {
    search: req.query.search || req.query.message,
    level: req.query.level,
    resourceId: req.query.resourceId,
    traceId: req.query.traceId,
    spanId: req.query.spanId,
    commit: req.query.commit,
    start: req.query.start || req.query.from || req.query._start,
    end: req.query.end || req.query.to || req.query._end
  };

  const logs = await readLogs();
  const filtered = logs
    .filter(l => matches(l, q))
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  res.json(filtered);
});

module.exports = router;
