import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

describe('AppService', () => {
  let service: AppService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: {
            users: {
              findMany: jest.fn(),
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return an array of users', async () => {
    const result = [{ id: '1', username: 'test', created_at: new Date() }];
    jest.spyOn(prisma.users, 'findMany').mockResolvedValue(result);

    expect(await service.getUsers()).toBe(result);
  });

  it('should create a user', async () => {
    const user = { username: 'test' };
    const result = { id: '1', username: 'test', created_at: new Date() };
    jest.spyOn(prisma.users, 'create').mockResolvedValue(result);

    expect(await service.createUser(user)).toStrictEqual({
      message: 'User created successfully',
      user: result,
    });
  });

  it('should return a specific user', async () => {
    const user = { id: '1', username: 'test', created_at: new Date() };
    jest.spyOn(prisma.users, 'findUnique').mockResolvedValue(user);

    expect(await service.getUserById('1')).toBe(user);
  });
});
