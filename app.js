require('dotenv').config();
const Express = require ('express');
const app = Express();
const dbConnection = require('./db');

const controllers = require('./Controllers');
app.use(require('./Middleware/headers'));
app.use(Express.json());
app.use('/user', controllers.userController);

app.use ('/journal', controllers.journalController);
app.use('/feeling', controllers.feelingController);


dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on 3000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. ${err}`);
    });

