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

  const ys = tf.tensor2d([y], [1, 1])

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

    console.log("lets train")
    //async this!
    data.slice(0, 20).forEach(d => {
      console.log(d.label)

      if (d.label == "Paris") {
        train(modelA[0], d.vector, 1) //we train ModelA_0 with Paris as true label
        train(modelA[1], d.vector, 0) //we train ModelA_1 with Couch as false label
        //this might be good if we add neutral training examples
      } else if (d.label == "Couch") {
        train(modelA[0], d.vector, 0)
        train(modelA[1], d.vector, 1)
      }

    })

    //wait..
    res.json({"message": "Training done."})


  })


})


var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
