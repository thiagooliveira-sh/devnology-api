import { Module } from '@nestjs/common';
import { ProductController } from './products/ProductController';
import { ProductService } from './products/ProductService';
import { SaleController } from './sales/SaleController';
import { Database } from './common/configdatabase/DatabaseConnectionOptions';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModel } from './sales/models/PaymentModel';
import { ProductModel } from './sales/models/ProductModel';
import { SaleModel } from './sales/models/SaleModel';
import { SaleService } from './sales/services/SaleService';
import { SaleRepository } from './sales/repositorys/SaleRepository';
import { AuthModel } from './auth/src/models/AuthModel';
import { PersonModel } from './person/src/models/PersonModel';
import { AuthController } from './auth/src/AuthController';
import { PersonController } from './person/src/PersonController';
import { AuthManager } from './auth/src/services/AuthManager';
import { PersonManager } from './person/src/services/PersonManager';
import { PersonDAO } from './person/src/dao/PersonDAO';
import { AuthDAO } from './auth/src/dao/AuthDAO';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './auth/src/services/JwtStrategy';
import { JwtStrategyCookie } from './auth/src/services/JwtStrategyCookie';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...Database.getConnectionOptions<DataSourceOptions>(),
      ssl: false,
    }),
    TypeOrmModule.forFeature([PaymentModel, ProductModel, SaleModel, AuthModel, PersonModel]),
  ],
  controllers: [ProductController, SaleController, PersonController, AuthController],
  providers: [
    ProductService,
    SaleService,
    SaleRepository,
    AuthManager,
    PersonManager,
    PersonDAO,
    AuthDAO,
    JwtService,
    JwtStrategy,
    JwtStrategyCookie
  ],
})
export class AppModule { }
