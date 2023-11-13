const Report = require ('../models/Report')

class ReportController {
    //Upload report into db
    async uploadReport (req, res, next) {
        try {
            const {description, title} = req.body
            const fileList = req.files
            //If fields is empty, throw err
            if (!description || !fileList || !title) {
                next ()
            }

            //Get list of files
            let arrayFiles = []
            for (let i = 0; i < fileList.length; i++) {
                arrayFiles.push(fileList[i].filename)
            }

            let report = new Report({
                description,
                images: arrayFiles,
                title
            })
            //Save to db
            report = await report.save()
            return res.status(200).json(
                {
                    code: 0,
                    message: 'Success',
                }
            )
        }
        catch (err) {
            //Catch error and send to client
            console.log(err.message)
            return res.status(500).json({
                code: 2,
                message: err.message
            })
        }
    }
}
module.exports = new ReportController();