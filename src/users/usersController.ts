import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUserDto } from "./dtos/user.dto";
import { UserService } from "./users.service";

@Controller('users')

export class userController {
    constructor(private UserService: UserService) { }
    @Post()
    async create(@Req() req: Request, @Res() res: Response) {
        try {
            const userData: CreateUserDto = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                address: req.body.address
            }
            const result = await this.UserService.create(userData);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(HttpStatus.CONFLICT).json({
                message: 'User IS Exist'
            });
        }
    }

    @Post('login')
    async logIn(@Req() req: Request) {
        const { email, password } = req.body;
        return await this.UserService.logIn(email, password);
    }

    @Get(':_id')
    async getOne(@Req() req: Request) {
        const { _id } = req.params;
        return await this.UserService.getOne(_id);
    }

    @Get()
    async getAll(@Req() req: Request) {
        return await this.UserService.findAll();
    }


    @Put(':_id')
    async updateUser(@Req() req: Request) {
        const { _id } = req.params;
        const userData: CreateUserDto = {
            name: req.body.email,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address
        }
        return await this.UserService.update(_id, userData);
    }

    @Delete(':_id')
    async deleteUser(@Req() req: Request) {
        const { _id } = req.params;
        return await this.UserService.deleteUser(_id);
    }

};