import styled from 'styled-components'

import { Props } from '.'
import { cores } from '../../styles'
import { Card } from '../Product/styles'

type ContainerProps = {
  $background: Props['background']
  $variant?: Props['variant']
}

export const Container = styled.section<ContainerProps>`
  padding: 32px 0;
  background-color: ${(props) =>
    props.$background === 'black' ? cores.preto : cores.cinza};

  ${Card} {
    background-color: ${cores.cinza};
    border: 1px solid;
  }

  ${(props) =>
    props.$variant === 'categories' &&
    `
      ${Card} {
        background-color: ${cores.salmon};
        border: 1px solid;
        color: ${cores.cinza};
      }
    `}
`

export const List = styled.ul<{ $variant?: Props['variant'] }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 48px;
  row-gap: 40px;
  margin-top: 40px;
  margin-bottom: 64px;

  ${(props) =>
    props.$variant === 'categories' &&
    `
      grid-template-columns: repeat(3, 1fr);
      column-gap: 24px;
      row-gap: 24px;
      margin-bottom: 64px;
      margin-top: 8px;
      `}
`

export const Title = styled.h2<{ variant?: Props['variant'] }>`
  font-size: 18px;
  font-weight: bold;
`

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none;
  align-items: center;
  justify-content: center;

  &.visivel {
    display: flex;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.73);
  }
`

export const ModalContent = styled.div`
  position: relative;
  z-index: 1;

  width: 1024px;
  min-height: 344px;
  padding: 32px;

  background-color: ${cores.salmon};
  color: ${cores.cinza};

  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;

  img:first-child {
    width: 280px;
    height: 280px;
    object-fit: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
    height: 280px;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h4 {
      font-size: 18px;
      font-weight: bold;
    }
  }

  p {
    margin-top: 16px;
    font-size: 14px;
    line-height: 22px;
  }

  button {
    display: flex;
    width: 218px;
    height: 24px;
    margin-top: 32px;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0;

    background-color: ${cores.begeClaro};
    color: ${cores.salmon};

    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  }

  .close {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
`
