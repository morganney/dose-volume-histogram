import styled from 'styled-components'

const Description = styled.div`
  display: ${({ clickedOn }) => (clickedOn.length > 0 ? 'block' : 'none')};
  position: absolute;
  left: ${({ coords }) => coords[0] + 35}px;
  top: ${({ coords }) => coords[1] - 50}px;
  border: 1px solid #ada8a4;
  border-radius: 5px;
  background: white;
  z-index: 4;
  min-width: 185px;
  font-size: 12px;
  box-sizing: border-box;
  padding: 10px;
  p {
    margin: 0 0 10px 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
`

export { Description }
