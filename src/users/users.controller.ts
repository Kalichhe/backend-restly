import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Get('/get/all')
  @Get()
  getUsers(@Query() query: any) {
    console.log(query);

    return this.usersService.getUsers();
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(parseInt(id));
  }

  // @Post('/create/user')
  @Post()
  createUser(@Body() user: CreateUserDto) {
    this.usersService.createUser(user)
    return this.newUser();
  }

  // @Put('/update/user')
  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    console.log(user);

    return this.usersService.updateUser(parseInt(id), user);
  }

  // @Delete('/delete/user')
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(parseInt(id));
  }

  @Get('new')
  @HttpCode(201)
  newUser(){
    return 'Something new';
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
}
