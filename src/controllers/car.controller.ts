import { CreateCarDto } from '../dtos/car.dto';
import CarService from '../services/car.service';
import { NextFunction, Request, Response } from 'express';
import { Car } from '../interfaces/cars.interface';
import fs from 'fs';
import csv from 'csv-parser';
import CSVMappingService from '@/services/csvMapping.service';

class CarController {
  public carService = new CarService();
  public csvMappingService = new CSVMappingService();

  public createCarFromCSV = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cars: CreateCarDto[] = [];

      const readStream = fs.createReadStream(req.file.path);

      // Use the csv-parser library to parse the data into JSON format
      const parser = csv();
      readStream.pipe(parser);

      const schemaToUse = req.params.schemaToUse;
      const schema = await this.csvMappingService.getSchema(schemaToUse);

      for await (const data of parser) {
        const car = await this.carService.mapCSVDataToCarData(data, schema);

        console.log(`Creating car: ${JSON.stringify(car)}`);

        // Create a new car in the database - replace with mass insert
        this.carService.createCar(car);
        cars.push(car);
      }
      res.status(201).json({ data: 'CSV file successfully processed' });
    } catch (error) {
      next(error);
    }
  };

  public createCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carData: CreateCarDto = req.body;

      const createCarData: Car = await this.carService.createCar(carData);

      res.status(201).json({ data: createCarData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default CarController;
