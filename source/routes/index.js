const express = require('express')
const recruitmentRouter = require('./recruitment')
const homeRouter = require('./home')
const router = express.Router()
const reportRouter = require('./report')
const recruiterRouter = require('./recruiter')

router.get('/', homeRouter)
router.use('/recruitment', recruitmentRouter)
router.use('/report', reportRouter)
router.use('/recruiter', recruiterRouter)

const staffRouter = require('./staff')
router.get('/', homeRouter)
router.use('/recruitment', recruitmentRouter)
router.use('/staff', staffRouter)

router.use('/', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})
module.exports = router;
