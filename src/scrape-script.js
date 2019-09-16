const scrape = (document, selector) => {
  function getDate() {
    console.log(document.querySelector('p.legenda').textContent)
    return document
      .querySelector('p.legenda')
      .textContent.replace('Atualizado em: ', '')
      .trim()
  }
  function getCode(asseName) {
    return asseName
      .split('-')[0]
      .replace(/\t+|\s+/, '')
      .trim()
  }
  function clearString(str) {
    return str.trim().replace(/\t+|\s+/g, ' ')
  }
  function loopNodelist(selector, interator) {
    let nodelist = typeof selector === 'string' ? document.querySelectorAll(selector) : selector
    for (let i = 0; i < nodelist.length; i++) {
      interator(nodelist[i], i)
    }
  }

  function checkTd(td, i, _params, vtcs) {
    console.log(td.textContent)
    if (i == 1) {
      _params.code = clearString(td.textContent)
    }

    if (i == 2) {
      _params.beforePrice = clearString(td.textContent)
    }

    if (i == 3) {
      _params.currentPrice = clearString(td.textContent)
    }

    if (i == 4) {
      _params.variation = clearString(td.textContent)
    }

    if (i == 5) {
      _params.valueOfAdjustmentPerContract = clearString(td.textContent)
    }
  }

  function checkTR(allLines, index, list, params) {
    if (allLines[index]) {
      const tds = allLines[index].querySelectorAll('td')

      let _params = {
        code: null,
        beforePrice: null,
        currentPrice: null,
        variation: null,
        valueOfAdjustmentPerContract: null,
      }

      loopNodelist(tds, (td, i) => {
        if (i == 0) {
          if (td.textContent) {
            params.asset = clearString(td.textContent)
            params.vtc = []
          }
        }

        checkTd(td, i, _params, params.vtc)

        if (tds.length - 1 == i) {
          params.vtc.push(_params)

          const { asset, vtc } = params
          list.push({ asset, assetCode: getCode(asset), vtc })
        }
      })

      checkTR(allLines, index + 1, list, params)
    }
  }

  function start(selector) {
    let asset = null
    let list = []
    let vtc = []
    const allLines = document.querySelectorAll(selector)
    checkTR(allLines, 1, list, { asset, vtc })
    return {
      date: getDate(),
      list,
    }
  }

  return start(selector)
}

module.exports = scrape
