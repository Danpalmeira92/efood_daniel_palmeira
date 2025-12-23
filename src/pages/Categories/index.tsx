import { useState } from 'react'

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
    button: ButtonLink
  },
  {
    id: 2,

    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita',
    avaliacao: 0,
    infos: [''],
    image: pizza,
    button: ButtonLink
  },
  {
    id: 3,

    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita',
    avaliacao: 0,
    infos: [''],
    image: pizza,
    button: ButtonLink
  },
  {
    id: 4,

    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita',
    avaliacao: 0,
    infos: [''],
    image: pizza,
    button: ButtonLink
  },
  {
    id: 5,

    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita',
    avaliacao: 0,
    infos: [''],
    image: pizza,
    button: ButtonLink
  },
  {
    id: 6,

    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita',
    avaliacao: 0,
    infos: [''],
    image: pizza,
    button: ButtonLink
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
        onPratoClick={(prato) =>
          setModal({
            isVisible: true,
            prato
          })
        }
      />

      <Modal className={modal.isVisible ? 'visivel' : ''}>
        <ModalContent className="container">
          <img src={modal.prato?.image} alt={modal.prato?.title} />
          <div className="content">
            <header>
              <h4>{modal.prato?.title}</h4>
            </header>
            <p>
              A pizza Margherita é uma pizza clássica da culinária italiana,
              reconhecida por sua simplicidade e sabor inigualável. Ela é feita
              com uma base de massa fina e crocante, coberta com molho de tomate
              fresco, queijo mussarela de alta qualidade, manjericão fresco e
              azeite de oliva extra-virgem. A combinação de sabores é perfeita,
              com o molho de tomate suculento e ligeiramente ácido, o queijo
              derretido e cremoso e as folhas de manjericão frescas, que
              adicionam um toque de sabor herbáceo. É uma pizza simples, mas
              deliciosa, que agrada a todos os paladares e é uma ótima opção
              para qualquer ocasião. Serve: de 2 a 3 pessoas
            </p>
            <button>Adicionar ao carrinho - R$ 60,90</button>
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
