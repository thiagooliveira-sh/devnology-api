import { BadRequestException, Injectable } from "@nestjs/common"
import * as bcrypt from 'bcrypt'
import 'dotenv/config'
import { PersonDAO } from "src/person/src/dao/PersonDAO"
import { PersonRequestDTO } from "src/person/src/dtos/request/PersonRequestDTO"
import { PersonModel } from "src/person/src/models/PersonModel"

@Injectable()
export class PersonManager {

    constructor(
        private readonly _personDAO: PersonDAO,
    ) { }

    async save(dto: PersonRequestDTO): Promise<PersonModel> {

        const getPersonEmail: PersonModel = await this._personDAO.findOne({ email: dto.email })

        if (getPersonEmail)
            throw new BadRequestException(`O endereço de email ${dto.email} já está em uso.`)

        const getPersonPhone: PersonModel = await this._personDAO.findOne({ email: dto.email })

        if (getPersonPhone)
            throw new BadRequestException(`O telefone ${dto.email} já está em uso.`)

        const personSaveModel: PersonModel = {
            name: dto.name,    
            email: dto.email,
            auth: {
                password: await bcrypt.hash(dto.password, Number(process.env.SALTORROUNDS))
            }
        }

        const personSaved: PersonModel = await this._personDAO.save(personSaveModel)

        delete personSaved.auth

        return personSaved
        
    }

}