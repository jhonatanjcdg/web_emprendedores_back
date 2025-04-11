import { Entity, Column, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';

@Entity()
@Tree('nested-set') // Opciones: 'nested-set' o 'closure-table' o 'materialized-path'
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ length: 50, unique: true })
  slug: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}