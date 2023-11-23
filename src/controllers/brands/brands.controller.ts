import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BrandsService } from '../../services/brands/brands.service';
import { Brand } from '../../entities/brand.entity';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  async findAll(): Promise<Brand[]> {
    return this.brandsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Brand> {
    return this.brandsService.findOne(id);
  }

  @Post()
  async create(@Body() brandData: Partial<Brand>): Promise<Brand> {
    return this.brandsService.create(brandData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() brandData: Partial<Brand>,
  ): Promise<Brand> {
    return this.brandsService.update(id, brandData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.brandsService.delete(id);
  }
}
