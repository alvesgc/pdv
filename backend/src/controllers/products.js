import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const clientId = req.user.clientId;
    if (!clientId) return res.status(400).json({ message: "ClientId ausente" });

    const products = await prisma.product.findMany({
      where: { clientId },
    });

    return res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return res.status(500).json({ message: 'Erro ao buscar produtos.' });
  }
};

export const createProduct = async (req, res) => {
  const { code, name, barcode, quantity, price, active, imageUrl } = req.body;
  const clientId = req.user.clientId; // pega do token

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
        imageUrl: imageUrl || null,
        clientId,
      },
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
};
