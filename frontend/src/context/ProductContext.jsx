import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await api.post("/products", newProduct);
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const removeProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  const value = {
    products,
    addProduct,
    removeProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
