import { MaxLength, IsString, IsNumber, MinLength } from 'class-validator';

export class ProductCategoriesDto {
  readonly id: number;

  @IsString()
  @MaxLength(30)
  readonly name: string;
}
