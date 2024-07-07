import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "./users.entity";
import { CreateUserDto } from "./dtos/createUser.dto";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "../auth/roles.enum";
import { RolesGuard } from "../guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}


    @ApiBearerAuth()
    @HttpCode(200)
    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async getUsers(@Query('name') name?: string, @Query('page') page: string = '1', @Query('limit') limit: string = '5'){
        if(name){
            const user = await this.usersService.getUsersByName(name);
            if (!user){
                throw new NotFoundException('Usuario no encontrado');
            }
            delete user.isAdmin;
            return user;
        }
        const users = await this.usersService.getUsers(page, limit);
        return users.map(user =>{
            delete user.isAdmin;
            return user;
        });
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Get(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    getUsersById(@Param('id', ParseUUIDPipe) id: string){
        const userById = this.usersService.getUsersById(id);
        if(!userById){
            throw new NotFoundException('Usuario por ID no encontrado');
        }
        return userById;
    }

    @HttpCode(201)
    @Post()
    createUser(@Body() user:CreateUserDto) {
        try{
            return this.usersService.createUsers(user);
        } catch (error){
            throw new HttpException('Error en el servidor interno', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: Partial<User>): Promise<{ id: string }> {
        try {
            const updatedUserId = await this.usersService.updateUser(id, updateUserDto);
            if(!updatedUserId){
                throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
            }
            return { id: updatedUserId };
        } catch (error) {
            if (error instanceof NotFoundException){
                throw error;
            } else {
                throw new HttpException('Error en el servidor interno', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Delete(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
        return await this.usersService.deleteUser(id);
    }
}