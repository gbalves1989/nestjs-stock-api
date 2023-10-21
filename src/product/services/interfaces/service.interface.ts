import { ProductCreateRequestDTO } from '../../../product/dtos/requests/create.request.dto';
import { ProductUpdateRequestDTO } from '../../../product/dtos/requests/update.request.dto';
import { IProduct } from '../../../product/interfaces/product.interface';

export interface IProductService {
  store(productCreateRequestDTO: ProductCreateRequestDTO): Promise<IProduct>;
  show(productId: string): Promise<IProduct>;
  index(page: number);
  update(
    productId: string,
    productUpdateRequestDTO: ProductUpdateRequestDTO,
  ): Promise<IProduct>;
  upload(productId: string, banner: Express.Multer.File): Promise<IProduct>;
  getFile(productId: string): Promise<string>;
  destroy(productId: string): Promise<void>;
}
