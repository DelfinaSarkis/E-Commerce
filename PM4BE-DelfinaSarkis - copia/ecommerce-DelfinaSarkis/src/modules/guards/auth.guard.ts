import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Role } from "../auth/roles.enum";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];
        if(!authorizationHeader) throw new UnauthorizedException('No se ha enviado un token');

        const token = authorizationHeader.split(' ')[1];
        if (!token) throw new UnauthorizedException('Token inválido');

        try{
            const secret = process.env.JWT_SECRET;
            const payload = this.jwtService.verify(token, { secret });
            if(!payload){
                throw new UnauthorizedException('Error al validar Token');
            }
            payload.iat = new Date(payload.iat * 1000);
            payload.exp = new Date(payload.exp * 1000);
            request.user = payload;

            return true;
        } catch (error) {
        throw new UnauthorizedException('Token inválido');
    }
}
}



// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private readonly jwtService: JwtService) {}
    
//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//         const request = context.switchToHttp().getRequest();
//         const token = request.header['authorization']?.split(' ')[1] ?? '';
//         console.log({ token });

//         try{
//             const secret = process.env.JWT_SECRET;
//             const payload = this.jwtService.verify(token, { secret });
//             payload.iat = new Date(payload.iat * 1000);
//             payload.exp = new Date(payload.exp * 1000);
//             request.user = payload;
//             console.log({ payload });
//             return true;
//         } catch (error) {
//         throw new UnauthorizedException('Token inválido');
//     }
// }
// }

