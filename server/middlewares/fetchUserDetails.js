const response = require("../utils/response");
const authServices = require('../services/authServices');

module.exports = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await authServices.getUser(email);
        if (user) {
            req.user = user;
            next();
        }
        else throw 'User not found';
    }
    catch (err) {
        return res.json(response(false, err));
    }
}