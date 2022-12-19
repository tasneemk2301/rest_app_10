import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AppController } from './app.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PaymentController } from './payment/payment.controller';

@Module({
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
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
