import { Test, TestingModule } from '@nestjs/testing';
import { LalaController } from './lala.controller';

describe('LalaController', () => {
  let controller: LalaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LalaController],
    }).compile();

    controller = module.get<LalaController>(LalaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
