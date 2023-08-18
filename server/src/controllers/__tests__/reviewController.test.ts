const request = require('supertest');
const jwt = require('jsonwebtoken');

const { app } = require('../../app');

const testUserId = 1;
const mockToken = jwt.sign(
  { userId: testUserId },
  process.env.SECRET as string
);
let reviewId: number;

describe('upsertReview', () => {
  it('should insert a new review successfully', async () => {
    const reviewData = {
      title: 'Test Review',
      body: 'This is a test review.',
      userId: testUserId,
    };

    const response = await request(app)
      .post('/reviews/upsert-review')
      .send(reviewData);

    reviewId = response.body.id;
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Review inserted successfully!');
  });

  it('should update an existing review successfully', async () => {
    const reviewData = {
      id: reviewId,
      title: 'Test Review',
      body: 'This is a modification.',
      userId: testUserId,
    };

    console.log(reviewData);

    const response = await request(app)
      .post('/reviews/upsert-review')
      .send(reviewData);

    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Review updated successfully!');
  });
});

describe('deleteReview', () => {
  it('should delete a review successfully', async () => {
    const reviewData = {
      id: reviewId,
      userId: testUserId,
    };

    console.log(reviewData);

    const response = await request(app)
      .delete('/reviews/delete-review')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(reviewData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Review deleted successfully!');
  });
});

describe('getPublicReviews', () => {
  it('should get public reviews', async () => {
    const response = await request(app).get('/reviews/get-public-reviews');

    expect(response.status).toBe(200);

    expect(response.body).toEqual(expect.any(Array));
    // console.log(response.body.length);
  });
});
