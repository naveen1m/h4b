const { Schema, model } = require('mongoose');

const MeetingSchema = new Schema({
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    email: String,
    problem: String,
    name: String,
    age: Number,
    address: String,
    district: String,
    city: String,
    pin: Number,
    state: String,
    gender: String,
    meetingLink: String,
    pastRecord: [{ type: Schema.Types.ObjectId, ref: 'Prescription' }]

}, { collection: 'meeting', timestamps: true });

module.exports = model('Meeting', MeetingSchema, 'meeting');