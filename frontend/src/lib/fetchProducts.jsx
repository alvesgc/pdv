import api from "./api";

export const fetchProducts = async (searchTerm) => {
  try {
    const response = await api.get("/products");
    const products = response.data;

    if (!Array.isArray(products)) {
      console.error("Erro: products não é um array", products);
      return [];
    }

    const term = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.code.toLowerCase().includes(term)
    );
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
};
