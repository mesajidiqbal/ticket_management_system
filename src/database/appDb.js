//importing modules
import mongoose from 'mongoose';

// Connecting mongoose with mongoDB
// const dbUrl = 'mongodb://localhost/ticketsDb';
const dbUrl = 'mongodb+srv://appUser:apppassword@mongodbtest-vbtpo.mongodb.net/ticketsDb?retryWrites=true&w=majority';

const connectDb = () => {

    let connOptions = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }

    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl, connOptions);

    const db = mongoose.connection;

    db.on('connected', () => {
        console.log(`Database connection established...`);
    });

    db.on('error', function (err) {
        console.log(`Database connection error: ${err}`);
    });

    db.on('disconnected', () => {
        console.log(`Database disconnected`);
    });
}

export default connectDb;
