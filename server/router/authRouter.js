const response = require('../utils/response');
const createToken = require('../utils/createToken');

const router = require('express').Router();

router.post('/otpSend', (req, res) => {
    const { phone } = req.body;

    let token = createToken();
    // TODO: send otp
    // TODO: Add token to db

    res.json(response(true, { token: token }));
});

router.post('/verify', (req, res) => {
    const { token, otp } = req.body;

    // TODO: verified

    res.json(response(true));
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