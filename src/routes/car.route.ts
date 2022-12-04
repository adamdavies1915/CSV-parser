import CarController from '@/controllers/car.controller';
import { Router } from 'express';
import multer from 'multer';
import { Routes } from '../interfaces/routes.interface';

class CarRoute implements Routes {
  public path = '/cars/:mappingToUse';
  public router = Router();
  public carController = new CarController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const upload = multer({ dest: 'uploads/' });
    this.router.post(`${this.path}`, upload.single('file'), this.carController.createCarFromCSV);
  }
}

export default CarRoute;
