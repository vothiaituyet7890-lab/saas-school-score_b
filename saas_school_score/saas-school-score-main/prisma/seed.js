import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  // Admin
  const admin = await prisma.user.create({
    data: { name: 'Admin', email: 'admin@example.com', password: hashedPassword, role: 'ADMIN' }
  });

  // Teacher
  const teacher = await prisma.user.create({
    data: { name: 'Teacher A', email: 'teacher@example.com', password: hashedPassword, role: 'TEACHER' }
  });

  // Student user
  const studentUser = await prisma.user.create({
    data: { name: 'Student 1', email: 'student1@example.com', password: hashedPassword, role: 'STUDENT' }
  });

  // Students gán cho teacher
  await prisma.student.createMany({
    data: [
      { name: 'Student 1', class: '10A', score: 85, userId: teacher.id },
      { name: 'Student 2', class: '10B', score: 90, userId: teacher.id },
      { name: 'Student 3', class: '10C', score: 78, userId: teacher.id },
    ]
  });

  console.log('Seed data created!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
