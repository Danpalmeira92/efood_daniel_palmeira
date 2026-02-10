import { ButtonLink } from './styles'
import { ButtonLinkVariant } from './styles'

type Props = {
  title: string
  to?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

const Button = ({ title, to, onClick, type = 'button' }: Props) => {
  if (to) {
    return <ButtonLink to={to}>{title}</ButtonLink>
  }

  return (
    <button type={type} onClick={onClick}>
      {title}
    </button>
  )
}

export const ButtonVariant = ({
  title,
  onClick
}: {
  title: string
  onClick?: () => void
}) => (
  <ButtonLinkVariant to="" onClick={onClick}>
    {title}
  </ButtonLinkVariant>
)

export default Button
