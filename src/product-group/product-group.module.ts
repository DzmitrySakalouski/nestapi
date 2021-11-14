import { Module } from '@nestjs/common';
import { ProductGroupService } from './product-group.service';
import { ProductGroupController } from './product-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductGroup } from './model/product-group.model';

@Module({
  imports: [TypeOrmModule.forFeature([ProductGroup])],
  providers: [ProductGroupService],
  controllers: [ProductGroupController]
})
export class ProductGroupModule {}
