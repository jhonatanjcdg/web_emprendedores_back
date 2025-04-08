import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { UUID } from "crypto";

@Injectable()
export class UsersRepository{
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>
    ){}

    getAllUsers(){
        try{
            const users = this.usersRepository.find()
            if(!users){
                throw new HttpException('Error obtaining users', HttpStatus.NOT_FOUND)
            }
            return users
        }
        catch(error){
            if(error instanceof NotFoundException){
                throw new HttpException(
                    error.message,
                    HttpStatus.NOT_FOUND
                )
            }
            throw new HttpException(
                'Bad request in getAllUsers repository',
                HttpStatus.BAD_REQUEST
            )
        }
    }

    getUserById(id: UUID){
        try{
            const user = this.usersRepository.findOne({
                where: {id}
            })
            if(!user){
                throw new HttpException(
                    `User with id: ${id} not found`,
                    HttpStatus.NOT_FOUND
                )
            }
            return user
        }
        catch(error){
            if(error instanceof NotFoundException)
                throw new HttpException(error.message, HttpStatus.NOT_FOUND)
            throw new HttpException(
                'Bad request in getUserById repository',
                HttpStatus.BAD_REQUEST
            )
        }
    }
}