const { Schema, model } = require('mongoose');
const MedicalPrescription = require('./MedicalPrescription');

const UserSchema = new Schema({
    username: String,
    password: String,

    medicalHistory: [{ type: MedicalPrescription }]
}, { collection: 'user', timestamps: true });

module.exports = new model('User', UserSchema, 'user');