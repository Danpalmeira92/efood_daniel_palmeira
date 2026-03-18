import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import InputMask from 'react-input-mask'

import Button from '../../components/Button'
import Card from '../../components/Card'

import barCode from '../../assets/images/boleto.png'
import creditCard from '../../assets/images/cartao.png'

import { usePurchaseMutation } from '../../services/api'

import * as S from './styles'
import { RootReducer } from '../../store'
import { clear } from '../../store/reducers/cart'

import { getTotalPrice, parseToBrl } from '../../utils'

type Props = {
  onBack: () => void
}

type Installment = {
  quantity: number
  amount: number
  formattedAmount: string
}

const Checkout = ({ onBack }: Props) => {
  const [payWithCard, setPayWithCard] = useState(false)
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const [installments, setInstallments] = useState<Installment[]>([])
  const dispatch = useDispatch()

  const [step, setStep] = useState<'delivery' | 'payment'>('delivery')

  const totalPrice = getTotalPrice(items)

  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      cpf: '',
      deliveryEmail: '',
      confirmDeliveryEmail: '',
      cardOwner: '',
      cpfCardOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expiresMonth: '',
      expiresYear: '',
      cardCode: '',
      installments: 1
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'O nome precisa ter pelo meno 5 caracteres')
        .required('O campo é obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      cpf: Yup.string().min(14).max(14).required('O campo é obrigatório'),
      deliveryEmail: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      confirmDeliveryEmail: Yup.string()
        .oneOf([Yup.ref('deliveryEmail')], 'Os e-mails são diferentes')
        .required('O campo é obrigatório'),

      cardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cpfCardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardDisplayName: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardNumber: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expiresMonth: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expiresYear: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardCode: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      installments: Yup.number().when(() =>
        payWithCard
          ? Yup.number().required('O campo é obrigatório')
          : Yup.number()
      )
    }),
    onSubmit: (values) => {
      purchase({
        billing: {
          document: values.cpf,
          email: values.email,
          name: values.fullName
        },
        delivery: {
          email: values.deliveryEmail
        },
        payment: {
          installments: values.installments,
          card: {
            active: payWithCard,
            code: Number(values.cardCode),
            name: values.cardDisplayName,
            number: values.cardNumber,
            owner: {
              document: values.cpfCardOwner,
              name: values.cardOwner
            },
            expires: {
              month: Number(values.expiresMonth),
              year: Number(values.expiresYear)
            }
          }
        },
        products: items.map(
          (item: { id: any; preco: { current: number } }) => ({
            id: item.id,
            price: item.preco.current as number
          })
        )
      })
    }
  })

  const checkInputHasError = (fieldname: string) => {
    const isTouched = form.touched[fieldname as keyof typeof form.touched]
    const isInvalid = form.errors[fieldname as keyof typeof form.errors]
    const hasError = isTouched && isInvalid

    return hasError
  }

  useEffect(() => {
    const calculateInstallments = () => {
      const installmentsArray: Installment[] = []
      for (let i = 1; i <= 6; i++) {
        installmentsArray.push({
          quantity: i,
          amount: totalPrice / i,
          formattedAmount: parseToBrl(totalPrice / i)
        })
      }

      return installmentsArray
    }

    if (totalPrice > 0) {
      setInstallments(calculateInstallments())
    }
  }, [totalPrice])

  useEffect(() => {
    if (isSuccess) {
      dispatch(clear())
    }
  }, [isSuccess, dispatch])

  if (items.length === 0 && !isSuccess) {
    onBack()
    return null
  }

  return (
    <div className="container">
      {isSuccess && data ? (
        <Card title="Muito obrigado">
          <>
            <p>
              É com satisfação que informamos que recebemos seu pedido com
              sucesso! <br /> Abaixo estão os detalhes da sua compra: <br />
              Número do pedido: {data.orderId} <br />
              Forma de pagamento:{' '}
              {payWithCard ? 'Cartão de crédito' : 'Boleto Bancário'}
            </p>
          </>
        </Card>
      ) : (
        <form onSubmit={form.handleSubmit}>
          {step === 'delivery' && (
            <>
              <Card title="Entrega">
                <>
                  <S.InputGroup>
                    <label htmlFor="fullname">Quem irá receber</label>
                    <input
                      id="fullname"
                      type="text"
                      name="fullName"
                      value={form.values.fullName}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={checkInputHasError('fullName') ? 'error' : ''}
                    />
                  </S.InputGroup>

                  <S.InputGroup>
                    <label htmlFor="email">Endereço</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.values.email}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={checkInputHasError('email') ? 'error' : ''}
                    />
                  </S.InputGroup>

                  <S.InputGroup>
                    <label htmlFor="cpf">Cidade</label>
                    <InputMask
                      id="cpf"
                      name="cpf"
                      value={form.values.cpf}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={checkInputHasError('cpf') ? 'error' : ''}
                      mask="999.999.999-99"
                    />
                  </S.InputGroup>

                  <S.Row marginTop="16px">
                    <S.InputGroup>
                      <label htmlFor="deliveryEmail">CEP</label>
                      <input
                        id="deliveryEmail"
                        name="deliveryEmail"
                        value={form.values.deliveryEmail}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('deliveryEmail') ? 'error' : ''
                        }
                      />
                    </S.InputGroup>

                    <S.InputGroup>
                      <label htmlFor="confirmDeliveryEmail">Número</label>
                      <input
                        id="confirmDeliveryEmail"
                        name="confirmDeliveryEmail"
                        value={form.values.confirmDeliveryEmail}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('confirmDeliveryEmail')
                            ? 'error'
                            : ''
                        }
                      />
                    </S.InputGroup>
                  </S.Row>
                  <S.InputGroup>
                    <label htmlFor="email">Complemento (Opcional)</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.values.email}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={checkInputHasError('email') ? 'error' : ''}
                    />
                  </S.InputGroup>
                </>
              </Card>

              <S.CheckoutButton
                type="button"
                onClick={() => setStep('payment')}
                title="Continuar com o pagamento"
              >
                Continuar com o pagamento
              </S.CheckoutButton>

              <S.CheckoutButton
                type="button"
                onClick={onBack}
                title="Voltar para o carrinho"
              >
                Voltar para o carrinho
              </S.CheckoutButton>
            </>
          )}

          {step === 'payment' && (
            <>
              <Card
                title={`Pagamento - Valor a pagar ${parseToBrl(totalPrice)}`}
              >
                <>
                  <S.InputGroup>
                    <label htmlFor="cardOwner">Nome no cartão</label>
                    <input
                      id="cardOwner"
                      name="cardOwner"
                      value={form.values.cardOwner}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={checkInputHasError('cardOwner') ? 'error' : ''}
                    />
                  </S.InputGroup>

                  <S.Row marginTop="16px">
                    <S.InputGroup>
                      <label htmlFor="cardNumber">Número do cartão</label>
                      <InputMask
                        id="cardNumber"
                        name="cardNumber"
                        value={form.values.cardNumber}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('cardNumber') ? 'error' : ''
                        }
                        mask="9999 9999 9999 9999"
                      />
                    </S.InputGroup>
                    <S.InputGroup>
                      <label htmlFor="cardCode">CVV</label>
                      <InputMask
                        id="cardNumber"
                        name="cardNumber"
                        value={form.values.cardNumber}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('cardCode') ? 'error' : ''
                        }
                        mask="999"
                      />
                    </S.InputGroup>
                  </S.Row>
                </>
              </Card>

              <S.CheckoutButton
                type="button"
                onClick={() => setStep('delivery')}
                title="Voltar"
              >
                Voltar
              </S.CheckoutButton>

              <S.CheckoutButton
                type="button"
                htmlType="submit"
                disabled={isLoading}
                title="Finalizar compra"
              >
                {isLoading ? 'Finalizando...' : 'Finalizar compra'}
              </S.CheckoutButton>
            </>
          )}
        </form>
      )}
    </div>
  )
}

export default Checkout
