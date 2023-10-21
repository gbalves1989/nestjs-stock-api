import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from './interfaces/repository.interface';
import { DatabaseService } from '../../database/database.service';
import { CategoryCreateRequestDTO } from '../dtos/requests/create.request.dto';
import { CategoryUpdateRequestDTO } from '../dtos/requests/update.request.dto';
import { ICategory } from '../interfaces/category.interface';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';

const paginate: PaginatorTypes.PaginateFunction = paginator({
  perPage: Number(process.env.PER_PAGE),
});

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private prisma: DatabaseService) {}

  async store(
    categoryCreateRequestDTO: CategoryCreateRequestDTO,
  ): Promise<ICategory> {
    return await this.prisma.category.create({
      data: { ...categoryCreateRequestDTO },
      select: {
        id: true,
        name: true,
        Product: {
          select: {
            id: true,
            name: true,
            description: true,
            banner: true,
          },
        },
      },
    });
  }

  async show(categoryId: string): Promise<ICategory> {
    return await this.prisma.category.findUnique({
      where: { id: categoryId },
      select: {
        id: true,
        name: true,
        Product: {
          select: {
            id: true,
            name: true,
            description: true,
            banner: true,
          },
        },
      },
    });
  }

  async showName(name: string): Promise<ICategory> {
    return await this.prisma.category.findUnique({
      where: { name },
      select: {
        id: true,
        name: true,
        Product: {
          select: {
            id: true,
            name: true,
            description: true,
            banner: true,
          },
        },
      },
    });
  }

  async index({ page }: { page?: number }): Promise<
    PaginatorTypes.PaginatedResult<{
      id: string;
      name: string;
      createdAt: Date;
      updateAt: Date;
    }>
  > {
    return paginate(
      this.prisma.category,
      {
        select: {
          id: true,
          name: true,
        },
      },
      { page },
    );
  }

  async update(
    categoryId: string,
    categoryUpdateRequestDTO: CategoryUpdateRequestDTO,
  ): Promise<ICategory> {
    return this.prisma.category.update({
      where: { id: categoryId },
      data: { ...categoryUpdateRequestDTO },
      select: {
        id: true,
        name: true,
        Product: {
          select: {
            id: true,
            name: true,
            description: true,
            banner: true,
          },
        },
      },
    });
  }

  async destroy(categoryId: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id: categoryId },
    });
  }
}
