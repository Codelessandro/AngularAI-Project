var tf = require('@tensorflow/tfjs')


function createDenseModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({units: 20, inputShape: [699613]}));
  model.add(tf.layers.dense({units: 42, activation: 'relu'}));
  model.add(tf.layers.dense({units: 1, activation: 'softmax'}));
  return model;
}

model1 = createDenseModel();
model2 = createDenseModel();
module.exports = [model1, model2]

