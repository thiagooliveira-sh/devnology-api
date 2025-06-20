import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment')
export class PaymentModel {

    @PrimaryGeneratedColumn({ name: 'code', type: 'int4' })
    code?: number;

    @Column({ name: 'uid', type: 'uuid', default: () => 'gen_random_uuid()', unique: true })
    uid?: string;

    @Column({ name: 'cardnumber', type: 'varchar', length: 16 })
    cardNumber: string;

    @Column({ name: 'cardname', type: 'varchar', length: 255 })
    cardName: string;

    @Column({ name: 'expirydate', type: 'varchar', length: 4 })
    expiryDate: string;

    @Column({ name: 'cvv', type: 'varchar', length: 4 })
    cvv: string;

    @Column({ name: 'createdat', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;

    @Column({ name: 'updatedat', type: 'timestamp', nullable: true })
    updatedAt?: Date;

}