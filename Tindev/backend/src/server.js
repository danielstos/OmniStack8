const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const routes = require('./routes');
const server = express();

/*server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });*/

// GET, POST, PUT, DELETE
mongoose.connect('mongodb+srv://stack:stack@cluster0-rd8ln.mongodb.net/omnistack8?retryWrites=true&w=majority',{
    useNewUrlParser:true
});

server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(3333); 

