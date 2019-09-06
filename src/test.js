const getAssetList = require('./index.js')
const prettyJson = require('save-pretty-json')
const util = require('util')

;(async () => {
  const result = await getAssetList()
  //console.log(util.inspect(result, { depth: 4, colors: true, compact: 3 }))
  prettyJson({
      filePath: './teste.json',
      data: result,
  }).then(()=>{
      console.log('done')
  }).catch((err)=>{
      console.log(err)
  })
})()
