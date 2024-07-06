import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid';
import { Order } from "../orders/orders.entity";

@Entity({name: 'users'})

export class User{
    /**
     * ID único del usuario, generado automáticamente en formato UUID
     * @example 123e4567-e89b-12d3-a456-426614174000
     */
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    /**
     * Nombre del usuario
     * @example Delfina
     */
    @Column({ length: 50, nullable: false })
    name: string;

    /**
     * Correo electrónico del usuario, único y obligatorio
     * @example example@gmail.com
     */
    @Column({ length: 50, unique: true, nullable: false })
    email: string;

    /**
     * Contraseña del usuario
     * @example StrongPassword01!
     */
    @Column({ type: 'varchar', nullable: false })
    password: string;

    /**
     * Número de teléfono del usuario
     * @example 987654321
     */
    @Column()
    phone: number;

    /**
     * País del usuario
     * @example Argentina
     */
    @Column({ length: 50 })
    country: string;

    /**
     * Dirección del usuario
     * @example example123
     */
    @Column()
    address: string;

    /**
     * Ciudad del usuario
     * @example Buenos Aires
     */
    @Column({ length: 50 })
    city: string;

    /**
     * Relación: Órdenes asociadas a este usuario
     */
    @OneToMany(() => Order, order => order.user)
    @JoinColumn({name:"Id_orders"})
    orders: Order[];

    /**
     * Indica si el usuario es administrador
     * @example false
     */
    @Column({ default: false })
    isAdmin: boolean;

    /**
     * Indica si el usuario está activo
     * @example true
     */
    @Column({ default: true })
    active: boolean;
}