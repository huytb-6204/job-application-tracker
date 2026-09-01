const pool = require('../db').pool;
const express = require('express');
const router = express.Router();    

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: API for managing job applications
 */

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: List of applications
 */ 



 
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM applications');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Create a new application
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *               status:
 *                 type: string
 *               applied_date:
 *                 type: string
 *               location:
 *                 type: string
 *               job_url:
 *                 type: string
 *               follow_up_date:
 *                 type: string
 *               note:
 *                 type: string
 *             required:
 *               - company
 *               - position
 *               - status
 *               - applied_date
 *               - location
 *               - job_url
 *               - follow_up_date
 *               - note
 *     responses:
 *       201:
 *         description: Application created successfully
 */ 

router.post('/', async (req, res) => {
    const { company, position, status, applied_date, location, job_url, follow_up_date, note } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO applications (company, position,location, job_url, applied_date, follow_up_date,note, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [company, position, location, job_url, applied_date, follow_up_date, note, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Missing required fields' });
    }
});

/** 
 * @swagger
 * /applications/{id}:
 *   put:
 *     summary: Update an application
 *     tags: [Applications]
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
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *               status:
 *                 type: string
 *               applied_date:
 *                 type: string
 *               location:
 *                 type: string
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Application updated successfully
 */

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { company, position, status, applied_date, location, note } = req.body;
    try {
        const result = await pool.query(
            'UPDATE applications SET company = $1, position = $2, status = $3, applied_date = $4, location = $5, note = $6 WHERE id = $7 RETURNING *',
            [company, position, status, applied_date, location, note, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     summary: Delete an application
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Application deleted successfully
 */ 


/**
 * @swagger
 * /applications/{id}:
 *   patch:
 *     summary: Update the status of an application
 *     tags: [Applications]
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
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Application status updated successfully
 */

router.patch('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM applications WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.json({ message: 'Application deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;