const express = require('express');
const connect = require('./configs/mongodb');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('api working');
})

connect().then(() => {
    app.listen(PORT, () => {
        console.log('server started');
    });
});
