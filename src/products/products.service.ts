import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        carts: true,
      },
    });
  }

  public getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: {
        carts: true,
      },
    });
  }

  public delete(id: Product['id']): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }

  public async create(productData: Omit<Product, 'id'>): Promise<Product> {
    const { ...otherData } = productData;
    try {
      return this.prismaService.product.create({
        data: {
          ...otherData,
          carts: {
            create: [],
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002')
        throw new ConflictException('This product is already exist');
      throw error;
    }
  }

  public async update(
    id: Product['id'],
    productData: Omit<Product, 'id'>,
  ): Promise<Product> {
    try {
      return this.prismaService.product.update({
        where: { id },
        data: {
          ...productData,
          carts: {
            create: [],
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002')
        throw new ConflictException('This product is already exist');
    }
  }
}
