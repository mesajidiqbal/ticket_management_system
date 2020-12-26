//importing modules
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    travelDate: {
        type: Date,
        required: [true, 'Please enter the date of travelling in YYYY-MM-DD format: '],
        default: Date.now
    },
    seatNo: {
        type: Number,
        min: 1,
        max: 40,
        required: [true, 'Please enter the seat number: ']
    },
    ticketStatus: {
        type: String,
        enum: ['open', 'close'],
        required: [true, 'Enter close to book the ticket: ']
    },
    passengerName: {
        type: String,
        required: [function () {
            return this.ticketStatus === 'close';
        }, 'Please enter the name of pssenger for booking: '],
        trim: true
    },
    age: {
        type: Number,
        required: [function () {
            return this.ticketStatus === 'close';
        }, 'Please enter age: ']
    },
    phone: {
        type: Number
    },
    email: {
        type: String,
        trim: true
    }
});

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;
