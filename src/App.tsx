import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductsPage from './components/ProductsPage'
import ProductPage from './components/ProductPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  )
}

export default App
