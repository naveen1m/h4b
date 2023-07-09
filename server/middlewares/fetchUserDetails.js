const response = require("../utils/response");

module.exports = async (req, res) => {
    try {
        // TODO: fetch user from db

        // if (user) {
        // req.user=user;
        next();
        // }
        // else throw 'User not found';
    }
    catch (err) {
        return res.json(response(false, err));
    }
}