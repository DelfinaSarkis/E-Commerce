import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { Repository } from "typeorm";
import { OrderDetail } from "../ordersDetail/ordersDetails.entity";
import { Product } from "../products/products.entity";
import { User } from "../users/users.entity";

@Injectable()
export class OrdersRepository {
    constructor(@InjectRepository(Order) private ordersRepository:Repository<Order>,
@InjectRepository(OrderDetail) private ordersDetailRepository:Repository<OrderDetail>, 
@InjectRepository(Product) private productsRepository:Repository<Product>, 
@InjectRepository(User) private usersRepository:Repository<User>){}

    async createOrder(userId:string, products: Partial<Product>[]): Promise<Order>{
        const user = await this.usersRepository.findOne({where:{ id:userId, active: true }});
        if (!user){
            throw new NotFoundException("Usuario no encontrado");
        }
        const order = this.ordersRepository.create({ user });
        let total = 0;
        const productsArray = await Promise.all(products.map(async (product) => {
            const findedProduct = await this.productsRepository.findOneBy({ id: product.id });
            if (!findedProduct) {
                throw new NotFoundException("Producto no encontrado");
            }
            total =+ findedProduct.price;
            await this.productsRepository.update(findedProduct, { stock: findedProduct.stock - 1 });
            if ( findedProduct.stock <= 0){
                throw new NotFoundException("Sin stock");
            }
            return findedProduct;
        }))
        const orderDetail = await this.ordersDetailRepository.save({ price: total, order: order, products: productsArray})
        
        return await this.ordersRepository.save({...order, orderDetail: orderDetail});
    }

    async getOrder(id: string) {
        return this.ordersRepository.findOne({where: {id}, relations: ["orderDetail"], select: {
            user:{
                id: true,
                email: true,
                name: true,
                phone: true,
                country: true,
                address: true,
                city: true,
                active: true,
            },
        },
    });
    }
}