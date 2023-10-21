import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDTO {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly banner: string;

  @ApiProperty()
  readonly category: [];
}

export class ProductListResponseDTO {
  @ApiProperty()
  readonly data: [];

  @ApiProperty()
  readonly meta: object;
}
