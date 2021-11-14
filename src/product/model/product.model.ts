import { ProductGroup } from "src/product-group/model/product-group.model";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        nullable: true
    })
    rate: number;

    @Column()
    price: number;

    @Column()
    imageUrl: string;

    @ManyToOne(type => ProductGroup, group => group.id)
    @JoinColumn({name: "groupId"})
    groupId: number;    
}