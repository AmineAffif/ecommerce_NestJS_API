import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { ProductsService } from '../../services/products/products.service';
import { ProductsController } from '../../controllers/products/products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [TypeOrmModule], // Assurez-vous d'exporter TypeOrmModule
})
export class ProductsModule {}
