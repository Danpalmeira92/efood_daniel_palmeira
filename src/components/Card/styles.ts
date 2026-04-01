import styled from 'styled-components'
import { colors } from '../../styles'

export const Container = styled.div`
  border-radius: 8px;
  color: ${colors.lightBeige};
  padding: 8px;
  margin-bottom: 40px;

  h2,
  h3 {
    font-size: 18px;
    font-weight: bold;
    color: ${colors.lightBeige};
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
