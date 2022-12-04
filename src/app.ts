import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from './config';
import { dbConnection } from './databases';
import { Routes } from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { logger, stream } from './utils/logger';
import CSVMappingService from './services/csvMapping.service';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
    logger.info(`Connecting to database...`);
    logger.info(`DB_URL: ${dbConnection.url}`);
    connect(dbConnection.url)
      .then(() => {
        logger.info(`=================================`);
        logger.info(`======= ENV: ${this.env} =======`);
        logger.info(`🚀 Connected to database`);
        logger.info(`=================================`);

        // Create CSV Mappings for testing
        const csvMappingService = new CSVMappingService();
        csvMappingService.addMapping({
          MappingName: 'default',
          UUID: 'UUID',
          VIN: 'VIN',
          make: 'make',
          model: 'model',
          mileage: 'mileage',
          year: 'year',
          price: 'price',
          zipCode: 'zipCode',
          createDate: 'createDate',
          updateDate: 'updateDate',
        });
        csvMappingService.addMapping({
          MappingName: 'acme',
          UUID: 'vehicle_id',
          VIN: 'vehicle_identification_number',
          make: 'manufacturer',
          model: 'car_model',
          mileage: 'odometer_reading',
          year: 'year_of_manufacture',
          price: 'asking_price',
          zipCode: 'zip_code',
          createDate: 'date_added',
          updateDate: 'date_updated',
        });
      })
      .catch(error => {
        logger.error(`=================================`);
        logger.error(`======= ENV: ${this.env} =======`);
        logger.error(`🚫 Error connecting to database: ${error}`);
        logger.error(`=================================`);
      });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
