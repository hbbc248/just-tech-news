
// to make style sheet available to the client
const path = require('path');

const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
// session express session 
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};



const app = express();
const PORT = process.env.PORT || 3001;

// midleware
app.use(session(sess));

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