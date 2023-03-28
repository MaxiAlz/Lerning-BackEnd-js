import passport from 'passport';
import local from 'passport-local'
import userModel from '../Models/user.model.js';
import GithubStrategy from 'passport-github2'
import { createHash, isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy

const initializePassport = () => {

  // estrategiad e login con github
  passport.use('github', new GithubStrategy(
    {
      clientID: 'Iv1.d81cad75552a780e',
      clientSecret: 'a0b3f393a66ec7dc946862e90daa436ca0231aaa',
      callbackURL: 'http://127.0.0.1:5173/githubCallback',
      scope: ['user:email']
    },
    async (accesToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        const user = await userModel.findOne({ email: profile._json.email })
        if (user) {
          console.log('El user ya existe')
          return done(null, user)
        }
        const newUser = {
          first_name: profile._json.name,
          last_name: "",
          email: profile._json.email,
          username,
          password: ''
        }
        const result = await userModel.create(newUser)
        return done(null, result)
      } catch (error) {
        return done('error al logearse con github', error)
      }
    }
  ))
  passport.use('register', new LocalStrategy(
    {
      passReqToCallback: true, usernameField: 'email'
    },
    async (req, username, password, done) => {
      const { first_name, last_name, email } = req.body
      try {
        console.log(email);
        const user = await userModel.findOne({ email })
        console.log(user);
        if (user) {
          console.log('user already exist');
          return done(null, false)
        }
        const newUser = {
          first_name,
          last_name,
          email,
          username,
          password: createHash(password)
        }
        const result = await userModel.create(newUser)
        return done(null, result)
      } catch (error) {
        return done('Error al obtener el usuario:', error)
      }
    }
  ))
  // estrategia del login local
  passport.use('login', new LocalStrategy(
    { usernameField: 'email' },
    async (/* username */email, password, done) => {
      console.log("datos=>", email, password);
      try {
        const user = await userModel.findOne({ email }).lean().exec()
        if (!user) {
          console.error('User do not exist');
          return done(null, false)
        }
        if (!isValidPassword(user, password)) {
          return done(null, false)
        }
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id)
    done(null, user)
  })
}

export default initializePassport