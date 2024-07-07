import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../products/products.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class FilesRepository {
    constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>
    ) {}

    async getById(id){
        return this.productsRepository.findBy(id);
    }
}