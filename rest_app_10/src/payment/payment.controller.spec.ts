import { Repository } from "typeorm";
import { User } from '../users/entities/user.entity';
import { UsersService } from "../users/users.service";
import { AuthService } from "../auth/auth.service";
import { JwtService } from '@nestjs/jwt';
import { PaymentController } from './payment.controller';
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Query } from "@nestjs/common";


describe('PaymentController', () => {

  let usersRepository:Repository<User>;
  let userService:UsersService;
  let authService:AuthService;
  let jwtService:JwtService;
  let paymentController: PaymentController;

  beforeEach(async () => {

    const module:TestingModule = await Test.createTestingModule({imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pass@word1',
      database: 'myapp', 
      entities: [],
      autoLoadEntities: true,
      synchronize: true
     }), TypeOrmModule.forFeature([User])],
      providers: [AuthService,UsersService,JwtService]
    }).compile();
    //paymentController= module.get<PaymentController>(PaymentController);

    userService = new UsersService(usersRepository);
    jwtService = new JwtService();
    authService = new AuthService(userService, jwtService);
    paymentController = new PaymentController(userService, authService);
  });

  afterEach(()=>{
    paymentController = null;
    userService = null;
    jwtService = null;
    authService = null;
  });

  it('should be defined', () => {
    expect(paymentController).toBeDefined();
  });


  it('Pay Electricity Bill', async() => {

    const result:Promise<User> = new Promise((resolve, reject)=>{
      resolve(
        {
          username: "local",
          password: "local123",
          email: "local@gmail.com",
          balance: 4700.0,
        }
      )
    });
    const request:any= {user:{username: "local", password: "local123", email: "local@gmail.com", balance: 4700.0}};


    jest.spyOn(userService, 'findByUsername').mockImplementation(() => request['user']);
    jest.spyOn(userService, 'updateUser').mockImplementation(() => request['user']);
   

    let res:string = await paymentController.payElectricity(request,400);

    expect(res).toBe('You have paid electricity bill worth Rs. 400');

  });


  it('Pay both Electricity Bill and Phone Bill', async() => {

        const result:Promise<User> = new Promise((resolve, reject)=>{
          resolve(
            {
              username: "local",
              password: "local123",
              email: "local@gmail.com",
              balance: 4700.0,
            }
          )
        });
        const request:any= {user:{username: "local", password: "local123", email: "local@gmail.com", balance: 4700.0}};
    
    
        jest.spyOn(userService, 'findByUsername').mockImplementation(() => request['user']);
        jest.spyOn(userService, 'updateUser').mockImplementation(() => request['user']);
       
    
        let res:string = await paymentController.payElectricity(request,400,600);
    
        expect(res).toBe('You have paid electricity bill worth Rs. 400\nYou have paid phone bill worth Rs. 600');
    
      });

      it('Balance exceeding Bill', async() => {

        const result:Promise<User> = new Promise((resolve, reject)=>{
          resolve(
            {
              username: "local",
              password: "local123",
              email: "local@gmail.com",
              balance: 400.0,
            }
          )
        });
        const request:any= {user:{username: "local", password: "local123", email: "local@gmail.com", balance: 400.0}};
    
    
        jest.spyOn(userService, 'findByUsername').mockImplementation(() => request['user']);
        jest.spyOn(userService, 'updateUser').mockImplementation(() => request['user']);

        try{
          await paymentController.payElectricity(request,450);
        } catch(e){
          expect(e.message).toBe("Insufficient Balance");
        }
       
    
    
      });
      
    

});
