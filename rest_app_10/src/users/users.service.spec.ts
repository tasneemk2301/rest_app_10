import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users.module';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { PaymentController } from '../payment/payment.controller';
import { AppController } from '../app.controller';

describe('UsersService', () => {
  let service: UsersService;

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

    service = module.get<UsersService>(UsersService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
