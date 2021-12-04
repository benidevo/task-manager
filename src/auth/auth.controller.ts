import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(
    @Body() signInDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }
}
