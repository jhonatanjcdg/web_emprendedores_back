import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UUID } from "crypto";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./createUser.dto";
import { EditUserDto } from "./editUser.dto";

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

    @Post()
    createUser(@Body() user: CreateUserDto){
        return this.createUser(user)
    }

    @Put()
    editUserWithId(@Param('id') id: UUID, @Body() editUserDto: EditUserDto){
        return this.editUserWithId(id, editUserDto)
    }

    @Delete()
    deleteUserWithId(@Param('id') id: UUID){

    }
}