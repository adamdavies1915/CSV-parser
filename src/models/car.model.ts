import { Car } from '@/interfaces/cars.interface';
import { model, Schema, Document } from 'mongoose';

const carSchema: Schema = new Schema({
  UUID: {
    type: String,
    required: true,
    unique: true,
  },
  VIN: {
    type: String,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  mileage: {
    type: Number,
  },
  year: {
    type: Number,
  },
  price: {
    type: Number,
  },
  zipCode: {
    type: String,
  },
  createDate: {
    type: Date,
  },
  updateDate: {
    type: Date,
  },
});

const carModal = model<Car & Document>('Car', carSchema);

export default carModal;
