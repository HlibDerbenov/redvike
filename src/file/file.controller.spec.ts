import { Test } from '@nestjs/testing';
import { ExcelService } from '../excel/excel.service';
import { FileController } from './file.controller';

describe('FileController', () => {
  let fileController: FileController;

  const mockedReservations = [
    {
      id: '1',
      name: 'Mitel Networks Corporation',
    },
  ];

  const mockedBuffer = {
    fieldname: 'file',
    originalname: 'Test.csv',
    encoding: '7bit',
    mimetype: 'text/csv',
    buffer: Buffer.from([
      105, 100, 59, 110, 97, 109, 101, 13, 10, 49, 59, 77, 105, 116, 101, 108,
      32, 78, 101, 116, 119, 111, 114, 107, 115, 32, 67, 111, 114, 112, 111,
      114, 97, 116, 105, 111, 110,
    ]),
    size: 37,
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ExcelService],
      controllers: [FileController],
    }).compile();

    fileController = moduleRef.get<FileController>(FileController);
  });

  describe('transformCsvToJson', () => {
    it('should convert CSV to JSON v1', async () => {
      expect(
        await fileController.transformCsvToJson(
          mockedBuffer as Express.Multer.File,
        ),
      ).toStrictEqual(mockedReservations);
    });

    it('should convert CSV to JSON v2', async () => {
      expect(
        await fileController.transformCsvToJsonV2(
          mockedBuffer as Express.Multer.File,
        ),
      ).toStrictEqual(mockedReservations);
    });
  });
});
