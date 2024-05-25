import { Test, TestingModule } from '@nestjs/testing';
import { CarritoComprasController } from './carrito-compras.controller';

describe('CarritoComprasController', () => {
  let controller: CarritoComprasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarritoComprasController],
    }).compile();

    controller = module.get<CarritoComprasController>(CarritoComprasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
