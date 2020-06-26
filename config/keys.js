// see what credential to written
//either of development or production

if( process.env.NODE_ENV === 'production')
{
    // we are in production
    module.exports = require('./prod'); 
}
else
{
    //return dev keys
    module.exports = require('./dev');
}