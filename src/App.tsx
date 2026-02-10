import { BrowserRouter } from 'react-router-dom'

import { GlobalCss } from './styles'

import { Cart } from './components/Cart'
import Rotas from './routes'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <GlobalCss />

      <Rotas />
      <Cart />
      <Footer />
    </BrowserRouter>
  )
}

export default App
