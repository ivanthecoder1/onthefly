import { pool } from '../config/database.js'

const createDestinationsTableQuery = `
    CREATE TABLE IF NOT EXISTS destinations (
        id serial PRIMARY KEY,
        destination varchar(100) NOT NULL,
        description varchar(500) NOT NULL,
        city varchar(100) NOT NULL,
        country varchar(100) NOT NULL,
        img_url text NOT NULL,
        flag_img_url text NOT NULL
    );
`

pool.query(createDestinationsTableQuery, (error, res) => {
    if (error) {
        console.log(error)
        return
    }

    console.log('✅ destinations table created successfully!')
})

export const createDestination = async (req, res) => {
    try {
        const { destination, description, city, country, img_url, flag_img_url } = request.body

        const results = await pool.query(`
            INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [destination, description, city, country, img_url, flag_img_url]
        )

        res.status(201).json(results.rows[0])
        console.log('🆕 new destination created')
    }
    catch (error) {
        res.status(409).json( { error: error.message } )
        console.log('🚫 Unable to POST new destination - Error:', error.message)
    }

}

export const getDestinations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM destinations ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
        console.log('🚫 Unable to GET all destinations - Error:', error.message)
    }
}

export const getDestination = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM destinations WHERE id = $1', [id])
        res.status(200).json(results.rows[0])        
    } catch (error) {
        res.status(409).json( { error: error.message } )
        console.log('🚫 Unable to GET destination - Error:', error.message)
    }
}

export const updateDestination = async (req, res) => {
    try {
        const { destination, description, city, country, img_url, flag_img_url } = req.body
        const id = parseInt(req.params.id)
    
        const results = await pool.query(`
            UPDATE destinations
            SET destination = $1, description = $2, city = $3, country = $4, img_url = $5, flag_img_url = $6 WHERE id = $7`,
            [destination, description, city, country, img_url, flag_img_url , id]
        )

        res.status(200).json(results.rows)
        console.log('✨ destination updated')
    }
    catch (error) {
        res.status(409).json( { error: error.message } )
        console.log('🚫 Unable to UPDATE destination - Error:', error.message)
    }
}

export const deleteDestination = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const results = await pool.query('DELETE FROM destinations WHERE id = $1', [id])
        res.status(200).json(results.rows)
        console.log('❌ destination deleted')
    }
    catch (error) {
        res.status(409).json( { error: error.message } )
        console.log('🚫 Unable to DELETE destination - Error:', error.message)
    }
}
