import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

      findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
      findByUsername(username: string): Promise<User> {
        return this.usersRepository.findOneBy({ username });
      }
    
      findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOneBy({ email });
      }
    
      async remove(username: string): Promise<void> {
        await this.usersRepository.delete(username);
      }

      createUser(user:User): Promise<User>{
        return this.usersRepository.save(user);
      }

      updateUser(username:string, user:User): Promise<any>{
        return this.usersRepository.update(username, user);
      }

}