import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class DepositTransactionDto {
  @ApiProperty()
  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be a positive number' })
  amount: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}

export class WithdrawalTransactionDto {
  @ApiProperty()
  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be a positive number' })
  amount: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}

export class TransferMoneyTransactionDto {
  @ApiProperty()
  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be a positive number' })
  amount: number;

  @ApiProperty()
  @IsInt({ message: 'Recipient account ID must be an integer' })
  @Length(10, 10, { message: 'Field length must be exactly 10 characters' })
  recipientAccountId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
