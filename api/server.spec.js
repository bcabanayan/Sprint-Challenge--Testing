const request = require('supertest');
const server = require('./server.js');
const database = require('../data/dbConfig.js');

describe('The route handlers', () => {
    afterEach(async () => {
        await database('users').truncate();
    });
});