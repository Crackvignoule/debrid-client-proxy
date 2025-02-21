import { describe, it, expect } from 'vitest';

describe('Debrid Routes', () => {
    it('should be a valid link', async () => {
        // check that https://1fichier.com/?p8xpzk72gcqunynurm2p is accessible
        const response = await fetch('https://1fichier.com/?p8xpzk72gcqunynurm2p');
        expect(response.status).toBe(200);
    }
    );
    
});    
