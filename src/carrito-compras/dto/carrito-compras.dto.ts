import {IsNotEmpty, IsString } from 'class-validator';
import {  PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { usuario } from 'src/usuario/entidades/usuario.entity';
import { Producto } from 'src/producto/entidades/producto.entity';

export class crearCarritoComprasDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cantidad: string;

  @ApiProperty()
  @IsNotEmpty()
  fk_product: Producto

  @ApiProperty()
  @IsNotEmpty()
  fk_user: usuario

}

export class actualizarCarritoComprasDto extends PartialType(crearCarritoComprasDto) {}