
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
var config = require('./config');

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new GoogleStrategy({
            clientID: '515102285785-5c07vfdl2qie8e82fja5o2qf2a4v0gmu.apps.googleusercontent.com',
            clientSecret: 'EedI1Ue_Zp4xHEFre-2q7CKt',
            callbackURL: 'http://' + config.node_ip + ':3000/auth/google/callback'
        }, function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                user = profile;
                return done(null, user);
            })
        })
    );
};
