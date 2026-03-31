import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'

import {
  Overlay,
  CardContainer,
  Sidebar,
  Prices,
  CartItem,
  Button
} from './styles'

import { close, remove } from '../../store/reducers/cart'
import { formataPreco } from '../ProductsList'

import Checkout from '../../pages/Checkout'

export const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.preco.current, 0)
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  const [step, setStep] = useState<'cart' | 'checkout'>('cart')

  return (
    <CardContainer className={isOpen ? 'is-open' : ''}>
      <Overlay className={isOpen ? 'is-open' : ''} onClick={closeCart} />

      <Sidebar className={isOpen ? 'is-open' : ''}>
        {step === 'cart' && (
          <>
            <ul>
              {items.map((item) => (
                <CartItem key={item.id}>
                  <img src={item.image} alt={item.title} />

                  <div>
                    <h3>{item.title}</h3>
                    <span>{formataPreco(item.preco.current)}</span>
                  </div>

                  <button onClick={() => removeItem(item.id)} type="button" />
                </CartItem>
              ))}
            </ul>

            <Prices>
              Valor total <span>{formataPreco(getTotalPrice())}</span>
            </Prices>

            <Button onClick={() => setStep('checkout')}>
              Continuar com a entrega
            </Button>
          </>
        )}
        {step === 'checkout' && (
          <Checkout
            onBack={() => {
              setStep('cart')
              closeCart()
            }}
            onReturnToCart={() => {
              setStep('cart')
            }}
          />
        )}
      </Sidebar>
    </CardContainer>
  )
}

export default Cart
