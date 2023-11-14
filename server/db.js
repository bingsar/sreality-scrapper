const { Pool } = require("pg");

const pool = new Pool({
    host: "db",
    database: "sreality",
    user: "postgres",
    password: "postgres",
    port: 5432,
})

const create_db = async () => {
    const truncate_table_image = `
        DROP TABLE IF EXISTS image;`
    const truncate_table_property = `
        DROP TABLE IF EXISTS property;`
    const create_table_query = `
        CREATE TABLE IF NOT EXISTS property (
            property_id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS image (
            image_id SERIAL PRIMARY KEY,
            url VARCHAR(255) NOT NULL,
            property_id INTEGER REFERENCES property(property_id)
        );
    `
    await pool.query(truncate_table_image)
    await pool.query(truncate_table_property)
    await pool.query(create_table_query)
}

create_db().then(() => console.log('Tables created'));

module.exports = {pool}