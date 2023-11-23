import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { OrderItem } from '../../entities/order-item.entity';
import { CreateOrderDto } from '../../dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderDate = new Date(createOrderDto.order.order_date);

    if (isNaN(orderDate.getTime())) {
      throw new Error('Invalid date format');
    }

    const order = new Order();
    order.total_price = createOrderDto.order.total_price;
    order.status = createOrderDto.order.status;
    order.order_date = orderDate; // Conservez la date comme un objet Date

    // Création des objets OrderItem pour chaque élément dans createOrderDto.order
    const orderItems = createOrderDto.order.order_items_attributes.map(
      (itemDto) => {
        const orderItem = new OrderItem();
        orderItem.product = { id: itemDto.productId } as any; // Adjust as needed
        orderItem.quantity = itemDto.quantity;
        orderItem.price = itemDto.price;
        return orderItem;
      },
    );

    // Associez les items de commande à la commande
    order.orderItems = orderItems;

    await this.orderRepository.save(order);

    return order;
  }
}
