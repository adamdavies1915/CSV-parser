import { CSVMapping } from '@/interfaces/csvSchema.interface';
import csvMappingModal from '@/models/csvMapping.modal';
import { HttpException } from '../exceptions/HttpException';

class CSVMappingService {
  public mappings = csvMappingModal;

  public async getSchema(SchemaName: string): Promise<CSVMapping> {
    const schemaToUse = await this.mappings.findOne({ SchemaName });
    if (!schemaToUse) throw new HttpException(409, `Schema with the name: ${SchemaName} does not exist`);

    return schemaToUse;
  }
}

export default CSVMappingService;
