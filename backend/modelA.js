var tf = require('@tensorflow/tfjs')


function createDenseModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({units: 1, inputShape: [699613]}));
  //model.add(tf.layers.dense({units: 42, activation: 'relu'}));
  //model.add(tf.layers.dense({units: 1, activation: 'softmax'}));
  return model;
}

model = createDenseModel();
module.exports = model

