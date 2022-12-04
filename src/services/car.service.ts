import { CreateCarDto } from '@/dtos/car.dto';
import { Car } from '@/interfaces/cars.interface';
import { CSVMapping } from '@/interfaces/csvMapping.interface';
import carModal from '@/models/car.model';
import { contentSecurityPolicy } from 'helmet';
import { HttpException } from '../exceptions/HttpException';
import { isEmpty } from '../utils/util';

class CarService {
  public cars = carModal;

  public async mapCSVDataToCarData(data: any, csvMapping: CSVMapping): Promise<CreateCarDto> {
    // Create a new car object from the data in the CSV file using the csvMapping
    const carData: CreateCarDto = {
      UUID: data[csvMapping.UUID],
      VIN: data[csvMapping.VIN],
      make: data[csvMapping.make],
      model: data[csvMapping.model],
      mileage: data[csvMapping.mileage],
      year: data[csvMapping.year],
      price: data[csvMapping.price],
      zipCode: data[csvMapping.zipCode],
      createDate: data[csvMapping.createDate],
      updateDate: data[csvMapping.updateDate],
    };
    console.log(csvMapping);
    return carData;
  }

  public async createCar(carData: CreateCarDto): Promise<Car> {
    if (isEmpty(carData)) throw new HttpException(400, 'carData is empty');

    const findCar: Car = await this.cars.findOne({ vin: carData.VIN });
    if (findCar) throw new HttpException(409, `A Car with the VIN: ${carData.VIN} already exists`);

    const createCarData: Car = await this.cars.create(carData);

    return createCarData;
  }
}

export default CarService;
