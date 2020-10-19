import { from } from 'rxjs';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductsCategories } from '../../product-categories/entities/product-categories.entity'

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  weight: number;

  @Column({ length: 255 })
  description: string;

  @OneToMany(type => ProductsCategories, (productsCategories) => productsCategories.products)
  ProductsCategories: Promise<ProductsCategories[]>;
}
