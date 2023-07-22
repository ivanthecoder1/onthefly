// Define routes for trips that match an incoming HTTP request with the controller functions for trip destinations
import express from 'express'
import tripDestinationsController from '../controllers/trip_destinations.js'

const router = express.Router()

// Route handlers for /activities
router.get('/', tripDestinationsController.getTripsDestinations)
router.get('/trips/:destination_id', tripDestinationsController.getAllTrips)
router.get('/destinations/:trip_id', tripDestinationsController.getAllDestinations)
router.post('/', tripDestinationsController.createTripDestination)

export default router
