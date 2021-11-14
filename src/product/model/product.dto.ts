import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() description: string;
    @IsNotEmpty() imageUrl: string;
    @IsNotEmpty() price: number;
    @IsNotEmpty() groupId: number;
}