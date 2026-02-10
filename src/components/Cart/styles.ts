import styled from 'styled-components'
import { cores } from '../../styles'
import { TagContainer } from '../Tag/styles'
import { ButtonLink } from '../Button/styles'

import lixeira from '../../assets/images/lixeira.png'

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.7;
`

export const CardContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: flex-end;
  z-index: 1;

  &.is-open {
    display: flex;
  }
`

export const Sidebar = styled.aside`
  background-color: ${cores.salmon};
  z-index: 1;
  padding: 24px 8px 0 8px;
  max-width: 360px;
  width: 100%;

  ${ButtonLink} {
    max-width: 100%;
    width: 100%;
    text-align: center;
    background-color: ${cores.begeClaro};
    color: ${cores.salmon};
  }
`

export const Prices = styled.p`
  font-weight: bold;
  font-size: 14px;
  color: ${cores.begeClaro};
  margin-bottom: 24px;
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CartItem = styled.li`
  display: flex;
  margin-bottom: 16px;
  padding: 8px;
  position: relative;
  background-color: ${cores.begeClaro};

  img {
    height: 80px;
    width: 80px;
    object-fit: cover;
    margin-right: 8px;
  }

  h3 {
    color: ${cores.salmon};
    font-weight: bold;
    font-size: 16px;
  }

  span {
    display: block;
    padding-top: 16px;
    font-weight: bold;
    font-size: 14px;
    color: ${cores.salmon};
  }

  ${TagContainer} {
    margin-right: 4px;
    margin-top: 4px;
    margin-bottom: 16px;
  }

  button {
    background-image: url(${lixeira});
    width: 16px;
    height: 16px;
    border: none;
    background-color: transparent;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    position: absolute;
    bottom: 8px;
    right: 8px;
  }
`
