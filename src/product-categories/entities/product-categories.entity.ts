import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Products } from "../../products/entities/products.entity";

@Entity()
export class ProductsCategories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Products, (products) => products.ProductsCategories)
  products: Promise<Products[]>;
}
