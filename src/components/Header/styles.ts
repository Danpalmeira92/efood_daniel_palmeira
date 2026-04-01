import styled from 'styled-components'
import bgImage from '../../assets/images/fundo.png'

import { Props } from '.'

export const HeaderBar = styled.header<{ $variant?: Props['variant'] }>`
  background-image: url(${bgImage});
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 320px;
  padding: 24px 0;

  ${(props) =>
    props.$variant === 'categories' &&
    `
      height: 160px;
      `}
`

export const VariantBanner = styled.div<{ $image?: string }>`
  width: 100%;
  height: 280px;
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .container {
    position: relative;
    z-index: 1;
  }
`

export const TituloBanner = styled.h2`
  padding-top: 24px;
  padding-bottom: 160px;
  font-size: 32px;
  font-weight: 100;
  color: #fff;
  opacity: 0.7;
`

export const TituloRestauranrte = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #fff;
`

export const VariantHeaderTexto = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 720px;
  padding: 24px;

  a {
    text-decoration: none;
    color: inherit;
  }

  h4 {
    font-size: 18px;
    font-weight: bold;
  }

  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`

export const TextoBanner = styled.p`
  font-weight: bold;
  font-size: 36px;
  line-height: 100%;
  text-align: center;
`

export const Links = styled.ul`
  display: flex;
  margin-left: 40px;
`

export const LinkItem = styled.li`
  margin-right: 16px;
`

export const LinkCart = styled.a`
  display: flex;

  img {
    margin-left: 16px;
  }
`
