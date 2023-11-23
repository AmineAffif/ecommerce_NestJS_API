import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(page: number): Promise<[Product[], number]> {
    const perPage = 21;
    const [products, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return [products, total];
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id: id },
      relations: ['category', 'brand'],
    });
  }
}
