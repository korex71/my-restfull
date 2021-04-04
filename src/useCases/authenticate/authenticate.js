import authModel from '../../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const Secret = process.env.SESS_SECRET

const generateToken = (id) => {
  return jwt.sign({ id }, Secret, {
    expiresIn: "1d", // 24h
  });
}

export default async (req, res) => {
  const { email, password } = req.body;

  const user = await authModel.findOne({ email }).select("+password");

  if (!user) return res.status(400).send({ error: "Usuario inexistente." });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(401).send({ error: "Usuario / Senha inválido(s)" });

  user.password = undefined;

  res.send({ user, token: generateToken(user.id) });
}

