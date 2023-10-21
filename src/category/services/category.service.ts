import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICategoryService } from './interfaces/service.interface';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryCreateRequestDTO } from '../dtos/requests/create.request.dto';
import { CategoryUpdateRequestDTO } from '../dtos/requests/update.request.dto';
import { ICategory } from '../interfaces/category.interface';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async store(
    categoryCreateRequestDTO: CategoryCreateRequestDTO,
  ): Promise<ICategory> {
    const categoryNameExists: ICategory =
      await this.categoryRepository.showName(categoryCreateRequestDTO.name);

    if (categoryNameExists) {
      throw new ConflictException('Category name already exists');
    }

    return await this.categoryRepository.store(categoryCreateRequestDTO);
  }

  async show(categoryId: string): Promise<ICategory> {
    const category = await this.categoryRepository.show(categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async index(page: number) {
    return await this.categoryRepository.index({ page });
  }

  async update(
    categoryId: string,
    categoryUpdateRequestDTO: CategoryUpdateRequestDTO,
  ): Promise<ICategory> {
    const categoryNameExists: ICategory =
      await this.categoryRepository.showName(categoryUpdateRequestDTO.name);

    if (categoryNameExists) {
      throw new ConflictException('Category name already exists');
    }

    const category = await this.categoryRepository.show(categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return await this.categoryRepository.update(
      categoryId,
      categoryUpdateRequestDTO,
    );
  }

  async destroy(categoryId: string): Promise<void> {
    const category = await this.categoryRepository.show(categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.destroy(categoryId);
  }
}
