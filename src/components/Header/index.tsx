import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { RootReducer } from '../../store'
import { open } from '../../store/reducers/cart'

import {
  HeaderBar,
  TextoBanner,
  VariantBanner,
  VariantHeaderTexto,
  TituloBanner,
  TituloRestauranrte
} from './styles'

import logo from '../../assets/images/logo.png'

export type Props = {
  showTexto?: boolean
  variant?: 'default' | 'categories'
  tipo?: string
  titulo?: string
  capa?: string
}

const Header = ({
  showTexto = true,
  variant = 'default',
  tipo,
  titulo,
  capa
}: Props) => {
  const itens = useSelector((state: RootReducer) => state.cart.items)
  const dispatch = useDispatch()

  const openCart = () => {
    dispatch(open())
  }

  return (
    <>
      <HeaderBar $variant={variant}>
        {variant === 'categories' ? (
          <VariantHeaderTexto>
            <h4>Restaurantes</h4>

            <Link to="/" className="logo">
              <img src={logo} alt="Efood" />
            </Link>

            <h4 onClick={openCart} style={{ cursor: 'pointer' }}>
              {itens.length} produto(s) no carrinho
            </h4>
          </VariantHeaderTexto>
        ) : (
          <>
            <div>
              <Link to="/">
                <img src={logo} alt="Efood" />
              </Link>
            </div>

            {showTexto && (
              <TextoBanner>
                Viva experiências gastronômicas <br /> no conforto da sua casa
              </TextoBanner>
            )}
          </>
        )}
      </HeaderBar>

      {variant === 'categories' && (
        <VariantBanner $image={capa}>
          <div className="container">
            <TituloBanner>{tipo}</TituloBanner>
            <TituloRestauranrte>{titulo}</TituloRestauranrte>
          </div>
        </VariantBanner>
      )}
    </>
  )
}

export default Header
