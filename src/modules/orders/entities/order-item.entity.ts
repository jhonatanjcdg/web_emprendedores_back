// src/orders/order-item.entity.ts
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Order } from './orders.entity';
import { Product } from 'src/modules/products/entities/products.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  discount: number;
}