//importing modules
import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/routes/appRoutes';

const app = express();

// setting up bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routing the app
routes(app);

// exporting the app
export default app;
