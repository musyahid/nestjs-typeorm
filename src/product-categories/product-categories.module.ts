import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesController } from './product-categories.controller';
import { ProductsCategories } from './entities/product-categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsCategories])
  ],
  providers: [ProductCategoriesService],
  controllers: [ProductCategoriesController]
})
export class ProductCategoriesModule {}
