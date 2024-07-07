import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./users.entity";
import { CreateUserDto } from "./dtos/createUser.dto";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async getUsers(page: string, limit: string){
        return this.usersRepository.getUsers(Number(page), Number(limit));
    }

    async getUsersByName(name: string){
        return this.usersRepository.getByName(name);
    }

    async getUsersById(id: string){
        return this.usersRepository.getById(id);
    }

    async createUsers(createUserDto: CreateUserDto): Promise<User>{
        const user = this.usersRepository.createUsers({ ...createUserDto, isAdmin: false})
        return user;
    }

    async updateUser(id: string, user: Partial<User>): Promise<string> {
        const updatedUser = await this.usersRepository.updateUser(id, user);
        return updatedUser;
    }

    async deleteUser(id: string): Promise<string> {
        return await this.usersRepository.deleteUser(id);
    }
}