import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UsersRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  async signUp(signUpDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.createUser(signUpDto);
  }

  async signIn(signInDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = signInDto;

    const user = await this.userRepository.findOne({ username });
    const isMatched = await bcrypt.compare(password, user.password);

    if (user && isMatched) {
      return 'logged in';
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
