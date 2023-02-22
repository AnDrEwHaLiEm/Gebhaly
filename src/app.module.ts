import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://anroooof:w2jBYvPH4EWHRtbM@cluster0.1smbyu4.mongodb.net/?retryWrites=true&w=majority'), UsersModule],
  
})
export class AppModule {}
