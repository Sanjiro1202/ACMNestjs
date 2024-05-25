import { Injectable } from '@nestjs/common';
import { Producto } from '../entidades/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { actualizarProductoDto, crearProductoDto } from '../dto/product.dto';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Producto)
        private ProductoRepo: Repository<Producto>,
    ) { }


    async crearProducto(data: crearProductoDto) {
        try {
            const nuevoProducto = this.ProductoRepo.create(data);
            return {
                statusCode: 201,
                message: 'Producto creado',
                response: await this.ProductoRepo.save(nuevoProducto)
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
        return await this.ProductoRepo.find();
    }

    async consultarPorId(id: number) {
        return await this.ProductoRepo.findOne({ where: { id: id }});
    }

    async actualizarProducto(id: number, data: actualizarProductoDto) {
        try {
            const product = await this.ProductoRepo.findOne({ where: { id:id} });
            if (product) {
                this.ProductoRepo.merge(product, data);
                return {
                    statusCode: 201,
                    message: 'El Producto ha sido actualizado',
                    response: await this.ProductoRepo.save(product)
                }
            } else {
                return {
                    statusCode: 200,
                    message: 'Producto no encontrado'
                }

            }
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Error Interno'
            }
        }
    }

    async eliminarProducto(id: number) {
        try {
            const product = await this.ProductoRepo.findOne({ where: { id: id } });
            if (product) {
                await this.ProductoRepo.delete(product);
                return {
                    statusCode: 202,
                    message: 'El producto ha sido eliminado'
                }
            } else {
                return {
                    statusCode: 200,
                    message: 'Producto no encontrado'
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
