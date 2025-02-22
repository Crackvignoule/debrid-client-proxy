import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import magnetRoutes from '../routes/magnetRoutes';

const API_KEY = process.env.API_KEY;
const app = express();
app.use(express.json());
app.use(magnetRoutes);

// /status
describe('Magnet Routes', () => {
    it('should get magnet status', async () => {
        const sessionId = 1000;
        const counter = 1;
        const response = await request(app)
            .get('/status')
            .set('api-key', API_KEY)
            .query({ session: sessionId, counter });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('magnets');
    });
});

