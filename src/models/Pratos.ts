class Prato {
  id: number
  title: string
  description: string
  image: string
  avaliacao: number
  infos: string[]
  button: string
  preco: number

  constructor(
    description: string,
    image: string,
    infos: string[],
    button: string,
    title: string,
    id: number,
    avaliacao: number,
    preco: number
  ) {
    this.description = description
    this.image = image
    this.infos = infos
    this.button = button
    this.title = title
    this.id = id
    this.avaliacao = avaliacao
    this.preco = preco
  }
}

export default Prato
