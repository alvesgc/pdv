export const mockFetchProducts = (query) => {
  const allProducts = [
    { id: 1, name: "Coca-Cola", price: 5.0 },
    { id: 2, name: "Pastel", price: 7.5 },
    { id: 3, name: "Suco", price: 6.0 },
    { id: 4, name: "Salgadinho", price: 4.0 },
    { id: 5, name: "Chocolate", price: 3.5 },
    { id: 6, name: "Água Mineral", price: 2.5 },
    { id: 7, name: "Bolo de Pote", price: 8.0 },
    { id: 8, name: "Café", price: 3.0 },
  ];

  if (!query) return [];
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      String(p.id) === query
  );
};
