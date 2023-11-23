// categories.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [TypeOrmModule], // Assurez-vous d'exporter TypeOrmModule
})
export class CategoriesModule {}
