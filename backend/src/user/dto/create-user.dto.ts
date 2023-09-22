import {
  IsEmail,
  IsString,
  MinLength,
  IsPhoneNumber,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty()
  @MinLength(3, { message: 'First name must be at least 2 characters long' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty()
  @MinLength(3, { message: 'Last name must be at least 2 characters long' })
  lastName: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/, {
    message: 'Please provide a valid password',
  })
  password: string;

  @IsPhoneNumber('NG', {
    message: 'Please provide a valid Nigerian phone number',
  })
  @IsNotEmpty()
  phoneNumber: string;
}
