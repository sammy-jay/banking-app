import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    TransactionsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
