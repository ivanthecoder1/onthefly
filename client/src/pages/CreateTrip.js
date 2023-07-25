import React, { useState } from 'react';
import './CreateTrip.css'

const CreateTrip = () => {
    // Holds data for a new post
    const [post, setPost] = useState({ id: 0, title: "", description: "", img_url: "", num_days: 0, start_date: "", end_date: "", total_cost: 0.0 })
    const api_url = 'http://localhost:3001';

    // updates the state post whenever the user types or modifies data in the form fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    // Create a trip using POST method  
    const createPost = (event) => {
        event.preventDefault()
        

        // configuration for the POST request to the server. It includes the HTTP method, headers, and the body of the request
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        }

        // Performs the actual HTTP request to the server
        fetch(`${api_url}/api/trips`, options)
        

        // redirect to root page
        window.location.href = '/'
    }

    return (
        <div>
            <center><h3> Create New Trip</h3></center>
            <form>
                <label>Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br />

                <label>Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange}>
                </textarea>
                <br />

                <label>Image URL </label><br />
                <input type="text" id="img_url" name="img_url" value={post.img_url} onChange={handleChange} /><br />
                <br />

                <label>Number of Days</label><br />
                <input type="number" id="num_days" name="num_days" value={post.num_days} onChange={handleChange} /><br />
                <br />

                <label>Start Date </label><br />
                <input type="text" id="start_date" name="start_date" value={post.start_date} onChange={handleChange} /><br />
                <br />

                <label>End Date </label><br />
                <input type="text" id="end_date" name="end_date" value={post.end_date} onChange={handleChange} /><br />
                <br />

                <label>Total Cost</label><br />
                <input type="text" id="total_cost" name="total_cost" value={post.total_cost} onChange={handleChange} /><br />
                <br />

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreateTrip