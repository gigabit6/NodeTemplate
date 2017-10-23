
module.exports.validate = (userRequest) => {
  let errors = ''
  if (userRequest.username === '') {
    errors += ' Please Enter username. '
  }
  if (userRequest.firstName === '') {
    errors += ' Please Enter First Name. '
  }
  if (userRequest.lastName === '') {
    errors += ' Please Enter LastName. '
  }
  if (userRequest.password === '' || userRequest.passwordRepeat === '') {
    errors += ' Please Enter Password. '
  }

  if (userRequest.password !== userRequest.passwordRepeat) {
    errors += ' Passwords must match. '
  }
  return errors
}
