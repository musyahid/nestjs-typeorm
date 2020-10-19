import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("/api/products")
export class ProductsController {
    
    constructor(private readonly productService: ProductsService) {}

    @Post()
    public async postProduct(
        @Res() res,
        @Body() productDto: ProductDto,
      ): Promise<any> {
        try {
          await this.productService.create(productDto);
    
          return res.status(HttpStatus.OK).json({
            message: 'Product Created',
            status: 200,
          });
        } catch (err) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: 'Product Not Created',
            status: 400,
          });
        }
      }
}
