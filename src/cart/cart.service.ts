import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Cart, ProdAndCart, Product } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserCart(user: User): Promise<Cart> {
    const cart = await this.prismaService.cart.findUnique({
      where: { userId: user.id },
      include: {
        products: {
          include: { product: true },
        },
      },
    });

    if (!cart) {
      return this.createCart(user);
    }

    return cart;
  }

  async addToCart(user: User, productId: string): Promise<Cart> {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cart = await this.getUserCart(user);

    await this.prismaService.prodAndCart.create({
      data: {
        productId,
        cartId: cart.id,
        quantity: 1,
      },
    });

    return this.getUserCart(user);
  }

  async updateCartItemQuantity(
    user: User,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cart = await this.getUserCart(user);

    const cartItem = cart.products.find((item) => item.productId === productId);

    if (!cartItem) {
      throw new NotFoundException('Product not found in cart');
    }

    await this.prismaService.prodAndCart.update({
      where: {
        productId_cartId: {
          productId,
          cartId: cart.id,
        },
      },
      data: { quantity },
    });

    return this.getUserCart(user);
  }

  async removeFromCart(user: User, productId: string): Promise<Cart> {
    const cart = await this.getUserCart(user);

    await this.prismaService.prodAndCart.delete({
      where: {
        productId_cartId: {
          productId,
          cartId: cart.id,
        },
      },
    });

    return this.getUserCart(user);
  }

  private async createCart(user: User): Promise<Cart> {
    return this.prismaService.cart.create({
      data: {
        userId: user.id,
      },
      include: {
        products: true,
      },
    });
  }
}
