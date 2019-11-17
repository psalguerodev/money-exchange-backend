import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  private readonly DUPLICATE_ERROR_CODE = '23505';

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create();
    const salt = await bcrypt.genSalt();

    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === this.DUPLICATE_ERROR_CODE) {
        throw new ConflictException(`username already exists`);
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async validateUserPassword(authCrendtialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCrendtialsDto;
    const user = await this.findOne({ username });

    if (user && await user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
