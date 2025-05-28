import React, { createContext, useContext, useState, useEffect } from 'react';
const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const storedProducts = localStorage.getItem('products');

      return storedProducts ? JSON.parse(storedProducts) : [];
    } catch (error) {
      console.error("Erro ao carregar produtos do localStorage:", error);
      return [];
    }
  });
  useEffect(() => {

    try {
      localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
      console.error("Erro ao salvar produtos no localStorage:", error); 
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || Date.now(),
    };
    setProducts((prevProducts) => [...prevProducts, productWithId]);
  };

  const removeProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter(p => p.id !== id));
  };

  const value = {
    products,
    addProduct,
    removeProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};