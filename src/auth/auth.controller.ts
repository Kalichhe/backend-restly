import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    // Todas las rutas de los controladores

    // Ruta para obtener todos los usuarios
    // @Get('/get/all')
    @Get()
    getAllUsers() {
        return this.authService.getUsers();
    }


}
