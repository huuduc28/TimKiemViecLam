const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema(
    {
        fullName: { type: String, required: true },
        phone: { type: String },
        avatar: { type: String },
        status: { type: Boolean },
        account: {
            email: { type: String, required: true },
            password: { type: String }
        },
        role: { type: Number },
        position: { type: String },

        education: { type: String },
        introduction: { type: String },
        CV: { type: String },
        achivement: { type: Array },
        skill: { type: Array },
        speciality: { type: Array },
        savedJob: { type: Array },
        appliedJob: [
            {
                jobId: String,
                cv: String,
                recomdLetter: String
            }
        ]
    },
)

module.exports = mongoose.model('User', user);