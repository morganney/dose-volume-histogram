import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Checkbox } from './checkbox'

const Th = styled.th`
  vertical-align: top;
  padding-bottom: 15px;
`
const TdLeft = styled.td`
  text-align: left;
`
const TdRight = styled.td`
  text-align: right;
`
const Legend = ({ rows, plan, selected, setSelected }) => {
  const rowKeys = Object.keys(rows)
  const isShowChecked = selected.length === rowKeys.length
  const handleSelectAll = () => {
    if (isShowChecked) {
      setSelected([])
    } else {
      setSelected(rowKeys.map(key => rows[key].StructureId))
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <Th>
            <label>
              <Checkbox onChange={handleSelectAll} checked={isShowChecked} /> Show
            </label>
          </Th>
          <Th>{plan}</Th>
          <Th>
            Volume
            <br />
            (cc)
          </Th>
          <Th>
            Max Dose
            <br />
            (cGy)
          </Th>
        </tr>
      </thead>
      <tbody>
        {rowKeys.map(key => {
          const row = rows[key]
          const checked = selected.includes(row.StructureId)
          const Bar = styled.span`
            display: inline-block;
            width: 20px;
            height: 8px;
            background-color: ${row.Color};
            margin-left: 10px;
          `

          return (
            <tr key={key}>
              <TdLeft>
                <label>
                  <Checkbox
                    checked={checked}
                    onChange={() => {
                      if (checked) {
                        setSelected(selected.filter(item => item !== row.StructureId))
                      } else {
                        setSelected([...selected, row.StructureId])
                      }
                    }}
                  />
                  <Bar />
                </label>
              </TdLeft>
              <TdLeft>{row.StructureId}</TdLeft>
              <TdRight>{row.Volume.toFixed(2)}</TdRight>
              <TdRight>{row.MaxDose.toFixed(1)}</TdRight>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

Legend.propTypes = {
  rows: PropTypes.object.isRequired,
  plan: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired
}

export { Legend }
