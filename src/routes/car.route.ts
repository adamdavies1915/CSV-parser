import CarController from '@/controllers/car.controller';
import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';

class CarRoute implements Routes {
  public path = '/cars';
  public router = Router();
  public carController = new CarController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.carController.createCar);
  }
}

export default CarRoute;
