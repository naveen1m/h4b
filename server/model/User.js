const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: String,

    medicalHistory: [{ type: Schema.ObjectId.ObjectId, ref: 'Prescription', default: {} }]
}, { collection: 'user', timestamps: true });

module.exports = new model('User', UserSchema, 'user');