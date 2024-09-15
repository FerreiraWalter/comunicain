import { UserService } from '../../src/services/userService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('UserService', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a user successfully', async () => {
    const newUser = {
      name: 'Walter',
      email: 'walter@example.com',
      bio: 'bio do walter',
    };

    const user = await UserService.createUser(newUser);
    expect(user).toHaveProperty('id');
    expect(user.name).toBe(newUser.name);
    expect(user.email).toBe(newUser.email);
  });

  it('should not create a user with a duplicate email', async () => {
    const newUser = {
      name: 'duplicated Email',
      email: 'duplicateuser@example.com',
    };

    await UserService.createUser(newUser);

    await expect(UserService.createUser(newUser)).rejects.toMatchObject({
      status: 400,
      message: 'Email já está sendo utilizado.',
    });
  });

  it('should get all active users', async () => {
    const user1 = {
      name: 'User 1',
      email: 'user1@gmail.com',
    };

    const user2 = {
      name: 'User 2',
      email: 'user2@gmail.com',
      bio: 'Second user',
    };

    await UserService.createUser(user1);
    await UserService.createUser(user2);

    const users = await UserService.getAllUsers(10, 0);
    expect(users.length).toBe(2);
    expect(users[0].isActive).toBe(true);
  });

  it('should update a user', async () => {
    const newUser = {
      name: 'User to Update',
      email: 'userupdate@example.com',
      bio: 'User before update',
    };

    const user = await UserService.createUser(newUser);

    const updatedUser = await UserService.updateUser(user.id, { name: 'Updated Name' });

    expect(updatedUser).toHaveProperty('id', user.id);
    expect(updatedUser?.name).toBe('Updated Name');
  });

  it('should desactivate a user', async () => {
    const newUser = {
      name: 'User to Delete',
      email: 'userdelete@example.com',
      bio: 'User to be deactivated',
    };

    const user = await UserService.createUser(newUser);

    const deletedUser = await UserService.deleteUser(user.id);
    expect(deletedUser).toHaveProperty('isActive', false);
  });
});
