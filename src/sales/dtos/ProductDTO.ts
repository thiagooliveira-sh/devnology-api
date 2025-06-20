import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class ProductDTO {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;
}