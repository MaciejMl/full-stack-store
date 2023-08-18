import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  Put,
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
  addToCart(
    @Request() req,
    @Param('productId') productId: string,
    description: string,
  ) {
    return this.cartService.addToCart(req.user, productId, description);
  }

  @Put('/update/:productId')
  updateCartItemQuantity(
    @Request() req,
    @Param('productId') productId: string,
    @Body()
    body: {
      quantity: number;
      description: string;
    },
  ) {
    return this.cartService.updateCartItemQuantity(
      req.user,
      productId,
      body.quantity,
      body.description,
    );
  }

  @Delete('/remove/:productId')
  removeFromCart(@Request() req, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(req.user, productId);
  }

  @Get('/description/:productId')
  getProductDescription(@Request() req, @Param('productId') productId: string) {
    return this.cartService.getProductDescription(req.user, productId);
  }
}
