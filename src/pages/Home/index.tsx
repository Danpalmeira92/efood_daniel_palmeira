import { ProductsList } from '../../components/ProductsList'
import Prato from '../../models/Pratos'

import sushi from '../../assets/images/sushi.png'
import pratos from '../../assets/images/pratos.png'
import { ButtonLink } from '../../components/Button/styles'
import { Estrela } from '../../components/Avaliacao/styles'
import Header from '../../components/Header'

const cardapio: Prato[] = [
  {
    id: 1,
    description:
      'Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida. Experimente o Japão sem sair do lar com nosso delivery!',
    title: 'Hioki Sushi',
    avaliacao: 4.9,
    infos: ['Destaque da semana', 'Japonesa'],
    image: sushi,
    button: ButtonLink,
    preco: 0
  },
  {
    id: 2,

    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    title: 'La Dolce Vita Trattoria',
    avaliacao: 4.6,
    infos: ['Italiana'],
    image: pratos,
    button: ButtonLink,
    preco: 0
  },
  {
    id: 3,

    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    title: 'La Dolce Vita Trattoria',
    avaliacao: 4.6,
    infos: ['Italiana'],
    image: pratos,
    button: ButtonLink,
    preco: 0
  },
  {
    id: 4,

    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    title: 'La Dolce Vita Trattoria',
    avaliacao: 4.6,
    infos: ['Italiana'],
    image: pratos,
    button: ButtonLink,
    preco: 0
  },
  {
    id: 5,

    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    title: 'La Dolce Vita Trattoria',
    avaliacao: 4.6,
    infos: ['Italiana'],
    image: pratos,
    button: ButtonLink,
    preco: 0
  },
  {
    id: 6,

    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    title: 'La Dolce Vita Trattoria',
    avaliacao: 4.6,
    infos: ['Italiana'],
    image: pratos,
    button: ButtonLink,
    preco: 0
  }
]

const Home = () => (
  <>
    <Header showTexto={true} />
    <ProductsList pratos={cardapio} title="" background="gray" />
  </>
)

export default Home
