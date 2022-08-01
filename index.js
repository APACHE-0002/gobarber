const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());

let users = ['Diego', 'Cláudio', 'Victor']

//listar todos os usuarios
server.get('/users', (req,res) => {

    return res.json(users);
})

//listar um usuario
server.get('/user/:index', (req, res) => {
    let {index} = req.params;

    return res.json(users[index]);
})

//criar um usuario
server.post('/users', (req,res) =>{
    let {name} = req.body;

    users = {
        users,
        name
    }


    return res.json(users);
});


server.listen(3000);