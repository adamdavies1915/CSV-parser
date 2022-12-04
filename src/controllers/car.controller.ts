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
      const cars: Car[] = [];

      const readStream = fs.createReadStream(req.file.path);

      // Use the csv-parser library to parse the data into JSON format
      const parser = csv();
      readStream.pipe(parser);

      const mappingToUse = req.params.mappingToUse;
      const schema = await this.csvMappingService.getMapping(mappingToUse);

      for await (const data of parser) {
        const carDto = await this.carService.mapCSVDataToCarData(data, schema);

        // Create a new car in the database - replace with mass insert
        const car = await this.carService.createCar(carDto);
        cars.push(car);
      }

      res.status(201).json({ message: 'CSV file successfully processed', data: cars });
    } catch (error) {
      next(error);
    }
  };
}

export default CarController;
