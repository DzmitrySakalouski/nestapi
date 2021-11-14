import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateProductDto } from './model/product.dto';
import { Product } from './model/product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<Product> {
        return this.productService.getProductDetails(+id);
    }

    @Get('group/:id') 
    async getProductsByGroupId(@Param('id') groupId: number): Promise<Product[]> {
        let products: Product[];
        console.log(groupId, groupId, groupId);
        
        try {
            products = await this.productService.getProductByGroupId(groupId);
        } catch (error) {
            console.log(error);
            
            throw new HttpException("Cannot get products for specified group", HttpStatus.BAD_REQUEST);
        }

        return products;
    }

    @Post()
    async createProduct(@Body() productsDto: CreateProductDto): Promise<Product> {
        console.log("prod", productsDto);

        if (productsDto && !productsDto.name) {
            throw new HttpException("Something wrong with product data", HttpStatus.BAD_REQUEST)
        }
        
        return await this.productService.createProduct(productsDto);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<Product[]> {
        return this.productService.removeProduct(+id);
    }
}
