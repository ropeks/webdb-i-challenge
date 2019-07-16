const knex = require('knex');

const db = knex({
    client: 'sqlite3',
    connection: {
      filename: './data/budget.db3',
    },
    useNullAsDefault: true,
});

function getAccounts() {
    return db('accounts');
};

function getAccountById(id) {
    return db('accounts').where({ id });
};

function deleteAccount(id) {
    return db('accounts').where({ id }).del();
};

function createAccount({ name, budget }) {
    return db('accounts').insert({ name, budget });
};

function updateAccount(id, { name, budget }) {
    return db('accounts').where({ id }).update({ name, budget });
};

const configOptions = require('../knexfile').development;
const config = knex(configOptions);

module.exports = {
    config,
    getAccounts,
    getAccountById,
    deleteAccount,
    createAccount,
    updateAccount
};