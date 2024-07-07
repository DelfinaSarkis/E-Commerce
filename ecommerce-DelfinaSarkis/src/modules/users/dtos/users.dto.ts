export class UserDto {
    /** 
    * La contraseña del usuario, debe ser una contraseña difícil de encontrar
    * @example StrongPassword01!
    */ 
    password: string

    /** 
    * El email del usuario, debe ser un email válido
    * @example example@gmail.com 
    */ 
    email: string;

    /** 
    * El nombre del usuario, debe ser un nombre válido
    * @example Delfina
    */ 
    name: string;

    /** 
    * La dirección del usuario, debe ser una dirección válida
    * @example example1234
    */ 
    address: string;

    /** 
    * El número telefónico del usuario, debe ser un número válido
    * @example 987654321
    */ 
    phone: number;

    /** 
    * El país del usuario, debe ser un país válido
    * @example Argentina
    */  
    country: string;

    /** 
    * La ciudad del usuario, debe ser una ciudad válida
    * @example Buenos Aires
    */ 
    city: string;
}