const getAssetList = require('./index.js')
const util = require('util')

;(async () => {
  const result = await getAssetList()
  console.log(util.inspect(result, { depth: 3, colors: true, compact: 3 }))
})()
