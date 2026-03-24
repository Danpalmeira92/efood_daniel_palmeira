import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useParams } from 'react-router-dom'

import { add, open } from '../../store/reducers/cart'
import { ProductsList } from '../../components/ProductsList'
import Prato from '../../models/Pratos'

import Header from '../../components/Header'

import { Modal, ModalContent } from '../../components/ProductsList/styles'

import fechar from '../../assets/images/fechar.png'

interface ModalState {
  isVisible: boolean
  prato?: Prato
}

interface ApiPrato {
  id: number
  nome: string
  descricao: string
  foto: string
  porcao: string
  preco: number
}

interface ApiRestaurante {
  id: number
  titulo: string
  tipo: string
  avaliacao: number
  capa: string
  cardapio: ApiPrato[]
}

const Categories = () => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    if (!modal.prato) return

    dispatch(add(modal.prato))
    dispatch(open())

    closeModal()
  }

  const { id } = useParams<{ id: string }>()
  const [pratos, setPratos] = useState<Prato[]>([])
  const [modal, setModal] = useState<ModalState>({
    isVisible: false
  })

  const closeModal = () => {
    setModal({
      isVisible: false
    })
  }

  const [tipo, setTipo] = useState('')
  const [titulo, setTitulo] = useState('')
  const [capa, setCapa] = useState('')

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data: ApiRestaurante[]) => {
        const restaurante = data.find((item) => item.id === Number(id))

        if (!restaurante) return

        setTipo(restaurante.tipo)
        setTitulo(restaurante.titulo)
        setCapa(restaurante.capa)

        const pratosFormatados = restaurante.cardapio.map(
          (item) =>
            new Prato(
              item.descricao,
              item.foto,
              [item.porcao],
              'Adicionar ao carrinho',
              item.nome,
              item.id,
              restaurante.avaliacao,
              item.preco
            )
        )

        setPratos(pratosFormatados)
      })
  }, [id])

  return (
    <>
      <Header
        showTexto={false}
        variant={'categories'}
        tipo={tipo}
        titulo={titulo}
        capa={capa}
      />

      {pratos.length > 0 && (
        <ProductsList
          pratos={pratos}
          title=""
          background="gray"
          showInfos={false}
          showEstrela={false}
          variant="categories"
          onPratoClick={(prato) =>
            setModal({
              isVisible: true,
              prato
            })
          }
        />
      )}

      <Modal className={modal.isVisible ? 'visivel' : ''}>
        <ModalContent className="container">
          <img src={modal.prato?.image} alt={modal.prato?.title} />
          <div className="content">
            <header>
              <h4>{modal.prato?.title}</h4>
            </header>
            <p>{modal.prato?.description}</p>

            <p>
              <strong>Porção:</strong> {modal.prato?.infos[0]}
            </p>

            <button onClick={handleAddToCart}>
              {modal.prato?.button} - R${' '}
              {modal.prato
                ? modal.prato.preco.current.toFixed(2).replace('.', ',')
                : '0,00'}
            </button>
          </div>
          <img
            className="close"
            onClick={closeModal}
            src={fechar}
            alt="Ícone de fechar"
          />
        </ModalContent>
        <div className="overlay" onClick={closeModal}></div>
      </Modal>
    </>
  )
}

export default Categories
