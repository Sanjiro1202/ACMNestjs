import { Controller, Get, Post, Param, Put, Body, UsePipes, ValidationPipe, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { CategoriaService } from '../servicios/categoria.service';
import { actualizarCategoriaDto, crearCategoriaDto } from '../dto/Categoria.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/guards/roles.decorator';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categoria')
@ApiTags('Categoria')
export class CategoriaController {
  constructor(private CategoriaService: CategoriaService) {}

  @Post('crearCategoria')
  @Roles('Administrador','Empleado')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear un nuevo Categoria' })
  @ApiBody({ type: crearCategoriaDto }) // Especifica el tipo del cuerpo esperado
  @ApiResponse({ status: 201, description: 'Categoria creado con éxito' })
  @ApiResponse({ status: 400, description: 'Datos de Categoria inválidos' })
  async crearCategoria(@Body() data: crearCategoriaDto) {
    return await this.CategoriaService.crearCategoria(data);
  }

  @Get('consultarCategoria')
  @Roles('Administrador','Empleado','Cliente')
  async consultarCategoria(){
    return await this.CategoriaService.consultarTodos();
  }

  @Put('actualizarCategoria/:id')
  @Roles('Administrador','Empleado')
  @UsePipes(new ValidationPipe())
  async actualizarCategoria(@Param('id', ParseIntPipe) id: string, @Body() data: actualizarCategoriaDto) {
    return await this.CategoriaService.actualizarCategoria(parseInt(id), data);
  }

  @Delete('eliminarCategoria/:id')
  @Roles('Administrador','Empleado')
  @UsePipes(new ValidationPipe())
  async eliminarCategoria(@Param('id', ParseIntPipe) id: string) {
    return await this.CategoriaService.eliminarCategoria(parseInt(id));
  }

  @Get('consultarCategoriaid/:id')
  @Roles('Administrador','Empleado')
  async consultarCategoriaid(@Param('id', ParseIntPipe) id: string){
    return await this.CategoriaService.consultarPorId(parseInt(id));
  }

}