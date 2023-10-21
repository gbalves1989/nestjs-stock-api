import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserUpdateRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  readonly confirmPassword: string;
}
