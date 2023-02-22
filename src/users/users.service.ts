import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dtos/user.dto';
import { User, usersDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
const peper = "z%C*F-JaNdRgUkXp2s5v8y/A?D(G+KbPeShVmYq3t6w9z$C&E)H@McQfTjWnZr4u7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+MbPeShVmYq3t6w9z$C&F)J@NcRfTjWnZ";
@Injectable()

export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<usersDocument>) { }

    async create(UserData: CreateUserDto) {
        UserData.password = await bcrypt.hash(UserData.password + peper, saltOrRounds);
        const result = await this.userModel.create({ ...UserData });
        return result;
    }

    async logIn(email: string, password: string) {
        const result = await this.userModel.findOne({ email: email });
        const isMatch = await bcrypt.compare(password + peper, result.password);
        console.log({ isMatch });
        if (!isMatch)
            throw new HttpException('user name or password is wrong', HttpStatus.UNAUTHORIZED);
        return result;
    }


    async getOne(_id: string) {
        const result =  await this.userModel.findById({ _id }).select("-password");
        return result;
    }


    async update(_id: string, UserData: CreateUserDto) {
        try {
            UserData.password = await bcrypt.hash(UserData.password + peper, saltOrRounds);
            const result = await this.userModel.findOneAndUpdate({ _id: _id }, { ...UserData }, { new: true });
            return result;
        } catch (error) {
            throw new HttpException('Can not update user', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteUser(_id: string) {
        const result = await this.userModel.findOneAndDelete({ _id });
        return result;
    }

    async findAll() {
        return this.userModel.find().select("-password");
    }
}