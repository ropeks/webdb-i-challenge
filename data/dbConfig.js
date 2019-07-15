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
}

function getAccountById(id) {
    return db('accounts').where({ id });
}

function createAccount({ name, budget }) {
    return db('accounts').insert({ name, budget });
}

const configOptions = require('../knexfile').development;

module.exports = {
    getAccounts,
    getAccountById,
    createAccount
};