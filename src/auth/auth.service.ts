import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    // constructor(private userService: UsersService){}

    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService){}

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOne(username);
    
        if(user && user.password===password){
            const {password, username, ...rest} = user;
            return rest
        }
        return null
    }

    async login(user: any){
        const payload = {name: user.name, sub: user.id}
        return{
            access_token: this.jwtService.sign(payload)
        }
    }
}
