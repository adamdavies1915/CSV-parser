import CarService from '../services/car.service';
import { CSVMapping } from '../interfaces/csvSchema.interface';
afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing car mapping', () => {
  describe('Mapping CSV data to CarDTO', () => {
    it('should map basic case', async () => {
      const carService = new CarService();
      const csvData = {
        UUID: '111-221-333',
        VIN: '5XNZU3LA9FG123456',
        make: 'Ford',
        model: 'Fiesta',
        mileage: '45000',
        year: '2018',
        price: '16000',
        zipCode: '98109',
        createDate: '2022-05-01',
        updateDate: '2022-06-01',
      };
      const schemaToUse: CSVMapping = {
        UUID: 'UUID',
        VIN: 'VIN',
        make: 'make',
        model: 'model',
        mileage: 'mileage',
        year: 'year',
        price: 'price',
        zipCode: 'zipCode',
        createDate: 'createDate',
        updateDate: 'updateDate',
      };
      const carData = await carService.mapCSVDataToCarData(csvData, schemaToUse);
      expect(carData).toEqual(csvData);
    });
    it('should map different header case', async () => {
      const carService = new CarService();
      const csvData = {
        vehicle_id: '111-221-333',
        vehicle_identification_number: '5XNZU3LA9FG123456',
        manufacturer: 'Ford',
        car_model: 'Fiesta',
        odometer_reading: '45000',
        year_of_manufacture: '2018',
        asking_price: '16000',
        zip_code: '98109',
        date_added: '2022-05-01',
        date_updated: '2022-06-01',
      };
      const schemaToUse: CSVMapping = {
        UUID: 'vehicle_id',
        VIN: 'vehicle_identification_number',
        make: 'manufacturer',
        model: 'car_model',
        mileage: 'odometer_reading',
        year: 'year_of_manufacture',
        price: 'asking_price',
        zipCode: 'zip_code',
        createDate: 'date_added',
        updateDate: 'date_updated',
      };

      const expected = {
        UUID: '111-221-333',
        VIN: '5XNZU3LA9FG123456',
        make: 'Ford',
        model: 'Fiesta',
        mileage: '45000',
        year: '2018',
        price: '16000',
        zipCode: '98109',
        createDate: '2022-05-01',
        updateDate: '2022-06-01',
      };
      const carData = await carService.mapCSVDataToCarData(csvData, schemaToUse);
      expect(carData).toEqual(expected);
    });
  });
});
