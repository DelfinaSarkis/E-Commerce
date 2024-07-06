import { Module } from "@nestjs/common";
import { CategoriesService } from "./categoriesService";
import { CategoriesRepository } from "./categories.repository";
import { CategoriesController } from "./categories.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./categories.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoriesService, CategoriesRepository],
    controllers: [CategoriesController],
})
export class CategoriesModule {}