const request = require('supertest');
const server = require('./server.js');
const database = require('../data/dbConfig.js');

describe('The route handlers', () => {
    afterEach(async () => {
        await database('games').truncate();
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
            const response = await request(server).get('/games');

            expect(response.body).toEqual([]);
        });
    });

    describe('POST /games', () => {
        it('responds with status code 201', async () => {
            const body = { title: 'Pacman', genre: 'Arcade', releaseYear: 1980 };
            const response = await request(server).post('/games').send(body);

            expect(response.status).toBe(201);
        });

        it('responds with status 422 when body is missing data', async () => {
            const body = { title: 'Grand Theft Auto' }
            const response = await request(server).post('/games').send(body);

            expect(response.status).toBe(422);
        });

        it('responds with an array containing a new id', async () => {
            const body = { title: 'Super Smash Bros', genre: 'Fighting', releaseYear: 1999 }
            const response = await request(server).post('/games').send(body);

            expect(response.body).toBe([1]);
        });
    }); 
});