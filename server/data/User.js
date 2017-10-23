const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const schemaTypes = mongoose.SchemaTypes

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let userSchema = new mongoose.Schema({
  username: { type: schemaTypes.String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  firstName: { type: schemaTypes.String, required: REQUIRED_VALIDATION_MESSAGE },
  lastName: { type: schemaTypes.String, required: REQUIRED_VALIDATION_MESSAGE },
  salt: {type: schemaTypes.String},
  hashedPass: {type: schemaTypes.String},
  roles: [{type: schemaTypes.String}]
})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, '123456')

    User.create({
      username: 'Admin',
      firstName: 'Admin',
      lastName: 'Admin',
      salt: salt,
      hashedPass: hashedPass,
      roles: ['Admin']
    })
  })
}
