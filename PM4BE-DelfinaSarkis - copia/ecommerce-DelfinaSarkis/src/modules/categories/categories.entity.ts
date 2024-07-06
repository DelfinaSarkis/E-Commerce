import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/products.entity";

@Entity({name: 'categories'})
export class Category {
    /**
    * El ID de la categoría, generado automáticamente en formato UUID
    * @example 123e4567-e89b-12d3-a456-426614174000
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
    * El nombre de la categoría, debe ser un nombre válido
    * @example Electrónica
    */
    @Column({ length: 50, nullable: false })
    name: string;

    /**
    * Los productos asociados a esta categoría
    */
    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}