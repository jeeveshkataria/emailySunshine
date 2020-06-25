const passport= require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
//one argument means : we are fetching from it
//two arguments : we are loading from it

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
      },
      (accessToken , refreshToken , profile , done ) => {
        User.findOne({ googleID : profile.id  })
          .then((existingUser) => {
            if(existingUser)
            {
              //we have record with profile id
            } 
            else
            {
              // we dont have a user with profile id
              new User({ googleID : profile.id }).save();
            }

          }

          )
        //anytime we reach our database we are initiating async 
        // connection
        
        
        
        
      }
    )
  );
  