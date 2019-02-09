const express = require('express');

const db = require('../games/gamesHelpers.js');

const server = express();

server.use(express.json());

module.exports = server;