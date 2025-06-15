import prisma from '../../../prisma/client.js';
import { hashPassword } from '../../utils/hash.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  try {
    let client = await prisma.client.findUnique({ where: { email } });

    if (!client) {
      client = await prisma.client.create({
        data: {
          name: name + "'s Company",
          email,
        },
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já em uso.' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        clientId: client.id,
      },
    });

    return res.status(201).json({ message: 'Cadastro realizado com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};
