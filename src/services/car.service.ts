import { CreateCarDto } from '@/dtos/car.dto';
import { Car } from '@/interfaces/cars.interface';
import { CSVMapping } from '@/interfaces/csvSchema.interface';
import carModal from '@/models/car.model';
import { HttpException } from '../exceptions/HttpException';
import { isEmpty } from '../utils/util';

class CarService {
  public cars = carModal;

  public async mapCSVDataToCarData(data: any, schemaToUse: CSVMapping): Promise<CreateCarDto> {
    // Create a new car object from the data in the CSV file using the schemaToUse
    const carData: CreateCarDto = {
      UUID: data[schemaToUse.UUID],
      VIN: data[schemaToUse.VIN],
      make: data[schemaToUse.make],
      model: data[schemaToUse.model],
      mileage: data[schemaToUse.mileage],
      year: data[schemaToUse.year],
      price: data[schemaToUse.price],
      zipCode: data[schemaToUse.zipCode],
      createDate: data[schemaToUse.createDate],
      updateDate: data[schemaToUse.updateDate],
    };
    return carData;
  }

  public async createCar(carData: CreateCarDto): Promise<Car> {
    if (isEmpty(carData)) throw new HttpException(400, 'carData is empty');

    const findCar: Car = await this.cars.findOne({ vin: carData.VIN });
    if (findCar) throw new HttpException(409, `A Car with the VIN: ${carData.VIN} already exists`);

    const createCarData: Car = await this.cars.create({ ...carData });

    return createCarData;
  }
}

export default CarService;
