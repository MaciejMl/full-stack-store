import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Cart } from '@prisma/client';

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

  async addToCart(
    user: User,
    productId: string,
    description: string,
  ): Promise<Cart> {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cart = await this.prismaService.cart.findUnique({
      where: { userId: user.id },
      include: {
        products: true,
      },
    });

    const productInCart = cart.products.find(
      (item) => item.productId === productId,
    );
    if (productInCart) {
      throw new ConflictException('Product is already in the cart');
    }
    await this.prismaService.prodAndCart.create({
      data: {
        productId,
        cartId: cart.id,
        quantity: 1,
        description: description,
      },
    });

    return this.getUserCart(user);
  }

  async updateCartItemQuantity(
    user: User,
    productId: string,
    quantity: number,
    description: string,
  ): Promise<Cart> {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cart = await this.prismaService.cart.findUnique({
      where: { userId: user.id },
      include: {
        products: true,
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItem = cart.products.find((item) => item.productId === productId);

    if (!cartItem) {
      throw new NotFoundException('Product not found in cart');
    }

    await this.prismaService.prodAndCart.update({
      where: {
        productId_cartId: {
          productId: cartItem.productId,
          cartId: cart.id,
        },
      },
      data: {
        quantity: quantity,
        description: description,
      },
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

  async getProductDescription(
    user: User,
    productId: string,
  ): Promise<string | null> {
    const cart = await this.prismaService.cart.findUnique({
      where: { userId: user.id },
      include: {
        products: {
          where: {
            productId: productId,
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const productInCart = cart.products.find(
      (item) => item.productId === productId,
    );

    if (!productInCart) {
      throw new NotFoundException('Product not found in cart');
    }

    return productInCart.description || null;
  }
}
