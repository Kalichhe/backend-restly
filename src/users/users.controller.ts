import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('/user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Get('/get/all')
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  // @Get('/get/user/:id')
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  // @Post('/create/user')
  @Post()
  createUser(@Body() user: CreateUserDto) {
    this.usersService.createUser(user)
    return this.newUser();
  }

  // @Post('/login)
  @Post('/login')
  login(@Body() LoginUserDto: LoginUserDto) {
    return this.usersService.login(LoginUserDto);
  }

  // @Patch('/update/user')
  @Patch('/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(id, user);
  }

  // @Delete('/delete/user')
  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    this.usersService.deleteUser(id);
    return this.deleteInformationUser();
  }

  @Get('new')
  @HttpCode(201)
  newUser(){
    return 'New user created successfully';
  }

  @Get('notfound')
  @HttpCode(404)
  notFoundPage(){
    return '404 Not Found';
  }

  @Get('error')
  @HttpCode(500)
  errorPage(){
    return '500 Internal Server Error';
  }

  @Get('delete')
  @HttpCode(204)
  deleteInformationUser(){
    return 'There is no user information\n 204 No Content';
  }
}
