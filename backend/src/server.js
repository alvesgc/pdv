import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => console.log(`Server is running on port ${process.env.PORT || 3000}`));