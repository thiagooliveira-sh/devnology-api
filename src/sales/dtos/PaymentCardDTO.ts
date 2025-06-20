import { IsCreditCard, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class PaymentCardDTO {
  // @IsCreditCard()
  @IsNotEmpty()
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  cardName: string;

  @IsString()
  @Length(4, 4)
  // @Matches(/^(0[1-9]|1[0-2])(2[2-9]|[3-9][0-9])$/, {
  //   message: 'expiryDate must be in MMYY format and not expired'
  // })
  expiryDate: string;

  @IsString()
  @Length(3, 4)
  @Matches(/^[0-9]+$/)
  cvv: string;
}
