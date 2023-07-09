const { Schema, model } = require('mongoose');

const PrescriptionSchema = new Schema({
    username: String,
    disease: String,

    medicines: [{ type: String }],
}, { collection: 'user', timestamps: true });

module.exports = new model('User', PrescriptionSchema, 'user');