const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json('this is my first db');
});

server.get('/accounts', async (req, res) => {
    const accounts = await db.getAccounts();
    res.json(accounts);
});

server.get('/accounts/:id', async (req, res) => {
    const accounts = await db.getAccountById(req.params.id);
    res.json(accounts[0]);
})

module.exports = server;