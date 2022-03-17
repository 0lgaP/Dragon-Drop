const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const socketio = require('socket.io');
const http = require('http');
const db = require('./configs/db.config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
// listeners 
io.on('connection', socket => {
  console.log("Client Connected!");
})

app.use('/', indexRouter);
app.use('/users', usersRouter(db));

module.exports = app;
