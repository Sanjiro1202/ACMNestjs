import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import config from './config';
import { DatabaseModule } from './dataBase/database.module';
import { AuthModule } from './auth/auth.module';
import { ProductoModule } from './producto/producto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoController } from './producto/controladores/producto.controller';
import { CarritoComprasModule } from './carrito-compras/carrito-compras.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.dev.env',
      load: [config, ],
      isGlobal: true,
  
    }),
    DatabaseModule,
    UsuarioModule,
    AuthModule,
    CategoriaModule,
    ProductoModule,
    CarritoComprasModule,
    PedidoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
