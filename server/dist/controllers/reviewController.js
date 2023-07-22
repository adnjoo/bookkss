"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = exports.getUserReviews = void 0;
const db_1 = require("../db");
const getUserReviews = async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        res.status(400).send('Missing userid parameter');
        return;
    }
    try {
        const query = {
            text: 'SELECT * FROM "Review" WHERE "userId" = $1',
            values: [userId],
        };
        const result = await db_1.pool.query(query);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Error querying the database' });
    }
};
exports.getUserReviews = getUserReviews;
const addReview = async (req, res) => {
    const { title, body, userId } = req.body;
    if (!title || !body || !userId) {
        res.status(400).json({ error: 'Missing required fields.' });
        return;
    }
    const review = {
        title,
        body,
        userId,
    };
    db_1.pool.query('INSERT INTO "Review" (title, body, "userId") VALUES($1, $2, $3)', [review.title, review.body, review.userId], (error, result) => {
        if (error) {
            console.error('Error inserting review into PostgreSQL database:', error);
            res
                .status(500)
                .json({ error: 'Error inserting review into the database' });
            return;
        }
        res.json({ message: 'Review added successfully!' });
    });
};
exports.addReview = addReview;
