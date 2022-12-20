import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly _userService:UsersService,
        private readonly _jwtService: JwtService
    ){}

    async validateUser(user: User):Promise<any>{
        console.log("auth service validate user")
        let foundUser = await this._userService.findByUsername(user.username);
        if(!!foundUser && foundUser.password === user.password){

            const {username, email, balance} = foundUser;

            return {username, email, balance};
        }
        // throw new BadRequestException("User is not valid");
        return null;
    }

    generateToken(user:User):any{
        const {username, email, balance} = user;
        const payload = {username, email, balance};
        const token = this._jwtService.sign(payload);
        return {token: token};
    }
}
