import {
  IsEmail,
  IsString,
  MinLength,
  IsPhoneNumber,
  Matches,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty()
  @MinLength(3, { message: 'First name must be at least 2 characters long' })
  firstName: string;

  @ApiProperty()
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty()
  @MinLength(3, { message: 'Last name must be at least 2 characters long' })
  lastName: string;

  @ApiProperty()
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/, {
    message: 'Please provide a valid password',
  })
  password: string;

  @ApiProperty()
  @IsPhoneNumber('NG', {
    message: 'Please provide a valid Nigerian phone number',
  })
  @IsNotEmpty()
  phoneNumber: string;
}
