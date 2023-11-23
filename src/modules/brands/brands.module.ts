import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../../entities/brand.entity';
import { BrandsService } from '../../services/brands/brands.service';
import { BrandsController } from '../../controllers/brands/brands.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand]), // Importe le repository pour Brand
  ],
  providers: [BrandsService], // Inclut le service BrandsService si nécessaire
  controllers: [BrandsController], // Inclut le BrandsController si nécessaire
  exports: [TypeOrmModule], // Assurez-vous d'exporter TypeOrmModule
})
export class BrandsModule {}
