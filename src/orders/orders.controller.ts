import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getUserOrders(@Request() req) {
    return this.ordersService.getUserOrders(req.user);
  }

  @Get('/:id')
  getOrderDetails(@Request() req, @Param('id') orderId: string) {
    return this.ordersService.getOrderDetails(req.user, orderId);
  }

  @Post('/place')
  placeOrder(@Request() req) {
    return this.ordersService.placeOrder(req.user);
  }
}
