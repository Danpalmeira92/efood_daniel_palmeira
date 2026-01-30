import { Estrela } from '../Avaliacao/styles'
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

import estrela from '../../assets/images/estrela.png'

export type Props = {
  id: number
  title: string
  description: string
  infos: string[]
  image: string
  avaliacao: number
  button: string
  showInfos?: boolean
  showEstrela?: boolean
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
  showEstrela = true,
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

        {showEstrela && (
          <Estrela>
            {avaliacao} <img src={estrela} alt="estrela" />
          </Estrela>
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
          Adicionar ao carrinho
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
