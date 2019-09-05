# bmfbovespa-ajuste

This module get daily assets adjustment from [Ajustes do pregão](http://www2.bmf.com.br/pages/portal/bmfbovespa/lumis/lum-ajustes-do-pregao-ptBR.asp)

# installation

```bash
$ npm install bmfbovespa-ajuste
```

## Usage

```javascript
const getAssetList = require('bmfbovespa-ajuste')
const util = require('util')

;(async () => {
  const result = await getAssetList()
  console.log(util.inspect(result, { depth: 4, colors: true, compact: 3 }))
})()

```

## Result

```javascript
{
    date: '04/08/2019', //date of the last adjstment
    list: [
	{ asset: 'ZAR - RANDE DA ÁFRICA DO SUL',
       assetCode: 'ZAR',
       vtc:
        [ { code: 'V19',
            beforePrice: '2.761,8520',
            currentPrice: '2.765,3990',
            variation: '3,5470',
            valueOfAjustPerContract: '124,14' }
            ...
         ]
		...
	]
  }

```
