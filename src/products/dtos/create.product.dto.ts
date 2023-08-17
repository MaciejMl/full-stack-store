import { Transform } from 'class-transformer';
import { Min, Max, IsNotEmpty, IsString, Length, IsInt } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  @Transform(({ value }) => parseInt(value))
  price: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  carts: string;
}
