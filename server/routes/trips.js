// Define routes for trips that match an incoming HTTP request with the controller functions for trips
import express from 'express'
import { getTrips, getTrip, createTrip, deleteTrip, updateTrip } from '../controllers/trips.js'

const router = express.Router()

// Route handlers for /trips
router.get('/', getTrips)
router.get('/:id', getTrip)
router.post('/', createTrip)
router.delete('/:id', deleteTrip)
router.patch('/:id', updateTrip)

export default router


