import { CreateUserDto } from "./createUser.dto";
import { PickType } from '@nestjs/swagger';

export class UserCredentialDto extends PickType(CreateUserDto,[
    'email',
    'password',
]) {}
