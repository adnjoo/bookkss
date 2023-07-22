"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = exports.getUserReviews = void 0;
const db_1 = require("../db");
const getUserReviews = async (req, res) => {
    const userid = req.query.userid;
    if (!userid) {
        res.status(400).send('Missing userid parameter');
        return;
    }
    try {
        const query = {
            text: 'SELECT * FROM "Review" WHERE userid = $1',
            values: [userid],
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
    const { title, body, userid } = req.body;
    if (!title || !body || !userid) {
        res.status(400).json({ error: 'Missing required fields.' });
        return;
    }
    const review = {
        title,
        body,
        userid,
    };
    db_1.pool.query('INSERT INTO "Review" (title, body, userid) VALUES($1, $2, $3)', [review.title, review.body, review.userid], (error, result) => {
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
