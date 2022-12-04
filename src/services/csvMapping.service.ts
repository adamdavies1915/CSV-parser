import { CSVMapping } from '@/interfaces/csvMapping.interface';
import csvMappingModal from '@/models/csvMapping.modal';
import { HttpException } from '../exceptions/HttpException';

class CSVMappingService {
  public mappings = csvMappingModal;

  public async getMapping(MappingName: string): Promise<CSVMapping> {
    const schemaToUse = await this.mappings.findOne({ MappingName });
    if (!schemaToUse) throw new HttpException(409, `Schema with the name: ${MappingName} does not exist`);

    return schemaToUse;
  }

  public async addMapping(MappingData: CSVMapping): Promise<CSVMapping> {
    const findSchema: CSVMapping = await this.mappings.findOne({ MappingName: MappingData.MappingName });
    if (findSchema) return;
    const createMappingData: CSVMapping = await this.mappings.create({ ...MappingData });

    return createMappingData;
  }
}

export default CSVMappingService;
