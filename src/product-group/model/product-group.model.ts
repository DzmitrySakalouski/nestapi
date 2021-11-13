import { Product } from "src/product/model/product.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    imageUrl: string;

    @OneToMany(type => Product, product => product.groupId)
    products: Product[];
}