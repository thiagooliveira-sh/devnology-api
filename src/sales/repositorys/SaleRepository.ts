import { InjectRepository } from "@nestjs/typeorm";
import { GenericRepository } from "src/common/database/repositories/GenericRepository";
import { Repository } from "typeorm";
import { SaleModel } from "../models/SaleModel";

export class SaleRepository extends GenericRepository<SaleModel> {

    constructor(
        @InjectRepository(SaleModel)
        private readonly saleRepository: Repository<SaleModel>
    ) {
        super(saleRepository);
    }

}