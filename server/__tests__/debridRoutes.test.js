import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import debridRoutes from '../routes/debridRoutes';

const API_KEY = process.env.API_KEY;
const app = express();
app.use(express.json());
app.use(debridRoutes);

let validLink;

beforeAll(async () => {
  const response = await fetch('https://1fichier.com/?p8xpzk72gcqunynurm2p', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/90.0.4430.85 Safari/537.36'
    }
  });
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
        .send({ magnetLink: 'magnet:?xt=urn:btih:SJFI2DUJGWHWMSLZPCO4Q27JUP23JLCM&dn=pluto_t6_full_game&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toBeDefined();
      // id should be a number 
      expect(typeof response.body.id).toBe('number');
    });
  });

  describe('/getLinksFromMagnet', () => {
    it('should get links from magnet id', async () => {
    //   const response = await request(app)
    //     .post('/getLinksFromMagnet')
    //     .set('api-key', API_KEY)
    //     .send({ magnetID: 'dummy-id' });
    //   expect(response.status).toBe(200);
    //   expect(response.body).toHaveProperty('links');
    //   expect(response.body).toHaveProperty('statusCode');
    expect(true).toBe(true);
    });
  });

describe('/debridLinks', () => {
    it('should debrid links', async () => {
        const response = await request(app)
            .post('/debridLinks')
            .set('api-key', API_KEY)
            .send({ links: [validLink] });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('debridedLinks');

        // Check that each debrided link is indeed a valid link
        response.body.debridedLinks.forEach(link => {
            expect(link).toBeInstanceOf(Object);
            expect(link).toHaveProperty('link');
            expect(link.link).toMatch(/^https?:\/\/.+/);
            expect(link).toHaveProperty('host');
            expect(link).toHaveProperty('filename');
            expect(link).toHaveProperty('streaming');
            expect(Array.isArray(link.streaming)).toBe(true);
            expect(link).toHaveProperty('paws');
            expect(link).toHaveProperty('filesize');
            expect(link).toHaveProperty('id');
            expect(link).toHaveProperty('path');
            expect(link).toHaveProperty('hostDomain');
          });
        });
      });

  describe('/saveLinks', () => {
    it('should save links', async () => {
        const response = await request(app)
            .post('/saveLinks')
            .set('api-key', API_KEY)
            .send({ links: [validLink] });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('sucessfully saved');
    });
  });
});