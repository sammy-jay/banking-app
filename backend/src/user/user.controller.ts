import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly usersService: UserService) {}
}
