import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from './model/product.dto';
import { ProductStatus } from './model/product.interface';
import { Product } from './model/product.model';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: Repository<Product>) {}

    async getProductByGroupId(groupId: number): Promise<Product[]> {
        return await this.productRepository.find({where: {groupId}});
    }

    async getProductDetails(id: number): Promise<Product> {
        return this.productRepository.findOne({where: {id}});
    }

    async createProduct(productDto: CreateProductDto) {
        const { name, description, price, imageUrl, groupId } = productDto;

        let status: ProductStatus;

        const productInDb = await this.productRepository.findOne({where: {name}});

        if (productInDb) {
            status.success = false;
            return status;
        }

        const product = await this.productRepository.create({name, description, price, imageUrl, groupId});
        await this.productRepository.save(product);
        status.success = true;
        return status;
    }

    async removeProduct(id: number): Promise<Product[]> {
        const groupsToRemove = await this.productRepository.find({where: {id}})
        return this.productRepository.remove(groupsToRemove)
    }
}
