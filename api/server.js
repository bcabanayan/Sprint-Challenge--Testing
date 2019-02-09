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

module.exports = server;