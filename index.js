//importing modules
import app from './app';
import connectDb from './src/database/appDb';

// localhost port
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
});

// establishing database connection
connectDb();
