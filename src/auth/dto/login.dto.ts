import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// DTO mta3 el login (connexion)
export class LoginDto {
  @IsEmail() // Lazem ykoun email s7i7
  @IsNotEmpty() // Ma ynjamch ykoun faragh
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
