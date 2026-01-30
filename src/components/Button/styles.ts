import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { cores } from '../../styles'

export const ButtonLink = styled(Link)`
  width: 105px;
  border: 2px solid ${cores.salmon};
  background-color: ${cores.salmon};
  padding: 6px 10px;
  margin-bottom: 4px;
  color: ${cores.cinza};
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  cursor: pointer;
`
export const ButtonLinkVariant = styled(Link)`
  width: 100%;
  border: 2px solid ${cores.salmon};
  padding: 6px 10px;
  margin-bottom: 4px;
  text-align: center;
  color: ${cores.salmon};
  background-color: ${cores.begeClaro};
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  cursor: pointer;
`
