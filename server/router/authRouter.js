const response = require('../utils/response');

const authServices = require('../services/authServices')

const router = require('express').Router();

router.post('/otpSend', async (req, res) => {
    const { email } = req.body;

    try {
        const token = await authServices.sendOTP(email);

        return res.json(response(true, { token: token }));
    }
    catch (err) {
        return res.json(response(false, err));
    }
});

router.post('/verify', (req, res) => {
    const { token, otp } = req.body;

    try {
        let email = authServices.verifyOTP(token, otp);

        return res.json(response(true, { email }));
    } catch (error) {
        return res.json(response(false, error))
    }
});

router.post('/registration', (req, res) => {
    const { email, name, age, reason } = req.body;

    // TODO: sort all doctors ascending order of queue no.

    // TODO: create meetingReport
    let meetingReport = { name, age, reason, email } // append doctorid after getting earliest available doc
    // Imp->[query db of doctor with least queue size, and add to it]
    // it=> meeting schema.;

    // i=queue size
    let i = 5;
    // x=no of mins * i
    let x = 10 * i;

    res.json(response(true, { time: x }))
});


module.exports = router;