import { Body, Controller, HttpStatus, Param, Post, Get, Res, UseGuards, NotFoundException, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { AuthGuard } from "@nestjs/passport";
import { IProducts } from "./interfaces/products.interface";

@UseGuards(AuthGuard("jwt"))
@Controller("/api/products")
export class ProductsController {
    
    constructor(private readonly productService: ProductsService) {}

    @Get("/:productId")
    async getProduct(@Res() res, @Param("productId") productId: string ): Promise<IProducts> {
      const user = await this.productService.findById(productId);
  
      if (!user) {
        throw new NotFoundException("User does not exist!");
      }
  
      return res.status(HttpStatus.OK).json({
        user: user,
        status: 200,
      });
    }

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
    
  @Put("/:productId")
  async updateProduct(
    @Res() res,
    @Param('productId') productId: string, 
    @Body() productDto: ProductDto
  ): Promise<any> {
    try {
      await this.productService.updateProduct(productId, productDto);
      const user = await this.productService.findById(productId);

      return res.status(HttpStatus.OK).json({
        user: user,
        message: "product Updated successfully!",
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
