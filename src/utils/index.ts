import Prato from '../models/Pratos'

export const parseToBrl = (amount = 0) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}

export const getTotalPrice = (items: Prato[]) => {
  return items.reduce((accumalator, currentItem) => {
    if (currentItem.preco.current) {
      return (accumalator += currentItem.preco.current)
    }
    return 0
  }, 0)
}
