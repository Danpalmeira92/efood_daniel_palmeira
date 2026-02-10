import Prato from '../../models/Pratos'
import Product from '../Product'

import { Container, List } from './styles'

export type Props = {
  title: string
  background: 'gray' | 'black'
  pratos: Prato[]
  showInfos?: boolean
  showEstrela?: boolean
  variant?: 'default' | 'categories'
  onPratoClick?: (prato: Prato) => void
}

export const formataPreco = (preco?: number | string) => {
  const valor = Number(preco) || 0

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(valor)
}

export const ProductsList = ({
  background,
  title,
  pratos,
  showInfos = true,
  showEstrela = true,
  variant = 'default',
  onPratoClick
}: Props) => (
  <Container $background={background} $variant={variant}>
    <div className="container">
      <h2>{title}</h2>
      <List $variant={variant}>
        {pratos.map((prato) => (
          <Product
            key={prato.id}
            id={prato.id}
            description={prato.description}
            image={prato.image}
            infos={prato.infos}
            title={prato.title}
            button={prato.button}
            preco={prato.preco}
            showInfos={showInfos}
            showEstrela={showEstrela}
            $variant={variant}
            avaliacao={prato.avaliacao}
            onClick={() => onPratoClick?.(prato)}
          />
        ))}
      </List>
    </div>
  </Container>
)
