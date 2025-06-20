import { useState } from 'react'
import './App.css'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

// Importaciones con rutas corregidas
import UserForm from './modules/users/userForm'
import ProductoData from './modules/product/ProductoData'
import OrderData from './modules/order/OrderData'

const App: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/users">Usuarios</Link></li>
            <li><Link to="/products">Productos</Link></li>
            <li><Link to="/orders">Ordenes</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/users" element={<UserForm />} />
          <Route path="/products" element={<ProductoData />} />
          <Route path="/orders" element={<OrderData />} />
        </Routes>

        <div className="card" style={{ marginTop: '40px' }}>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          
        </div>

        
      </div>
    </Router>
  )
}

export default App
