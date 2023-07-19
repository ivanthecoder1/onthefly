// store controller functions to perform CRUD operations associated with the activities table

// allow us to make queries to the database
import { pool } from '../config/database.js'

// Insert a new activity
const createActivity = async (req, res) => {
    try {
        // Extract the necessary properties from the request body
        const { trip_id, activity, num_votes } = req.body;

        // Execute the database insertion query using the pool.query method
        const results = await pool.query(
        `INSERT INTO activities (trip_id, activity, num_votes)
        VALUES ($1, $2, 0)
        RETURNING *`, [trip_id, activity, num_votes]);
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Retrieve all activities
const getActivities = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM activities');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Retrieve all activities associated with a specific trip
const getTripActivities = async (req, res) => {
    try {
        const trip_id = parseInt(req.params.trip_id);
        const results = await pool.query('SELECT * FROM activities WHERE trip_id = $1', [trip_id]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Update the number of likes for a specific activity
const updateActivityLikes = async (req, res) => {
    try {
        const { num_votes } = req.body;
        const id = parseInt(req.params.id);
        const updateVotesQuery = 'UPDATE activities SET num_votes = $1 WHERE id = $2 RETURNING *;';
        const results = await pool.query(updateVotesQuery, [num_votes, id]);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Delete a single activity
const deleteActivity = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deleteActivityQuery = 'DELETE FROM activities WHERE id = $1 RETURNING *;';
        const results = await pool.query(deleteActivityQuery, [id]);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    createActivity,
    getActivities,
    getTripActivities,
    updateActivityLikes,
    deleteActivity
}