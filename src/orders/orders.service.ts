import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Order, Cart } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserOrders(user: User): Promise<Order[]> {
    return this.prismaService.order.findMany({
      where: { userId: user.id },
    });
  }

  async getOrderDetails(user: User, orderId: string): Promise<Order> {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
      include: {
        products: true,
      },
    });

    if (!order || order.userId !== user.id) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async placeOrder(user: User): Promise<Order> {
    const cart = await this.getLatestCart(user);

    const order = await this.prismaService.order.create({
      data: {
        userId: user.id,
        products: {
          create: cart.products.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        products: true,
      },
    });

    await this.clearCart(cart);

    return order;
  }

  private async getLatestCart(user: User): Promise<Cart> {
    return this.prismaService.cart.findFirst({
      where: { userId: user.id },
      include: {
        products: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private async clearCart(cart: Cart): Promise<void> {
    await this.prismaService.prodAndCart.deleteMany({
      where: {
        cartId: cart.id,
      },
    });
  }
}
