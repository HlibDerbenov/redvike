import { Injectable } from '@nestjs/common';
import path from 'path';
import { ExcelService } from '../excel/excel.service';
import { IAmenity } from '../interfaces/amenity.interface';

@Injectable()
export class AmenityService {
  private readonly amenitySourcePath: string;

  public constructor(private readonly excelService: ExcelService) {
    this.amenitySourcePath = path.resolve(
      __dirname,
      '../../src/data/Amenity.csv',
    );
  }

  public async getAmenities(): Promise<IAmenity[]> {
    const amenities = await this.excelService.readFileWithStream(
      this.amenitySourcePath,
    );

    return amenities.map((row) => ({
      id: +this.excelService.getCellValue(row, 1),
      name: this.excelService.getCellValue(row, 2),
    }));
  }

  public async findOne(amenity_id: number): Promise<IAmenity> {
    const amenities = await this.getAmenities();
    return amenities.find((amenity) => amenity.id === amenity_id);
  }
}
