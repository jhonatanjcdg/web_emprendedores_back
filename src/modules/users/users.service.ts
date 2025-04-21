import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./createUser.dto";
import { EditUserDto } from "./editUser.dto";

@Injectable()
export class UsersService{
    constructor(
        private readonly usersRepository: UsersRepository
    ){}

    getAllUsers(){
        return this.usersRepository.getAllUsers()
    }

    getUserById(id: UUID){
        return this.usersRepository.getUserById(id)
    }

    getUserByEmail(email: string){
        return this.usersRepository.getUserByEmail(email)
    }

    createUser(user: CreateUserDto){
        return this.usersRepository.createUser(user)
    }

    editUserWithId(id: UUID, editUserDto: EditUserDto){
        return this.usersRepository.editUserWithId(id, editUserDto)
    }

    deleteUserWithId(id: UUID){
        return this.usersRepository.deleteUserWithId(id)
    }
}