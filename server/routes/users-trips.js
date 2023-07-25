import express from 'express'
import UserTripsController from '../controllers/users-trips.js'

const router = express.Router()

router.post('/create/:trip_id', UserTripsController.createTripUser)
router.get('/users/:trip_id', UserTripsController.getTripUsers)
router.get('/trips/:username', UserTripsController.getUserTrips)

export default router