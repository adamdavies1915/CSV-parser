import { CSVMapping } from '@/interfaces/csvSchema.interface';
import { model, Schema, Document } from 'mongoose';

const csvMapping: Schema = new Schema({
  MappingName: {
    type: String,
    required: true,
    unique: true,
  },
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
    type: String,
  },
  year: {
    type: String,
  },
  price: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  createDate: {
    type: String,
  },
  updateDate: {
    type: String,
  },
});

const csvMappingModal = model<CSVMapping & Document>('CSVMapping', csvMapping);

export default csvMappingModal;
