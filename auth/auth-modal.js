const db = require('../data/dbConfig')

module.exports = {
    insert,
    get,
    findBy,
    findByUsername
}

function insert(user){
    return db('users').insert(user, 'id')
    .then(([id]) => id)    
}

function get(){
    return db('users')
}


function findBy(where){
    return db('users').where(where)
}


function findByUsername(username){
    return findBy({username}).first()
}