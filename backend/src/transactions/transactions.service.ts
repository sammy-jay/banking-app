import { BadRequestException, Injectable } from '@nestjs/common';
import {
  DepositTransactionDto,
  TransferMoneyTransactionDto,
  WithdrawalTransactionDto,
} from './dto/create-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async deposit(depositDto: DepositTransactionDto, user: User) {
    const foundUser = await this.userService.getById(user.id);

    const updatedAccount = await this.prismaService.account.update({
      where: {
        userId: foundUser.id,
      },
      data: {
        balance: {
          increment: depositDto.amount,
        },
      },
    });

    await this.prismaService.transactionHistory.create({
      data: {
        accountId: foundUser.account.id,
        amount: depositDto.amount,
        description: depositDto.description,
        type: 'DEPOSIT',
      },
    });

    return updatedAccount;
  }

  async withdraw(withdrawalDto: WithdrawalTransactionDto, user: User) {
    const foundUser = await this.userService.getById(user.id);
    if (foundUser.account.balance >= withdrawalDto.amount) {
      const updatedAccount = await this.prismaService.account.update({
        where: {
          userId: foundUser.id,
        },
        data: {
          balance: {
            decrement: withdrawalDto.amount,
          },
        },
      });

      await this.prismaService.transactionHistory.create({
        data: {
          accountId: foundUser.account.id,
          amount: withdrawalDto.amount,
          description: withdrawalDto.description,
          type: 'WITHDRAWAL',
        },
      });

      return updatedAccount;
    }

    throw new BadRequestException('Insufficient funds.');
  }

  async transfer(transferDto: TransferMoneyTransactionDto, user: User) {
    const foundUser = await this.userService.getById(user.id);
    return await this.prismaService.$transaction(async (tx) => {
      // 1. Decrement amount from the sender.
      const sender = await tx.account.update({
        data: {
          balance: {
            decrement: transferDto.amount,
          },
        },
        where: {
          userId: foundUser.id,
        },
      });

      // 2. Verify that the sender's balance didn't go below zero.
      if (sender.balance < 0) {
        throw new Error(`Insufficient balance.`);
      }
      await this.prismaService.transactionHistory.create({
        data: {
          accountId: foundUser.account.id,
          amount: transferDto.amount,
          description: transferDto.description,
          type: 'TRANSFER_OUT',
        },
      });

      const recipient = await tx.account.findUnique({
        where: {
          accountNumber: transferDto.recipientAccountId,
        },
      });
      // 3. Increment the recipient's balance by amount
      await tx.account.update({
        data: {
          balance: {
            increment: transferDto.amount,
          },
        },
        where: {
          accountNumber: recipient.accountNumber,
        },
      });
      await this.prismaService.transactionHistory.create({
        data: {
          accountId: foundUser.account.id,
          amount: transferDto.amount,
          description: transferDto.description,
          type: 'TRANSFER_IN',
        },
      });

      return sender;
    });
  }
}
