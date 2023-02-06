import express from "express";
import session from "express-session";
import FileStore from "session-file-store";

const app = express()
const PORT_ = 3001

app.use(session({
  secret: '123456',
  resave: true,
  saveUninitialized: true
}))

function auth(req, res, next) {
  if (req.session?.user)  return next()

}
app.get('/', (req, res) => { res.send('todo Ok') })

app.get('/loguin', (req, res) => {
  const { username } = req.query

  req.session.user = username

  res.send('loguin socces')
})

app.get('/logout', (req, res) => { req.session.destroy(err => res.send(err)) })

app.listen(PORT_, () => { console.log(`server running in port ${PORT_}...`); })
