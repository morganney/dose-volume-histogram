import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'

import { api } from './api'

import { Chart } from './components/chart'
import { Legend } from './components/legend'

const doseWidth = 60
const doseMixin = css`
  position: absolute;
  right: -${doseWidth}px;
  box-sizing: border-box;
  width: ${doseWidth}px;
  border: 1px solid #ded9d6;
  font-size: 14px;
  padding-left: 5px;
`
const labelMixin = css`
  position: absolute;
  text-align: center;
  margin: 0;
  width: 100%;
`
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
`
const Page = styled.main`
  padding: 80px;
`
const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`
const Box = styled.div`
  position: relative;
`
const ChartBox = styled.div`
  position: relative;
  margin: 0 ${doseWidth}px 0 0;
`
const AbsoluteDose = styled.span`
  ${doseMixin}
  top: 0;
`
const RelativeDose = styled.span`
  ${doseMixin}
  bottom: 2px;
`
const AbsoluteLabel = styled.p`
  ${labelMixin}
  top: -25px;
`
const RelativeLabel = styled.p`
  ${labelMixin}
  bottom: -20px;
`
const VolumeLabel = styled.p`
  transform: translateX(-50%) translateY(-50%) rotate(-90deg);
  position: absolute;
  top: 50%;
  left: -20px;
  margin: 0;
`
const App = () => {
  const [dvh, setDvh] = useState(null)
  const [selected, setSelected] = useState([
    'BLADDER',
    'Bowel',
    'FEMUR_LT',
    'FEMUR_RT',
    'GTV',
    'PTVHD',
    'RECTUM'
  ])

  useEffect(() => {
    api.getDvhData(setDvh)
  }, [])

  if (!dvh) {
    return <div>Loading...</div>
  }

  return (
    <>
      <GlobalStyle />
      <Page>
        <Flex>
          <ChartBox>
            <Chart dvh={dvh} selected={selected} />
            <AbsoluteDose>{dvh.maxDoseAbsolute}</AbsoluteDose>
            <RelativeDose>{dvh.maxDose}</RelativeDose>
            <AbsoluteLabel>Dose [cGy]</AbsoluteLabel>
            <RelativeLabel>Relative dose [%]</RelativeLabel>
            <VolumeLabel>Ratio of Total Structure Volume [%]</VolumeLabel>
          </ChartBox>
          <Box>
            <Legend
              rows={dvh.structures}
              plan={dvh.plan}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Flex>
      </Page>
    </>
  )
}

export { App }
