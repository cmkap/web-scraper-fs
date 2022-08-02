const puppeteer =  require('puppeteer');

async function scrapeEvent(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'networkidle2',
      });
    

    const [el] = await page.$x('//*[@id="main-view"]/ms-antepost-fixture/section/ms-antepost-market/section/div/ms-antepost-participants/ms-fixture-pick[1]/div/span[2]')
    console.log(el)
    const text = await el.getProperty('textContent');
    const name = await text.jsonValue();

    const [el2] = await page.$x('//*[@id="main-view"]/ms-antepost-fixture/section/ms-antepost-market/section/div/ms-antepost-participants/ms-fixture-pick[1]/div/span[1]')
    const text2 = await el2.getProperty('textContent');
    const odds = await text2.jsonValue();

    browser.close();

    console.log({name, odds})

    return {name, odds}

}

scrapeEvent('https://sports.bwin.com/en/sports/horse-racing-29/fixtures/cheltenham-gold-cup-chase-2023-2:3119903')