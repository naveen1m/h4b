const { Schema, model } = require('mongoose');
const MeetingSchema = new Schema({
    email: String,
    token: Number


}, { collection: 'otp', timestamps: true });

module.exports = new model('Meeting', MeetingSchema, 'meeting');