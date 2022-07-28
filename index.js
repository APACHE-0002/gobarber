const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());

const users = ['Diego', 'Cláudio', 'Victor']

server.get('/teste/:index', (req, res) => {
    let {index} = req.params;

    return res.json(users[index]);
})

server.listen(3000);