import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {
  DepositTransactionDto,
  TransferMoneyTransactionDto,
  WithdrawalTransactionDto,
} from './dto/create-transaction.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RequestUser } from 'src/auth/interface/request-user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/deposit')
  deposit(
    @Body() depositDto: DepositTransactionDto,
    @Req() request: RequestUser,
  ) {
    const user = request.user;
    return this.transactionsService.deposit(depositDto, user);
  }

  @Post('/withdraw')
  withdraw(
    @Body() withdrawalDto: WithdrawalTransactionDto,
    @Req() request: RequestUser,
  ) {
    const user = request.user;
    return this.transactionsService.withdraw(withdrawalDto, user);
  }

  @Post('/transfer')
  transfer(
    @Body() transferDto: TransferMoneyTransactionDto,
    @Req() request: RequestUser,
  ) {
    const user = request.user;
    return this.transactionsService.transfer(transferDto, user);
  }

  @Get('/history')
  getHistory(@Req() request: RequestUser) {
    const user = request.user;
    return this.transactionsService.getHistory(user);
  }
}
