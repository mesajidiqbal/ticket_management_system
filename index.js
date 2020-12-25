//importing modules
import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/routes/appRoutes';

// localhost port
const PORT = 3000;

const app = express();

// setting up bodyparser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// routing the app
routes(app);

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
});
