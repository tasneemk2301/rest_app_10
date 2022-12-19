import { BadRequestException, Body, Controller, Get, Post, Req,  UseGuards, Param, ParseIntPipe, ParseFloatPipe } from '@nestjs/common';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';
import { AuthGuard} from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('bank')
export class AppController {
  constructor(private userService: UsersService, private readonly _authService:AuthService) {}

  @Get('register')
  async signup() {
    return("POST details to signup");
  }

  @Post('register')
  async signupForm(@Body() user: User){

    if(!!user.username && !!user.email && !!user.password) {
      const userCheck= await this.userService.findByUsername(user.username);
      if(!!userCheck){
        
        console.log( "Username already taken. Try again.");
        throw new BadRequestException( "Username already taken. Try again.");
      }
      else{
        console.log('Saving user details: ' + JSON.stringify(user));
        try{
          const savedUser = await this.userService.createUser(user);
          return (savedUser);
          
        } catch(e){
          throw new Error("Some bad while save");
        }
      }
    }
    else {
      console.log("Sign Up failed. Missing Details.");
      throw new BadRequestException( "Sign Up failed. Missing Details.");
  }

  }


  @Post('forgot_password')
  async forgotPassowrd(@Body() details:any) {
    const userCheck= await this.userService.findByUsername(details.username);
    console.log(userCheck);
    if(!!userCheck && userCheck.email===details.email){
      userCheck.password=details.password;
      console.log(userCheck);
      const updatedUser= await this.userService.updateUser(userCheck.username, userCheck);
      console.log("Password has reset");
      return updatedUser;
    }
    else{
      throw new BadRequestException( "Email/Username is invalid. Try again.");
    }
  }


  @Get('login')
  async login() {
    return("POST details to login");
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async loginForm(@Body() user:User, @Req() req:Request) {
    if(!!user.username && !!user.password) {
      const userCheck= await this.userService.findByUsername(user.username);
      if (!!userCheck && userCheck.password===user.password) {
        console.log("Logged in successfully")
        return this._authService.generateToken(req['user']);
      }
      else {
        throw new BadRequestException( "Username/Password invalid. Login failed.");
      }
      
    }
    else {
       return ("All fields must be filled");
    }
  }

  @Post('change_password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() details:any) {
    const userCheck= await this.userService.findByEmail(details.email);
    console.log(userCheck);
    if(!!userCheck && userCheck.password===details.oldPassword){
      userCheck.password=details.newPassword;
      console.log(userCheck);
      const updatedUser= await this.userService.updateUser(userCheck.username, userCheck);
      return(updatedUser);
    }
    else{
      throw new BadRequestException( "Email/Old Password is invalid. Try again.");
    }
  }

  @Get('balance')
  @UseGuards(JwtAuthGuard)
  async avlBalance(@Req() req:Request) {

    const userCheck= await this.userService.findByUsername(req['user']['username']);
    if(!!userCheck){
      const balance = userCheck.balance;
      return(`Balance = ${balance}`);
    }
    else{
      throw new BadRequestException( "Email/Old Password is invalid. Try again.");
    }

  }
  

  @Get('credit/:amount')
  @UseGuards(JwtAuthGuard)
  async creditBalance(@Param('amount', ParseFloatPipe) amount:number, @Req() req:Request) {
    const credit = +req['user']['balance'] + amount;
    req['user']['balance']= credit;
    console.log(`Updated Balance = ${req['user']['balance']}`);

    const userCheck= await this.userService.findByUsername(req['user']['username']);
    console.log(userCheck);
    if(!!userCheck){
      userCheck.balance=req['user']['balance'];
      console.log(userCheck);
      const updatedUser= await this.userService.updateUser(userCheck.username, userCheck);
      return(updatedUser);
    }
    else{
      throw new BadRequestException( "Email/Old Password is invalid. Try again.");
    }
  }


  

}
