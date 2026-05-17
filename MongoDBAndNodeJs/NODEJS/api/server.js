require('dotenv').config();
const express = require('express');

const helpRequestsRouter = require('./routers/helpRequests.Router.js')
const volunteersRouter = require('./routers/volunteers.router.js')

const app = express();
const cors = require('cors');

const host = process.env.HOST;
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/helpRequests',helpRequestsRouter)
app.use('/api/volunteers',volunteersRouter);


app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode|| 500).send(err.message ||'An error occurred, please try later...');
})

app.listen(port, host, () => {
    console.log(`express server is running at http://${host}:${port}`);
})