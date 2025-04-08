import { Module } from "@nestjs/common";
import { User } from "./users.entity";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
    imports: [User],
    providers: [
        UsersRepository,
        UsersService
    ],
    controllers: [
        UsersController
    ],
})
export class UsersModule{}