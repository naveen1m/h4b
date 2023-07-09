const { Schema, model } = require('mongoose');

const PrescriptionSchema = new Schema({
    email: String,
    disease: String,

    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },

    medicines: [{ type: String }],

}, { collection: 'prescription', timestamps: true });

module.exports = new model('Prescription', PrescriptionSchema, 'prescription');