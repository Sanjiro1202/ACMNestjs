import { Module } from '@nestjs/common';
import { CarritoComprasController } from './controladores/carrito-compras.controller';
import { CarritoComprasService } from './servicios/carrito-compras.service';

@Module({
  controllers: [CarritoComprasController],
  providers: [CarritoComprasService]
})
export class CarritoComprasModule {}
