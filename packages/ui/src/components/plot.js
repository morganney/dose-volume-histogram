import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { config } from '../config'

const { axes, grid, stroke } = config
const Plot = ({ structure, selected, maxDose }) => {
  const ref = useRef(null)
  const borders = 2 * stroke.width
  const width = grid.width + borders
  const height = grid.height + borders
  const Canvas = styled.canvas`
    position: absolute;
    left: ${axes.y.width - borders / 2}px;
    top: ${axes.x.height - borders / 2}px;
    z-index: 1;
  `

  useEffect(() => {
    if (ref.current) {
      const maxVolume = 100
      const stepX = grid.width / maxDose
      const stepY = grid.height / maxVolume
      const ctx = ref.current.getContext('2d')

      ctx.beginPath()
      ctx.strokeStyle = structure.Color
      ctx.lineJoin = 'round'
      ctx.lineWidth = 2
      ctx.moveTo(stroke.width, stroke.width)
      structure.Points.forEach(point => {
        const xPos = stepX * point.Dose + stroke.width
        const yPos = stepY * (maxVolume - point.Volume) + stroke.width

        ctx.lineTo(xPos, yPos)
      })
      ctx.stroke()
    }
  })

  if (selected.includes(structure.StructureId)) {
    return <Canvas ref={ref} width={width} height={height} />
  }

  return null
}

Plot.propTypes = {
  structure: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired,
  maxDose: PropTypes.number.isRequired
}

export { Plot }
