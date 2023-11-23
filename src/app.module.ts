import { Module, OnModuleInit, Logger } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { Category } from './entities/category.entity';
import { Brand } from './entities/brand.entity';

import { CategoriesModule } from './modules/categories/categories.module';
import { BrandsModule } from './modules/brands/brands.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';

// import { ProductsController } from './controllers/products/products.controller';
// import { OrdersController } from './controllers/orders/orders.controller';

// import { ProductsService } from './services/products/products.service';
// import { OrdersService } from './services/orders/orders.service';

import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'myecommerce',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Attention : à utiliser uniquement en développement
    }),
    TypeOrmModule.forFeature([Category, Brand, Order, Product]),
    CategoriesModule,
    BrandsModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    this.logger.log(
      'Seeding SERVICE IS CALLED --------------------------------------',
    );
    await this.seedService.run();
  }
}
