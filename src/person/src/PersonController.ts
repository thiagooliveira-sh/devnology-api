import { Body, Controller, Post, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { PersonRequestDTO } from "./dtos/request/PersonRequestDTO"
import { PersonManager } from "./services/PersonManager"

@Controller('person')
export class PersonController {

    constructor(
        private _personService: PersonManager
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async save(@Body() dto: PersonRequestDTO) {
        return this._personService.save(dto)
    }
    
}