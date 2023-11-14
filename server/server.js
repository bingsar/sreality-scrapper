const express = require('express');
const cors = require('cors');
const {pool: pool} = require('./db.js');
const {scrapper: scrapper} = require('./scrapper.js');

const app = express();
const port = 3001;
app.use(cors());

scrapper()

app.get('/api/properties', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                p.property_id,
                p.title,
                i.url
            FROM 
                property p
            LEFT JOIN 
                image i ON p.property_id = i.property_id
        `);

        const properties = result.rows.reduce((acc, row) => {
            const property = acc.find(item => item.property_id === row.property_id);
            if (property) {
                property.images.push(row.url);
            } else {
                acc.push({
                    property_id: row.property_id,
                    title: row.title,
                    images: row.url ? [row.url] : [],
                });
            }
            return acc;
        }, []);

        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/propertyCount', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM property');
        const propertyCount = result.rows[0].count;

        res.json({ propertyCount });
    } catch (error) {
        console.error('Error fetching property count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});