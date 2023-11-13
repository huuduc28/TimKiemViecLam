const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerRecruitment')

const RecruiterController = require('../controllers/RecruiterController')

router.get('/', RecruiterController.renderHome);
router.delete('/:id', RecruiterController.deleteRecruitment)
router.get('/detail/:id', RecruiterController.detailRecruitment)
router.get('/add', RecruiterController.renderAdd)
router.post('/add', upload.single('image'), RecruiterController.addRecruitment)

module.exports = router;