import { ObjectId } from "mongoose";

export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    password: string;
    readonly address: Array<string>;
}


export class UserDto {
    readonly _id: any;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly address: Array<string>;
}