const { Schema, model } = require('mongoose');

const DoctorSchema = new Schema({
    email: { type: String, unique: true },

    queue: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }]
}, { collection: 'doctor', timestamps: true });

module.exports = model('Doctor', DoctorSchema, 'doctor');