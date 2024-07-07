import { CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";
import { OrderDetail } from "../ordersDetail/ordersDetails.entity";

@Entity({name: 'orders'})
export class Order {
    /**
     * ID único de la orden, generado automáticamente en formato UUID
     * @example "123e4567-e89b-12d3-a456-426614174000"
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Usuario asociado a esta orden
     */
    @OneToMany(() => User, user => user.orders)
    @JoinColumn({ name: 'userId' })
    user: User;

    /**
     * Fecha de creación de la orden
     * @example "2024-07-04T12:00:00Z"
     */
    @CreateDateColumn()
    date: Date;

    /**
     * Detalle específico de esta orden
     */
    @OneToOne(() => OrderDetail, orderDetail => orderDetail.order)
    @JoinColumn()
    orderDetail: OrderDetail;
}