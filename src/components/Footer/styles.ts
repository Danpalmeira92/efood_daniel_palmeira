import styled from 'styled-components'
import { colors } from '../../styles'

export const Container = styled.footer`
  background-color: ${colors.lightBeige};
  padding: 32px 0;
  font-size: 14px;
  height: 298px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const Copyright = styled.div`
  text-align: center;
`
