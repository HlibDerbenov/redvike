import {
  applyDecorators,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ExcelService } from '../excel/excel.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export function CsvFileDecorators() {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'file',
            description: 'CSV file',
          },
        },
      },
    }),
    UseInterceptors(FileInterceptor('file')),
  );
}

@Controller('file')
export class FileController {
  public constructor(private readonly excelService: ExcelService) {}

  @Post()
  @Version('1')
  @CsvFileDecorators()
  public async transformCsvToJson(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 10 }) /* 10 KB */,
          new FileTypeValidator({ fileType: 'text/csv' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<Record<string, string>[]> {
    return this.excelService.csvBufferToJson(file.buffer);
  }

  @Post()
  @Version('2')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @CsvFileDecorators()
  public async transformCsvToJsonV2(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 10 }) /* 10 KB */,
          new FileTypeValidator({ fileType: 'text/csv' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<Record<string, string>[]> {
    return this.excelService.csvBufferToJson(file.buffer);
  }
}
