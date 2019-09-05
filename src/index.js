const puppeteer = require('puppeteer')
const fs = require('fs')
const evaluateScript = require('./scrape-script.js')

module.exports = async params => {
  const url =
    params && params.url
      ? params.url
      : 'http://www2.bmf.com.br/pages/portal/bmfbovespa/lumis/lum-ajustes-do-pregao-ptBR.asp'
  const selector = params && params.selector ? params.selector : '#tblDadosAjustes tr'
  const headless = params && typeof params.headless ? params.headless : true

  const browser = await puppeteer.launch({ headless })
  const pages = await browser.pages()
  const page = pages[0]
  let result = {}

  try {
    await page.setRequestInterception(true)

    //prevent load images and css
    page.on('request', req => {
      const type = req.resourceType()
      if (type === 'image' || type === 'stylesheet') {
        req.abort()
      } else {
        req.continue()
      }
    })

    await page.goto(url, { waitUntil: 'networkidle2' })
    console.log('wait page load')

    await page.waitForSelector(selector)
    console.log('wait selector', selector)

    result = await page.evaluate(evaluateScript(selector))
    console.log('evaluate')
  } catch (e) {
    console.log(e)
  } finally {
    await browser.close()
    return result
  }
}
