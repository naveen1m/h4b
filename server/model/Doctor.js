const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: String,
    password: String,

    queue: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }]
}, { collection: 'doctor', timestamps: true });

module.exports = new model('Doctor', UserSchema, 'doctor');