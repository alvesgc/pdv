import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider } from './context/AuthContext';
import Login from './auth/login';
import Products from "./pages/Products";
import Log from "./pages/Log";
import Layout from "./components/Layout";
// import Stock from "./pages/Stock";
import "./index.css";
import Register from "./auth/Register";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element= {
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/products" element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            } />
            <Route path="/log" element={
              <PrivateRoute>
                <Log />
              </PrivateRoute>
            } />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
