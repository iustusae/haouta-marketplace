import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('MA')
  phoneNumber: string;
}
