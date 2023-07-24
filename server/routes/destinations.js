// Define routes for trips that match an incoming HTTP request with the controller functions for destinations
import express from 'express'
import DestinationsController from '../controllers/destinations.js'

const router = express.Router()

// Route handlers for /activities
router.get('/', DestinationsController.getDestinations)
router.get('/:id', DestinationsController.getDestination)
router.post('/', DestinationsController.createDestination)
router.delete('/:id', DestinationsController.deleteDestination)
router.patch('/:id', DestinationsController.updateDestination)

export default router