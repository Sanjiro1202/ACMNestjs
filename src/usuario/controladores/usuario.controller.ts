import { Controller, Get, Post, Param, Put, Body, UsePipes, ValidationPipe, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { usuarioService } from 'src/usuario/servicios/usuario.services';
import { actualizarUsuarioDto, crearUsuarioDto } from '../dto/usuario.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/guards/roles.decorator';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('usuario')
@ApiTags('Usuario')
@ApiResponse({ status: 500, description: 'Error del servidor' })
export class UsuarioController {
  constructor(private usuarioService: usuarioService) {}

  @Post('crearUsuario')
  @Roles('Administrador','Empleado')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: crearUsuarioDto }) // Especifica el tipo del cuerpo esperado
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 400, description: 'Datos de usuario inválidos' })
  async crearUsuario(@Body() data: crearUsuarioDto) {
    return await this.usuarioService.crearUsuario(data);
  }

  @Get('consultarUsuario')
  @Roles('Administrador','Empleado')
  @ApiOperation({ summary: 'Consultar a todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Consulta realizada con éxito' })
  async consultarUsuario(){
    return await this.usuarioService.consultarTodos();
  }

  @Put('actualizarUsuario/:cedula')
  @Roles('Administrador','Empleado','Cliente')
  @UsePipes(new ValidationPipe())
  async actualizarUsuario(@Param('cedula', ParseIntPipe) cedula: string, @Body() data: actualizarUsuarioDto) {
    return await this.usuarioService.actualizarUsuario(cedula, data);
  }

  @Delete('eliminarUsuario/:cedula')
  @Roles('Administrador','Empleado')
  @UsePipes(new ValidationPipe())
  async eliminarUsuario(@Param('cedula', ParseIntPipe) cedula: string) {
    return await this.usuarioService.eliminarUsuario(cedula);
  }

  @Get('consultarUsuarioCedula/:cedula')
  async consultarUsuarioCedula(@Param('cedula', ParseIntPipe) cedula: string){
    return await this.usuarioService.consultarTodosCedula(cedula);
  }

}