import { Injectable } from '@nestjs/common';
import Excel, { Workbook } from 'exceljs';
import { createReadStream, ReadStream } from 'fs';

@Injectable()
export class ExcelService {
  public getCellValue(row: Excel.Row, cellIndex: number) {
    const cell = row.getCell(cellIndex);
    return cell.value ? cell.value.toString() : '';
  }

  public async readFileWithStream(
    path: string,
    delimiter = ';',
    rowCount?: number,
  ): Promise<Excel.Row[]> {
    const stream: ReadStream = createReadStream(path);

    const workbook: Excel.Workbook = new Workbook();
    const streamWorkBook: Excel.Worksheet = await workbook.csv.read(stream, {
      parserOptions: { delimiter },
    });

    const rows: Excel.Row[] =
      streamWorkBook.getRows(2, (rowCount ?? streamWorkBook.rowCount) - 1) ??
      [];

    return rows;
  }
}
