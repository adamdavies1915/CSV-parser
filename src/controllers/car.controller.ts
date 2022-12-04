import { CreateCarDto } from '../dtos/car.dto';
import CarService from '../services/car.service';
import { NextFunction, Request, Response } from 'express';
import { Car } from '../interfaces/cars.interface';

class CarController {
  public carService = new CarService();

  // public createCarFromCSV = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const carCSV = req.body;
  //     // parse CSV
  //   }
  // ;

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
