import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './entities/products.entity';
import { ProductDto } from './dto/product.dto';
import { IProducts } from './interfaces/products.interface';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
      ) {}
    public async create(productDto: ProductDto): Promise<IProducts> {
        try {
          return await this.productRepository.save(productDto);
        } catch (err) {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
      }

    public async findById(productId: string): Promise<Products> {
      const user = await this.productRepository.findOne({
        where: {
          id: productId,
        },
      });
  
      if (!user) {
        throw new NotFoundException(`User #${productId} not found`);
      }
  
      return user;
    }

    public async updateProduct(id: string, productDto: ProductDto): Promise<Products> {
      try {
        const product = await this.productRepository.findOne({id: +id});
        product.name = productDto.name;
        product.price = productDto.price;
        product.weight = productDto.weight;
        product.description = productDto.description;
        
        return await this.productRepository.save(product);
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    }
}
