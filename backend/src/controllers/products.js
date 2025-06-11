import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getProducts = async (req,res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  }catch(err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

export const createProduct = async (req,res) => {
  const {code, name, barcode, quantity, price, active, imageUrl, clientId} = req.body;

   if (!code || !name || price == null || quantity == null || quantity < 0 || price < 0) {
  return res.status(400).json({ error: "Missing or invalid fields" });
}
  
  try {
    const newProduct = await prisma.product.create({
      data: {
        code,
        name,
        bar_code: barcode || code,
        quantity,
        price,
        active,
        imageUrl: imageUrl || null
      }
    });
    res.status(201).json(newProduct);
  }catch(err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
}