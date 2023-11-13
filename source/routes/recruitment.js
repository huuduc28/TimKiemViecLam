const express = require('express');
const router = express.Router();

const RecruitmentController = require('../controllers/RecruitmentController');
const JobManagementController = require('../controllers/JobManagementController');
const uploadApplied = require('../middlewares/multerApplied')

router.get('/search', RecruitmentController.searchRecruitment)
router.get('/detail/:slugID', RecruitmentController.detailRecruitment)
router.get('/savedJob/:id', RecruitmentController.savedJob)

router.get('/cong-viec-da-ung-tuyen', JobManagementController.renderAppliedJob);
router.get('/cong-viec-da-luu', JobManagementController.renderSaveJob);
router.get('/cong-viec-phu-hop', JobManagementController.rendersuitableJob);

router.post('/uploadApplied/:id', uploadApplied.fields([{ name: 'file1', maxCount: 1 },]), RecruitmentController.uploadApplied)

module.exports = router;