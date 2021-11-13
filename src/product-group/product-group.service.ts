import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductGroupDto } from './model/product-group.dto';
import { ProductGroupStatus } from './model/product-group.interface';
import { ProductGroup } from './model/product-group.model';

@Injectable()
export class ProductGroupService {
    constructor(@InjectRepository(ProductGroup) private productGroupRepository: Repository<ProductGroup>) {}

    async findAll(): Promise<ProductGroup[]> {
        return this.productGroupRepository.find();
    }

    async createProductGroup(productGroupDto: CreateProductGroupDto): Promise<ProductGroupStatus> {
        const {name, description, imageUrl} = productGroupDto;
        let status: ProductGroupStatus;
        const groupInDb = await this.productGroupRepository.findOne({where: {name}});

        if (groupInDb) {
            status.success = false;
            return status
        } else {
            const productGroup: ProductGroup = await this.productGroupRepository.create({name, description, imageUrl});
            await this.productGroupRepository.save(productGroup);
            status.success = true;
        }

        return status;
    }

    async removeProductGroup(id: number): Promise<ProductGroup[]> {
        const groupsToRemove = await this.productGroupRepository.find({where: {id}})
        return this.productGroupRepository.remove(groupsToRemove)
    }
}
