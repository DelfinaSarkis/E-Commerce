import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { CloudinaryConfig } from "src/config/cloudinary";
import { CloudinaryService } from "./cloudinary.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers:[UsersService, UsersRepository, CloudinaryConfig, CloudinaryService],
    controllers: [UsersController],
})
export class UsersModule {}