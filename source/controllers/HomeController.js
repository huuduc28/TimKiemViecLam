const Recruitment = require('../models/Recruitment')
const CompanyController = require('./CompanyController')
const RecruitmentController = require('./RecruitmentController')

class HomeController {
    //Comment path and method to use this function
    // GET: /
    async renderHome (req, res, next) {
        let perPage = 12 // Number of recruitments per page
        let page = req.query.page || 1 //Page which user wants to show 
        
        let recruitments = await RecruitmentController.getRecruitments(perPage, page)
        const count = await Recruitment.countDocuments({status: true}) //Get number of pages
        const paginationRe = {
            currentPage: page,
            pageCount: Math.ceil(count / perPage)
        }
        let companies = await CompanyController.getCompanies(12)
        
        res.render('home', {recruitments, paginationRe, companies})
    }
}

module.exports = new HomeController();