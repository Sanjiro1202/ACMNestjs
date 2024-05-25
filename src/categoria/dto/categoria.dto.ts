import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class crearCategoriaDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    descripcion: string;
}

export class actualizarCategoriaDto extends PartialType(crearCategoriaDto) { }