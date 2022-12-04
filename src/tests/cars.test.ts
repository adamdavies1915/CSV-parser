import mongoose from 'mongoose';
import request from 'supertest';
import App from '../app';
import { CreateCarDto } from '../dtos/car.dto';
import CarRoute from '../routes/car.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing CSV upload to Cars', () => {
  describe('[POST] /cars', () => {
    it('Adds new car', async () => {
      const carData: CreateCarDto = {
        UUID: '1234567890',
        VIN: '12345678901234567',
        make: 'Honda',
        model: 'Civic',
        mileage: 10000,
        year: 2010,
        price: 10000,
        zipCode: '12345',
        createDate: new Date(),
        updateDate: new Date(),
      };

      const carRoute = new CarRoute();
      const users = carRoute.carController.carService.cars;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        ...carData,
      });

      (mongoose as any).connect = jest.fn(() => Promise.resolve());
      const app = new App([carRoute]);
      return request(app.getServer()).post(`${carRoute.path}`).send(carData).expect(201);
    });
  });
});
