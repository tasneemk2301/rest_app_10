import { BadRequestException, Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('bank')
export class PaymentController {
    constructor(private userService: UsersService, private readonly _authService:AuthService) {}


    @Get('bills?')
    @UseGuards(JwtAuthGuard)
    async payElectricity(@Req() req:Request, @Query('electricity') electricity?:number, @Query('phone') phone?:number ) {
        const temp= await this.userService.findByUsername(req['user']['username']);
        let balance = temp.balance;
        if(!!electricity && balance>=+electricity){
            console.log("hi");
            const userCheck= await this.userService.findByUsername(req['user']['username']);
            console.log(userCheck);
            if(!!userCheck){
                
                userCheck.balance=balance- electricity;
                balance= balance-electricity;
                req['user']['balance']= +req['user']['balance'] - electricity;
                console.log(userCheck);
                const updatedUser= await this.userService.updateUser(userCheck.username, userCheck);
                console.log(`You have paid electricity bill worth Rs. ${electricity}`);
            }
            else{
                throw new BadRequestException();
            }
        }
        if(!!phone && balance>=+phone){
            const userCheck= await this.userService.findByUsername(req['user']['username']);
            console.log(userCheck);
            if(!!userCheck){
                userCheck.balance= balance- phone;
                balance= balance-phone;
                req['user']['balance']= +req['user']['balance'] - phone;
                console.log(userCheck);
                const updatedUser= await this.userService.updateUser(userCheck.username, userCheck);
                console.log(`You have paid phone bill worth Rs. ${phone}`);
            }
            else{
                throw new BadRequestException();
            }
        }
        else{
            throw new BadRequestException("Insufficient Balance");
        }
        return("Transaction Complete");
        
    }

    

}
