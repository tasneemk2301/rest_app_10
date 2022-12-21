import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { PaymentController } from '../payment/payment.controller';
import { AppController } from '../app.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'pass@word1',
            database: 'myapp', 
            entities: [],
            autoLoadEntities: true,
            synchronize: true
          }), UsersModule, AuthModule],
          controllers: [AppController ,UsersController, PaymentController],
          providers: [UsersService, JwtService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
