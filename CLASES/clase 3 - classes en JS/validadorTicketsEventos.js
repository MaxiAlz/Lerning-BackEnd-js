/* definir una clase que se llama ticket manager 

*/

class TicketManager {


    #precioBaseDeGanancia
    constructor(){
        this.eventos=[]
        this.#precioBaseDeGanancia = 0.15

    }
    getEventos=()=>{
        return this.eventos
    }

    getNextId = ()=>{
        const count = this.eventos.length
        const nextID = (count > 0) ? this.eventos[count-1].id +1 : 1
        return nextID
    }
    addEvents=(nombre,place,price,capacidad=50,fecha = new Date().toLocaleDateString(),participantes)=>{
        const evento = {
            id: this.getNextId(),
            nombre,
            place,
            price: price + this.#precioBaseDeGanancia,
            capacidad: capacidad ?? 50,
            fecha: fecha ?? new Date().toLocaleString(),
            participantes: []
            

        }
        this.eventos.push(evento)
        
    }

    ponerEventoEnGira(id,newLocalidate,NewDate){

    }
}

console.log(new Date().toLocaleDateString()); 