import { InjectRepository } from "@nestjs/typeorm";
import { GenericRepository } from "src/common/database/repositories/GenericRepository";
import { Repository } from "typeorm";
import { PersonModel } from "../models/PersonModel";

export class PersonDAO extends GenericRepository<PersonModel> {

    constructor(
        @InjectRepository(PersonModel)
        private readonly _personRepository: Repository<PersonModel>
    ) {
        super(_personRepository);
    }

}