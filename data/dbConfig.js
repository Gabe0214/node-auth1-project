const knex = require('knex');

const knexConnfig = require('../knexfile')

module.exports = knex(knexConnfig.development)