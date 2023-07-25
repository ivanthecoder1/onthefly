import passport from 'passport';
import express from 'express';

const router = express.Router();

// Successful login request
router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ success: true, user: req.user })
    }
})

// Failed login attempt
router.get('/login/failed', (req, res) => {
    res.status(401).json({ success: true, message: "failure" })
})

// User request to logout
router.get('/logout', (req, res, next) => {
    // check for error
    req.logout((err) => {
        if (err) {
            return next(error)
        }
        // no error so destroy current session to logout
        req.session.destroy((err) => {
            res.clearCookie('connect.sid')

            res.json({ status: "logout", user: {} })
        })
    })
})

// authenticate a user using the GitHub strategy
router.get(
    '/github',
    passport.authenticate('github', {
        // only read the user's information
        scope: ['read:user']
    })
)

// called once a user logins into GitHub
router.get(
    '/github/callback',
    // redirect the user to the specific pages based on whether they successfully logged in
    passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/destinations',
    })
)

export default router