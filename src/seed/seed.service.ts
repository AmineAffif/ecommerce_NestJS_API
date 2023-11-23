import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';
import { Product } from '../entities/product.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async seedCategories(): Promise<void> {
    this.logger.log('Seeding categories...');
    for (let i = 0; i < 5; i++) {
      const category_name = faker.commerce.department();
      let category = await this.categoryRepository.findOne({
        where: { name: category_name },
      });
      if (!category) {
        category = this.categoryRepository.create({ name: category_name });
        await this.categoryRepository.save(category);
      }
    }
  }

  async seedBrands(): Promise<void> {
    this.logger.log('Seeding brands...');
    for (let i = 0; i < 10; i++) {
      const brand_name = faker.company.name();
      let brand = await this.brandRepository.findOne({
        where: { name: brand_name },
      });
      if (!brand) {
        brand = this.brandRepository.create({ name: brand_name });
        await this.brandRepository.save(brand);
      }
    }
  }

  async seedProducts(): Promise<void> {
    this.logger.log('Seeding products...');
    for (let i = 0; i < 50; i++) {
      const product_name = faker.commerce.productName();
      const exists = await this.productRepository.findOne({
        where: { name: product_name },
      });
      const imageUrl = 'https://picsum.photos/seed/200/300';
      if (!exists) {
        const raw_price = faker.number.int({ min: 100, max: 10000 }) / 100.0;
        const price = parseFloat((raw_price - 0.01).toFixed(2));
        const description = faker.commerce.productDescription(); // Génère une description de produit
        const product = this.productRepository.create({
          name: product_name,
          price: price,
          description: description,
          imageUrl: imageUrl,
          inventory: faker.number.int({ min: 10, max: 100 }),
          brand: await this.brandRepository.findOne({
            where: { id: faker.number.int({ min: 1, max: 10 }) },
          }),
          category: await this.categoryRepository.findOne({
            where: { id: faker.number.int({ min: 1, max: 5 }) },
          }),
        });
        await this.productRepository.save(product);
      }
    }
  }

  async seedOrders(): Promise<void> {
    this.logger.log('Seeding orders...');
    for (let i = 0; i < 20; i++) {
      const order_date = faker.date.recent({ days: 30 });
      let order = await this.orderRepository.findOne({
        where: { order_date: order_date },
      });

      if (!order) {
        order = this.orderRepository.create({
          order_date: order_date,
          status: faker.helpers.arrayElement([
            'processing',
            'shipped',
            'delivered',
            'cancelled',
          ]),
          total_price: 0, // Initial value
        });

        await this.orderRepository.save(order);
      }

      let total_price = 0;
      const itemsCount = faker.number.int({ min: 2, max: 5 });
      for (let j = 0; j < itemsCount; j++) {
        const productId = faker.number.int({ min: 1, max: 50 });
        const product = await this.productRepository.findOne({
          where: { id: productId },
        });

        if (product) {
          const quantity = faker.number.int({ min: 1, max: 10 });
          const item_price = product.price * quantity;
          total_price += item_price;

          const orderItem = this.orderItemRepository.create({
            order: order,
            product: product,
            quantity: quantity,
            price: item_price,
          });
          await this.orderItemRepository.save(orderItem);
        } else {
          this.logger.warn(`Product with ID ${productId} not found.`);
        }
      }

      if (total_price > 0) {
        order.total_price = parseFloat(total_price.toFixed(2));
        await this.orderRepository.save(order);
      } else {
        this.logger.warn('Order created without items.');
      }
    }
    this.logger.log('Orders seeded successfully.');
  }

  async run(): Promise<void> {
    this.logger.log('Starting seeding process...');
    await this.seedCategories();
    this.logger.log('Categories seeded successfully.');

    await this.seedBrands();
    this.logger.log('Brands seeded successfully.');

    await this.seedProducts();
    this.logger.log('Products seeded successfully.');

    await this.seedOrders();
    this.logger.log('Orders seeded successfully.');

    this.logger.log('Seeding process completed.');
  }
}
