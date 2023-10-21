import { CategoryUpdateRequestDTO } from '../../../category/dtos/requests/update.request.dto';
import { CategoryCreateRequestDTO } from '../../../category/dtos/requests/create.request.dto';
import { ICategory } from '../../../category/interfaces/category.interface';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { Category } from '@prisma/client';

export interface ICategoryRepository {
  store(categoryCreateRequestDTO: CategoryCreateRequestDTO): Promise<ICategory>;
  show(categoryId: string): Promise<ICategory>;
  showName(name: string): Promise<ICategory>;
  index({
    page,
  }: {
    page?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Category>>;
  update(
    categoryId: string,
    categoryUpdateRequestDTO: CategoryUpdateRequestDTO,
  ): Promise<ICategory>;
  destroy(categoryId: string): Promise<void>;
}
