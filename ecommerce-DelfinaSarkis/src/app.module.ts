import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => 
        ConfigService.get('typeorm'),
        }),
    UsersModule, ProductsModule, AuthModule, CategoriesModule, OrdersModule, FilesModule, JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret:process.env.JWT_SECRET,
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
