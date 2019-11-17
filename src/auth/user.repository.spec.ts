import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UserRepository } from './user.respository';

const mockCredentialsDto: AuthCredentialsDto = { username: 'psalguerodev', password: 'Developer123' };

describe('UserRepositoryTest', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserRepository,
      ],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save: jest.Mock<any>;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('succesfully signs up the user', async () => {
      save.mockResolvedValue(undefined);
      expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow();
    });

    it('throws a conflict exception as username already exists', () => {
      save.mockRejectedValue({ code: '23505' });
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(ConflictException);
    });

    it('should throws a internal server error as diferent code error', () => {
      save.mockRejectedValue({ code: '23000' });
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throws a internal server error Exception as diferent code error', () => {
      save.mockRejectedValue({ code: 'XXXX' });
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(InternalServerErrorException);
    });

  });

  describe('validateUserPassword', () => {
    let user;

    beforeEach(() => {
      userRepository.findOne = jest.fn();
      user = new User();
      user.username = 'psalguerodev';
      user.password = 'Developer123';
      user.validatePassword = jest.fn();
    });

    it('return username as validation is successful', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);
      const username = await userRepository.validateUserPassword(mockCredentialsDto);
      expect(user.username).toEqual(username);
    });

    it('return null as user cannot be found ', async () => {
      userRepository.findOne.mockResolvedValue(null);
      const username =  await userRepository.validateUserPassword(mockCredentialsDto);
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(username).toBeNull();
    });

    it('return null as password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);
      const username = await userRepository.validateUserPassword(mockCredentialsDto);
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(null).toEqual(username);
    });

  });

  describe('hashPassword', () => {
    it('call bcrypt.hash to generate hash', async () => {
      bcrypt.hash = jest.fn().mockReturnValue('testhash');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await userRepository.hashPassword(mockCredentialsDto.password, 'testsalt');
      expect(bcrypt.hash).toHaveBeenCalledWith(mockCredentialsDto.password, 'testsalt');
      expect(result).toEqual('testhash');
    });
  });

});
