import { Injectable } from "@nestjs/common";
import { SaleRequestDTO } from "../dtos/SaleRequestDTO";
import { ProductModel } from "../models/ProductModel";
import { SaleModel } from "../models/SaleModel";
import { SaleRepository } from "../repositorys/SaleRepository";

@Injectable()
export class SaleService {

    constructor(
        private readonly saleRepository: SaleRepository,
    ) { }

    async save(dto: SaleRequestDTO, customerCode: number): Promise<void> {

        const products = dto.products.map(productDto => {
            const product = new ProductModel();
            product.productId = productDto.productId;
            product.quantity = productDto.quantity;
            product.price = productDto.price;
            return product;
        });

        const saleModel: SaleModel = {
            total: dto.total,
            customerCode,
            payment: {
                cardName: dto.payment.cardName,
                cardNumber: dto.payment.cardNumber,
                cvv: dto.payment.cvv,
                expiryDate: dto.payment.expiryDate
            },
            products,
        }

        await this.saleRepository.save(saleModel)

    }

}