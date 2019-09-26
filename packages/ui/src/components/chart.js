import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { config } from '../config'

import { Overlay } from './overlay'
import { Plot } from './plot'

const { canvas, stroke, axes, grid } = config
const drawBoundary = ctx => {
  ctx.beginPath()
  ctx.lineWidth = stroke.width
  ctx.strokeStyle = stroke.style.dark
  ctx.rect(axes.y.width, axes.x.height, grid.width, grid.height)
  ctx.stroke()
}
const drawXaxis = (ctx, dose, maxDose) => {
  const xMax = Math.ceil(maxDose)
  const step = grid.width / maxDose
  const offset = {
    x: axes.y.width,
    y: axes.x.height
  }
  const height = grid.height + offset.y

  for (let x = 0; x < xMax; x++) {
    const isMarker = x % 10 === 0
    const xPos = x * step + offset.x
    const yStart = isMarker ? offset.y - grid.markerSize : offset.y
    const yEnd = isMarker ? height + grid.markerSize : height
    const strokeStyle = isMarker ? stroke.style.dark : stroke.style.light

    if (isMarker) {
      ctx.beginPath()
      ctx.textAlign = 'center'
      ctx.fillText(x, xPos, yEnd + axes.x.height - grid.markerSize)
      ctx.fillText((x / 100) * dose, xPos, yStart - grid.markerSize)
    }

    if (x > 0) {
      ctx.beginPath()
      ctx.lineWidth = stroke.width
      ctx.strokeStyle = strokeStyle
      ctx.moveTo(xPos, yStart)
      ctx.lineTo(xPos, yEnd)
      ctx.stroke()
    }
  }
}
const drawYAxis = ctx => {
  const scale = 5
  const yMax = Math.ceil(100 / scale)
  const step = grid.height / yMax
  const offset = {
    x: axes.y.width,
    y: axes.x.height
  }
  const width = grid.width + offset.x

  for (let y = 0; y < yMax; y++) {
    const isMarker = (y * scale) % 20 === 0
    const strokeStyle = isMarker ? stroke.style.dark : stroke.style.light
    const yPos = y * step + offset.y
    const xStart = isMarker ? offset.x - grid.markerSize : offset.x
    const xEnd = width

    if (isMarker) {
      ctx.beginPath()
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'right'
      ctx.fillText(100 - y * scale, xStart - 3, yPos)
    }

    if (y > 0) {
      ctx.beginPath()
      ctx.lineWidth = stroke.width
      ctx.strokeStyle = strokeStyle
      ctx.moveTo(xStart, yPos)
      ctx.lineTo(xEnd, yPos)
      ctx.stroke()
    }
  }
}
const drawCoordinates = (ctx, dose, maxDose) => {
  drawBoundary(ctx)
  drawXaxis(ctx, dose, maxDose)
  drawYAxis(ctx)
}
const Chart = ({ dvh, selected }) => {
  const ref = useRef(null)
  const { dose, maxDose } = dvh

  useEffect(() => {
    const ctx = ref.current.getContext('2d')

    ctx.font = '14px san-serif'
    drawCoordinates(ctx, dose, maxDose)
  }, [])

  return (
    <>
      <canvas ref={ref} width={canvas.width} height={canvas.height} />
      {Object.keys(dvh.structures).map(id => {
        const structure = dvh.structures[id]
        const props = { structure, selected, maxDose }

        return <Plot {...props} key={id} />
      })}
      <Overlay dvh={dvh} selected={selected} />
    </>
  )
}

Chart.propTypes = {
  dvh: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired
}

export { Chart }
