const db = require('../data/dbConfig.js');

module.exports = {
    getGames,
    addGame
}

async function getGames() {
    return db('games');
}

async function addGame(newGame) {
    return db('games')
        .insert(newGame);
}