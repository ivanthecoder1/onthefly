// store controller functions to perform CRUD operations associated with the trips table

// allow us to make queries to the database
import { pool } from '../config/database.js'


// This function handles the creation of a new "trip" record in the database
const createTrip = async (req, res) => {
    try {
        // Extract the necessary properties from the request body
        const { title, description, img_url, num_days, start_date, end_date, total_cost } = req.body;

        // Execute the database insertion query using the pool.query method
        const results = await pool.query(
            'INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, description, img_url, num_days, start_date, end_date, total_cost]
        );

        // If the insertion is successful, send the newly inserted row as a JSON response with a status code of 201 (Created)
        res.status(201).json(results.rows[0]);
    } catch (error) {
        // If any error occurs during the database operation, send the error message back to the client as a JSON response with a status code of 409 (Conflict)
        res.status(409).json({ error: error.message });
    }
};

// This function handles fetching all "trip" records from the database and sending them as a JSON response
const getTrips = async (req, res) => {
    try {
        // Execute the database query to retrieve all rows from the "trips" table, sorted by their "id" in ascending order
        const results = await pool.query('SELECT * FROM trips ORDER BY id ASC');

        // If the query is successful, send the result (rows) as a JSON response with a status code of 200 (OK)
        res.status(200).json(results.rows);
    } catch (error) {
        // If any error occurs during the database operation, send the error message back to the client as a JSON response with a status code of 409 (Conflict)
        res.status(409).json({ error: error.message });
    }

};

// This function handles fetching a single "trip" record from the database based on the provided "id" parameter.
const getTrip = async (req, res) => {
    try {
        // Extract the "id" parameter from the request URL and parse it as an integer
        const id = parseInt(req.params.id);

        // Execute the database query to retrieve the trip record with the specified "id"
        const results = await pool.query('SELECT * FROM trips WHERE id = $1', [id]);

        // If the query is successful and a matching record is found, send the result (the first row) as a JSON response with a status code of 200 (OK)
        res.status(200).json(results.rows[0]);
    } catch (error) {
        // If any error occurs during the database operation, send the error message back to the client as a JSON response with a status code of 409 (Conflict)
        res.status(409).json({ error: error.message });

        // Log an error message to the server console indicating that there was an issue fetching the trip record
        console.log('Unable to get trip');

        // Log the specific error message to the server console for debugging purposes
        console.log('Error:', error.message);
    }
};

// This function handles updating a "trip" record in the database based on the provided "id" parameter.
const updateTrip = async (request, response) => {
    try {
        // Extract the data from the request body
        const { title, description, img_url, num_days, start_date, end_date, total_cost } = req.body;

        // Extract the "id" parameter from the request URL and parse it as an integer
        const id = parseInt(req.params.id);

        // Execute the database query to update the "trip" record with the specified "id"
        const results = await pool.query(
            'UPDATE trips SET title = $1, description = $2, img_url = $3, num_days = $4, start_date = $5, end_date = $6, total_cost = $7 WHERE id = $8',
        [title, description, img_url, num_days, start_date, end_date, total_cost, id]
        );

        // If the update is successful, send the updated record as a JSON response with a status code of 200 (OK)
        res.status(200).json(results.rows);
    } catch (error) {
        // If any error occurs during the database operation, send the error message back to the client as a JSON response with a status code of 409 (Conflict)
        res.status(409).json({ error: error.message });
    }
};

// This function handles deleting a "trip" record from the database based on the provided "id" parameter.
const deleteTrip = async (req, res) => {
    // Extract the "id" parameter from the request URL and parse it as an integer
    const id = parseInt(req.params.id);
  
    try {
      // Execute the database query to delete all "activities" associated with the "trip" using the "trip_id" foreign key
      const activity_deletion = await pool.query(
        'DELETE FROM activities WHERE trip_id = $1', [id]
      );
  
      // Execute the database query to delete the "trip" record with the specified "id"
      const results = await pool.query('DELETE FROM trips WHERE id = $1', [id]);
  
      // If the deletion is successful, send a JSON response with the deleted record as a confirmation, using a status code of 200 (OK)
      res.status(200).json(results.rows);
    } catch (error) {
      // If any error occurs during the database operation, send the error message back to the client as a JSON response with a status code of 409 (Conflict)
      res.status(409).json({ error: error.message });
    }
  };
  
export default {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    deleteTrip
}


