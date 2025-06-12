import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Log from "./pages/Log";
import Layout from "./components/Layout";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/Stock" element={<Stock />} />
          <Route path="/Log" element={<Log />} />
        </Routes>
      </Layout>
    </Router>
  );
}
