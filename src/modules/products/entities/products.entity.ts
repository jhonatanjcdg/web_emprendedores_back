import { User } from 'src/modules/users/users.entity';
import { Entity, Column, ManyToOne, OneToMany, Index, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { ProductReview } from './product-review.entity';
import { Category } from './category.entity';
import { ProductTag } from './product-tag.entity';
import { EventProduct } from 'src/modules/events/entities/event-product.entity';

@Entity()
@Index(['name', 'description'], { fulltext: true })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @ManyToOne(() => User, user => user.products)
  seller: User;

  @ManyToOne(() => Category, category => category.products, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({name: 'category_id'})
  category: Category;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 0 })
  views: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0.0 })
  rating: number;

  // Relaciones
  @OneToMany(() => ProductImage, image => image.product)
  images: ProductImage[];

  @OneToMany(() => ProductReview, review => review.product)
  reviews: ProductReview[];

  @OneToMany(() => EventProduct, eventProduct => eventProduct.product)
  eventProducts: EventProduct[];

  @OneToMany(() => ProductTag, productTag => productTag.products)
  tags: ProductTag[];
}