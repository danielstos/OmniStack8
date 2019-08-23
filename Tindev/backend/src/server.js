const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors')
const routes = require('./routes');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

connectedtUsers = {};

io.on('connection', socket => {
 const { user } = socket.handshake.query;  

 connectedtUsers[user] = socket.id;
  
 console.log('Nova conexão id:', socket.id);
 console.log(user, socket.id);

});

// GET, POST, PUT, DELETE
mongoose.connect('mongodb+srv://stack:stack@cluster0-rd8ln.mongodb.net/omnistack8?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedtUsers = connectedtUsers;
  return next();
});

app.use(express.json());
app.use(cors());
app.use(routes);

server.listen(3333);
