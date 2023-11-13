const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

//Plugins
mongoose.plugin(slug);
const report = new Schema (
    {
        title: { type: String, required: true },
        userReport: {type: String},
        typeReport: {type: Number},
        idReport: {type: String},
        description: {type: String},
        images: {type: Array}
    },
);

module.exports = mongoose.model('Report', report);
