import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuardCookie } from "src/auth/src/services/JwtAuthGuardCookie";
import { SaleRequestDTO } from "./dtos/SaleRequestDTO";
import { SaleService } from "./services/SaleService";
import { PersonModel } from "src/person/src/models/PersonModel";
import { User } from "src/common/decorators/User";

@UseGuards(JwtAuthGuardCookie)
@Controller('sales')
export class SaleController {
    constructor(
        private readonly saleService: SaleService
    ) { }

    @Post()
    async save(@Body() dto: SaleRequestDTO, @User() user: PersonModel): Promise<void> {        
        await this.saleService.save(dto, user.code)
    }
}
