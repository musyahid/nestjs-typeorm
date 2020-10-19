import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
}
