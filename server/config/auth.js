// Configure the GitHub strategy

// contain information to configure the GitHub strategy with GitHub app credentials, 
// including the client ID, secret ID, and callback URL
const options = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/auth/github/callback'
}

// verify user
const verify = async (accessToken, refreshToken, profile, callback) => {
    // extract the user's profile information from the profile argument
    const { _json: { id, name, login, avatar_url } } = profile
    const userData = { githubId: id, username: login, avatarUrl: avatar_url, accessToken }

    try {
        // query to find the user that matches userData.username
        const results = await pool.query('SELECT * FROM users WHERE username = $1', [userData.username])
        const user = results.rows[0]
        
        // if null then inser new user
        if (!user) {
            const results = await pool.query(
                `INSERT INTO users (githubid, username, avatarurl, accesstoken)
                VALUES($1, $2, $3, $4)
                RETURNING *`,
                [userData.githubId, userData.username, userData.avatarUrl, accessToken]
            )

            const newUser = results.rows[0]
            return callback(null, newUser)
        }

        return callback(null, user)

    }

    catch (error) {
        return callback(error)
    }
}

export const GitHub = new GitHubStrategy(options, verify)
