import express from 'express'
import cors from 'cors'
import tripRoutes from './routes/trips.js'


const app = express()

// middleware
app.use(express.json())
app.use(cors())

// route handler
app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ OnTheFly API</h1>')
})

// use the tripRoutes router as middleware for any request that starts with /api/trips 
app.use('/api/trips', tripRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})