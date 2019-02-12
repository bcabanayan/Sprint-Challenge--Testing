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
            const response2 = await request(server).post('/games').send({ title: 'Kingdom Hearts', genre: 'Hack n Slash', releaseYear: 2007 });


            expect(response2.body).toEqual([2]);
        });

        describe('GET /games/:id', () => {
            it('responds with status code 200', async () => {
                const response = await request(server).get('/games/1');
    
                expect(response.status).toBe(200);
            });
    
            it('responds with json', async () => {
                const response = await request(server).get('/games/1');
    
                expect(response.type).toMatch(/json/i);
            });
    
            it('sends smash bros already stored in database', async () => {
                await request(server).post('/games').send({title: 'smash bros', genre: 'fighting', releaseYear: 1999, id: 1})
                const response = await request(server).get('/games/1');
    
                expect(response.body[0]).toEqual({title: 'smash bros', genre: 'fighting', releaseYear: 1999, id: 1});
            });
        });
    }); 
});