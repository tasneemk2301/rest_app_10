import { BadRequestException, Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bank')
export class PaymentController {
    constructor(private userService: UsersService, private readonly _authService:AuthService) {}


    @Get('bills?')
    @UseGuards(JwtAuthGuard)
    async payElectricity(@Req() req:Request, @Query('electricity') electricity?:number, @Query('phone') phone?:number ) {
        const temp= await this.userService.findByUsername(req['user']['username']);
        let balance = temp.balance;
        let invoice1:string;
        let invoice2:string;
        let flag1=0;
        let flag2=0;
        if(!!electricity)
        {if(!!electricity && balance>=+electricity){
            const userCheck= await this.userService.findByUsername(req['user']['username']);
            console.log(userCheck);
            if(!!userCheck){
                
                userCheck.balance=balance- electricity;
                balance= balance-electricity;
                req['user']['balance']= +req['user']['balance'] - electricity;
                console.log(userCheck);
                const updatedUser= await this.userService.updateUser(userCheck.username, userCheck);
                flag1=1;
                console.log(`You have paid electricity bill worth Rs. ${electricity}`);
                invoice1=`You have paid electricity bill worth Rs. ${electricity}`;
            }
            else{
                throw new BadRequestException();
            }
        }
        else{
            throw new BadRequestException("Insufficient Balance");
        }}
        if(!!phone)
        {if(!!phone && balance>=+phone){
            const userCheck= await this.userService.findByUsername(req['user']['username']);
            console.log(userCheck);
            if(!!userCheck){
                userCheck.balance= balance- phone;
                balance= balance-phone;
                req['user']['balance']= +req['user']['balance'] - phone;
                console.log(userCheck);
                const updatedUser= await this.userService.updateUser(userCheck.username, userCheck);
                flag2=1;
                console.log(`You have paid phone bill worth Rs. ${phone}`);
                invoice2= `You have paid phone bill worth Rs. ${phone}`;
            }
            else{
                throw new BadRequestException();
            }
        }
        else{
            throw new BadRequestException("Insufficient Balance");
        }}

        if(flag1===1 && flag2==1) {
            return(`${invoice1}\n${invoice2}`);
        }
        else if(flag1==1){
            return(`${invoice1}`);
        }
        else if(flag2==1){
            return(`${invoice2}`);
        }
   
        //return("Transaction Complete");
        
    }

    

}
