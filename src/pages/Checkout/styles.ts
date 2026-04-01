import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'
import Button from '../../components/Button'

type InputGroupProps = {
  maxWidth?: string
}

type RowProps = {
  marginTop?: string
}

type TabButtonProps = {
  isActive: boolean
}

export const Row = styled.div<RowProps>`
  display: flex;
  column-gap: 24px;
  margin-top: ${(props) => props.marginTop || '0'};
  align-items: flex-end;

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }
`

export const InputGroup = styled.div<InputGroupProps>`
  flex: ${(props) => (props.maxWidth ? 'initial' : 1)};
  margin-bottom: 8px;

  max-width: ${(props) => props.maxWidth || '100%'};

  label {
    font-size: 14px;
    margin-bottom: 8px;
    display: block;
  }

  input,
  select {
    background-color: ${colors.lightBeige};
    border: 1px solid ${colors.lightBeige};
    height: 32px;
    padding: 0 8px;
    width: 100%;

    &.error {
      border: 1px solid red;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 16px;
  }
`

export const TabButton = styled.button<TabButtonProps>`
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${colors.lightBeige};
  background-color: ${(props) =>
    props.isActive ? colors.green : colors.black};
  height: 32px;
  border: none;
  margin-right: 16px;
  padding: 0 8px;
  cursor: pointer;

  img {
    margin-right: 8px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 8px;
    width: 100%;
  }
`
export const CheckoutButton = styled(Button)`
  width: 100%;
  border: 2px solid ${colors.salmon};
  padding: 6px 10px;
  margin-bottom: 4px;
  text-align: center;
  color: ${colors.salmon};
  background-color: ${colors.lightBeige};
  font-size: 16px;
  font-weight: bold;
  display: block;
  cursor: pointer;
`
