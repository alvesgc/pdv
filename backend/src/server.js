import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/products', async (req, res) => {
  const products = await prisma.products.findMany()
  res.json(products);
})

app.post('/products', async (req, res) => {
  const {code, name, barcode, quantity, price, active  } = req.body;
  const newProduct = await prisma.products.create({
    data: {
      code,
      name,
      barcode,
      quantity,
      price,
      active
    }
  });
  res.status(201).json(newProduct);
})

app.listen(process.env.PORT || 3000, () => console.log(`Server is running on port ${process.env.PORT || 3000}`));