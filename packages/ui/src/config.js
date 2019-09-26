const canvas = {
  width: 850,
  height: 425
}
const stroke = {
  width: 1,
  style: {
    dark: '#ADA8A4',
    light: '#DED9D6'
  }
}
const axes = {
  x: {
    height: 20
  },
  y: {
    width: 25
  }
}
const grid = {
  width: canvas.width - axes.y.width - 2 * stroke.width,
  height: canvas.height - 2 * axes.x.height - 2 * stroke.width,
  markerSize: 3
}

export const config = { canvas, stroke, axes, grid }
