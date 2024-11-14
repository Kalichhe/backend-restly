import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  // Ejemplos: Consultas a base de datos, llamadas a API, etc.

  // Obtenemos todos los usuarios
  getUsers() {
    return ['John', 'Doe', 'Smith'];
  }

  // 

}
