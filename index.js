//const express = require('express');
import express from 'express';
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());

let users = ['Diego', 'Cláudio', 'Victor']

//middleware global
server.use((req, res, next) =>{
    console.time('Request Teste');
    console.log(`Método: ${req.method} URL: ${req.url}`);

    next();
    
    console.timeEnd('Request Teste');   
})

//middleware simples
//objetivo: verificar se nas requisições
//put e post estao sendo enviados os dados
//necessarios dentro de body
function checkUserExists(req, res, next){
    //se nao for encontrado dentro de req.body, 
    //a informação de usuario
    // ! = se nao existir
    if(!req.body.name){
        return res.status(400).json({ error: 'User name not found' });
    }

    return next();
}


//middleware para checagem
//se o usuario pesquisado existe 
//dentro do banco de dados,
//antes de fazer uma alteração nele
function checkUserInArray(req, res, next){
    //usuario na posição index
    //podendo existir ou não
    const user = users[req.params.index];

    //caso o usuario nao exista no index
    if(!user){
        return res.status(400).json({ error: 'User has not found!' });
    }

    //assim como req.body, retorna o corpo da requisição
    //req.user ira retornar o valor setado, que é user
    req.user = user;

    next();
}


//middleware de checagem
//caso o nickname do usuario ja exista
function checkUserNickNameExists(req,res,next){
    const {name} = req.body;

    const verification = users.includes(name)

    if(verification){
        return res.status(400).json({ error: 'User NickName already exists!' });
    }


    next();
}

//listar todos os usuarios
server.get('/users', (req,res) => {

    return res.json(users);
})

//listar um usuario
//tem o middleware checkUserInArray
//que faz a verificação se o usuario do index informado
//através da route params, existe no array
//e ja retorna o usuario[index] dentro do req
server.get('/user/:index', checkUserInArray, (req, res) => {

    return res.json(req.user);
})

//criar um usuario
//duas verificações nesta requisição
//caso nao tenha sido enviado os dados necessarios no req.body
//e caso o dado enviado ja exista no banco de dados
server.post('/users', checkUserExists, checkUserNickNameExists, (req,res) =>{
    let {name} = req.body;

   users.push(name);

    return res.json(users);
});

//alterar usuario
//requisição com duas verificações
//caso nao exista os dados necessarios em req.body
//e se o user.index existe no array
server.put('/users/:index', checkUserExists, checkUserInArray, (req,res) =>{
    let {index} = req.params;
    let {name} = req.body;

    users[index] = name;

    return res.json(users);
})

//deletar usuario
//se o usuario existe no array para ser deletado
server.delete('/users/:index', checkUserInArray, (req,res) =>{
    let {index} = req.params;

    users.splice(index, 1);

    return res.send();
})


server.listen(3000);