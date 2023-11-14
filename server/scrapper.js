const puppeteer = require('puppeteer');
const {pool: pool} = require('./db.js');

async function scrapper() {
    const browser = await puppeteer.launch({
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-sandbox'
        ]
    })

    const startPage = 1
    const endPage = 25

    for (let currentPage = startPage; currentPage <= endPage; currentPage++) {
        const startUrl = `https://www.sreality.cz/en/search/for-sale/apartments/praha?page=${currentPage}`
        const page = await browser.newPage()

        await page.goto(startUrl)
        await page.waitForSelector('.dir-property-list .property')

        const links = await page.evaluate(() => {
            const anchors = document.querySelectorAll('.basic a')
            return Array.from(anchors, a => a.href)
        })

        for (const link of links) {
            console.log('link', link)
            const newPage = await browser.newPage()
            await newPage.goto(link)

            await newPage.waitForSelector('.property-title .name')

            const propertyTitle = await newPage.evaluate(() => {
                const titleElement = document.querySelector('.property-title .name')
                return titleElement ? titleElement.textContent : null
            })

            const propertyInsertQuery = 'INSERT INTO property(title) VALUES($1) RETURNING property_id';
            const propertyResult = await pool.query(propertyInsertQuery, [propertyTitle]);
            const propertyId = await propertyResult.rows[0].property_id;

            const propertyImages = await newPage.evaluate(() => {
                const imageElements = document.querySelectorAll('.ob-c-carousel__item-content img')
                const uniqueImages = new Set()
                imageElements.forEach(img => uniqueImages.add(img.src))
                return Array.from(uniqueImages)
            })

            const imageInsertQuery = 'INSERT INTO image(url, property_id) VALUES($1, $2)';
            for (const imageUrl of propertyImages) {
                await pool.query(imageInsertQuery, [imageUrl, propertyId]);
            }

            await newPage.close()
        }

        await page.close()
    }

    await browser.close()
}

module.exports = {scrapper}