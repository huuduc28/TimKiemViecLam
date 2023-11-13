const express = require('express');
const router = express.Router();
const uploadReport = require('../middlewares/multerReport')

const ReportController = require('../controllers/ReportController')

router.post('/uploadReport', uploadReport.array("files"), ReportController.uploadReport)

module.exports = router;