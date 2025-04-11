import { Module } from "@nestjs/common";
import { User } from "./users.entity";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        UsersService,
        UsersRepository,
    ],
    controllers: [
        UsersController
    ],
})
export class UsersModule{}