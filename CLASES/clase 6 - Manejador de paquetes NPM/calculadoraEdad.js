const moment = require('moment')

console.log(moment());

const currentDate = moment()
// const dateOfBirth = moment('1999-02-09').format()
const dateOfBirth = moment([1999, 1, 9]).format("MMM Do YY")
const fechaNacimiento = moment([1999, 1, 9])

const validacion = moment(dateOfBirth, "MMM Do YY").isValid()

const verificacion = (validacion) => {
  if (validacion) {
    return 'Verifica'
  } else return 'no verifica'
}

const validacion2 = moment(dateOfBirth, "YYYY-MM-DD").isValid()

const cantiadaDeDias = currentDate.diff(fechaNacimiento)

console.log(cantiadaDeDias);



console.log(currentDate);
console.log(dateOfBirth);
console.log(validacion);
console.log(validacion2);
console.log(verificacion(validacion));

