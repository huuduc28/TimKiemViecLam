const Company = require('../models/Company');

class CompanyController {
    //Get company name by id
    async getCompanyName (id) {
        let companyName = await Company.findById(id)
        .then ((company) => {
            return company.name
        })
        .catch((err) => {
            console.log(err)
        })  
        return companyName
    }    

    //Get company with a specific number documents
    async getCompanies (count) {
        try {
            let companies = await Company.find({}, null, {limit: count}).lean()
            return companies
        }
        catch (err) {
            console.log(err.message)
        }
    }

    //Get company by id
    async getCompanyById (id) {
        try {
            let company = await Company.findById(id).lean()
            return company
        }
        catch (err) {
            console.log(err.message)
        }
    }

    //get id company through user id
    async getIdCompanyByUserId (id) {
        try {
            return await Company.findOne({idUser: id}).lean()
        }
        catch (err) {
            console.log(err.message)

        }
    }
}

module.exports = new CompanyController();