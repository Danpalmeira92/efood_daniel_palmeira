import styled from 'styled-components'
import { cores } from '../../styles'

export const Container = styled.div`
  border-radius: 8px;
  color: ${cores.begeClaro};
  padding: 8px;
  margin-bottom: 40px;

  h2,
  h3 {
    font-size: 18px;
    font-weight: bold;
    color: ${cores.begeClaro};
    margin-bottom: 24px;
  }

  .margin-top {
    margin-top: 24px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
  }
`
