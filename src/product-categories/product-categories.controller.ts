import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesDto } from './dto/product-categories.dto';

@Controller('/api/products-categories')
export class ProductCategoriesController {
    constructor(private readonly productCategoriesService: ProductCategoriesService) {}

    @Post()
    public async postProduct(
        @Res() res,
        @Body() productCategoriesDto: ProductCategoriesDto,
      ): Promise<any> {
        try {
          await this.productCategoriesService.create(productCategoriesDto);
    
          return res.status(HttpStatus.OK).json({
            message: 'Product Categories Created',
            status: 200,
          });
        } catch (err) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: 'Product Categories Not Created',
            status: 400,
          });
        }
      }
}
