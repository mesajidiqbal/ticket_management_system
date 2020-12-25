//importing modules

const routes = (app) => {
// Home Page
app.route('/')
.get((req, res) => res.send(`GET Request Successful...`))
.post((req, res) => res.send(`POST Request Successful...`))
.put((req, res) => res.send(`PUT Request Successful...`))
.delete((req, res) => res.send(`DELETE Request Successful...`))
}

export default routes;
