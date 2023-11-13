const RecruitmentController = require('./RecruitmentController')
class JobManagementController {
    //Comment path and method to use this function
    // GET: /
    async renderAppliedJob (req, res, next) {
        let recruitments = await RecruitmentController.getRecruitments(12)
        let appliedJobs = await RecruitmentController.getAppliedJob(12)
        res.render('applied-job', {appliedJobs,recruitments})
    }
    async renderSaveJob (req, res,next) {
        let saveJob = await RecruitmentController.getSaveJob(12)
        res.render('save-job',{saveJob})
    } 
    async rendersuitableJob (req, res,next) {
        let recruitments = await RecruitmentController.getRecruitments(12)
        res.render('suitable-Job',{recruitments})
    } 
}

module.exports = new JobManagementController();