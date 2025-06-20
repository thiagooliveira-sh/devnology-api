import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from 'bcrypt'
import { AuthDAO } from "src/auth/src/dao/AuthDAO"
import { AuthModel } from "src/auth/src/models/AuthModel"
import { jwtConstants } from "src/auth/src/services/constants"
import { PersonModel } from "src/person/src/models/PersonModel"
import { AuthRequestDTO } from "../dtos/request/AuthRequestDTO"

@Injectable()
export class AuthManager {

    constructor(
        private _jwtService: JwtService,
        private readonly _authDAO: AuthDAO,
    ) { }

    async validateUser(dto: AuthRequestDTO): Promise<PersonModel> {

        const user: AuthModel = await this._authDAO.getByUsername(dto.username)

        if (user && await bcrypt.compare(dto.password, user.password)) {
            return user.person
        }

        return null
    }

    async login(dto: AuthRequestDTO) {

        const user: PersonModel = await this.validateUser(dto)

        if (!user) {
            throw new UnauthorizedException()
        }
        const payload = { code: user.code, username: user.name }

        return {
            name: user.name,
            access_token: this._jwtService.sign(payload, { privateKey: jwtConstants.secret })
        }
    }


}