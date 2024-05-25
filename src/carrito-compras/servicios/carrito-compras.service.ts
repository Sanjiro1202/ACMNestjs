import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { crearCarritoComprasDto, actualizarCarritoComprasDto } from '../dto/carrito-compras.dto';
import { CarritoCompras } from '../entidades/carrito-compras.entity';

@Injectable()
export class CarritoComprasService {
    constructor(
        @InjectRepository(CarritoCompras)
        private CarritoComprasRepo: Repository<CarritoCompras>,
    ){}
    
    //Crear CarritoCompras
    async crearCarritoCompras(data: crearCarritoComprasDto){
      try{
      const user = await this.CarritoComprasRepo.find({where:{ usuario_id: data.fk_user}});
      
      if( user.length > 0){
        return{ 
          statusCode: 200,
          message: 'CarritoCompras ya creado'
        }
      }else{
        
        const nuevoCarritoCompras = this.CarritoComprasRepo.create(data);
        return {      
          statusCode: 201,
          message: 'CarritoCompras creado',
          response: await this.CarritoComprasRepo.save(nuevoCarritoCompras)
        }
      }
    }catch(error) {
      return {
          statusCode: 500,
          message: 'Error Interno'
      }
    }
  }

  //Consultar CarritoCompras
  async consultarTodos(){
    return await this.CarritoComprasRepo.find({
      relations: ["fk_rol_user"]}); 
  }

  //Consultar CarritoCompras Id
  async consultarTodosid(id: number){
    return await this.CarritoComprasRepo.findOne({where: {id: id}, relations: ["fk_user","fk_product"]}); 
  }


  //actualizar CarritoCompras
  async actualizarCarritoCompras(id: number , data: actualizarCarritoComprasDto){
    try{
    const user = await this.CarritoComprasRepo.findOne({where:{ id: id}});
    if(user){
    await this.CarritoComprasRepo.merge(user, data);
    return {      
      statusCode: 201,
      message: 'El CarritoCompras ha sido actualizado',
      response: await this.CarritoComprasRepo.save(user)
    }    
  }else{
    return {      
      statusCode: 200,
      message: 'CarritoCompras no encontrado'
    }    

  } 
  }catch(error) {
    return {      
        statusCode: 500,
        message: 'Error Interno'
      } 
  }
}

async eliminarCarritoCompras(id: number){
  try{
      const user = await this.CarritoComprasRepo.findOne({where:{ id: id}});
      if(user){
      await this.CarritoComprasRepo.delete(user);
      return {
          statusCode: 202,
          message: 'El CarritoCompras ha sido eliminado'
      }
    }else{
      return {      
        statusCode: 200,
        message: 'CarritoCompras no encontrado'
      } 

    }

  }
  catch(error){
      return {      
          statusCode: 500,
          message: 'Error Interno'
        } 

      }
    
    }



}


