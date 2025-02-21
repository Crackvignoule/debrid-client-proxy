// import request from 'supertest';
// import { describe, it, expect } from 'vitest';
// import app from '../app'; 

// describe('Magnet Routes', () => {
//     it('should return a list of magnets', async () => {
//         const response = await request(app).get('/api/magnets');
//         expect(response.status).toBe(200);
//         expect(response.body).toBeInstanceOf(Array);
//     });

//     it('should create a new magnet', async () => {
//         const newMagnet = { name: 'Test Magnet' };
//         const response = await request(app).post('/api/magnets').send(newMagnet);
//         expect(response.status).toBe(201);
//         expect(response.body.name).toBe(newMagnet.name);
//     });
// });
import { describe, it, expect } from 'vitest';

describe('Debrid Routes', () => {
    it('should be a valid link', async () => {
        // check that https://1fichier.com/?p8xpzk72gcqunynurm2p is accessible
        const response = await fetch('https://1fichier.com/?p8xpzk72gcqunynurm2p');
        expect(response.status).toBe(200);
    }
    );
    
});    
