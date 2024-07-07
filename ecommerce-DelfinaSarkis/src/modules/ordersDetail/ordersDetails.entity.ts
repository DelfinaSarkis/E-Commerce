import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../orders/orders.entity";
import { Product } from "../products/products.entity";

@Entity({name: 'ordersDetails'})
export class OrderDetail {
    /**
     * ID único del detalle de orden, generado automáticamente en formato UUID
     * @example "123e4567-e89b-12d3-a456-426614174000"
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Precio del detalle de orden
     * @example 25.99
     */
    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number;

    /**
     * Orden asociada a este detalle
     */
    @OneToOne(() => Order, order => order.orderDetail)
    order:Order;

    /**
     * Productos asociados a este detalle de orden
     */
    @ManyToMany(() => Product, product => product.orderDetails)
    products: Product[];
}