import { CountryEnum } from "src/common/enums/CountryEnum"
import { EducationEnum } from "src/common/enums/EducationEnum"
import { GenreEnum } from "src/common/enums/GenreEnum"
import { SexualOrientationEnum } from "src/common/enums/SexualOrientationEnum"
import { StateEnum } from "src/common/enums/StateEnum"
import { PersonModel } from "../../models/PersonModel"

export class PersonResponseDTO {

    code?: number
    name: string
    email: string

    constructor(data: PersonModel) {     
        this.code = data.code
        this.name = data.name
        this.email = data.email
    }
}