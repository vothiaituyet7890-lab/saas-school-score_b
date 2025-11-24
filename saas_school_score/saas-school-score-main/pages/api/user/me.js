// pages/api/user/me.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'No token' });

  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true }
    });

    if (req.method === 'GET') {
      return res.status(200).json(user);
    }

    if (req.method === 'PUT') {
      const { name, email, password } = req.body;
      const data = { name, email };
      if (password) data.password = await bcrypt.hash(password, 10);

      const updated = await prisma.user.update({
        where: { id: decoded.id },
        data,
        select: { id: true, name: true, email: true }
      });

      return res.status(200).json(updated);
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
}
