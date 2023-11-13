const mongoose = require('mongoose');
//const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

//Plugins
//mongoose.plugin(slug);
const recruitment = new Schema (
    {
        title: { type: String, required: true },
        image: { type: String },
        address: {
            street: String,
            district: {
                code: String,
                name: String,
            },
            province: {
                code: String,
                name: String,
            },
        },
        salary: { type: String },
        slug: { type: String},
        workingWay: { type: String},
        position: { type: String},
        experience: { type: String},
        description: { type: String},
        requirement: { type: String},
        benefit: { type: String},
        idCompany: { type: String },
        dateCreated: { type: Date, default: Date.now },
        deadlineSubmis: { type: Date},
        profession: { type: Number},
        status: {type: Boolean},
        appliedUser: {type: Array}
    },
);

recruitment.index({title: 'text'}) //create an index to support text search

module.exports = mongoose.model('Recruitment', recruitment);
