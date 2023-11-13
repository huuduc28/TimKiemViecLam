const mongoose = require('mongoose');
//const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
 
//Plugins
//mongoose.plugin(slug);
const company = new Schema (
    {
        name: { type: String, required: true },
        introduce: { type: String },
        employees: { type: Number },
        website: { type: String },
        address: {type: String},
        avatarImg: {type: String},
        coverImg: {type: String},
        slug: { type: String},
        idUser: {type: String, unique: true}
    },
);

module.exports = mongoose.model('Company', company);
