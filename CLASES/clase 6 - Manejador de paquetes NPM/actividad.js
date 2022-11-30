const numeros={};

for (let i = 0; i < 10; i++) {
    // numeroRamdon es cualquier numero entre 1 y 20
    let contador = parseInt(Math.random() * 20 + 1)
    console.log(contador);
    // numeros.contador es el nombre de una clase que por cada interaccion hay que sumarle 1
    numeros[contador] = Number(numeros[contador]) +1
    log
    console.log(numeros);
    // const i = numeros[i];
}
console.log(numeros)