const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'node-app',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;
