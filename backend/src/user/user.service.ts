import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email address not found.',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        currentHashedRefreshToken: true,
        account: {
          select: {
            id: true,
            accountNumber: true,
            balance: true,
          },
        },
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this credentials not found.',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.prismaService.user.create({
      data: {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        phoneNumber: userData.phoneNumber,
      },
    });

    const last10Digits = userData.phoneNumber.slice(-10);
    await this.prismaService.account.create({
      data: {
        accountNumber: parseInt(last10Digits),
        userId: newUser.id,
      },
    });

    return newUser;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        currentHashedRefreshToken,
      },
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: string) {
    return await this.prismaService.user.update({
      where: { id: userId },
      data: {
        currentHashedRefreshToken: null,
      },
    });
  }
}
