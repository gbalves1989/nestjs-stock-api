import { ApiProperty } from '@nestjs/swagger';

export class ExceptionResponseDTO {
  @ApiProperty()
  readonly time: Date;

  @ApiProperty()
  readonly path: string;

  @ApiProperty()
  readonly error: string;
}
