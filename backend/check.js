var fs = require('fs')


fs.readFile('./data.json', 'utf-8', function (err, data) {
  data = JSON.parse(data).data
  let couch = data.filter( d => d.label =="Couch")
  let paris = data.filter( d => d.label =="Paris")
  console.log(paris.length)
  console.log(couch.length)
})