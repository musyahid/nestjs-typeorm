import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsCategories } from './entities/product-categories.entity';
import { Repository } from 'typeorm';
import { ProductCategoriesDto } from './dto/product-categories.dto';
import { IProductCategories } from './interfaces/product-categories.interface';
@Injectable()
export class ProductCategoriesService {
    constructor(
        @InjectRepository(ProductsCategories)
        private readonly productsCategoriesRepository: Repository<ProductsCategories>,
      ) {}
    public async create(productCategoriesDto: ProductCategoriesDto): Promise<IProductCategories> {
        try {
          return await this.productsCategoriesRepository.save(productCategoriesDto);
        } catch (err) {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
      }
}
