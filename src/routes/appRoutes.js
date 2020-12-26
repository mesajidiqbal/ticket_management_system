//importing modules
import {
    getAllTicketStatusForDateWithStatus,
    getTicketStatusForDateWithSeatNo,
    resetAllTicketStatusForDate,
    updateTicketStatusForDateWithSeatNo
} from '../controllers/appControllers';

const routes = (app) => {
// Home Page
    app.route('/')
        .get((req, res) => res.send(`Welcome to the Ticket Management Portal...`));

// Update the ticket status and user details
    app.route('/updateTicketStatus')
        .post(updateTicketStatusForDateWithSeatNo)

// View Ticket Status for a date and seat
    app.route('/viewTicketStatus/:travelDate/:seatNo')
        .get(getTicketStatusForDateWithSeatNo)

// View all open/closed tickets
    app.route('/viewTickets/:travelDate/:ticketStatus')
        .get(getAllTicketStatusForDateWithStatus)

// reset the server for a date
    app.route('/adminReset')
        .post(resetAllTicketStatusForDate)
}

export default routes;
