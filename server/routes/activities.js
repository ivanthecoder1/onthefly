// Define routes for trips that match an incoming HTTP request with the controller functions for activities
import express from 'express'
import activitiesController from '../controllers/activities.js'

const router = express.Router()

// Route handlers for /activities
router.get('/', activitiesController.getActivities)
router.get('/:id', activitiesController.getTripActivities)
router.post('/', activitiesController.createActivity)
router.delete('/:id', activitiesController.deleteActivity)
router.patch('/:id', activitiesController.updateActivityLikes)

export default router