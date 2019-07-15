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

server.post('/accounts', async (req, res) => {
    try {
        const userId = await db.createAccount(req.body);
        const user = await db.getAccountById(userId[0]);
        res.status(201).json(user[0]);
    } catch {
        res.status(500)
            .json({ message: 'cannot create account' });
    }
})

module.exports = server;