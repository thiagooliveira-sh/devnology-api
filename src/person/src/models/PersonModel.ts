import { AuthModel } from "src/auth/src/models/AuthModel"
import { CountryEnum } from "src/common/enums/CountryEnum"
import { EducationEnum } from "src/common/enums/EducationEnum"
import { GenreEnum } from "src/common/enums/GenreEnum"
import { SexualOrientationEnum } from "src/common/enums/SexualOrientationEnum"
import { StateEnum } from "src/common/enums/StateEnum"
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('person')
export class PersonModel {

    @PrimaryGeneratedColumn({ name: 'code' })
    code?: number

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'email', unique: true })
    email: string

    @OneToOne(() => AuthModel, { cascade: true })    
    auth?: AuthModel
    
}