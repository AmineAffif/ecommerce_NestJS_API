import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from '../../services/orders/orders.service';
import { Order } from '../../entities/order.entity';
import { CreateOrderDto } from '../../dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return await this.orderService.create(createOrderDto);
    } catch (error) {
      console.error('Error while creating order:', error);
      throw error;
    }
  }
}
