var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var fs = require('fs')
var tf = require('@tensorflow/tfjs')
var model = require('./modelA')


function createVector() {
  let vector = []
  for (let i = 0; i < 1279 * 547; i++) {
    vector.push(0)
  }
  return vector;
}

function coordToVectorPosition(coord) {
  let columns = 1279;
  return (coord.y - 1) * columns + coord.x
}

function train(x, y) {
  model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
  console.log("we train")

  const xs = tf.tensor([x]);

  const ys = tf.tensor2d([1], [1, 1])

  model.fit(xs, ys).then(() => {
    // Use the model to do inference on a data point the model hasn't seen before:
    console.log("we are done")
    model.predict(tf.tensor(x, [1, 699613])).print();
    model.predict(tf.tensor(x, [1, 699613])).print();
    model.predict(tf.tensor(x, [1, 699613])).print();
  });

}


function coordiantesToVector(coordinates) {
  let vector = createVector();
  coordinates.forEach(c => {
    vector[c] = vector[c] + 1
  })
  return vector;
}

app.get('/', function (req, res) {
  fs.readFile('./data.json', 'utf-8', function (err, data) {

    data = JSON.parse(data).data
    data = data.map(d =>

        ({
          positions: d.coordinates.map(c =>
              coordToVectorPosition(c)
          ),
          label: "PPP"
        })).map(element =>
        (
            {
              label: element.label,
              vector: coordiantesToVector(element.positions)
            }
        )
    )
    train(data[0].vector, data[0].label)
    res.json({"done": "done"})
  })
})

app.post('/', function (req, res) {

  fs.readFile('./data.json', 'utf-8', function (err, data) {
    data = JSON.parse(data)
    data.data.push(req.body)
    fs.writeFile('./data.json', JSON.stringify(data), function (_err, _data) {
      console.log("all good")
    })
  })

  res.json(
      {
        "message": "Thank you!"
      }
  )
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
