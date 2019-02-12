const db = require('../data/dbConfig.js');

module.exports = {
    getGames,
    addGame,
    getGameById
}

async function getGames() {
    return db('games');
}

async function addGame(newGame) {
    return db('games')
        .insert(newGame);
}

async function getGameById(id) {
    return db('games')
        .where('id', Number(id));
}