import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SaleModel } from "./SaleModel";

@Entity('product')
export class ProductModel {

    @PrimaryGeneratedColumn({ name: 'code', type: 'int4' })
    code?: number;

    @Column({ name: 'uid', type: 'uuid', default: () => 'gen_random_uuid()', unique: true })
    uid?: string;

    @Column({ name: 'product_id', type: 'varchar', length: 50 })
    productId: string;

    @Column({ name: 'quantity', type: 'integer' })
    quantity: number;

    @Column({
        name: 'price', type: 'decimal', precision: 10, scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value)
        }
    })
    price: number;

    @ManyToOne(() => SaleModel, sale => sale.products)
    @JoinColumn({ name: 'salecode' })
    sale?: SaleModel;

    @Column({ name: 'createdat', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updatedat', nullable: true })
    updatedAt?: Date;
}