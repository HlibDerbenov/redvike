import { Test, TestingModule } from '@nestjs/testing';
import path from 'path';
import { ExcelService } from './excel.service';

describe('ExcelService', () => {
  let excelService: ExcelService;

  const sourcePath = path.resolve(__dirname, '../../src/data/Amenity.csv');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExcelService],
    }).compile();

    excelService = module.get<ExcelService>(ExcelService);
  });

  it('should read file', async () => {
    expect(
      Array.isArray(await excelService.readFileWithStream(sourcePath)),
    ).toBe(true);
  });
});
