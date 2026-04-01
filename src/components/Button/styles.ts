import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '../../styles'

export const ButtonLink = styled(Link)`
  width: 105px;
  border: 2px solid ${colors.salmon};
  background-color: ${colors.salmon};
  padding: 6px 10px;
  margin-bottom: 4px;
  color: ${colors.grey};
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  cursor: pointer;
`
export const ButtonLinkVariant = styled(Link)`
  width: 100%;
  border: 2px solid ${colors.salmon};
  padding: 6px 10px;
  margin-bottom: 4px;
  text-align: center;
  color: ${colors.salmon};
  background-color: ${colors.lightBeige};
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  cursor: pointer;
`
