const express = require('express');
const router = express.Router();
const { importJobs, getImportLogs } = require('../controllers/import.controller');

router.post('/import', importJobs);

router.get('/import-logs', getImportLogs);

module.exports = router;
