import { useEffect, useState } from 'react'

import { ProductsList } from '../../components/ProductsList'
import Prato from '../../models/Pratos'

import pizza from '../../assets/images/pizza.png'
import { ButtonLink } from '../../components/Button/styles'

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
      .then((data) => {
        // pega a pizzaria
        const pizzaria = data.find((item: any) => item.tipo === 'pizzaria')

        // pega a pizza marguerita
        const marguerita = pizzaria.cardapio.find(
          (item: any) => item.nome === 'Pizza Margherita'
        )

        const pratoFormatado = new Prato(
          marguerita.descricao, // description
          marguerita.foto, // image
          [marguerita.porcao], // infos
          'Adicionar ao carrinho', // button
          marguerita.nome, // title
          marguerita.id, // id
          pizzaria.avaliacao, // avaliacao
          marguerita.preco //preço
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
              {modal.prato?.preco.toFixed(2).replace('.', ',')}
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
