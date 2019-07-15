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
});

server.delete('/accounts/:id', async (req, res) => {
    db.deleteAccount(req.params.id);
    res.status(201).json({ message: 'account deleted!' });
});

server.post('/accounts', async (req, res) => {
    try {
        const userId = await db.createAccount(req.body);
        const user = await db.getAccountById(userId[0]);
        res.status(201).json(user[0]);
    } catch {
        res.status(500)
            .json({ message: 'cannot create account' });
    };
});

server.put('/accounts/:id', async (req, res) => {
    const { id } = req.params;
    const { name, budget } = req.body;
    await db.updateAccount(id, { name, budget });
    const user = await db.getAccountById(id);
    res.json(user[0]);
});

module.exports = server;