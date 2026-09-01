const pool = require('../db').pool;
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Interviews
 *   description: API for managing interviews
 */

/**
 * @swagger
 * /interviews:
 *   get:
 *     summary: Get all interviews
 *     tags: [Interviews]
 *     responses:
 *       200:
 *         description: List of interviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM interviews');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /interviews:
 *   post:
 *     summary: Create a new interview
 *     tags: [Interviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - application_id
 *               - interview_title
 *               - interview_type
 *               - interview_date
 *             properties:
 *               application_id:
 *                 type: integer
 *               interview_title:
 *                 type: string
 *               interview_type:
 *                 type: string
 *               interview_date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created interview
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */

router.post('/', async (req, res) => {
    const { application_id, interview_title, interview_type, interview_date, notes } = req.body;

    if (!application_id || !interview_title || !interview_type || !interview_date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO interviews (application_id,interview_title, interview_type, interview_date, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [application_id, interview_title, interview_type, interview_date, notes]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /interviews/{id}:
 *   patch:
 *     summary: Update an interview partially
 *     tags: [Interviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interview_title:
 *                 type: string
 *               interview_type:
 *                 type: string
 *               interview_date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated interview
 *       404:
 *         description: Interview not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { interview_title, interview_type, interview_date, notes } = req.body;

    try {
        // True dynamic PATCH implementation preventing accidental NULL overrides
        const result = await pool.query(
            `UPDATE interviews 
             SET interview_title = COALESCE($1, interview_title), 
                 interview_type = COALESCE($2, interview_type), 
                 interview_date = COALESCE($3, interview_date), 
                 notes = COALESCE($4, notes) 
             WHERE id = $5 RETURNING *`,
            [interview_title || null, interview_type || null, interview_date || null, notes || null, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Interview not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
