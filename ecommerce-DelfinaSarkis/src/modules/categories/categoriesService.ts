import { Injectable } from "@nestjs/common";
import { Category } from "./categories.entity";
import { CategoriesRepository } from "./categories.repository";

@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    async getCategories(){
        return this.categoriesRepository.getCategories();
    }

    async addCategories(category:Category){
        return this.categoriesRepository.addCategories(category);
    }

    async seedCategories() {
        return this.categoriesRepository.seedCategories()
    }
}