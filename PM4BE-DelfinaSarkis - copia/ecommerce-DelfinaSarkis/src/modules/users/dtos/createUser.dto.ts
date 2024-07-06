import { IsNotEmpty, IsString, IsEmail, Length, Matches, IsNumber, MinLength, IsEmpty } from 'class-validator'

export class CreateUserDto {
    /** 
    * El nombre del usuario, debe ser un nombre válido
    * @example Delfina
    */ 
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;

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
    @MinLength(5)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message: 'Debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
})
    password: string;

    /** 
    * El número telefónico del usuario, debe ser un número válido
    * @example 987654321
    */ 
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    /** 
    * El país del usuario, debe ser un país válido
    * @example Argentina
    */ 
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    country: string;

    /** 
    * La dirección del usuario, debe ser una dirección válida
    * @example example1234
    */ 
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    address: string;

    /** 
    * La ciudad del usuario, debe ser una ciudad válida
    * @example Buenos Aires
    */ 
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    city: string;
}