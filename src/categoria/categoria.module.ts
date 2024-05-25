import { Module } from '@nestjs/common';
import { CategoriaController } from './controladores/categoria.controller';
import { CategoriaService } from './servicios/categoria.service';
import { Categoria } from './entidades/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers:[CategoriaController],
  providers: [CategoriaService],
  exports:[CategoriaService]
})
export class CategoriaModule {}
