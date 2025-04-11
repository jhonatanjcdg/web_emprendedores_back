import { Entity, Column, OneToMany, Index, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Product } from '../products/entities/products.entity';
import { Order } from '../orders/entities/orders.entity';
import { Event } from '../events/entities/events.entity';
import { EventAttendee } from '../events/entities/event-attendee.entity';
import { ProductReview } from '../products/entities/product-review.entity';
import { Notification } from '../notifications/notifications.entity';
import { UserRole } from 'src/enums/user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string

  @Column({ unique: true })
  @IsEmail()
  @Matches(/^[\w-.]+@(tuuniversidad\.edu)$/i) // Cambia "tuuniversidad" por tu dominio real
  email: string;

  @Column()
  passwordHash: string;

  @Column({ length: 50 })
  displayName: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  studentId: string;

  @Column({ length: 20 })
  phone: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0.0 })
  rating: number;

  // Relaciones
  @OneToMany(() => Product, product => product.seller)
  products: Product[];

  @OneToMany(() => Order, order => order.buyer)
  orders: Order[];

  @OneToMany(() => Event, event => event.organizer)
  organizedEvents: Event[];

  @OneToMany(() => EventAttendee, attendee => attendee.user)
  eventAttendances: EventAttendee[];

  @OneToMany(() => ProductReview, review => review.user)
  reviews: ProductReview[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];
}