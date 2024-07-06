export class AuthDto{
    /**
    * El correo electrónico del usuario, debe ser un correo válido
    * @example usuario@example.com
    */
    email: string;
    
    /**
    * La contraseña del usuario
    * @example mySecurePassword123
    */
    password: string;
}