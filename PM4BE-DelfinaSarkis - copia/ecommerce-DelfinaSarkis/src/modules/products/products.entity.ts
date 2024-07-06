import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../categories/categories.entity";
import { OrderDetail } from "../ordersDetail/ordersDetails.entity";
import { File } from "../files/files.entity";

@Entity({name: 'products'})

export class Product {
    /**
    * El ID del producto, generado automáticamente en formato UUID
    * @example 123e4567-e89b-12d3-a456-426614174000
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
    * El nombre del producto, debe ser un nombre válido
    * @example iPhone 13
    */
    @Column({ length: 50, nullable: false })
    name: string;

    /**
    * La descripción del producto
    * @example El último modelo de iPhone con mejoras en cámara y batería.
    */
    @Column({ nullable: false })
    description: string;

    /**
    * El precio del producto, con precisión de 10 dígitos y 2 decimales
    * @example 90.99
    */
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    /**
    * La cantidad de unidades disponibles en stock
    * @example 10
    */
    @Column('int')
    stock: number;

    /**
    * La URL de la imagen del producto
    * @example https://example.com/images/default-image-url.jpg
    */
    @Column({ default: 'default-image-url.jpg' })
    imgUrl: string;

    /**
    * Las categorías asociadas a este producto
    */
    @ManyToMany(() => Category, (category) => category.products)
    category: Category;

    /**
    * Los detalles de orden asociados a este producto
    */
    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    @JoinTable({name: 'relación-producto/ordenDetail'})
    orderDetails: OrderDetail[];

    /**
    * Indica si el producto está activo
    * @example true
    */
    @Column({default: true})
    active: boolean;
    
    /**
    * Los archivos asociados a este producto
    */
    @OneToMany(() => File, (file) => file.product)
    files: File[];
}