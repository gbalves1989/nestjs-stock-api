import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDTO {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly products: [];
}

export class CategoryListResponseDTO {
  @ApiProperty()
  readonly data: [];

  @ApiProperty()
  readonly meta: object;
}
