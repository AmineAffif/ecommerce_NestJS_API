import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query('page') page: number): Promise<any> {
    const pageSize = 21;
    const [products, total] = await this.productsService.findAll(page);
    const totalPages = Math.ceil(total / pageSize);

    return {
      products: products,
      total_pages: totalPages,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return await this.productsService.findOne(id);
  }
}
