import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ message: 'Unauthorized' });

  const { role } = jwt.verify(auth, process.env.JWT_SECRET);
  if (role !== 'ADMIN') return res.status(403).json({ message: 'Forbidden' });

  const totalUsers = await prisma.user.count();
  const totalStudents = await prisma.student.count();

  res.json({ totalUsers, totalStudents });
}
