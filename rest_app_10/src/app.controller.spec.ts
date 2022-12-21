import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PaymentController } from './payment/payment.controller';



describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should be defined', () => {
        expect(appController).toBeDefined();
      });
  });
});
