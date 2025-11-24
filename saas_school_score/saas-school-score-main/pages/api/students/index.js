import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ message: 'Unauthorized' });

  const { id, role } = jwt.verify(auth, process.env.JWT_SECRET);

  if (req.method === 'GET') {
    if (role === 'ADMIN') {
      const students = await prisma.student.findMany();
      return res.json(students);
    } else if (role === 'TEACHER') {
      const students = await prisma.student.findMany({ where: { userId: id } });
      return res.json(students);
    } else return res.status(403).json({ message: 'Forbidden' });
  }

  if (req.method === 'POST') {
    if (role !== 'TEACHER') return res.status(403).json({ message: 'Forbidden' });
    const { name, class: cls, score } = req.body;
    const student = await prisma.student.create({ data: { name, class: cls, score, userId: id } });
    return res.json(student);
  }
}
