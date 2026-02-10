import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'

import { Overlay, CardContainer, Sidebar, Prices, CartItem } from './styles'

import { close, remove } from '../../store/reducers/cart'
import { formataPreco } from '../ProductsList'
import { ButtonLink } from '../Button/styles'

export const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.preco, 0)
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  return (
    <CardContainer className={isOpen ? 'is-open' : ''}>
      <Overlay className={isOpen ? 'is-open' : ''} onClick={closeCart} />

      <Sidebar className={isOpen ? 'is-open' : ''}>
        <ul>
          {items.map((item) => (
            <CartItem key={item.id}>
              <img src={item.image} alt={item.title} />

              <div>
                <h3>{item.title}</h3>
                <span>{formataPreco(item.preco)}</span>
              </div>

              <button onClick={() => removeItem(item.id)} type="button" />
            </CartItem>
          ))}
        </ul>

        <Prices>
          Valor total <span>{formataPreco(getTotalPrice())}</span>
        </Prices>

        <ButtonLink to="#">Continuar com a entrega</ButtonLink>
      </Sidebar>
    </CardContainer>
  )
}

export default Cart
