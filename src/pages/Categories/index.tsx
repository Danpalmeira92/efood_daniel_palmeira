import { useEffect, useState } from 'react'

import { ProductsList } from '../../components/ProductsList'
import Prato from '../../models/Pratos'

import pizza from '../../assets/images/pizza.png'

import Header from '../../components/Header'

import { Modal, ModalContent } from '../../components/ProductsList/styles'

import fechar from '../../assets/images/fechar.png'

const cardapio: Prato[] = [
  {
    id: 1,

    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita',
    avaliacao: 0,
    infos: [''],
    image: pizza,
    button: 'Adiconar ao carrinho',
    preco: 0
  },
  {
    id: 2,

    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita',
    avaliacao: 0,
    infos: [''],
    image: pizza,
    button: 'Adiconar ao carrinho',
    preco: 0
  },
  {
    id: 3,

    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita',
    avaliacao: 0,
    infos: [''],
    image: pizza,
    button: 'Adiconar ao carrinho',
    preco: 0
  },
  {
    id: 4,

    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita',
    avaliacao: 0,
    infos: [''],
    image: pizza,
    button: 'Adiconar ao carrinho',
    preco: 0
  },
  {
    id: 5,

    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita',
    avaliacao: 0,
    infos: [''],
    image: pizza,
    button: 'Adiconar ao carrinho',
    preco: 0
  },
  {
    id: 6,

    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita',
    avaliacao: 0,
    infos: [''],
    image: pizza,
    button: 'Adiconar ao carrinho',
    preco: 0
  }
]

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
  tipo: string
  avaliacao: number
  cardapio: ApiPrato[]
}

const Categories = () => {
  const [modal, setModal] = useState<ModalState>({
    isVisible: false
  })

  const closeModal = () => {
    setModal({
      isVisible: false
    })
  }

  const [pratoApi, setPratoApi] = useState<Prato | null>(null)

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data: ApiRestaurante[]) => {
        const pizzaria = data.find((item) => item.tipo === 'pizzaria')

        if (!pizzaria) return

        const marguerita = pizzaria.cardapio.find(
          (item) => item.nome === 'Pizza Margherita'
        )

        if (!marguerita) return

        const pratoFormatado = new Prato(
          marguerita.descricao,
          marguerita.foto,
          [marguerita.porcao],
          'Adicionar ao carrinho',
          marguerita.nome,
          marguerita.id,
          pizzaria.avaliacao,
          marguerita.preco
        )

        setPratoApi(pratoFormatado)
      })
  }, [])

  return (
    <>
      <Header showTexto={false} variant={'categories'} />

      <ProductsList
        pratos={cardapio}
        title=""
        background="gray"
        showInfos={false}
        showEstrela={false}
        variant={'categories'}
        onPratoClick={() => {
          if (!pratoApi) return

          setModal({
            isVisible: true,
            prato: pratoApi
          })
        }}
      />

      <Modal className={modal.isVisible ? 'visivel' : ''}>
        <ModalContent className="container">
          <img src={modal.prato?.image} alt={modal.prato?.title} />
          <div className="content">
            <header>
              <h4>{modal.prato?.title}</h4>
            </header>
            <p>{modal.prato?.description}</p>

            <button>
              {modal.prato?.button} - R${' '}
              {modal.prato?.preco.toFixed(2).replace('.', ',') ?? '0,00'}
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
