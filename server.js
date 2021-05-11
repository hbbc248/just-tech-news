// to make style sheet available to the client
const path = require('path');

const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

// set up handlebars as app template engine of choice
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// to add style sheet and serve as asset
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);


// turn on connection to db and server //tables will drop if force:true
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});