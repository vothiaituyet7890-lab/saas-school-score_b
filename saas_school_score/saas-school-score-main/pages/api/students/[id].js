import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ message: 'Unauthorized' });

  const { id: userId, role } = jwt.verify(auth, process.env.JWT_SECRET);
  const studentId = parseInt(req.query.id);

  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student) return res.status(404).json({ message: 'Student not found' });

  if (role === 'TEACHER' && student.userId !== userId) return res.status(403).json({ message: 'Forbidden' });
  if (role === 'STUDENT' && student.id !== userId) return res.status(403).json({ message: 'Forbidden' });

  if (req.method === 'PUT') {
    const { name, class: cls, score } = req.body;
    const updated = await prisma.student.update({ where: { id: studentId }, data: { name, class: cls, score } });
    return res.json(updated);
  }

  if (req.method === 'DELETE') {
    await prisma.student.delete({ where: { id: studentId } });
    return res.json({ message: 'Deleted' });
  }

  if (req.method === 'GET') return res.json(student);
}
