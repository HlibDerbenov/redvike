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

  public async csvBufferToJson(
    buffer: Buffer,
    delimiter = ';',
  ): Promise<Record<string, string>[]> {
    const [headersString, ...content] = buffer
      .toString()
      .replace(/\r/g, '')
      .split('\n');
    const headers = headersString.split(delimiter);

    return content.reduce((accumulator, current) => {
      const values = current.split(delimiter);
      const outputObject = {};

      values.forEach((value, index) => {
        outputObject[headers[index]] = value;
      });

      accumulator.push(outputObject);

      return accumulator;
    }, []);
  }
}
