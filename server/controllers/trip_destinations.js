// store controller functions to perform CRUD operations associated with the destinations table

// allow us to make queries to the database
import { pool } from '../config/database.js'

// Insert a new trip destination
const createTripDestination = async (req, res) => {
    try {
        // Extract the necessary properties from the request body
        const { trip_id, destination_id } = req.body;

        // Execute the database insertion query using the pool.query method
        const results = await pool.query(
            `INSERT INTO trips_destinations (trip_id, destination_id)
            VALUES ($1, $2)
            RETURNING *`,
            [trip_id, destination_id]
        );

        // If the insertion is successful, send the newly inserted row as a JSON response with a status code of 201 (Created)
        res.status(201).json(results.rows[0]);
    } catch (error) {
        // If any error occurs during the database operation, send the error message back to the client as a JSON response with a status code of 409 (Conflict)
        res.status(409).json({ error: error.message });
    }
};

// Retrieve all trip destinations
const getAllTrips = async (req, res) => {
    try {
        // Execute the database query to retrieve all rows from the "trips_destinations" table
        const results = await pool.query('SELECT * FROM trips_destinations');

        // If the query is successful, send the result (rows) as a JSON response with a status code of 200 (OK)
        res.status(200).json(results.rows);
    } catch (error) {
        // If any error occurs during the database operation, send the error message back to the client as a JSON response with a status code of 409 (Conflict)
        res.status(409).json({ error: error.message });
    }
};

// Retrieve all trips associated with a specific destination
const getAllDestinations = async (req, res) => {
    try {
        const destination_id = parseInt(req.params.destination_id);

        // Execute the database query to retrieve all trips associated with the specified "destination_id"
        const results = await pool.query('SELECT * FROM trips_destinations WHERE destination_id = $1', [destination_id]);

        // If the query is successful, send the result (rows) as a JSON response with a status code of 200 (OK)
        res.status(200).json(results.rows);
    } catch (error) {
        // If any error occurs during the database operation, send the error message back to the client as a JSON response with a status code of 409 (Conflict)
        res.status(409).json({ error: error.message });
    }
};

// Retrieve all destinations associated with a specific trip
const getTripsDestinations = async (req, res) => {
    try {
        const trip_id = parseInt(req.params.trip_id);

        // Execute the database query to retrieve all destinations associated with the specified "trip_id"
        const results = await pool.query('SELECT * FROM trips_destinations WHERE trip_id = $1', [trip_id]);

        // If the query is successful, send the result (rows) as a JSON response with a status code of 200 (OK)
        res.status(200).json(results.rows);
    } catch (error) {
        // If any error occurs during the database operation, send the error message back to the client as a JSON response with a status code of 409 (Conflict)
        res.status(409).json({ error: error.message });
    }
};


export default {
    createTripDestination,
    getAllTrips,
    getAllDestinations,
    getTripsDestinations,
};