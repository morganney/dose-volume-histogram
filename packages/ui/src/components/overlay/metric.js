import styled from 'styled-components'

const inputPosition = {
  volume(coords) {
    return `left: -40px; top: ${coords[1] + 10}px;`
  },
  relative(coords) {
    return `bottom: 4px; left: ${coords[0] - 8}px;`
  },
  absolute(coords) {
    return `top: 0; left: ${coords[0] - 8}px;`
  }
}
const Metric = styled.input.attrs({ type: 'text' })`
  position: absolute;
  z-index: 3;
  padding: 0;
  width: 60px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #346df1;
  background-color: #346df1;
  color: white;
  display: ${({ clickedOn }) => (clickedOn.length > 0 ? 'inline' : 'none')};
  ${({ name, coords }) => inputPosition[name](coords)}

  &:focus {
    outline: 0;
    background-color: white;
    color: black;
    border: 3px solid #346df1;
    width: 90px;
    text-align: left;
  }
`

export { Metric }
