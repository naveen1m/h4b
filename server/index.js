const express = require('express');
const connect = require('./configs/mongodb');
const authRouter = require('./router/authRouter');

const app = express();
const PORT = 3000;

app.use(express.json());


app.get('/', (req, res) => {
    res.send('api working');
})

app.use('/auth', authRouter)

connect().then(() => {
    app.listen(PORT, () => {
        console.log('server started');
    });
});
