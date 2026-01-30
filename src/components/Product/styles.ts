import styled from 'styled-components'
import { cores } from '../../styles'
import { TagContainer } from '../Tag/styles'
import { Props } from './index'

export const Card = styled.div<{ $variant?: Props['$variant'] }>`
  display: flex;
  flex-direction: column;
  height: 100%;

  background-color: ${cores.cinza};
  padding: ${(props) =>
    props.$variant === 'categories' ? '8px 8px 8px 8px' : '200px 8px 8px 8px'};
  position: relative;
  overflow: hidden;

  ${TagContainer} {
    margin-right: 8px;
  }
`

export const ImagemProduto = styled.img<{ $variant?: Props['$variant'] }>`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;

  ${(props) =>
    props.$variant === 'categories'
      ? `
        height: 160px;
        position: relative;
        top: 0;
        left: 0;
        z-index: 1;
      `
      : `
        position: absolute;
        top: -8px;
        left: 0;
        z-index: 2;
      `}
`

export const Titulo = styled.h3<{ $variant?: Props['$variant'] }>`
  font-weight: bold;
  font-size: 16px;
  display: block;
  margin-top: 8px;
  margin-bottom: 6px;

  ${(props) =>
    props.$variant === 'categories' &&
    `
      color: ${cores.begeClaro};
      margin-top: 2px;
      margin-bottom: 2px;
      `}
`

export const Descricao = styled.p<{ $variant?: Props['$variant'] }>`
  font-size: 14px;
  line-height: 22px;
  display: block;
  margin-bottom: 16px;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${(props) =>
    props.$variant === 'categories' &&
    `
      margin-top: 0;
      color: ${cores.begeClaro};

      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      `}
`
export const Infos = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 3;
  display: flex;
  gap: 8px;
`
export const LinhaTitulo = styled.div<{ $variant?: Props['$variant'] }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 8px;

  ${(props) =>
    props.$variant === 'categories' &&
    `
    margin-top: 4px;
    margin-bottom: 4px;

      `}
`
export const WrapperProduto = styled.div`
  position: relative;
  width: 100%;
`
