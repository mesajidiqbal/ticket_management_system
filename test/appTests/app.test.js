//importing modules
import request from 'supertest';
import app from '../../app';
import connectDb from '../../src/database/appDb';
import admin from '../../src/auth/admin'


// establishing database connection
connectDb();

// open ticket field values
const openTicketSample = {
    ticketStatus: 'open',
    passengerName: null,
    age: null,
    phone: null,
    email: null
};

// closed ticket field values
const closeTicketSample = {
    seatNo: 1,
    travelDate: "2020-05-01",
    age: 40,
    email: "sample@test.com",
    passengerName: "samplePerson",
    phone: 9999999999,
    ticketStatus: "close"
}

describe('API Endpoints Test', () => {
    // Ping
    it('should return welcome messege', async (done) => {
        const res = await request(app)
            .get('/');
        expect(res.text).toEqual('Welcome to the Bus Ticket Booking Portal...');
        done();
    });
    // Open (Cancels) the Ticket for given Date and Seat No
    it('should return ticketStatus open', async (done) => {
        const res = await request(app)
            .post('/updateTicketStatus')
            .send(openTicketSample);
        expect(res.body).toEqual(
            expect.objectContaining({
                age: openTicketSample.age,
                email: openTicketSample.email,
                phone: openTicketSample.phone,
                ticketStatus: openTicketSample.ticketStatus,
                passengerName: openTicketSample.passengerName
            })
        );
        done();
    });
    // Close (Book) Ticket for a given Date and Seat No
    it('should return ticketStatus close', async (done) => {
        const res = await request(app)
            .post('/updateTicketStatus')
            .send(closeTicketSample);
        expect(res.body).toEqual(
            expect.objectContaining({
                age: closeTicketSample.age,
                email: closeTicketSample.email,
                phone: closeTicketSample.phone,
                ticketStatus: closeTicketSample.ticketStatus,
                passengerName: closeTicketSample.passengerName
            })
        );
        done();
    });
    // View all Open (Unbooked) Tickets for a given Date
    it('should return all open tickets', async (done) => {
        const res = await request(app)
            .get('/viewTickets/2020-05-01/open');
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    ticketStatus: "open"
                })
            ])
        );
        done();
    });
    // View all Closed (Booked) Tickets for the given Date
    it('should return all closed tickets', async (done) => {
        const res = await request(app)
            .get('/viewTickets/2020-05-01/close');
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    ticketStatus: "close"
                })
            ])
        );
        done();
    });
    // View Ticket Status for a given Date and Seat No
    it('should return ticket status of given date and seat', async (done) => {
        const res = await request(app)
            .get('/viewTicketStatus/2020-05-01/1');
        expect(res.body).toHaveProperty("ticketStatus");
        done();
    });
});

describe('Admin Reset Test', () => {
    // Password field blank
    it('should ask for valid credentials', async (done) => {
        const res = await request(app)
            .post('/adminReset')
            .send({user: admin.user, password: null, travelDate: closeTicketSample.travelDate})
        expect(res.body).toEqual({message: `Please enter a valid admin username and password `});
        done();
    });
    // User other than Admin
    it('should ask for Admin credentials', async (done) => {
        const res = await request(app)
            .post('/adminReset')
            .send({user: 'xyz', password: admin.password, travelDate: closeTicketSample.travelDate})
        expect(res.body).toEqual({message: `Only Admin can reset the tickets. Please enter valid credentials. `});
        done();
    });
    // Admin Sending request without Date
    it('should ask for date to reset tickets', async (done) => {
        const res = await request(app)
            .post('/adminReset')
            .send({user: admin.user, password: admin.password})
        expect(res.body).toEqual({message: `Please provide a date to reset the tickets !!!`});
        done();
    });
    // Admin Reset Successful
    it('should successfully reset the tickets', async (done) => {
        const res = await request(app)
            .post('/adminReset')
            .send({user: admin.user, password: admin.password, travelDate: closeTicketSample.travelDate})
        expect(res.body).toEqual({message: `successfuly reset all the tickets for ${closeTicketSample.travelDate} !!!`});
        done();
    });
});
