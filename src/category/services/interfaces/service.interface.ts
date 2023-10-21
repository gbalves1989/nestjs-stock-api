import { CategoryCreateRequestDTO } from '../../../category/dtos/requests/create.request.dto';
import { CategoryUpdateRequestDTO } from '../../../category/dtos/requests/update.request.dto';
import { ICategory } from '../../../category/interfaces/category.interface';

export interface ICategoryService {
  store(categoryCreateRequestDTO: CategoryCreateRequestDTO): Promise<ICategory>;
  show(categoryId: string): Promise<ICategory>;
  index(page: number);
  update(
    categoryId: string,
    categoryUpdateRequestDTO: CategoryUpdateRequestDTO,
  ): Promise<ICategory>;
  destroy(categoryId: string): Promise<void>;
}
