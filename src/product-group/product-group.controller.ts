import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateProductGroupDto } from './model/product-group.dto';
import { ProductGroupStatus } from './model/product-group.interface';
import { ProductGroup } from './model/product-group.model';
import { ProductGroupService } from './product-group.service';

@Controller('product-group')
export class ProductGroupController {
    constructor(private readonly productGroupService: ProductGroupService) {}

    @Get()
    async getAllGroups() {
        let groups: ProductGroup[];
        try {
            groups = await this.productGroupService.findAll();
        } catch (error) {
            throw new HttpException("Something went wrong while fetching groups", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return groups;
    }

    @Post()
    async createGroup(@Body() productGroupDto: CreateProductGroupDto): Promise<ProductGroup> {
        return await this.productGroupService.createProductGroup(productGroupDto);
    }

    @Delete(':id')
    async removeGroup(@Param('id') id: string): Promise<ProductGroup[]> {
        return this.productGroupService.removeProductGroup(+id);
    }
}
