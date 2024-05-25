import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { actualizarRolDto, crearRolDto } from 'src/usuario/dto/rol.dto';
import { RolService } from 'src/usuario/servicios/rol/rol.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('rol')
@ApiTags('Rol')
export class RolController {
    constructor(private rolService: RolService) {}

    @Post('crearRol')
    @Roles('Administrador')
    @ApiOperation({ summary: 'Crear un nuevo rol' })
    @ApiBody({ type: crearRolDto }) // Especifica el tipo del cuerpo esperado
    @ApiResponse({ status: 201, description: 'Rol creado con éxito' })
    @ApiResponse({ status: 400, description: 'Rol de usuario inválidos' })
    @UsePipes(new ValidationPipe)
    async crearUsuario(@Body() data: crearRolDto) {
        return await this.rolService.crearRol(data);
    }

    @Get('consultarRoles')
    @Roles('Administrador','Empleado')
    async consultarUsuario(){
        return await this.rolService.consultarTodos();
    }

    @Get('consultarRolId/:id')
    @Roles('Administrador','Empleado')
    async consultarUsuarioCedula(@Param('id', ParseIntPipe) id: number){
        return await this.rolService.consultarTodosId(id);
    }

    @Put('actualizarRol/:id')
    @Roles('Administrador')
    async actualizarUsuario(@Param('id', ParseIntPipe) id: number, @Body() data: actualizarRolDto){
        return await this.rolService.actualizarRol(id, data);
    }

    @Delete('eliminarRol/:id')
    @Roles('Administrador')
    async eliminarRol(@Param('id', ParseIntPipe) id: number){
        return await this.rolService.eliminarRol(id);
    }
    // Agregar Controladores para Actualizar Rol y Eliminar Rol

}
