import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { UsersRepository } from "./users.repository";

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
}