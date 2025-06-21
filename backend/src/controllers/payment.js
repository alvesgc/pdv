import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getPaymentType = async (req, res) => {
  try {
    const clientId = req.user.clientId;
    if (!clientId) return res.status(400).json({ message: "ClientId ausente" });

    const paymentType = await prisma.paymentType.findMany({
      where: { clientId },
    });

    return res.json(paymentType);
  } catch (error) {
    console.error("Erro ao os tipos de pagamento:", error);
    return res.status(500).json({ message: 'Erro ao os tipos de pagamento.' });
  }
};

export const createPaymentType = async (req, res) => {
  const { name, code, description, allowChange,active } = req.body;
  const clientId = req.user.clientId; // pega do token

  if (!code || !name || !clientId || typeof allowChange !== 'boolean') {
    return res.status(400).json({ error: "Missing or invalid fields" });
  }
  try {
    const newPaymentType = await prisma.paymentType.create({
      data: {
        code,
        name,
        description,
        allowChange,
        active,
        clientId,
      },
    });
    res.status(201).json(newPaymentType);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create payment type" });
  }
};
