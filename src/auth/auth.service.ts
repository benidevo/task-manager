import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UsersRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(signUpDto);
  }

  async signIn(
    signInDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = signInDto;

    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (user && isMatched) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
