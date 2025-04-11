import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./products.entity";

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product.images)
  product: Product;

  @Column()
  imageUrl: string;

  @Column({ name: 'image_order' })
  order: number;

  @CreateDateColumn()
  createdAt: Date;
}