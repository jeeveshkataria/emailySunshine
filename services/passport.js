const passport= require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
//one argument means : we are fetching from it
//two arguments : we are loading from it


passport.serializeUser( ( user , done ) => {
  done( null , user.id );
  // user.id recognise user by id assigned by mongo
  //reason why we are not using profile id? bz profile id is 
  // unique to google id, but user id allocated to google,fb logon
});


passport.deserializeUser( ( id , done ) => {
// return the mongo id
  User.findById(id)
    .then(user => {
      done(null,user);
    });
});






passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy : true
      },
      (accessToken , refreshToken , profile , done ) => {
        User.findOne({ googleID : profile.id  }).then( existingUser => {
            if(existingUser)
            {

              //we have record with profile id
              done( null , existingUser );
              //tells passport about user
            } 
            else
            {
              // we dont have a user with profile id
              new User({ googleID : profile.id })
              .save()
              .then( user => done( null , user));


            }

          }

          )
        //anytime we reach our database we are initiating async 
        // connection
        
        
        
        
      }
    )
  );
  