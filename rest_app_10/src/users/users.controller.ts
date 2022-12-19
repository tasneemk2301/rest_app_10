import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './entities/user.entity';
// import { Movie } from './entities/movie.entity';
import { UsersService } from './users.service';
import { userInfo } from 'os';

@Controller('app/users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Get()
    async showUser(){
        try{
            const users = await this.userService.findAll();
            return users;
        } catch(e){
            throw new Error("Some bad, get all");
        }
    }

    @Get('UserUsername/:username')
    async showUserUsername(@Param('username') username:string){
        try{
            const user= await this.userService.findByUsername(username);
            return user;
        } catch(e){
            throw new Error("Some bad, get by username");
        }
    }


    @Get('UserEmail/:email')
    async showUserEmail(@Param('email') email:string){
        try{
            const user= await this.userService.findByEmail(email);
            return user;
        } catch(e){
            throw new Error("Some bad, get by email");
        }
    }


    @Post()
    async saveUser(@Body() user:User){
        try{
            const savedUser = await this.userService.createUser(user);
            return savedUser;
        } catch(e){
            throw new Error("Some bad while save");
        }
    }


    @Put('UpdateUsername/:username')
    async updateUser(@Param('username') username: string, @Body() user: User){
        try{
            const savedUser = await this.userService.updateUser(username,user);
            return savedUser;
        } catch(e){
            throw new Error("Some bad while put");
        }
    }


    @Delete('DeleteUsername/:username')
    async deleteUser(@Param('username') username:string){
        try{
            const user= await this.userService.remove(username);
            return "User Deleted";
        } catch(e){
            throw new Error("Some bad, delete");
        }
    }

}
