var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var fs = require('fs')
var tf = require('@tensorflow/tfjs')
var modelA = require('./modelA')
var utils = require('./utils')

app.post('/predict', function (req, res) {
  let predictData = utils.mapData(req.body)

  //async this
  modelA[0].predict(tf.tensor(predictData.vector, [1, 699613])).print();
  modelA[1].predict(tf.tensor(predictData.vector, [1, 699613])).print();

  //wait here
  res.json(
      {
        message: "Prediction done",
        predictedLabel: "Couch"
      }
  )
})


function train(model, x, y, res) {
  model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

  const xs = tf.tensor([x]);

  const ys = tf.tensor2d([1], [1, 1])

  model.fit(xs, ys).then(() => {
    console.log("one model fit")

  });

}


app.post('/data', function (req, res) {

  fs.readFile('./data.json', 'utf-8', function (err, data) {
    data = JSON.parse(data)
    data.data.push(req.body)
    fs.writeFile('./data.json', JSON.stringify(data), function (_err, _data) {
    })
  })

  res.json(
      {
        "message": "Thank you! Data stored in the backend!"
      }
  )
})


app.get('/train', function (req, res) {

  fs.readFile('./data.json', 'utf-8', function (err, data) {

    data = JSON.parse(data).data
    data = data.map(d => utils.mapData(d))


    //async this!
    train(modelA[0], data[0].vector, data[0].label)
    train(modelA[1], data[0].vector, data[0].label)

    //wait..
    res.json({"message": "Training done."})


  })


})


var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
