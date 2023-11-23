import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../../entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  async findOne(id: number): Promise<Brand> {
    return await this.brandRepository.findOneBy({ id });
  }

  async create(brandData: Partial<Brand>): Promise<Brand> {
    const brand = this.brandRepository.create(brandData);
    return await this.brandRepository.save(brand);
  }

  async update(id: number, brandData: Partial<Brand>): Promise<Brand> {
    await this.brandRepository.update(id, brandData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.brandRepository.delete(id);
  }
}
