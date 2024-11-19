import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('/user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:username')
  getUserByUsername(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(user);
      return newUser;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Patch('/:username')
  updateUser(@Param('username') username: string, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(username, user);
  }

  @Delete('/:username')
  async deleteUser(@Param('username') username: string) {
    try {
      await this.usersService.deleteUser(username);
      return this.deleteInformationUser();
    } catch (error) {
      return this.notFoundPage();
    }
  }

  @Post('/login')
  login(@Body() LoginUserDto: LoginUserDto) {
    return this.usersService.login(LoginUserDto);
  }

  @Get('new')
  @HttpCode(201)
  newUser() {
    return 'New user created successfully';
  }

  @Get('notfound')
  @HttpCode(404)
  notFoundPage() {
    return '404 Not Found';
  }

  @Get('error')
  @HttpCode(500)
  errorPage() {
    return '500 Internal Server Error';
  }

  @Get('delete')
  @HttpCode(204)
  deleteInformationUser() {
    return 'There is no user information\n 204 No Content';
  }
}
