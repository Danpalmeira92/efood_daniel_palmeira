import { Star } from '../Avaliacao/styles'
import { ButtonLink, ButtonLinkVariant } from '../Button/styles'

import Tag from '../Tag'

import {
  Card,
  Descricao,
  Titulo,
  Infos,
  LinhaTitulo,
  ImagemProduto,
  WrapperProduto
} from './styles'

import star from '../../assets/images/star.png'

export type Props = {
  id: number
  title: string
  description: string
  infos: string[]
  image: string
  avaliacao: number
  preco: number
  button: string
  showInfos?: boolean
  showStar?: boolean
  $variant?: 'default' | 'categories'
  onClick?: () => void
}

const Product = ({
  id,
  title,
  description,
  infos,
  image,
  avaliacao = 0,
  showInfos = true,
  showStar = true,
  $variant = 'default',
  onClick
}: Props) => (
  <WrapperProduto>
    {$variant !== 'categories' && (
      <ImagemProduto $variant={$variant} src={image} alt={title} />
    )}

    <Card $variant={$variant}>
      {$variant === 'categories' && (
        <ImagemProduto $variant={$variant} src={image} alt={title} />
      )}

      <LinhaTitulo $variant={$variant}>
        <Titulo $variant={$variant}>{title}</Titulo>

        {showStar && (
          <Star>
            {avaliacao} <img src={star} alt="star" />
          </Star>
        )}
      </LinhaTitulo>

      <Descricao $variant={$variant}>{description}</Descricao>

      {$variant === 'categories' ? (
        <ButtonLinkVariant
          to=""
          onClick={(e) => {
            e.preventDefault()
            onClick?.()
          }}
        >
          Mais detalhes
        </ButtonLinkVariant>
      ) : (
        <ButtonLink to={`/categories/${id}`}>Saiba mais</ButtonLink>
      )}
    </Card>

    {showInfos && (
      <Infos>
        {infos.map((info) => (
          <Tag key={info}>{info}</Tag>
        ))}
      </Infos>
    )}
  </WrapperProduto>
)

export default Product
