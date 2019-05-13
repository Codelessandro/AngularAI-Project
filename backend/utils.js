const PIXEL_WIDTH = 1279
const PIXEL_HEIGHT = 547

function createVector() {
  let vector = []
  for (let i = 0; i < PIXEL_WIDTH * PIXEL_HEIGHT; i++) {
    vector.push(0)
  }
  return vector;
}


function coordToVectorPosition(coord) {
  let columns = PIXEL_WIDTH;
  return (coord.y - 1) * columns + coord.x
}


function coordiantesToVector(coordinates) {
  let vector = createVector();
  coordinates.forEach(c => {
    vector[c] = vector[c] + 1
  })
  return vector;
}


function mapData(data) {
  let dataArray = [data]
  return dataArray.map(d =>
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
  )[0]

}

module.exports = {
  mapData: mapData,
}