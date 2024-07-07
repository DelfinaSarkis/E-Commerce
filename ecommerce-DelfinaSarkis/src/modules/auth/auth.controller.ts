import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dtos/createUser.dto";
import { UserCredentialDto } from "../users/dtos/userCredential.dto";
import { ApiTags } from "@nestjs/swagger";
import { User } from "../users/users.entity";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @HttpCode(200)
    // @Post('signin')
    // async login(@Body() AuthDto: LoginUserDto): Promise<{ message: string }> {
    //     try{
    //         return this.authService.login(AuthDto);
    //     } catch (error){
    //         if (error instanceof NotFoundException){
    //             throw error;
    //         } else {
    //             throw new HttpException('No autorizado', HttpStatus.UNAUTHORIZED);
    //         }
    //     }
    // }

    @HttpCode(201)
    @Post('signup')
    async createUser(@Body() user:CreateUserDto){
        try{
            return this.authService.signUp(user);
        } catch (error){
            throw new HttpException('Error en el servidor interno', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @HttpCode(200)
    @Post('signin')
    async signIn( @Body() user: UserCredentialDto){
        return this.authService.signIn( user.email, user.password );
    }

    @HttpCode(200)
    @Put('admin/:id')
    async getAdmin(@Param('id', ParseUUIDPipe) id: string, @Body() updateAdmin: Partial<User>) {
        try{
            const updatedUser  = await this.authService.updateAdmin (id, updateAdmin);
            return updatedUser;
        } catch (error) {
            if (error instanceof NotFoundException){
                throw error;
            } else {
                throw new HttpException('Error en el servidor interno', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}