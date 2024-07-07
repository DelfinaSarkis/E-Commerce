import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(User) private usersRepository:Repository<User>){}

    async getUsers(page:number, limit:number): Promise<Omit<User, "password">[]> {
        let arraycopy = await this.usersRepository.find({where: {active: true}});
        let inicio = (page - 1) * limit;
        let final = page * limit;

        return arraycopy.slice(inicio, final)
    }

    async getByName(name: string): Promise<Omit<User, "password">> {
        let username = await this.usersRepository.findOne({ where: { name: name, active: true } });
        if(!username){
            throw new NotFoundException('Usuario no encontrado');
        }
        delete username.password;
        return username;
    }

    async getById(id: string): Promise<Omit<User, "password">>{
        let user = await this.usersRepository.findOne({ where: { id: id, active: true } });
        if(!user){
            throw new NotFoundException('ID de usuario no encontrado');
        }
        delete user.password;
        return user;
    }

    async getByEmail(email:string): Promise<User> {
        return await this.usersRepository.findOne({ where: { email: email, active: true } });
    }

    async createUsers(user): Promise<User> {
        return await this.usersRepository.save(user);
    }

    async updateUser(id: string, updateUser: Partial<User>): Promise<string> {
        await this.usersRepository.update(id, updateUser);
        return id;
    }

    async deleteUser(id: string): Promise<string> {
        const user = await this.usersRepository.findOne({ where: { id: id } });
        if (!user || user.active === false) {throw new NotFoundException("Usuario no encontrado o eliminado")};
        await this.usersRepository.update( id, {...user, active: false});
        
        return id;
} 
}