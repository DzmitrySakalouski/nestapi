import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateProductDto } from './model/product.dto';
import { ProductStatus } from './model/product.interface';
import { Product } from './model/product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<Product> {
        return this.productService.getProductDetails(+id);
    }

    @Get(':groupId') 
    async getProductsByGroupId(@Param('groupId') groupId: string): Promise<Product[]> {
        let products: Product[];
        try {
            products = await this.productService.getProductByGroupId(+groupId);
        } catch (error) {
            throw new HttpException("Cannot get products for specified group", HttpStatus.BAD_REQUEST);
        }

        return products;
    }

    @Post()
    async createProduct(productsDto: CreateProductDto): Promise<ProductStatus> {
        let result: ProductStatus;

        try {
            result = await this.productService.createProduct(productsDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

        return result;
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<Product[]> {
        return this.productService.removeProduct(+id);
    }
}
