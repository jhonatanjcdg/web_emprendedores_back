import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
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
        return this.usersService.getUserById(id)
    }
    
    @Get('email')
    getUserByEmail(@Query() email: string){
        return this.usersService.getUserByEmail(email)
    }

    @Post()
    createUser(@Body() user: CreateUserDto){
        return this.usersService.createUser(user)
    }

    @Put()
    editUserWithId(@Param('id') id: UUID, @Body() editUserDto: EditUserDto){
        return this.usersService.editUserWithId(id, editUserDto)
    }

    @Delete()
    deleteUserWithId(@Param('id') id: UUID){
        return this.usersService.deleteUserWithId(id)
    }
}