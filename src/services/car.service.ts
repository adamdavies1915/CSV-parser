import { CreateCarDto } from '@/dtos/car.dto';
import { Car } from '@/interfaces/cars.interface';
import carModal from '@/models/car.model';
import { HttpException } from '../exceptions/HttpException';
import { isEmpty } from '../utils/util';

class CarService {
  public cars = carModal;

  public async createCar(carData: CreateCarDto): Promise<Car> {
    if (isEmpty(carData)) throw new HttpException(400, 'carData is empty');

    const findUser: Car = await this.cars.findOne({ vin: carData.VIN });
    if (findUser) throw new HttpException(409, `A Car with the VIN: ${carData.VIN} already exists`);

    const createCarData: Car = await this.cars.create({ ...carData });

    return createCarData;
  }
}

export default CarService;
