const Doctor = require('../model/Doctor');
const MeetingReport = require('../model/MeetingReport');
const OTP = require('../model/OTP');
const User = require('../model/User');

// col-OTP
const sendOTP = async (email) => {
    let token = require('../utils/createToken');
    let otp = require('../utils/createOTP');

    await OTP.create({ email: email, otp: otp, token: token });
    return token;
}

const verifyOTP = async (token, otp) => {
    const user = await OTP.findOne({ $and: [{ token: token }, { otp: otp }] });
    if (user) {
        await OTP.deleteMany({ email: user.email });

        if (!await isUserExisting(user.email))
            await createUser(user.email);
        return user.email;
    }
    else {
        throw 'Incorrect OTP'
    }
}

// col-User
const isUserExisting = async (email) => {
    return await User.findOne({ email: email }) != null ? true : false;
}

const getUser = async (email) => {
    return await User.findOne({ email: email });
}

const createUser = async (email) => {
    return await User.create({ email: email });
}

// col-meetingReport
const createMeetingReport = async (body) => {
    return await MeetingReport.create(body);
}

// col-Doc
const createDoctor = async (email) => {
    const data = await Doctor.create({ email: email });
    return data;
}

const searchDocWithShortestQueue = async () => {
    const data = await Doctor.aggregate([{
        $addFields: {
            size: {
                $size: "$queue"
            }
        }
    },
    {
        $sort: {
            size: 1
        }
    },
    {
        $limit: 1
    }]);
    return data;
}

const appendMeetingToDoc = async (doctor_id, meeting_id) => {
    const data = await Doctor.findByIdAndUpdate(doctor_id, { $push: { queue: meeting_id } }, { new: true });
    return data.queue.length - 1;
}

module.exports = { sendOTP, verifyOTP, createDoctor, searchDocWithShortestQueue, getUser, createMeetingReport, appendMeetingToDoc };