import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PaymentModel } from "./PaymentModel";
import { ProductModel } from "./ProductModel";

@Entity('sale')
export class SaleModel {

    @PrimaryGeneratedColumn({ name: 'code', type: 'int4' })
    code?: number;

    @Column({ name: 'uid', type: 'uuid', default: () => 'gen_random_uuid()', unique: true })
    uid?: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    total: number;

    @OneToOne(() => PaymentModel, { cascade: true })
    @JoinColumn({ name: 'paymentcode' })
    payment: PaymentModel;

    @OneToMany(() => ProductModel, product => product.sale, { cascade: true })
    products: ProductModel[];

    @Column({ name: 'customercode', type: 'int4', nullable: true })
    customerCode?: number;

    @Column({ name: 'createdat', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date;
}