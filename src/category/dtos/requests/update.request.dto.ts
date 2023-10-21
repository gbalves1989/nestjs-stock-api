import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryUpdateRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
