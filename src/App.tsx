import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './routes/Login/login';
import Dashboard from './dashboard';

import Home from './routes/Home/home';
import Cart from './routes/Cart/cart';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
        </Route> 
      </Routes>
    </Router>
  )
}

export default App
