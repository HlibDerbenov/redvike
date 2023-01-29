import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ExcelService } from '../excel/excel.service';

@Controller('file')
export class FileController {
  public constructor(private readonly excelService: ExcelService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'file',
          description: 'CSV file',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
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
}
