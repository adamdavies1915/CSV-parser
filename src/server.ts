import App from './app';
import validateEnv from 'utils/validateEnv';
import CarRoute from './routes/car.route';

validateEnv();

const app = new App([new CarRoute()]);

app.listen();
