import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthResponseDTO } from '../dtos/responses/auth.response.dto';
import { UserResponseDTO } from '../../user/dtos/responses/user.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dtos/http-exception.dto';
import { UserCreateRequestDTO } from '../../user/dtos/requests/create.request.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GetCurrentUserByEmail } from '../decorators/auth.decorator';

@ApiTags('Authentication')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Generate a new access token',
    description: 'Return a new access token',
  })
  @ApiOkResponse({
    description: 'Token generated with success',
    type: AuthResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Credentials invalid',
    type: ExceptionResponseDTO,
  })
  signIn(@Req() req) {
    return this.authService.signIn(req.user);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Return a new user to created',
  })
  @ApiCreatedResponse({
    description: 'User created with success',
    type: UserResponseDTO,
  })
  @ApiConflictResponse({
    description: 'E-mail already exists',
    type: ExceptionResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Request invalid',
    type: ExceptionResponseDTO,
  })
  signUp(@Body() userCreateRequestDTO: UserCreateRequestDTO) {
    return this.authService.signUp(userCreateRequestDTO);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Informations to user logged',
    description: 'Return informations to user logged',
  })
  @ApiOkResponse({
    description: 'Informations returned to user with success',
    type: UserResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Not authorized',
    type: ExceptionResponseDTO,
  })
  show(@GetCurrentUserByEmail() email: string) {
    return this.authService.me(email);
  }
}
