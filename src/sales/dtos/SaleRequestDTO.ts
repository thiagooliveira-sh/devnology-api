import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { PaymentCardDTO } from './PaymentCardDTO';
import { ProductDTO } from './ProductDTO';

export class SaleRequestDTO {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PaymentCardDTO)
  payment: PaymentCardDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDTO)
  products: ProductDTO[];

  @IsNumber()
  @IsPositive()
  total: number;
}