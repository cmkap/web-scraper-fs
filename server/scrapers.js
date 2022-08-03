const puppeteer =  require('puppeteer');

async function scrapeEvent(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'networkidle2',
    });
    const rows = await page.$x('//*[@id="main-view"]/ms-antepost-fixture/section/ms-antepost-market/section/div/ms-antepost-participants/ms-fixture-pick')
    
    const riders = []

    for (let i = 0; i < rows.length; i++) {
        const [el] = await page.$x(`//*[@id="main-view"]/ms-antepost-fixture/section/ms-antepost-market/section/div/ms-antepost-participants/ms-fixture-pick[${i+1}]/div/span[2]`)
        const text = await el.getProperty('textContent');
        const name = await text.jsonValue();
    
        const [el2] = await page.$x(`//*[@id="main-view"]/ms-antepost-fixture/section/ms-antepost-market/section/div/ms-antepost-participants/ms-fixture-pick[${i+1}]/div/span[1]`)
        const text2 = await el2.getProperty('textContent');
        const odds = await text2.jsonValue();

        riders.push({name, odds})
    }
  

    browser.close();

    console.log(riders)

    return riders

}

module.exports = {
    scrapeEvent
}