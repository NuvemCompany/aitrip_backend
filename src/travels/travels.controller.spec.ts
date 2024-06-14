import { Test, TestingModule } from '@nestjs/testing';
import { TravelsController } from './travels.controller';
import { TravelsService } from './travels.service';

describe('TravelController', () => {
  let controller: TravelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelsController],
      providers: [TravelsService],
    }).compile();

    controller = module.get<TravelsController>(TravelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
