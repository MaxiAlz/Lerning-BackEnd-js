const suma = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num1 == 0 || num2 == 0) reject('operacion innecesaria')
    if (num1 < 0 || num2 < 0) reject('solo ingresar numeros positivos')
    else resolve(num1 + num2)
  })
}

const resta = (num1, num2) => {
  return new Promise((resolve, reject) => {

    if (num1 == 0 || num2 == 0) return reject('operacion innecesaria')
    const result = num1 - num2
    if (result < 0) return reject('solo devuelve numeros positivos')

    return resolve(result)
  })
}
const multiplicar = (num1, num2) => {
  if (num1 < 0 || num2 < 0) return reject('la calculadora solo supera numeros positivos')
  else resolve(num1 + num2)
}

const dividir=(dividendo,divisor)=>{
  return new Promise((resolve, reject) => {
    if (divisor==0) reject('division entre 0')
    resolve(dividendo/divisor)
  })
}

const funcAsync=async ()=>{
  try {
    console.log(await suma(10,5));
    console.log(await resta(10,5));
    console.log(await multiplicar(10,5));
    console.log(await dividir(10,5));
  } catch (error) {
    console.log(error)
  }
}

funcAsync()