import { IsString, IsUUID } from "class-validator";

export class CreateCommentDto{

     @IsString()
     readonly name:string

     @IsString()
     readonly comment: string;

     @IsString()
     readonly blog_id: string;

}