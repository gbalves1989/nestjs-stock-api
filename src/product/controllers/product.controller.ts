import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  ProductListResponseDTO,
  ProductResponseDTO,
} from '../dtos/responses/product.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dtos/http-exception.dto';
import { ProductCreateRequestDTO } from '../dtos/requests/create.request.dto';
import { ProductUpdateRequestDTO } from '../dtos/requests/update.request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../common/utils/storage.utils';

@ApiTags('Product')
@Controller('/api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Return a new product to created',
  })
  @ApiCreatedResponse({
    description: 'Product created with success',
    type: ProductResponseDTO,
  })
  @ApiConflictResponse({
    description: 'Product name already exists',
    type: ExceptionResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    type: ExceptionResponseDTO,
  })
  store(@Body() productCreateRequestDTO: ProductCreateRequestDTO) {
    return this.productService.store(productCreateRequestDTO);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiOperation({
    summary: 'List of products',
    description: 'Return a list of products',
  })
  @ApiOkResponse({
    description: 'List of products returned with success',
    type: ProductListResponseDTO,
  })
  index(@Query('page') page: number) {
    return this.productService.index(page);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get product by id',
    description: 'Return some product by id',
  })
  @ApiOkResponse({
    description: 'Product returned with success',
    type: ProductResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    type: ExceptionResponseDTO,
  })
  show(@Param('id') id: string) {
    return this.productService.show(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Update product by id',
    description: 'Return product updated by id',
  })
  @ApiAcceptedResponse({
    description: 'Product updated with success',
    type: ProductResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    type: ExceptionResponseDTO,
  })
  @ApiConflictResponse({
    description: 'Product name already exists',
    type: ExceptionResponseDTO,
  })
  update(
    @Param('id') id: string,
    @Body() productUpdateRequestDTO: ProductUpdateRequestDTO,
  ) {
    return this.productService.update(id, productUpdateRequestDTO);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('upload/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        banner: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Upload banner by product',
    description: 'Return banner uploaded by product',
  })
  @ApiAcceptedResponse({
    description: 'Avatar uploaded with success',
    type: ProductResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Banner not found',
    type: ExceptionResponseDTO,
  })
  @UseInterceptors(FileInterceptor('banner', multerConfig('product')))
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
    banner: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.productService.upload(id, banner);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('file/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get product banner file',
    description: 'Return product banner file',
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    type: ExceptionResponseDTO,
  })
  async getFile(@Param('id') id: string, @Res() res) {
    const filename = await this.productService.getFile(id);
    return res.sendFile(filename, { root: './uploads/product' });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete some product by id',
    description: 'Return some product by id',
  })
  @ApiNoContentResponse({
    description: 'Product deleted with success',
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    type: ExceptionResponseDTO,
  })
  destroy(@Param('id') id: string) {
    return this.productService.destroy(id);
  }
}
