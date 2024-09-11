import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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
  static async getAllUsers(limit: number, offset: number): Promise<User[]> {
    return await prisma.user.findMany({
      skip: offset,
      take: limit,
    });
  }

  static async getUserById(id: UUID): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  static async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<User> {
    try {
      return await prisma.user.create({
        data,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw {
            status: 400,
            message: 'Email já está sendo utilizado.',
          };
        }
      }
      throw error;
    }
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
