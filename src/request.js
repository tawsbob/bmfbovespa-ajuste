const http = require('http')

module.exports = ({ url }) => {
  return new Promise((resolve, reject) => {
    http
      .get(url, resp => {
        let data = ''

        // A chunk of data has been recieved.
        resp.on('data', chunk => {
          data += chunk
        })

        resp.on('end', () => {
          resolve(data)
        })
      })
      .on('error', err => {
        reject(err)
      })
  })
}
