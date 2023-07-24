import express from 'express'
import cors from 'cors'
import tripRoutes from './routes/trips.js'
import activityRoutes from './routes/activities.js'
import destinationsRoutes from './routes/destinations.js'
import trip_destinationsRoutes from './routes/trip_destinations.js'

// for github authenication 
import passport from 'passport'
import session from 'express-session'
import { GitHub } from './config/auth.js'

// import authenication routes
import authRoutes from './routes/auth.js'


const app = express()

// middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true // allow cookies (and other credentials) to be included in CORS requests
}))

// set up passport: Express middleware specifically created to facilitate the login process
app.use(passport.initialize())
app.use(passport.session())
// configure the passport middleware to use our GitHub strategy 
passport.use(GitHub)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

// route handler
app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ OnTheFly API</h1>')
})

// use the tripRoutes router as middleware for any request that starts with /api/trips 
app.use('/api/trips', tripRoutes)

// use the activityRoutes router as middleware for any request that starts with /api/activities 
app.use('/api/activities', activityRoutes)

// use the destinationsRoutes router as middleware for any request that starts with /api/destinations 
app.use('/api/destinations', destinationsRoutes)

app.use('/api/trip_destination', trip_destinationsRoutes)

app.use(session({
    secret: 'codepath', // This is used to sign the session ID cookie.
    resave: false,      // Set to false to save the session only if modified.
    saveUninitialized: true // Set to true to save uninitialized sessions to the store.
}))

app.use('/auth', authRoutes)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})