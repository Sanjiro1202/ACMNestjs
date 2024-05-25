import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Categoria } from 'src/categoria/entidades/categoria.entity';

export class crearProductoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    precio: string;

    @ApiProperty()
    @IsNotEmpty()
    categoria_id: Categoria;
}

export class actualizarProductoDto extends PartialType(crearProductoDto) { }
