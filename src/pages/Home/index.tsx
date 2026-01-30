import { useEffect, useState } from 'react'
import { ProductsList } from '../../components/ProductsList'
import Prato from '../../models/Pratos'
import Header from '../../components/Header'

interface ApiRestaurante {
  id: number
  titulo: string
  descricao: string
  capa: string
  tipo: string
  avaliacao: number
  destacado: boolean
}

const Home = () => {
  const [restaurantes, setRestaurantes] = useState<Prato[]>([])

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data: ApiRestaurante[]) => {
        const formatados = data.map(
          (item) =>
            new Prato(
              item.descricao,
              item.capa,
              item.destacado ? ['Destaque da semana', item.tipo] : [item.tipo],
              'Saiba mais',
              item.titulo,
              item.id,
              item.avaliacao,
              0
            )
        )

        setRestaurantes(formatados)
      })
  }, [])

  return (
    <>
      <Header showTexto />
      <ProductsList pratos={restaurantes} title="" background="gray" />
    </>
  )
}

export default Home
