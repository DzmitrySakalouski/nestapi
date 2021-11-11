import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/model/user.models';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    password: "sokill666",
    username: "postgres",
    database: "learnappdb",
    entities: [User],
    synchronize: true,
  }), AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
