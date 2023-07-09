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

const createUser = async (email) => {
    return await User.create({ email: email });
}

// const createUser = async (email) => {
//     return await User.create({ email: email });
// }

module.exports = { sendOTP, verifyOTP };