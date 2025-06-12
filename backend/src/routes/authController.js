import prisma from '../prisma/client.js';
import { comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

  const valid = await comparePassword(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Senha incorreta' });

  const token = generateToken({
    userId: user.id,
    clientId: user.clientID,
    email: user.email,
  });

  return res.json({ token });
};
