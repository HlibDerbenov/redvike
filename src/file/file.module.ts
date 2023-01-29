import { Module } from '@nestjs/common';
import { ExcelModule } from '../excel/excel.module';
import { FileController } from './file.controller';

@Module({
  imports: [ExcelModule],
  controllers: [FileController],
})
export class FileModule {}
