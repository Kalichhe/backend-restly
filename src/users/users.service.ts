import {
  Injectable,
  HttpCode,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { supabase } from './../supabaseClient';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  // Obtenemos todos los usuarios
  async getUsers() {
    const { data: users, error } = await supabase.from('user').select('*');

    if (error) {
      console.error('Error fetching users from Supabase:', error);
      throw new Error(`Error fetching users: ${JSON.stringify(error)}`);
    }

    if (users && users.length > 0) {
      return users;
    } else {
      throw new NotFoundException('Users not found');
    }
  }

  // Obtenemos un usuario por username desde Supabase
  async getUserByUsername(username: string) {
    const { data: user, error } = await supabase
      .from('user')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      console.error('Error fetching user by username:', error);
      throw new NotFoundException('User not found');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Crear un usuario
  async createUser(user: CreateUserDto) {
    // Verificar si el email ya existe
    const { data: existingEmail, error: emailError } = await supabase
      .from('user')
      .select('email')
      .eq('email', user.email);

    if (emailError) {
      console.error('Error checking email:', emailError);
      throw new Error(`Error checking email: ${JSON.stringify(emailError)}`);
    }

    if (existingEmail && existingEmail.length > 0) {
      throw new Error('Email already exists');
    }

    // Verificar si el username ya existe
    const { data: existingUsername, error: usernameError } = await supabase
      .from('user')
      .select('username')
      .eq('username', user.username);

    if (usernameError) {
      console.error('Error checking username:', usernameError);
      throw new Error(
        `Error checking username: ${JSON.stringify(usernameError)}`,
      );
    }

    if (existingUsername && existingUsername.length > 0) {
      throw new Error('Username already exists');
    }

    const newUser = {
      id: v4(),
      username: user.username,
      email: user.email,
      password: user.password,
      repeat_password: user.repeat_password,
      is_owner: user.is_owner,
    };

    console.log('Inserting user:', newUser);

    // Insertar el nuevo usuario en la base de datos de Supabase
    const { data, error } = await supabase
      .from('user')
      .insert([newUser])
      .select();

    if (error) {
      console.error('Error inserting user:', error);
      throw new Error(`Error inserting user: ${JSON.stringify(error)}`);
    }

    return newUser;
  }

  // Actualizar un usuario
  async updateUser(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = {
      ...user,
      ...updateUserDto,
    };

    const { data, error } = await supabase
      .from('user')
      .update({ is_owner: true })
      .eq('username', user)
      .select();

    if (error) {
      console.error('Error updating user:', error);
      throw new Error(`Error updating user: ${JSON.stringify(error)}`);
    }
  }

  // Eliminar un usuario
  async deleteUser(username: string) {
    // Verificar si el usuario existe
    const { data: user, error: fetchError } = await supabase
      .from('user')
      .select('username')
      .eq('username', username)
      .single();

    if (fetchError) {
      throw new Error(`Error fetching user: ${fetchError.message}`);
    }

    if (!user) {
      throw new Error('User does not exist');
    }

    // Eliminar el usuario
    const { error: deleteError } = await supabase
      .from('user')
      .delete()
      .eq('username', username);

    if (deleteError) {
      throw new Error(`Error deleting user: ${deleteError.message}`);
    }
  }

  // Login Usuario
  async login(LoginUserDto: LoginUserDto) {
    const { username, password } = LoginUserDto;

    if (!username || !password) {
      throw new BadRequestException('Username and password must be provided');
    }

    const { data: user, error } = await supabase
      .from('user')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !user) {
      throw new NotFoundException('User not found or password incorrect');
    }

    return `Welcome ${user.username}`;
  }
}
