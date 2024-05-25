import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';



export class crearLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

}
