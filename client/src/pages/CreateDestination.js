import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CreateDestination.css'

const CreateDestination = () => {

    const [destination, setDestination] = useState({ destination: "", description: "", city: "", country: "", img_url: "", flag_img_url: "" })
    const { trip_id } = useParams();
    const api_url = 'http://localhost:3001';

    // updates the state post whenever the user types or modifies data in the form fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDestination((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    // Function to create a new destination by making a POST request to the server
    const createDestination = async (event) => {
        // Function to add the destination to the database
        const addDestination = async () => {
            // Configuration for the POST request to create the destination
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(destination) // Convert the destination object to JSON and include it in the request body
            }

            // Send the POST request to the server to create the destination
            const response = await fetch(`${api_url}/api/destination/create`, options)
            const data = await response.json() // Parse the response data as JSON
            setDestination(data) // Update the state with the created destination data
            return data.id // Return the id of the created destination
        }

        // Function to create a trip-destination association by making another POST request to the server
        const createTripDestination = async (destination_id) => {
            // Configuration for the POST request to create the trip-destination association
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ trip_id: trip_id, destination_id: destination_id }) // Convert the trip_id and destination_id to JSON and include them in the request body
            }

            // Send the POST request to the server to create the trip-destination association
            const response = await fetch(`${api_url}/api/trips-destinations/create`, options)
            const data = await response.json() // Parse the response data as JSON
            return data // Return the response data from the server
        }

        // Call the addDestination function to create the destination, then call the createTripDestination function to create the trip-destination association
        // Finally, redirect the user to the homepage after the operations are completed
        addDestination().then(res => createTripDestination(res)).then(res => window.location = '/')
    }




    return (
        <div>
            <center><h3>Add Destination</h3></center>
            <form>
                <label>Destination</label> <br />
                <input type="text" id="destination" name="destination" value={destination.destination} onChange={handleChange} /><br />
                <br />

                <label>Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={destination.description} onChange={handleChange}>
                </textarea>
                <br />

                <label>City </label><br />
                <input type="text" id="city" name="city" value={destination.city} onChange={handleChange} /><br />
                <br />

                <label>Country</label><br />
                <input type="text" id="country" name="country" value={destination.country} onChange={handleChange} /><br />
                <br />

                <label>Image URL </label><br />
                <input type="text" id="img_url" name="img_url" value={destination.img_url} onChange={handleChange} /><br />
                <br />

                <label>Flag Image URL</label><br />
                <input type="text" id="flag_img_url" name="flag_img_url" value={destination.flag_img_url} onChange={handleChange} /><br />
                <br />

                <label>Trip ID</label><br />
                <input type="text" id="flag_img_url" name="flag_img_url" value={trip_id} readOnly /><br />
                <br />

                <input type="submit" value="Submit" onClick={createDestination} />
            </form>
        </div>
    )
}

export default CreateDestination