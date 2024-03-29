import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'


const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password)
}

const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)

export { _dirname, createHash, isValidPassword }

