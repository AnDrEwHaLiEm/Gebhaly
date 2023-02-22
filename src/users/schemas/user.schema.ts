import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type usersDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required:true})
    name: string;

    @Prop({ required: true, unique: true, })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    address:Array<string>
};

export const UserSchema = SchemaFactory.createForClass(User);