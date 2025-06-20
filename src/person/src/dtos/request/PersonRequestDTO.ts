import { IsEmail, IsEnum, IsHash, IsNotEmpty, IsNumber } from "class-validator"
import { CountryEnum } from "src/common/enums/CountryEnum"
import { EducationEnum } from "src/common/enums/EducationEnum"
import { GenreEnum } from "src/common/enums/GenreEnum"
import { SexualOrientationEnum } from "src/common/enums/SexualOrientationEnum"
import { StateEnum } from "src/common/enums/StateEnum"

export class PersonRequestDTO {

    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsHash('md5')
    password: string
}