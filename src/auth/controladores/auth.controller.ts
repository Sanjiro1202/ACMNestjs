import { Controller, Get, Post, Param, Put, Body, UsePipes, ValidationPipe, ParseIntPipe, Delete } from '@nestjs/common';
import { crearLoginDto } from '../dto/login.dto';
import { AuthService } from '../servicios/auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    
  @Post('login')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Ingresar a la API' })
  @ApiBody({type: crearLoginDto})
  @ApiResponse({ status: 201, description: 'Ingreso con éxito' })
  @ApiResponse({ status: 400, description: 'Datos de usuario inválidos' })
  login(@Body() payload: crearLoginDto) {
    return this.authService.login(payload.correo, payload.password);
  }
  
}
