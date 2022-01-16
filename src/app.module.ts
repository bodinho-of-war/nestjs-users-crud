import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';
import { ProfileModule } from './components/profile/profiles.module';
import { ormConfig } from './database/config/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(ormConfig()),
    AuthModule,
    UserModule,
    ProfileModule,
  ],

})
export class AppModule { }
