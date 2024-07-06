import { Injectable } from "@nestjs/common";
import { Order } from "./orders.entity";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService {
    constructor(private ordersRepository:OrdersRepository) {}

    async createOrder(userId: string, products):Promise<Order>{
        return this.ordersRepository.createOrder(userId, products);
    }

    async getOrder(id: string):Promise<Order>{
        return this.ordersRepository.getOrder(id);
    }
}