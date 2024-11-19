import { IsEmail, IsString, IsBoolean, MinLength, MaxLength, IsOptional, Matches, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]*$/, { message: 'Username must start with a letter and be alphanumeric' })
  @MinLength(8)
  @MaxLength(15)
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, { message: 'Password must contain uppercase and lowercase letters, numbers, and special characters' })
  @IsOptional()
  @MinLength(12)
  @MaxLength(20)
  password?: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, { message: 'Password must contain uppercase and lowercase letters, numbers, and special characters' })
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(20)
  repeat_password: string;

  @IsBoolean()
  @IsOptional()
  is_owner?: string;
}