const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const path = require('path');
//connect to DB
const db = require('./config/db');
db.connect();
const app = express();
const port = 3000;

const route = require('./routes');
app.use(express.static(path.join(__dirname, 'public')));
//Bài 27 create
app.use(express.urlencoded({ extended: true }));
// HTTP loger
app.use(morgan('combined'));

app.use(methodOverride('_method'));
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use('*/css', express.static(path.join(__dirname, 'public/css')));
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
