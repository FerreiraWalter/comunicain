import { PrismaClient } from '@prisma/client';
import { UUID } from 'crypto';

const prisma = new PrismaClient();

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  bio: string | null;
}

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  static async getUserById(id: UUID): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  static async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<User> {
    console.log("data", data)
    return await prisma.user.create({
      data: {
        ...data,
        isActive: true,
      },
    });
  }

  static async updateUser(id: UUID, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User | null> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  static async deleteUser(id: UUID): Promise<User | null> {
    return await prisma.user.delete({ where: { id } });
  }
}
