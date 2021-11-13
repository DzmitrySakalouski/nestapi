import { Module } from '@nestjs/common';
import { ProductGroupService } from './product-group.service';
import { ProductGroupController } from './product-group.controller';

@Module({
  providers: [ProductGroupService],
  controllers: [ProductGroupController]
})
export class ProductGroupModule {}
