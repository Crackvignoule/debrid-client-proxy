import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import request from 'supertest';
import { beforeAll, describe, it, expect } from 'vitest';
import debridRoutes from '../routes/debridRoutes';

const API_KEY = process.env.API_KEY;
const app = express();
app.use(express.json());
app.use(debridRoutes);

let validLink;

beforeAll(async () => {
  const response = await fetch('https://1fichier.com/?p8xpzk72gcqunynurm2p');
  if (response.status === 200) {
    validLink = 'https://1fichier.com/?p8xpzk72gcqunynurm2p';
  }
});

describe('Debrid Routes', () => {
  it('should have a valid link', () => {
    expect(validLink).not.toBeUndefined();
  });

  describe('/getMagnetID', () => {
    it('should get magnet ID from magnet link', async () => {
      const response = await request(app)
        .post('/getMagnetID')
        .set('api-key', API_KEY)
        .send({ magnetLink: 'magnet:?xt=urn:btih:abcdef' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });

    it('should get magnet ID from torrent file', async () => {
      const response = await request(app)
        .post('/getMagnetID')
        .set('api-key', API_KEY)
        .attach('torrent', Buffer.from('dummy torrent content'), 'test.torrent');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('/getLinksFromMagnet', () => {
    it('should get links from magnet id', async () => {
      const response = await request(app)
        .post('/getLinksFromMagnet')
        .set('api-key', API_KEY)
        .send({ magnetID: 'dummy-id' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('links');
      expect(response.body).toHaveProperty('statusCode');
    });
  });

  describe('/debridLinks', () => {
    it('should debrid links', async () => {
      const response = await request(app)
        .post('/debridLinks')
        .set('api-key', API_KEY)
        .send({ links: ['link1', 'link2'] });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('debridedLinks');
    });
  });

  describe('/saveLinks', () => {
    it('should save links', async () => {
      const response = await request(app)
        .post('/saveLinks')
        .set('api-key', API_KEY)
        .send({ links: ['link1', 'link2'] });
      expect(response.status).toBe(200);
    });
  });
});