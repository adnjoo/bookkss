const request = require('supertest');

const { app } = require('../../app');

describe('getPublicReviews', () => {
  it('should get public reviews', async () => {
    const response = await request(app).get('/reviews/get-public-reviews');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
    // console.log(response.body.length);
  });
});
