const Recruitment = require('../models/Recruitment')
const CompanyController = require('./CompanyController')
const RecruitmentController = require('./RecruitmentController')

class RecruiterController {
    async renderHome(req, res, next) {
        req.session.idUser = '6441905bb9eec07cda684305'
        let id = req.session.idUser
        let company = await CompanyController.getIdCompanyByUserId(id)
        let recruitmentList = await Recruitment.find({ idCompany: company._id }).lean()
        res.render('recruiter/manageRecruitment', { layout: 'home-recruiter', recruitmentList })
    }

    async deleteRecruitment(req, res, next) {
        let id = req.params.id
        let rel = await RecruitmentController.deleteRecruitment(id)
        if (rel) {
            res.status(200).json({
                code: 0,
                message: 'Successfully deleted'
            })
        }
        else {
            res.status(500).json({
                code: 2,
                message: rel
            })
        }
    }

    async detailRecruitment(req, res, next) {
        try {
            let recruitment = await RecruitmentController.detailById(req.params.id)
            //console.log(recruitment)
            res.render('detail-recruitment', { layout: 'home-recruiter', recruitment })
        }
        catch (err) {
            console.log(err.message)
        }
    }

    renderAdd(req, res, next) {
        res.render('recruiter/add-recruitment', { layout: 'home-recruiter' })
    }

    async addRecruitment(req, res, next) {
        try {
            req.session.idCompany = '64245184709eaf35e2f30b02'
            //console.log(req.file)
            //console.log (req.body)
            let recrui = {...req.body} //Copy object 
            recrui.image = req.file.filename
            recrui.status = true
            recrui.slug = recrui.title
            recrui.idCompany = req.session.idCompany
            recrui.deadlineSubmis = '2023-12-20T00:00:00.000+00:00'
            // console.log(recrui)
            let recruitment = new Recruitment (recrui)
            await recruitment.save()
            res.redirect('/recruiter')
        }
        catch (err) {
            console.log(err.message)
        }
    }
}

module.exports = new RecruiterController();