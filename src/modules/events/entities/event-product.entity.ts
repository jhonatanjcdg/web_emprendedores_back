// src/events/event-product.entity.ts
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Event } from './events.entity';
import { Product } from 'src/modules/products/entities/products.entity';

@Entity()
export class EventProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, event => event.products, { onDelete: 'CASCADE' })
  event: Event;

  @ManyToOne(() => Product, product => product.eventProducts, { eager: true })
  product: Product;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  specialPrice: number;
}