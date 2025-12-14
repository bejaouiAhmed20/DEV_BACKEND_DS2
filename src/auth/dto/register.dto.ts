import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// DTO mta3 el inscription (register)
export class RegisterDto {
  @IsEmail() // Lazem ykoun email s7i7
  @IsNotEmpty() // Ma ynjamch ykoun faragh
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6) // Lazem 6 caracteres 3al a9al
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
