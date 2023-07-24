// store controller functions to perform CRUD operations associated with the destinations table

// allow us to make queries to the database
import { pool } from '../config/database.js'


// Insert a new destination
const createDestination = async (req, res) => {
    try {
        // Extract the necessary properties from the request body
        const { destination, description, city, country, img_url, flag_img_url } = req.body;

        // Execute the database insertion query using the pool.query method
        const results = await pool.query(
            `INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [destination, description, city, country, img_url, flag_img_url]
        );

        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};


// Retrieve all destinations
const getDestinations = async (req, res) => {
    try {
        // Execute the database query to retrieve all rows from the "destinations" table
        const results = await pool.query('SELECT * FROM destinations ORDER BY id ASC');

        // If the query is successful, send the result (rows) as a JSON response with a status code of 200 (OK)
        res.status(200).json(results.rows);
    } catch (error) {
        // If any error occurs during the database operation, send the error message back to the client as a JSON response with a status code of 409 (Conflict)
        res.status(409).json({ error: error.message });
    }
};

// Retrieve a single destination
const getDestination = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Execute the database query to retrieve the destination record with the specified "id"
        const results = await pool.query('SELECT * FROM destinations WHERE id = $1', [id]);

        // If the query is successful and a matching record is found, send the result (the first row) as a JSON response with a status code of 200 (OK)
        res.status(200).json(results.rows[0]);
    } catch (error) {
        // If any error occurs during the database operation, send the error message back to the client as a JSON response with a status code of 409 (Conflict)
        res.status(409).json({ error: error.message });
    }
};

// Update the details for a single destination
const updateDestination = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // Extract the data from the request body
        const { destination, description, city, country, img_url, flag_img_url } = req.body;

        // Execute the database query to update the destination record with the specified "id"
        const results = await pool.query(
            `UPDATE destinations SET destination = $1, description = $2, city = $3, country = $4, img_url = $5, flag_img_url = $6 WHERE id = $7 RETURNING *;`,
            [destination, description, city, country, img_url, flag_img_url, id]
        );

        // If the update is successful, send the updated record as a JSON response with a status code of 200 (OK)
        res.status(200).json(results.rows[0]);
    } catch (error) {
        // If any error occurs during the database operation, send the error message back to the client as a JSON response with a status code of 409 (Conflict)
        res.status(409).json({ error: error.message });
    }
};

// Delete a single destination
const deleteDestination = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Execute the database query to delete the destination record with the specified "id"
        const results = await pool.query('DELETE FROM destinations WHERE id = $1 RETURNING *;', [id]);

        // If the deletion is successful, send a JSON response with the deleted record as a confirmation, using a status code of 200 (OK)
        res.status(200).json(results.rows[0]);
    } catch (error) {
        // If any error occurs during the database operation, send the error message back to the client as a JSON response with a status code of 409 (Conflict)
        res.status(409).json({ error: error.message });
    }
};


export default {
    createDestination,
    getDestinations,
    getDestination,
    deleteDestination,
    updateDestination,
}