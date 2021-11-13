import { ProductGroup } from "src/product-group/model/product-group.model";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    rate: number;

    @Column()
    price: number;

    @Column()
    imageUrl: string;

    @ManyToOne(type => ProductGroup)
    @JoinColumn({name: 'groupId', referencedColumnName: 'id'})
    groupId: number;    
}