import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

    public async findById(categoryId: string): Promise<ProductsCategories> {
      const user = await this.productsCategoriesRepository.findOne({
        where: {
          id: categoryId,
        },
      });
  
      if (!user) {
        throw new NotFoundException(`Category #${categoryId} not found`);
      }
  
      return user;
    }

    public async updateCategory(id: string, productCategoriesDto: ProductCategoriesDto): Promise<ProductsCategories> {
      try {
        const category = await this.productsCategoriesRepository.findOne({id: +id});
        category.name = productCategoriesDto.name;
        
        return await this.productsCategoriesRepository.save(category);
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    }
}
