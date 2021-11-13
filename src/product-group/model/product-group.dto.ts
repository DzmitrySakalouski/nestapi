import { IsNotEmpty } from "class-validator";

export class ProductGroupDto {
    @IsNotEmpty() id: number;
    @IsNotEmpty() name: string;
    @IsNotEmpty() description: string;
    imageUrl: string;
}

export class CreateProductGroupDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() description: string;
    @IsNotEmpty() imageUrl: string;
}