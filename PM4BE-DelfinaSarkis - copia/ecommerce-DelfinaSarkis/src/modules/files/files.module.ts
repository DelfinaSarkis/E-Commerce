import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../products/products.entity";
import { File } from "./files.entity";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { FilesRepository } from "./files.repository";
import { CloudinaryService } from "../users/cloudinary.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product, File])],
    providers: [FilesService, FilesRepository, CloudinaryService],
    controllers: [FilesController],
})
export class FilesModule {}