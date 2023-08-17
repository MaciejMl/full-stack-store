import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getUserCart(@Request() req) {
    return this.cartService.getUserCart(req.user);
  }

  @Post('/add/:productId')
  addToCart(@Request() req, @Param('productId') productId: string) {
    return this.cartService.addToCart(req.user, productId);
  }

  @Post('/update/:productId')
  updateCartItemQuantity(
    @Request() req,
    @Param('productId') productId: string,
    @Body() quantity: number,
  ) {
    return this.cartService.updateCartItemQuantity(
      req.user,
      productId,
      quantity,
    );
  }

  @Delete('/remove/:productId')
  removeFromCart(@Request() req, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(req.user, productId);
  }
}
