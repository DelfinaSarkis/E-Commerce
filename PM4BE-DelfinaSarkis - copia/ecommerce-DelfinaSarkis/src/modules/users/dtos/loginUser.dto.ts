import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
    /** 
    * El email del usuario, debe ser un email válido
    * @example example@gmail.com 
    */ 
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /** 
    * La contraseña del usuario, debe ser una contraseña difícil de encontrar
    * @example StrongPassword01!
    */ 
    @IsNotEmpty()
    @IsString()
    password: string;
}