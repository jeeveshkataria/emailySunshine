const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys  = require('./config/keys')
require('./models/User');
require('./models/Survey');
require('./services/passport');




// mongoose.connect(keys.mongoURI , { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(keys.mongoURI);

const app = express();


app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge : 30 * 24 * 60 * 60 * 1000,
        keys : [keys.cookiekey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//only suppose to run inside production

if( process.env.NODE_ENV === 'production') {
    // express will serve us prod. assets
    //  like main.js or main.css file
    app.use(express.static('client/build'));
    // if any req comes and it wont get , then checks in 
    // client/build


    // express will serves us index.html file
    // if it does not recognise route
    const path = require('path');
    app.get('*',(req , res ) => {
       res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });

}


const PORT = process.env.PORT || 5000;
app.listen(PORT);