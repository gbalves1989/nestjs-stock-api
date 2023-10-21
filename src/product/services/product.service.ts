import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProductService } from './interfaces/service.interface';
import { ProductCreateRequestDTO } from '../dtos/requests/create.request.dto';
import { ProductUpdateRequestDTO } from '../dtos/requests/update.request.dto';
import { IProduct } from '../interfaces/product.interface';
import { ProductRepository } from '../repositories/product.repository';
import { ICategory } from '../../category/interfaces/category.interface';
import { CategoryService } from '../../category/services/category.service';
import * as fs from 'fs';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async store(
    productCreateRequestDTO: ProductCreateRequestDTO,
  ): Promise<IProduct> {
    const productNameExists: IProduct = await this.productRepository.showName(
      productCreateRequestDTO.name,
    );

    if (productNameExists) {
      throw new ConflictException('Product name already exists');
    }

    const category: ICategory = await this.categoryService.show(
      productCreateRequestDTO.categoryId,
    );

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return await this.productRepository.store(productCreateRequestDTO);
  }

  async show(productId: string): Promise<IProduct> {
    const product: IProduct = await this.productRepository.show(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async index(page: number) {
    return await this.productRepository.index({ page });
  }

  async update(
    productId: string,
    productUpdateRequestDTO: ProductUpdateRequestDTO,
  ): Promise<IProduct> {
    const product: IProduct = await this.productRepository.show(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const productNameExists: IProduct = await this.productRepository.showName(
      productUpdateRequestDTO.name,
    );

    if (productNameExists) {
      throw new ConflictException('Product name already exists');
    }

    return await this.productRepository.update(
      productId,
      productUpdateRequestDTO,
    );
  }

  async upload(
    productId: string,
    banner: Express.Multer.File,
  ): Promise<IProduct> {
    const product: IProduct = await this.productRepository.show(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.banner != '') {
      fs.unlink(`./uploads/product/${product.banner}`, (err) => {
        if (err) {
          throw new NotFoundException('File not found');
        }
      });
    }

    return await this.productRepository.upload(productId, banner.filename);
  }

  async getFile(productId: string): Promise<string> {
    const product: IProduct = await this.productRepository.show(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product.banner;
  }

  async destroy(productId: string): Promise<void> {
    await this.productRepository.destroy(productId);
  }
}
