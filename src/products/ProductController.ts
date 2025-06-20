import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './ProductService';
import ProductSearchRequestDTO from './dto/request/ProductSearchRequestDTO';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('search')
  async search(@Query() dto: ProductSearchRequestDTO): Promise<any> {
    return this.productService.search(dto);
  }
}
