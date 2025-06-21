import prisma from '../../../prisma/client.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export const finishRegistration = async (req, res) => {
  const { name, email, supabaseUserId } = req.body;

  if (!name || !email || !supabaseUserId) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
  }

  try {
    const existingClient = await prisma.client.findUnique({ where: { email } });
    if (existingClient) return res.status(400).json({ message: 'Cliente já existe.' });

    const client = await prisma.client.create({
      data: { name, email },
    });

    await prisma.user.create({
      data: {
        email,
        clientId: client.id,
        supabaseUserId,
      },
    });

    return res.status(201).json({ message: 'Cadastro concluído.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao concluir cadastro.' });
  }
};
