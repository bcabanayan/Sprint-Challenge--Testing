const express = require('express');

const db = require('../games/gamesHelpers.js');

const server = express();

server.use(express.json());

server.get('/games', async (req, res) => {
    const rows = await db.getGames();
    res
        .status(200)
        .json(rows);
});

server.post('/games', async (req, res) => {
    const newGame = req.body;
    if (newGame.title && newGame.genre) {
        const ids = await db.addGame(newGame);
        res
            .status(201)
            .json(ids);
    }
    else {
        res
            .status(422)
            .json({ message: 'missing title or genre'});
    }
});

module.exports = server;