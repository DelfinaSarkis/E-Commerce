import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { ProductDto } from "./products.dto";
import { Product } from "./products.entity";

@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRepository) {}
    
    async getProducts(page: string, limit: string){
        return this.productsRepository.getProducts(Number(page), Number(limit));
    }

    async getProductsByName(name: string){
        return this.productsRepository.getByName(name);
    }

    async getProductsById(id: number) {
        return this.productsRepository.getById(id);
    }

    async createProducts(product:ProductDto): Promise<Product>{
        return this.productsRepository.createProducts(product);
    }

    async updateProducts(id: string, product: Partial<Product>): Promise<string> {
        const updatedProducts = await this.productsRepository.updateProducts(id, product);
        return updatedProducts;
    }

    async deleteProducts(id: string): Promise<string> {
        await this.productsRepository.deleteProducts(id);
        return id;
    }

    async productsSeeder(){
        return this.productsRepository.productsSeeder();
    }
}