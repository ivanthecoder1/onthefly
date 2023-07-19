// Define routes for trips that match an incoming HTTP request with the controller functions for trips
import express from 'express'
import TripsController from '../controllers/trips.js'

const router = express.Router()

// Route handlers for /trips
router.get('/', TripsController.getTrips)
router.get('/:id', TripsController.getTrip)
router.post('/', TripsController.createTrip)
router.delete('/:id', TripsController.deleteTrip)
router.patch('/:id', TripsController.updateTrip)

export default router

