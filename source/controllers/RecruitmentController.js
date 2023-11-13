const Recruitment = require('../models/Recruitment');
const CompanyController = require('./CompanyController')
const User = require('../models/User')

class RecruitmentController {
    //Comment path and method to use this function
    //GET /abc

    async getRecruitments(perPage, page) {
        let skip = (perPage * page) - perPage //In first page, skip 0 index
        let data = await Recruitment.find({ status: true }, null, { limit: perPage, skip: skip }).lean()
        // console.log(data.countDocuments())
        for (let i = 0; i < data.length; i++) {
            let companyName = await CompanyController.getCompanyName(data[i].idCompany)
            data[i]['companyName'] = companyName
        }
        return data
    }

    //:GET /recruitment/savedJob/:id
    //Saved / unsaved job 
    async savedJob(req, res, next) {
        try {
            req.session.userId = '6441963a10401ca45f539014'
            let arraySavedJob = []
            arraySavedJob = (await User.findById(req.session.userId)).savedJob
            let index = arraySavedJob.indexOf(req.params.id) //check id recruitment is exists
            let code
            if (index > - 1) {
                //Recruitment is exists in user collection
                code = 0 //Remove recruitment saved
                arraySavedJob.splice(index, 1)
            }
            else {
                code = 1
                arraySavedJob.push(req.params.id) //Add new recruiment into savedJob
            }
            await User.findByIdAndUpdate(req.session.userId, { savedJob: arraySavedJob })
            return res.status(200).json({
                code: code,
                message: 'Saved / Unsaved job successfully'
            })
        }
        catch (err) {
            console.log(err.message)
            return res.status(500).json({ code: 2, message: err.message })
        }
    }

    async searchRecruitment(req, res, next) {
        try {
            const { q, profession, salary, workingWay, position, province, district } = req.query //Get all field search from query
            //Check all fields is empty or not, if not empty, add to object to search
            let obj = {}
            if (q) {
                obj['$text'] = { $search: q }
            }
            if (profession) {
                obj.profession = profession
            }
            if (workingWay) {
                obj.workingWay = workingWay
            }
            if (position) {
                obj.position = position
            }
            if (province) {
                obj['address.province.code'] = province
            }
            if (district) {
                obj['address.district.code'] = district
            }
            let recruitments = await Recruitment.find(obj).lean() //search
            //console.log(recruitments)
            let count = await Recruitment.find(obj).lean().countDocuments() //count number of documents which look for

            for (let i = 0; i < recruitments.length; i++) {
                let companyName = await CompanyController.getCompanyName(recruitments[i].idCompany)
                recruitments[i]['companyName'] = companyName
            }
            //console.log(recruitments)
            res.render('search-job', { query: q, recruitments, count })
        }
        catch (err) {
            console.log(err.message)
        }
    }

    async detailRecruitment(req, res, next) {
        try {
            let spl = req.params.slugID.split('-')
            let id = spl[spl.length - 1]
            let detail = await Recruitment.findById(id).lean()

            let company = await CompanyController.getCompanyById(detail.idCompany)
            //console.log(company)
            let shareURL = `http://${process.env.HOST}:${process.env.PORT}/recruitment/detail/${req.params.slugID}`
            res.render('detail-job', { detail, shareURL, company })
        }
        catch (err) {
            console.log(err.message)
        }
    }

    async getSaveJob(count) {
        try {
            let users = await User.find().limit(count).lean()
            let data = await Recruitment.find({ _id: { $in: users.map(user => user.savedJob) } }).limit(count).lean()
            for (let i = 0; i < data.length; i++) {
                let companyName = await CompanyController.getCompanyName(data[i].idCompany)
                data[i]['companyName'] = companyName
            }
            return data
        }
        catch (err) {
            console.log(err.message)
        }
    }
    async getAppliedJob(count) {
        try {
            let arrayuser = []
            arrayuser = await User.find().limit(count).lean()
            console.log(arrayuser)
            let userId = []
            for (let i = 0; i < arrayuser.length; i++) {
                userId = arrayuser[i]._id;//get job id data
            }

            let user = await User.findById(userId).lean();
            let appliedJobIds = user.appliedJob.map(job => job.jobId);
            console.log(appliedJobIds);
            //get data from recruitment
            let data = await Recruitment.find({ _id: appliedJobIds }).limit(count).lean()
            for (let i = 0; i < data.length; i++) {
                let companyName = await CompanyController.getCompanyName(data[i].idCompany)
                data[i]['companyName'] = companyName
            }
            return data
        }
        catch (err) {
            console.log(err.message)
        }
    }


    async deleteRecruitment(id) {
        try {
            await Recruitment.findByIdAndDelete(id)
            return true
        }
        catch (err) {
            console.log(err.message)
            return err.message
        }
    }

    async detailById(id) {
        try {
            return await Recruitment.findById(id).lean()
        }
        catch (err) {
            console.log(err.message)
        }
    }

    async uploadApplied(req, res) {
        try {
            req.session.userId = '6441963a10401ca45f539014'
            let letter = req.body.letter //get data from form
            let arrayAppliedJob = []
            let appliedUser = []
            const file = req.files.file1[0]; //get data from form
            const fileName = file.originalname; // get name of file

            arrayAppliedJob = (await User.findById(req.session.userId)).appliedJob
            appliedUser = (await Recruitment.findById(req.params.id)).appliedUser
            console.log(appliedUser)

            let jobApplication = {
                jobId: req.params.id,
                cv: fileName,
                recomdLetter: letter,
                response: {
                    code: 1,
                    message: 'Chào bạn, hẹn gặp bạn tại địa chỉ ABC để hẹn phỏng vấn nhé'
                }
            }; // create object to add data
            let indexUs = arrayAppliedJob.indexOf(req.params.id) //check id recruitment is exists
            let index = appliedUser.indexOf(req.session.userId)

            if (indexUs > - 1) {
                //Recruitment is exists in user collection
                arrayAppliedJob.splice(index, 1)
            }
            else {
                arrayAppliedJob.push(jobApplication) //Add new recruiment
            }

            if (index > - 1) {
                // current user is applying for a job
                appliedUser.splice(index, 1)
            }
            else {
                appliedUser.push(req.session.userId) //Add new user
            }
            //find and update User and Recruitment
            await User.findByIdAndUpdate(req.session.userId, { appliedJob: jobApplication })

            await Recruitment.findByIdAndUpdate(req.session.userId, { appliedUser: appliedUser })

            res.redirect('/recruitment/cong-viec-da-ung-tuyen')
        }
        catch (err) {
            console.log(err.message)
            return res.status(500).json({ code: 2, message: err.message })
        }
    }
}

module.exports = new RecruitmentController();