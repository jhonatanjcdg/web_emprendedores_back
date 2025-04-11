import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { DataSource, Repository } from "typeorm";
import { UUID } from "crypto";
import { CreateUserDto } from "./createUser.dto";
import { EditUserDto } from "./editUser.dto";

@Injectable()
export class UsersRepository{
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectDataSource() private dataSource: DataSource,
    ){}

    async getAllUsers(){
        try{
            const users = await this.usersRepository.find()
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

    async getUserById(id: UUID){
        try{
            const user = await this.usersRepository.findOne({
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

    async createUser(user: CreateUserDto){
        return this.dataSource.transaction(async manager =>{
            try{
                const newUser = manager.create(User, user)
                await manager.save(newUser)
                return newUser
            }
            catch(error){
                throw new HttpException(
                    'Error creating user',
                    HttpStatus.BAD_REQUEST
                )
            }
        })
    }

    async editUserWithId(id: UUID, editUserDto: EditUserDto){
        return this.dataSource.transaction(async manager =>{
            try{
                const user = await manager.findOne(User, {where: {id}})
                if(!user){
                    throw new HttpException(
                        `User with id: ${id} not found`,
                        HttpStatus.NOT_FOUND
                    )
                }
                manager.merge(User, user, editUserDto)
                await manager.save(User)
                return 'User has been updated'
            }
            catch(error){
                if(error instanceof NotFoundException){
                    throw new HttpException(
                        error.message,
                        HttpStatus.NOT_FOUND,
                    )
                }
                throw new HttpException(
                    'Error in editUserWithId',
                    HttpStatus.BAD_REQUEST
                )
            }
        })
    }
}