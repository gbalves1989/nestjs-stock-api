import { Injectable } from '@nestjs/common';
import { IProductRepository } from './interfaces/repository.interface';
import { DatabaseService } from '../../database/database.service';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';
import { ProductCreateRequestDTO } from '../dtos/requests/create.request.dto';
import { ProductUpdateRequestDTO } from '../dtos/requests/update.request.dto';
import { IProduct } from '../interfaces/product.interface';

const paginate: PaginatorTypes.PaginateFunction = paginator({
  perPage: Number(process.env.PER_PAGE),
});

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private prisma: DatabaseService) {}

  async store(
    productCreateRequestDTO: ProductCreateRequestDTO,
  ): Promise<IProduct> {
    return await this.prisma.product.create({
      data: { ...productCreateRequestDTO },
      select: {
        id: true,
        name: true,
        description: true,
        banner: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async show(productId: string): Promise<IProduct> {
    return await this.prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        description: true,
        banner: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async showName(name: string): Promise<IProduct> {
    return await this.prisma.product.findUnique({
      where: { name },
      select: {
        id: true,
        name: true,
        description: true,
        banner: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async index({ page }: { page?: number }): Promise<
    PaginatorTypes.PaginatedResult<{
      id: string;
      name: string;
      description: string;
      banner: string;
      categoryId: string;
      createdAt: Date;
      updateAt: Date;
    }>
  > {
    return await paginate(
      this.prisma.product,
      {
        select: {
          id: true,
          name: true,
          description: true,
          banner: true,
        },
      },
      { page },
    );
  }

  async update(
    productId: string,
    productUpdateRequestDTO: ProductUpdateRequestDTO,
  ): Promise<IProduct> {
    return await this.prisma.product.update({
      where: { id: productId },
      data: { ...productUpdateRequestDTO },
      select: {
        id: true,
        name: true,
        description: true,
        banner: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async upload(productId: string, banner: string): Promise<IProduct> {
    return await this.prisma.product.update({
      where: { id: productId },
      data: { banner },
      select: {
        id: true,
        name: true,
        description: true,
        banner: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async destroy(productId: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id: productId },
    });
  }
}
