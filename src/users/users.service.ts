import { Injectable, HttpCode, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

export interface User {
  username: string;
  email: string;
  password: string;
  is_owner: boolean;
}

@Injectable()
export class UsersService {
  // Ejemplos: Consultas a base de datos, llamadas a API, etc.

  private users = [];

  // Obtenemos todos los usuarios
  getUsers() {
    const usersFounts = this.users;

    console.log(usersFounts);

    if (usersFounts.length > 0) {
      return usersFounts;
    } else {
      return new NotFoundException('Users not found');
    }
  }

  // Obtenemos un usuario por ID
  getUser(id: number) {
    const userFount = this.users.find((user) => user.id === id);

    if (!userFount) {
      return new NotFoundException('User not found');
    } else {
      return userFount;
    }
  }

  // Obtenemos un usuario por username
  getUserByUsername(username: string) {
    const userFount = this.users.find((user) => user.username === username);

    if (!userFount) {
      return new NotFoundException('User not found');
    } else {
      return userFount;
    }
  }

  // Crear un usuario
  createUser(user: CreateUserDto) {
    this.users.push({id: this.users.length + 1,
      ...user,});
    return user;
  }

  // Actualizar un usuario
  updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = this.getUser(id);

    if (updateUserDto.username !== undefined) {
      user.username = updateUserDto.username;
    }
    if (updateUserDto.email !== undefined) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.password !== undefined) {
      user.password = updateUserDto.password;
    }
    if (updateUserDto.is_owner !== undefined) {
      user.is_owner = updateUserDto.is_owner;
    }
    return user;
  }

  // Eliminar un usuario
  deleteUser(id: number) {
    const user = this.getUser(id);
    const index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
    }
    return user;
  }

  // Login Usuario
  login(LoginUserDto: LoginUserDto) {
    if (LoginUserDto.username === undefined || LoginUserDto.password === undefined) {
      return new NotFoundException('User not found');
    } else {
      const user = this.users.find((user) => user.username === LoginUserDto.username && user.password === LoginUserDto.password);
      if (user) {
        return "Welcome " + user.username;
      } else {
        return new NotFoundException('User not found');
      }
    }
  }
}
