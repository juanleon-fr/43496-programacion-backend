import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly price: number;
  @ApiProperty()
  readonly thumbnail: string;
  @ApiProperty()
  readonly id: string;
}

export class UpdateProductDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly price: number;
  @ApiProperty()
  readonly thumbnail: string;
}
