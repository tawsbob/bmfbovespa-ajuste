const script = selector => `
function getCode (asseName){
  return  asseName.split('-')[0].replace(/\t+|\s+/, '').trim()
}
function clearString(str){
  return str.trim().replace(/\t+|\s+/g, ' ')
}
function loopNodelist (selector, interator){
  let nodelist = (typeof selector === 'string') ? document.querySelectorAll(selector) : selector
  for (let i = 0; i < nodelist.length; i++) {
    interator(nodelist[i], i)
  }
}

function checkTd(td, i, _params, vtcs){


  if(i == 0){
    _params.code = clearString(td.innerHTML)

  }

  if(i == 1){
    _params.beforePrice = clearString(td.innerHTML)

  }

  if(i == 2){
    _params.currentPrice = clearString(td.innerHTML)

  }

  if(i == 3){
    _params.variation = clearString(td.innerHTML)

  }

  if(i == 4){
    _params.valueOfAjustPerContract = clearString(td.innerHTML)

  }

}



function checkTR( allLines, index, list, params ){

  if(allLines[index]){
    const tds = allLines[index].querySelectorAll('td')

    let
      _params = {
      code: null,
      beforePrice: null,
      currentPrice: null,
      variation: null,
      valueOfAjustPerContract: null,
    }

    loopNodelist(tds, (td, i)=>{
      if(td.rowSpan > 1){
          params.rowspanCount = parseInt(td.rowSpan)
          params.asset =  clearString(td.innerHTML)
          params.vtc = []
      }

      if(tds.length > 5){
        checkTd(td, i-1, _params, params.vtc)
      } else  {
        checkTd(td, i, _params, params.vtc)
      }


      if(tds.length-1 == i){
        params.vtc.push(_params)
      }

    })

    if(params.rowspanCount > 1){
      params.rowspanCount--
    } else {
      const { asset, vtc } = params
      list.push({ asset, assetCode: getCode(asset), vtc })
    }

    checkTR(allLines, index+1, list, params)
  }
}

function start(selector){
  let rowspanCount = null
  let asset = null
  let list = []
  let vtc = []
  const allLines = document.querySelectorAll(selector)
  checkTR( allLines, 1, list, { rowspanCount, asset, vtc } )
  return list
}

start('${selector}')

`

module.exports = script
