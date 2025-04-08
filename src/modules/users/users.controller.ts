import { Controller, Get, Param } from "@nestjs/common";
import { UUID } from "crypto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController{
    constructor(
        private readonly usersService: UsersService
    ){}

    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    getUserById(@Param('id') id: UUID){
        return this.getUserById(id)
    }
}