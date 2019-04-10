const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(cors());

// socket io realtime para quem está conectado a room
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});


// conexão com database mongodb online
mongoose.connect('mongodb+srv://feehmdb:feehmdb@cluster0-rctbj.mongodb.net/omnidropweek?retryWrites=true', {
    useNewUrlParser: true
});

app.use((req, res) => {
    req.io = io;
    return next();
});


app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));


app.use(require('./routes'));



server.listen(process.env.PORT || 3000, () => {
    console.log('Servidor rodando')
});