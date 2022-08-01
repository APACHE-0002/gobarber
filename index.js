const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

//ele esta criptografando o texto 'shhhhhh'
var tokenTeste = jwt.sign({ foo: 'bar' }, 'shhhhh');

var tokenID = jwt.sign({ foo: 'bar'}, uuid.v4());

const server = express(); 
server.use(bodyParser.json());

var clients = [];

server.get('/token', (req, res) =>{


    return res.json(tokenID + id)
})

server.get('/consultclients', (req,res) =>{
    let amount = req.query.amount;

    
    if(amount){
        const slicedClients = clients.slice(0, amount);
        
        return res.json({slicedClients})
    }

    return res.json({clients})
})

server.post('/createclient', (req, res) =>{
    const data = req.body;
    const newClient = {
        'id': uuid.v4(),
        'name': req.body.name,
        'poder': req.body.poder
        //'token'?: req.header.authorization
    }
    clients = [  
        ...clients, 
        newClient
    ]

    return res.json({clients})
})

server.put('/modifyclient/:id', (req, res) =>{
    let client = clients.findIndex(value => value.id == req.params.id)

    const newClient = {
        'id': req.params.id,
        'name': req.body.name,
        'poder': req.body.poder
    }
    
    clients[client] = newClient;
    
    res.json({clients})
})

server.delete('/clientdelete/:id', (req, res) =>{
    let client = clients.findIndex(value => value.id == req.params.id)

    clients.splice(client, 1);

    res.json({clients})
})

server.listen(3003);