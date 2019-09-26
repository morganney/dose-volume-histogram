import React, { useRef, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Metric } from './metric'
import { Description } from './description'

import { config } from '../../config'

const { axes, grid, stroke } = config
const borders = 2 * stroke.width
const width = grid.width + borders
const height = grid.height + borders
const clickRadius = 3
const initialState = { coords: [], clickedOn: [], absolute: '', relative: '', volume: '' }
const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        ...action.payload
      }
    case 'clear':
      return initialState
    default:
      return state
  }
}
const Canvas = styled.canvas`
  position: absolute;
  left: ${axes.y.width - borders / 2}px;
  top: ${axes.x.height - borders / 2}px;
  z-index: 2;
`
const Overlay = ({ dvh, selected }) => {
  const ref = useRef(null)
  const relativeRef = useRef(null)
  const absoluteRef = useRef(null)
  const volumeRef = useRef(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const { coords, volume, absolute, relative, clickedOn } = state
  const { dose, maxDose, maxDoseAbsolute } = dvh
  const metricProps = { coords, clickedOn }
  const onClick = evt => {
    const { target } = evt
    const box = target.getBoundingClientRect()
    const x = evt.clientX - box.x
    const y = evt.clientY - box.y
    const relative = evt.relativeEntered || (x * maxDose) / width
    const volume = evt.volumeEntered || ((height - y) * 100) / height
    const absolute = evt.absoluteEntered || (relative * dose) / 100
    const clickedOn = []

    if (ref.current.contains(target)) {
      selected.forEach(id => {
        const { Points: points } = dvh.structures[id]
        const numPoints = points.length

        for (let i = 0; i < numPoints; i++) {
          const doseWithinRange = Math.abs(points[i].Dose - relative) < 0.5
          const volumeWithinRange = Math.abs(points[i].Volume - volume) < 0.5

          if (doseWithinRange && volumeWithinRange) {
            clickedOn.push(id)
            break
          }
        }
      })

      return dispatch({
        type: 'set',
        payload: {
          clickedOn,
          volume: volume.toFixed(3),
          absolute: absolute.toFixed(3),
          relative: relative.toFixed(3),
          coords: [x, y]
        }
      })
    }

    if (
      !ref.current.contains(target) &&
      !relativeRef.current.contains(target) &&
      !absoluteRef.current.contains(target) &&
      !volumeRef.current.contains(target)
    ) {
      dispatch({ type: 'clear' })
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', onClick, false)

    return () => {
      document.removeEventListener('mousedown', onClick, false)
    }
  }, [selected])

  useEffect(() => {
    const ctx = ref.current.getContext('2d')

    ctx.clearRect(0, 0, width, height)

    if (coords.length) {
      const x = coords[0]
      const y = coords[1]

      ctx.beginPath()
      ctx.arc(x, y, clickRadius, 0, 2 * Math.PI)
      ctx.fill()
      ctx.strokeStyle = '#346DF1'
      ctx.setLineDash([5, 5])
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }
  }, [coords])

  return (
    <>
      <Canvas ref={ref} width={width} height={height} />
      <Description {...metricProps}>
        <p>ID: Prostate</p>
        {clickedOn.map(id => {
          return (
            <p key={id}>
              {id} volume: {dvh.structures[id].Volume.toFixed(2)}cc
            </p>
          )
        })}
      </Description>
      <Metric
        name="volume"
        value={volume}
        ref={volumeRef}
        {...metricProps}
        onChange={evt => {
          const { value } = evt.currentTarget

          if (value >= 0 && value <= 100) {
            dispatch({
              type: 'set',
              payload: { volume: value }
            })
          }
        }}
        onKeyDown={evt => {
          if (evt.key === 'Enter') {
            const target = ref.current
            const box = target.getBoundingClientRect()
            const stepY = grid.height / 100

            onClick({
              target,
              volumeEntered: parseFloat(volume),
              clientX: coords[0] + box.x,
              clientY: stepY * (100 - volume) + box.y
            })
          }
        }}
      />
      <Metric
        name="absolute"
        value={absolute}
        ref={absoluteRef}
        {...metricProps}
        onKeyDown={evt => {
          if (evt.key === 'Enter') {
            const target = ref.current
            const box = target.getBoundingClientRect()
            const stepX = grid.width / maxDoseAbsolute

            onClick({
              target,
              absoluteEntered: parseFloat(absolute),
              clientX: absolute * stepX + box.x,
              clientY: coords[1] + box.y
            })
          }
        }}
        onChange={evt => {
          const { value } = evt.currentTarget

          if (value >= 0 && value <= maxDoseAbsolute) {
            dispatch({
              type: 'set',
              payload: { absolute: value }
            })
          }
        }}
      />
      <Metric
        name="relative"
        value={relative}
        ref={relativeRef}
        {...metricProps}
        onChange={evt => {
          const { value } = evt.currentTarget

          if (value >= 0 && value <= maxDose) {
            dispatch({
              type: 'set',
              payload: { relative: value }
            })
          }
        }}
        onKeyDown={evt => {
          if (evt.key === 'Enter') {
            const target = ref.current
            const box = target.getBoundingClientRect()
            const stepX = grid.width / maxDose

            onClick({
              target,
              relativeEntered: parseFloat(relative),
              clientX: relative * stepX + box.x,
              clientY: coords[1] + box.y
            })
          }
        }}
      />
    </>
  )
}

Overlay.propTypes = {
  dvh: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired
}

export { Overlay }
