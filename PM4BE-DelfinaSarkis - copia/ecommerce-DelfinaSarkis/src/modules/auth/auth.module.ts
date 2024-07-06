import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "../users/users.repository";
import { AuthGuard } from "../guards/auth.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers:[AuthService, UsersRepository, AuthGuard],
    controllers: [AuthController],
})
export class AuthModule {}