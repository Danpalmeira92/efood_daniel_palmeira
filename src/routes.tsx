import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Categories from './pages/Categories'
import Checkout from './pages/Checkout'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categories/:id" element={<Categories />} />
    <Route
      path="/checkout"
      element={
        <Checkout
          onBack={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      }
    />
  </Routes>
)

export default Rotas
