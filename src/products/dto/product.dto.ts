import { MaxLength, IsString, IsNumber, MinLength } from 'class-validator';

export class ProductDto {
  readonly id: number;

  @IsString()
  @MaxLength(30)
  readonly name: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly weight: number;

  @IsString()
  @MaxLength(255)
  readonly description: string;
}
