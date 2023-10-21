import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/product.repository';
import { ProductController } from './controllers/product.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [CategoryModule, DatabaseModule],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
})
export class ProductModule {}
