const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


io.on('connection', socket => {
    console.log('ok');
});

mongoose.connect('mongodb+srv://feehmdb:feehmdb@cluster0-rctbj.mongodb.net/omnidropweek?retryWrites=true', {
    useNewUrlParser: true
});

app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));


app.use(require('./routes'));

server.listen(3000, () => {
    console.log('ok')
});