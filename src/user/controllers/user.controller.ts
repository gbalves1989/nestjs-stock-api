import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Patch,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserResponseDTO } from '../dtos/responses/user.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dtos/http-exception.dto';
import { GetCurrentUserByEmail } from '../../auth/decorators/auth.decorator';
import { UserUpdateRequestDTO } from '../dtos/requests/update.request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../common/utils/storage.utils';

@ApiTags('User')
@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('update')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Update informations to user logged',
    description: 'Return informations updated to user logged',
  })
  @ApiAcceptedResponse({
    description: 'User updated with success',
    type: UserResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Passwords is different',
    type: ExceptionResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: ExceptionResponseDTO,
  })
  update(
    @GetCurrentUserByEmail() email: string,
    @Body() userUpdateRequestDTO: UserUpdateRequestDTO,
  ) {
    return this.userService.update(email, userUpdateRequestDTO);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('upload')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Upload avatar by user',
    description: 'Return avatar uploaded by user',
  })
  @ApiAcceptedResponse({
    description: 'Avatar uploaded with success',
    type: UserResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Avatar not found',
    type: ExceptionResponseDTO,
  })
  @UseInterceptors(FileInterceptor('avatar', multerConfig('user')))
  uploadAvatar(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    avatar: Express.Multer.File,
    @GetCurrentUserByEmail() email: string,
  ) {
    return this.userService.upload(email, avatar);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('file')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get user avatar file',
    description: 'Return user avatar file',
  })
  async getFile(@GetCurrentUserByEmail() email: string, @Res() res) {
    const filename = await this.userService.getFile(email);
    return res.sendFile(filename, { root: './uploads/user' });
  }
}
