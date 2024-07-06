import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/products.entity";

@Entity({ name: 'files'})
export class File {

    /** 
    * El ID del archivo, no se pone en el body
    */ 
    @PrimaryGeneratedColumn()
    id: number;

    /** 
    * El nombre del archivo, debe ser un nombre válido
    * @example pianoFoto 
    */ 
    @Column()
    name: string;

    /**
    * El tipo MIME del archivo, indica el tipo de contenido
    * @example image/jpeg
    */
    @Column()
    mimetype: string;    
    
    /**
    * Los datos binarios del archivo
    */
    @Column({ type: 'bytea' })
    data: Buffer;

    /**
    * El producto asociado a este archivo
    */
    @ManyToOne( () => Product, (product) => product.files )
    @JoinColumn({ name: 'product_id' })
    product: Product
}