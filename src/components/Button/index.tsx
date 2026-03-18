import { ButtonLink } from './styles'
import { ButtonLinkVariant } from './styles'

type Props = {
  title: string
  to?: string
  onClick?: () => void
  type?: 'button' | 'link'
  htmlType?: 'button' | 'submit' | 'reset'
  children: string
  disabled?: boolean
  className?: string
}

const Button = ({
  title,
  to,
  onClick,
  htmlType = 'button',
  disabled,
  className
}: Props) => {
  if (to) {
    return (
      <ButtonLink to={to} className={className}>
        {title}
      </ButtonLink>
    )
  }

  return (
    <button
      type={htmlType}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
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
