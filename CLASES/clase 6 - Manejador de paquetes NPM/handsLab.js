const fs = require('fs')
const crypto = require('crypto')

const fileName = 'users.json'
class UserManager {

  getUsers = async () => {
    if (fs.existsSync(fileName)) {
      const data = await fs.promises.readFile(fileName, 'utf-8')
      const users = JSON.parse(data)

      return users
    }
    return []
  }

  createUser = async (user) => {
    const users = await this.getUsers()
    // aca vamos a enciptar
    user.salt = crypto.randomBytes(128).toString('base64')
    user.password = crypto.createHmac('sha256', user.salt).update(user.password).digest('hex')

    users.push(user)
    await fs.promises.writeFile(fileName, JSON.stringify(user))
  }
}