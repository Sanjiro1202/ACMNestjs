import { Controller, Get, Post, Param, Put, Body, UsePipes, ValidationPipe, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { ProductoService } from '../servicios/producto.service';
import { actualizarProductoDto, crearProductoDto } from '../dto/product.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('producto')
@ApiTags('Producto')
export class ProductoController {
  constructor(private productoService: ProductoService) {}
 
  @Post('crearProducto')
  @Roles('Administrador','Empleado')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({ type: crearProductoDto }) 
  @ApiResponse({ status: 201, description: 'Producto creado con éxito' })
  @ApiResponse({ status: 400, description: 'Datos de producto inválidos' })
  async crearProducto(@Body() data: crearProductoDto) {
    return await this.productoService.crearProducto(data);
  }

  @Get('consultarProducto')
  @Roles('Administrador','Empleado','Cliente')
  async consultarProducto(){
    return await this.productoService.consultarTodos();
  }

  @Put('actualizarProducto/:id')
  @Roles('Administrador','Empleado')
  @UsePipes(new ValidationPipe())
  async actualizarProducto(@Param('id', ParseIntPipe) id: string, @Body() data: actualizarProductoDto) {
    return await this.productoService.actualizarProducto(parseInt(id), data);
  }

  @Delete('eliminarProducto/:id')
  @Roles('Administrador','Empleado')
  @UsePipes(new ValidationPipe())
  async eliminarProducto(@Param('id', ParseIntPipe) id: string) {
    return await this.productoService.eliminarProducto(parseInt(id));
  }

  @Get('consultarProductoid/:id')
  @Roles('Administrador','Empleado','Cliente')
  async consultarProductoid(@Param('id', ParseIntPipe) id: string){
    return await this.productoService.consultarPorId(parseInt(id));
  }

}