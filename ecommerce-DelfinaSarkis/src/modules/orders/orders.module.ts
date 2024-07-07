import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { Category } from "../categories/categories.entity";
import { Product } from "../products/products.entity";
import { OrderDetail } from "../ordersDetail/ordersDetails.entity";
import { User } from "../users/users.entity";
import { OrdersService } from "./orders.service";
import { OrdersControllers } from "./orders.controller";
import { OrdersRepository } from "./orders.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Order, Category, Product, OrderDetail, User])],
    providers: [OrdersService, OrdersRepository],
    controllers: [OrdersControllers],
})

export class OrdersModule {}