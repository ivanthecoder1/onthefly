import express from 'express'
import cors from 'cors'

import tripRoutes from './routes/trips.js'
import activityRoutes from './routes/activities.js'
import destinationRoutes from './routes/destinations.js'
import tripDestinationRoutes from './routes/trips-destinations.js'
import userTripRoutes from './routes/users-trips.js'

// for github authenication 
import passport from 'passport'
import session from 'express-session'
import { GitHub } from './config/auth.js'

// import authenication routes
import authRoutes from './routes/auth.js'


const app = express()

app.use(session({
    secret: 'codepath', // This is used to sign the session ID cookie.
    resave: false,      // Set to false to save the session only if modified.
    saveUninitialized: true // Set to true to save uninitialized sessions to the store.
}))

// middleware
app.use(express.json())
app.use(cors({
    origin: 'https://onthefly.up.railway.app',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true
  }
))

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

// authentication routes
app.use('/auth', authRoutes)

// routes
app.use('/api/trips/', tripRoutes)
app.use('/api/activities/', activityRoutes)
app.use('/api/destinations/', destinationRoutes)
app.use('/api/trips-destinations/', tripDestinationRoutes)
app.use('/api/users-trips/', userTripRoutes)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})