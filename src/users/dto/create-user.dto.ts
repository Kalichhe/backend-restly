import { IsEmail, IsString, IsBoolean, MinLength, MaxLength, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]*$/, { message: 'Username must start with a letter and be alphanumeric' })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, { message: 'Password must contain uppercase and lowercase letters, numbers, and special characters' })
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(20)
  password: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, { message: 'Password must contain uppercase and lowercase letters, numbers, and special characters' })
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(20)
  repeat_password: string;

  @IsBoolean()
  @IsNotEmpty()
  is_owner: boolean;
}