const request = require('./request.js')
const scrape = require('./scrape-script.js')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

module.exports = async params => {
  const url =
    params && params.url
      ? params.url
      : 'http://www2.bmf.com.br/pages/portal/bmfbovespa/lumis/lum-ajustes-do-pregao-ptBR.asp'
  const selector = params && params.selector ? params.selector : '#tblDadosAjustes tr'

  try {
    const requestResult = await request({ url })
    const { document } = new JSDOM(requestResult).window

    return scrape(document, selector)
  } catch (e) {
    console.warn(e)
    return e
  }
}
