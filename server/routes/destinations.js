// Define routes for trips that match an incoming HTTP request with the controller functions for destinations
import express from 'express'
import destinationsController from '../controllers/destinations.js'

const router = express.Router()

// Route handlers for /activities
router.get('/', destinationsController.getDestinations)
router.get('/:id', destinationsController.getDestination)
router.post('/', destinationsController.createDestination)
router.delete('/:id', destinationsController.deleteDestination)
router.patch('/:id', destinationsController.updateDestination)

export default router