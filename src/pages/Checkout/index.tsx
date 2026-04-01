import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import InputMask from 'react-input-mask'

import Card from '../../components/Card'

import { usePurchaseMutation } from '../../services/api'

import * as S from './styles'
import { RootReducer } from '../../store'
import { clear } from '../../store/reducers/cart'

import { getTotalPrice, parseToBrl } from '../../utils'

type Props = {
  onBack: () => void
  onReturnToCart: () => void
}

const Checkout = ({ onBack, onReturnToCart }: Props) => {
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation()
  const { items } = useSelector((state: RootReducer) => state.cart)

  const dispatch = useDispatch()

  const [step, setStep] = useState<'delivery' | 'payment' | 'success'>(
    'delivery'
  )

  const totalPrice = getTotalPrice(items)

  const form = useFormik({
    initialValues: {
      fullName: '',
      endereco: '',
      complemento: '',
      cidade: '',
      cep: '',
      numero: '',
      cardOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expiresMonth: '',
      expiresYear: '',
      cardCode: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'O nome precisa ter pelo meno 5 caracteres')
        .required('O campo é obrigatório'),
      endereco: Yup.string()
        .min(5, 'Endereço muito curto')
        .required('O campo é obrigatório'),
      complemento: Yup.string(),
      cidade: Yup.string().required('O campo é obrigatório'),
      cep: Yup.string().required('O campo é obrigatório'),
      numero: Yup.string().required('O campo é obrigatório'),

      cardOwner: Yup.string()
        .min(3, 'Nome muito curto')
        .required('O campo é obrigatório'),
      cardNumber: Yup.string()
        .test('card-number', 'Número do cartão inválido', (value) => {
          if (!value) return false
          const numbers = value.replace(/\D/g, '')
          return numbers.length === 16
        })
        .required('O campo é obrigatório'),
      expiresMonth: Yup.string()
        .test('month', 'Mês inválido', (value) => {
          if (!value) return false
          const numbers = value.replace(/\D/g, '')
          const month = Number(numbers)
          return numbers.length === 2 && month >= 1 && month <= 12
        })
        .required('O campo é obrigatório'),
      expiresYear: Yup.string()
        .test('year', 'Ano inválido', (value) => {
          if (!value) return false
          const numbers = value.replace(/\D/g, '')
          return numbers.length === 2
        })
        .required('O campo é obrigatório'),
      cardCode: Yup.string()
        .test('cvv', 'CVV inválido', (value) => {
          if (!value) return false
          const numbers = value.replace(/\D/g, '')
          return numbers.length === 3
        })
        .required('O campo é obrigatório')
    }),
    onSubmit: async (values) => {
      const errors = await form.validateForm()

      if (Object.keys(errors).length > 0) {
        console.log('Tem erro, não envia')
        return
      }

      console.log('Enviando certo agora')

      try {
        await purchase({
          billing: {
            name: values.fullName,
            email: 'teste@test.com',
            document: '00000000000'
          },
          delivery: {
            email: 'teste@test.com'
          },
          payment: {
            installments: 1,
            card: {
              active: true,
              code: Number(values.cardCode),
              name: values.cardDisplayName,
              number: values.cardNumber,
              owner: {
                name: values.cardOwner,
                document: '00000000000'
              },
              expires: {
                month: Number(values.expiresMonth),
                year: Number(values.expiresYear)
              }
            }
          },
          products: items.map(
            (item: { id: number; preco: { current: number } }) => ({
              id: item.id,
              price: item.preco.current
            })
          )
        }).unwrap()

        dispatch(clear())
        setStep('success')
      } catch (error) {
        console.log(error)
      }
    }
  })

  const checkInputHasError = (fieldname: string) => {
    const isTouched = form.touched[fieldname as keyof typeof form.touched]
    const isInvalid = form.errors[fieldname as keyof typeof form.errors]
    const hasError = isTouched && isInvalid

    return hasError
  }

  if (items.length === 0 && !isSuccess) {
    onBack()
    return null
  }

  return (
    <div className="container">
      {step === 'success' ? (
        <>
          <Card title={`Pedido realizado - ${data?.orderId || 'Processando'}`}>
            <p>
              Estamos felizes em informar que seu pedido já está em processo de
              preparação e, em breve, será entregue no endereço fornecido.
              <br /> <br />
              Gostaríamos de ressaltar que nossos entregadores não estão
              autorizados a realizar cobranças extras.
              <br /> <br />
              Lembre-se da importância de higienizar as mãos após o recebimento
              do pedido, garantindo assim sua segurança e bem-estar durante a
              refeição.
              <br /> <br />
              Esperamos que desfrute de uma deliciosa e agradável experiência
              gastronômica. Bom apetite!
            </p>
          </Card>

          <S.CheckoutButton type="button" onClick={onBack} title="Concluir">
            Concluir
          </S.CheckoutButton>
        </>
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
                    <label htmlFor="endereco">Endereço</label>
                    <input
                      id="endereco"
                      type="text"
                      name="endereco"
                      value={form.values.endereco}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={checkInputHasError('endereco') ? 'error' : ''}
                    />
                  </S.InputGroup>

                  <S.InputGroup>
                    <label htmlFor="cidade">Cidade</label>
                    <input
                      id="cidade"
                      name="cidade"
                      value={form.values.cidade}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={checkInputHasError('cidade') ? 'error' : ''}
                    />
                  </S.InputGroup>

                  <S.Row marginTop="16px">
                    <S.InputGroup>
                      <label htmlFor="cep">CEP</label>
                      <InputMask
                        id="cep"
                        name="cep"
                        value={form.values.cep}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={checkInputHasError('cep') ? 'error' : ''}
                        mask="99999-999"
                      />
                    </S.InputGroup>

                    <S.InputGroup>
                      <label htmlFor="numero">Número</label>
                      <input
                        id="numero"
                        name="numero"
                        value={form.values.numero}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={checkInputHasError('numero') ? 'error' : ''}
                      />
                    </S.InputGroup>
                  </S.Row>
                  <S.InputGroup>
                    <label htmlFor="complemento">Complemento (Opcional)</label>
                    <input
                      id="complemento"
                      type="text"
                      name="complemento"
                      value={form.values.complemento}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={
                        checkInputHasError('complemento') ? 'error' : ''
                      }
                    />
                  </S.InputGroup>
                </>
              </Card>

              <S.CheckoutButton
                type="button"
                onClick={async () => {
                  const errors = await form.validateForm()

                  const deliveryFields: (keyof typeof form.values)[] = [
                    'fullName',
                    'endereco',
                    'cidade',
                    'cep',
                    'numero'
                  ]

                  const hasErrorsInDelivery = deliveryFields.some(
                    (field) => errors[field]
                  )

                  if (!hasErrorsInDelivery) {
                    setStep('payment')
                  } else {
                    form.setTouched({
                      fullName: true,
                      endereco: true,
                      cidade: true,
                      cep: true,
                      numero: true
                    })
                  }
                }}
                title="Continuar com o pagamento"
              >
                Continuar com o pagamento
              </S.CheckoutButton>

              <S.CheckoutButton
                type="button"
                onClick={onReturnToCart}
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
                    <S.InputGroup maxWidth="80px">
                      <label htmlFor="cardCode">CVV</label>
                      <InputMask
                        id="cardCode"
                        name="cardCode"
                        value={form.values.cardCode}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('cardCode') ? 'error' : ''
                        }
                        mask="999"
                      />
                    </S.InputGroup>
                  </S.Row>
                  <S.Row>
                    <S.InputGroup>
                      <label htmlFor="expiresMonth">Mês de vencimento</label>
                      <InputMask
                        id="expiresMonth"
                        name="expiresMonth"
                        value={form.values.expiresMonth}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('expiresMonth') ? 'error' : ''
                        }
                        mask="99"
                      />
                    </S.InputGroup>
                    <S.InputGroup>
                      <label htmlFor="expiresYear">Ano de vencimento</label>
                      <InputMask
                        id="expiresYear"
                        name="expiresYear"
                        value={form.values.expiresYear}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={
                          checkInputHasError('expiresYear') ? 'error' : ''
                        }
                        mask="99"
                      />
                    </S.InputGroup>
                  </S.Row>
                </>
              </Card>

              <S.CheckoutButton
                as="button"
                type="submit"
                disabled={false}
                title="Finalizar pagamento"
              >
                {isLoading ? 'Finalizando...' : 'Finalizar compra'}
              </S.CheckoutButton>
              <S.CheckoutButton
                type="button"
                onClick={() => setStep('delivery')}
                title="Voltar para a edição de endereço"
              >
                Voltar
              </S.CheckoutButton>
            </>
          )}
        </form>
      )}
    </div>
  )
}

export default Checkout
