import { JwtStrategy } from './jwt-strategy';
import { Test } from '@nestjs/testing';
import { UserRepository } from './user.respository';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

describe('JwtStrategyTest', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);

  });

  describe('validateToken', () => {
    let user: User;

    beforeEach(() => {
      user = new User();
    });

    it('validates and returns the user based JWT payload', async () => {
      user.username = 'testuser';
      userRepository.findOne.mockResolvedValue(user);
      const result = await jwtStrategy.validate({ username: 'testuser' });
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'testuser'});
      expect(result).toEqual(user);
    });

    it('throws and unauthorized exception as user cannot be found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(jwtStrategy.validate({ username: 'notfounduser' })).rejects.toThrow(UnauthorizedException);
    });

  });

});
