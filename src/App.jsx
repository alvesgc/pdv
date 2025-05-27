import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Vendas</Link> | <Link to="/produtos">Produtos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Products />} />
      </Routes>
    </Router>
  );
}
