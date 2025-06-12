import prisma from "../../../prisma/client.js";
import { comparePassword } from "../../utils/hash.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Preencha todos os campos." });

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user)
    return res.status(400).json({ message: "Email ou senha incorretos." });

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Email ou senha incorretos." });

  const token = jwt.sign(
    {
      userId: user.id,
      clientId: user.clientId,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.json({ token });
};
