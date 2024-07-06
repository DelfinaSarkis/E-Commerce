import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Category } from "../categories/categories.entity";
import { File } from "../files/files.entity";
import { FilesService } from "../files/files.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category, File])],
    providers: [ProductsService, ProductsRepository, FilesService],
    controllers: [ProductsController],
})
export class ProductsModule {}