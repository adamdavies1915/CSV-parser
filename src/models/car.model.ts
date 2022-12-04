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
    required: true,
    unique: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    required: true,
  },
  updateDate: {
    type: Date,
    required: true,
  },
});

const carModal = model<Car & Document>('Car', carSchema);

export default carModal;
