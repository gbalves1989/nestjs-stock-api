import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
