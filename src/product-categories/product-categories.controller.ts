import { Body, Controller, HttpStatus, Param, Post, Get, Put, Res, UseGuards , NotFoundException} from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesDto } from './dto/product-categories.dto';
import { AuthGuard } from "@nestjs/passport";
import { IProductCategories } from "./interfaces/product-categories.interface"

@UseGuards(AuthGuard("jwt"))
@Controller('/api/products-categories')
export class ProductCategoriesController {
    constructor(private readonly productCategoriesService: ProductCategoriesService) {}

    @Get("/:categoryId")
    async getProduct(@Res() res, @Param("categoryId") categoryId: string ): Promise<IProductCategories> {
      const user = await this.productCategoriesService.findById(categoryId);
  
      if (!user) {
        throw new NotFoundException("Product category does not exist!");
      }
  
      return res.status(HttpStatus.OK).json({
        user: user,
        status: 200,
      });
    }

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

    @Put("/:categoryId")
    async updateProduct(
      @Res() res,
      @Param('categoryId') categoryId: string, 
      @Body() productCategoriesDto: ProductCategoriesDto
    ): Promise<any> {
      try {
        await this.productCategoriesService.updateCategory(categoryId, productCategoriesDto);
        const user = await this.productCategoriesService.findById(categoryId);

        return res.status(HttpStatus.OK).json({
          user: user,
          message: "category Updated successfully!",
          status: 200,
        });
      } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: "Error: product not updated!",
          status: 400,
        });
      }
    }
}
