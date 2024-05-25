import { Controller, Get, Post, Param, Put, Body, UsePipes, ValidationPipe, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { CarritoComprasService } from '../servicios/carrito-compras.service';
import { actualizarCarritoComprasDto, crearCarritoComprasDto } from '../dto/carrito-compras.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/guards/roles.decorator';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('carrito-compras')
@ApiTags('Carrito de Compras')
@ApiResponse({ status: 500, description: 'Error del servidor' })
export class CarritoComprasController {
  constructor(private CarritoComprasService: CarritoComprasService) {}

  @Post('crearCarritoCompras')
  @Roles('Administrador','Empleado')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear un nuevo CarritoCompras' })
  @ApiBody({ type: crearCarritoComprasDto }) // Especifica el tipo del cuerpo esperado
  @ApiResponse({ status: 201, description: 'Carrito de compras creado con éxito' })
  @ApiResponse({ status: 400, description: 'Datos de carrito de compras inválidos' })
  async crearCarritoCompras(@Body() data: crearCarritoComprasDto) {
    return await this.CarritoComprasService.crearCarritoCompras(data);
  }

  @Get('consultarCarritoCompras')
  @Roles('Administrador','Empleado')
  @ApiOperation({ summary: 'Consultar a todos los CarritoComprass' })
  @ApiResponse({ status: 200, description: 'Consulta realizada con éxito' })
  async consultarCarritoCompras(){
    return await this.CarritoComprasService.consultarTodos();
  }

  @Put('actualizarCarritoCompras/:id')
  @Roles('Administrador','Empleado','Cliente')
  @UsePipes(new ValidationPipe())
  async actualizarCarritoCompras(@Param('id', ParseIntPipe) id: string, @Body() data: actualizarCarritoComprasDto) {
    return await this.CarritoComprasService.actualizarCarritoCompras(parseInt(id), data);
  }

  @Delete('eliminarCarritoCompras/:id')
  @Roles('Administrador','Empleado')
  @UsePipes(new ValidationPipe())
  async eliminarCarritoCompras(@Param('id', ParseIntPipe) id: string) {
    return await this.CarritoComprasService.eliminarCarritoCompras(parseInt(id));
  }

  @Get('consultarCarritoComprasid/:id')
  async consultarCarritoComprasid(@Param('id', ParseIntPipe) id: string){
    return await this.CarritoComprasService.consultarTodosid(parseInt(id));
  }

}