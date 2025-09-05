import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
// Cambia esta línea temporalmente para ver qué exporta
import { PrismaClient } from '@prisma/client';
// import type { User } from '@prisma/client'; // Comenta esta línea

import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Get('me')
  getMe(@GetUser() user: any) { // Cambia User por any temporalmente
    return user;
  }

  @Patch()
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }
}