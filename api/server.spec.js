const request = require('supertest');
const server = require('./server.js');
const database = require('../data/dbConfig.js');

describe('The route handlers', () => {
    afterEach(async () => {
        await database('users').truncate();
    });

    describe('GET /games', () => {
        it('responds with status code 200', async () => {
            const response = await request(server).get('/games');

            expect(response.status).toBe(200);
        });

        it('responds with json', async () => {
            const response = await request(server).get('/games');

            expect(response.type).toMatch(/json/i);
        });

        it('sends an empty array by default', async () => {
            const response = await request(server).get('/users');

            expect(response.body).toEqual([]);
        });
    });
});