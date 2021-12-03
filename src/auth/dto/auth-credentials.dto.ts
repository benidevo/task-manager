import {
  IsNotEmpty,
  IsString,
  Matches,
  MATCHES,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  @MaxLength(32)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
}
