const puppeteer = require('puppeteer');

async function scrapeProduct(url)
{
    const browser = await puppeteer.launch( {headless:true});
    const page = await browser.newPage();
    await page.goto(url);

    const [wiki] = await page.$x('//*[@id="bookDescription_feature_div"]/div/div[1]/p/span[3]');
    const text = await wiki.getProperty('textContent');
    const rawText = await text.jsonValue();

    console.log(rawText);
    browser.close()

    // test
}

scrapeProduct('https://www.amazon.com/Fourth-Wing-Empyrean-Rebecca-Yarros/dp/1649374046/ref=zg_d_sccl_2/143-9710279-2256644?pd_rd_w=8wkca&content-id=amzn1.sym.193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_p=193afb92-0c19-4833-86f8-850b5ba40291&pf_rd_r=ZFFZD7JZ11PRF218D9ZX&pd_rd_wg=7Q9P0&pd_rd_r=346499c7-a0b3-4d2d-b4bc-963499f5dbee&pd_rd_i=1649374046&psc=1')