import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Brand } from '../../entities/brand.entity';
import { Repository } from 'typeorm';

describe('BrandsService', () => {
  let service: BrandsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let mockBrandRepository: Repository<Brand>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getRepositoryToken(Brand),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    mockBrandRepository = module.get<Repository<Brand>>(
      getRepositoryToken(Brand),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
