class StaffController {
    //Comment path and method to use this function
    // GET: /
    async renderHome(req, res, next) {
        res.render('staff/home',{layout:false})
    }
}

module.exports = new StaffController();