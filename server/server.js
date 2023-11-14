const express = require('express')
const cors = require('cors')
const {pool: pool} = require('./db.js')
const {scrapper: scrapper} = require('./scrapper.js')

const app = express()
const port = 3001
app.use(cors())

scrapper().then(() => console.log('Scrapper finished'))

app.get('/api/properties', async (req, res) => {
    try {
        const { page = 1, itemsPerPage = 20 } = req.query
        const offset = (page - 1) * itemsPerPage

        const result = await pool.query(`
            SELECT p.property_id, p.title, ARRAY_AGG(i.url) AS images
            FROM property p
            LEFT JOIN image i ON p.property_id = i.property_id
            GROUP BY p.property_id, p.title
            ORDER BY p.property_id
            OFFSET $1
            LIMIT $2;
        `, [offset, itemsPerPage])

        const properties = result.rows.map(row => ({
            property_id: row.property_id,
            title: row.title,
            images: row.images.filter(url => url !== '')
        }));

        res.json(properties)
    } catch (error) {
        console.error('Error fetching properties:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

app.get('/api/propertyCount', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM property')
        const propertyCount = result.rows[0].count

        res.json({ propertyCount })
    } catch (error) {
        console.error('Error fetching property count:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`)
})