import prisma from '../../../prisma/client.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  let supabaseUserId = null;

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      console.error('Erro ao criar usuário no Supabase Auth:', error);
      return res.status(400).json({ message: error.message || 'Erro ao criar usuário no Auth.' });
    }

    supabaseUserId = data.user.id;

    let client = await prisma.client.findUnique({ where: { email } });

    if (!client) {
      client = await prisma.client.create({
        data: {
          name: `${name}'s Company`,
          email,
        },
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      await supabase.auth.admin.deleteUser(supabaseUserId);
      return res.status(400).json({ message: 'Email já cadastrado no sistema.' });
    }

    await prisma.user.create({
      data: {
        name,
        email,
        authId: supabaseUserId,
        clientId: client.id,
      },
    });

    return res.status(201).json({ message: 'Cadastro realizado com sucesso.' });

  } catch (err) {
    console.error('Erro interno:', err);
    if (supabaseUserId) {
      await supabase.auth.admin.deleteUser(supabaseUserId);
    }
    return res.status(500).json({ message: 'Erro ao processar o cadastro.' });
  }
};
