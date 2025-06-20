import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericRepository } from "src/common/database/repositories/GenericRepository";
import { Repository, SelectQueryBuilder } from "typeorm";
import { AuthModel } from "../models/AuthModel";

@Injectable()
export class AuthDAO extends GenericRepository<AuthModel> {

    constructor(
        @InjectRepository(AuthModel)
        private readonly _examRepository: Repository<AuthModel>
    ) {
        super(_examRepository);
    }

    async getByUsername(username: string) {

        const query = await this._createQueryBuilder()

        query.leftJoinAndSelect('auth.person', 'person')

        query.where('person.email =:username', { username })

        return query.getOne()
    }

    private async _createQueryBuilder(): Promise<SelectQueryBuilder<AuthModel>> {
        return this._examRepository.createQueryBuilder()
            .select("auth")
            .from(AuthModel, "auth")
    }

}