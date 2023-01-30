import { Test, TestingModule } from '@nestjs/testing';
import { ExcelService } from '../excel/excel.service';
import { AmenityService } from './amenity.service';

describe('AmenityService', () => {
  let amenityService: AmenityService;

  const mockedAmenities = [
    {
      id: 1,
      name: 'Mitel Networks Corporation',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmenityService, ExcelService],
    }).compile();

    amenityService = module.get<AmenityService>(AmenityService);
  });

  it('should return amenity by id', async () => {
    expect(await amenityService.findOne(mockedAmenities[0].id)).toMatchObject({
      id: mockedAmenities[0].id,
    });
  });

  it('should return amenities', async () => {
    jest
      .spyOn(amenityService, 'getAmenities')
      .mockImplementation(async () => mockedAmenities);

    expect(await amenityService.getAmenities()).toStrictEqual(mockedAmenities);
  });
});
