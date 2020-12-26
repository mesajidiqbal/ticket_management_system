//importing modules
import admin from '../auth/admin'
import Ticket from '../models/appModels';

// open ticket field values
const openTicket = {
    ticketStatus: 'open',
    passengerName: null,
    age: null,
    phone: null,
    email: null
};

// function to initialize database (open tickets) for a particular date
const initializeDbForDate = async (dt) => {
    // check if database is initialized
    Ticket.find({travelDate: dt}, (err, ticket) => {
        if (err) {
            console.log(err);
        } else if (ticket.length === 0) {
            for (var i = 0; i < 40; i++) {
                let dateSeat = {travelDate: dt, seatNo: i + 1};
                let option = {
                    new: true,
                    runValidators: true,
                    context: 'query',
                    upsert: true,
                    setDefaultsOnInsert: true
                };
                let ticketDetails = {...dateSeat, ...openTicket};
                Ticket.findOneAndUpdate(dateSeat, ticketDetails, option, (err, ticket) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            ;
        }
    });
};

// Update the ticket status (open/close) and user details for a date and seat
export const updateTicketStatusForDateWithSeatNo = async (req, res) => {
    await initializeDbForDate(req.body.travelDate);

    let dateSeat = {travelDate: req.body.travelDate, seatNo: req.body.seatNo};
    let option = {new: true, runValidators: true, context: 'query', upsert: true, setDefaultsOnInsert: true};
    let ticketDetails;
    req.body.ticketStatus === 'close' ? ticketDetails = req.body : ticketDetails = {...req.body, ...openTicket}

    await Ticket.findOneAndUpdate(dateSeat, ticketDetails, option, (err, ticket) => {
        if (err) {
            res.send(err);
        }
        res.json(ticket);
    });
};

// View Ticket Status for a date and seat
export const getTicketStatusForDateWithSeatNo = async (req, res) => {
    await initializeDbForDate(req.params.travelDate);

    let dateSeat = {travelDate: req.params.travelDate, seatNo: req.params.seatNo};
    await Ticket.findOne(dateSeat, (err, ticket) => {
        if (err) {
            res.send(err);
        }
        res.json(ticket);
    });
};

// View all open/closed tickets
export const getAllTicketStatusForDateWithStatus = async (req, res) => {
    await initializeDbForDate(req.params.travelDate);

    let dateStatus = {travelDate: req.params.travelDate, ticketStatus: req.params.ticketStatus};
    await Ticket.find(dateStatus, (err, ticket) => {
        if (err) {
            res.send(err);
        }
        res.json(ticket);
    });
};

// reset the server for a date (only admin can do it)
export const resetAllTicketStatusForDate = (req, res) => {
    if (req.body.user === null || req.body.password === null) {
        res.json({message: `Please enter a valid admin username and password `});
    } else if (req.body.user === admin.user && req.body.password === admin.password) {
        if (req.body.travelDate) {
            for (var i = 0; i < 40; i++) {
                let dateSeat = {travelDate: req.body.travelDate, seatNo: i + 1};
                let option = {
                    new: true,
                    runValidators: true,
                    context: 'query',
                    upsert: true,
                    setDefaultsOnInsert: true
                };
                let ticketDetails = {...dateSeat, ...openTicket};
                Ticket.findOneAndUpdate(dateSeat, ticketDetails, option, (err, ticket) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            res.json({message: `successfuly reset all the tickets for ${req.body.travelDate} !!!`});
        } else {
            res.json({message: `Please provide a date to reset the tickets !!!`});
        }
    } else {
        res.json({message: `Only Admin can reset the tickets. Please enter valid credentials. `});
    }
};
