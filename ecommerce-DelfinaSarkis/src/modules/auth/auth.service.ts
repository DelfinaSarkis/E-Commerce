import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Role } from "./roles.enum";
import { CreateUserDto } from "../users/dtos/createUser.dto";
import { User } from "../users/users.entity";

@Injectable()
export class AuthService {
    constructor(private usersRepository: UsersRepository,
                private readonly jwtService: JwtService,
    ) {}
    
    async signUp( user: CreateUserDto ){
        const dbUser = await this.usersRepository.getByEmail(user.email);
        if(dbUser){
            throw new BadRequestException('Email ya en uso');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        if(!hashedPassword){
            throw new BadRequestException('La contraseña no se pudo hashear');
        }
        let userCreated = await this.usersRepository.createUsers({...user, password: hashedPassword, isAdmin: false});
        delete userCreated.password;
        return userCreated;
    }

    async signIn( email: string, password: string ){
        const dbUser = await this.usersRepository.getByEmail(email);
        if (!dbUser || !(await bcrypt.compare( password, dbUser.password ))){
            throw new BadRequestException('Usuario o contraseña no válida');
        }
        
        const userPayload = {
            sub: dbUser.id,
            id: dbUser.id,
            email: dbUser.email,
            roles: [dbUser.isAdmin ? Role.Admin : Role.User],
        };

        const token = this.jwtService.sign(userPayload);
        return { success: 'Usuario logeado con éxito!', token };
    }

    async updateAdmin(id: string, updateAdmin: Partial<User>): Promise<string> {
        let user = await this.usersRepository.getById(id);
        if(!user){
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        
        const updatedUser = {
            ...user,
            isAdmin: !user.isAdmin
        }

        const result = await this.usersRepository.updateUser(id, updatedUser);
        return result;
    }
}