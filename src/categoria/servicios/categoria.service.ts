import { Injectable } from '@nestjs/common';
import { Categoria } from '../entidades/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { actualizarCategoriaDto, crearCategoriaDto } from '../dto/categoria.dto';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private CategoriaRepo: Repository<Categoria>,
    ) { }

    async crearCategoria(data: crearCategoriaDto) {
        try {
            const nuevaCategoria = this.CategoriaRepo.create(data);
            return {
                statusCode: 201,
                message: 'Categoria creada',
                response: await this.CategoriaRepo.save(nuevaCategoria)
            }
        }
        catch (error) {
            return {
                statusCode: 500,
                message: 'Error Interno'
            }
        }
    }

    async consultarTodos() {
        return await this.CategoriaRepo.find();
    }

    async consultarPorId(id: number) {
        return await this.CategoriaRepo.findOne({ where: { id: id }});
    }

    async actualizarCategoria(id: number, data: actualizarCategoriaDto) {
        try {
            const category = await this.CategoriaRepo.findOne({ where: { id:id} });
            if (category) {
                await this.CategoriaRepo.merge(category, data);
                return {
                    statusCode: 201,
                    message: 'La Categoria ha sido actualizada',
                    response: await this.CategoriaRepo.save(category)
                }
            } else {
                return {
                    statusCode: 200,
                    message: 'Categoria no encontrada'
                }

            }
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Error Interno'
            }
        }
    }

    async eliminarCategoria(id: number) {
        try {
            const category = await this.CategoriaRepo.findOne({ where: { id: id } });
            if (category) {
                await this.CategoriaRepo.delete(category);
                return {
                    statusCode: 202,
                    message: 'LA Categoria ha sido eliminada'
                }
            } else {
                return {
                    statusCode: 200,
                    message: 'Categoria no encontrada'
                }

            }

        }
        catch (error) {
            return {
                statusCode: 500,
                message: 'Error Interno'
            }

        }

    }


}
