class Animal {
    constructor(id, nombre, raza, edad, genero, tipo, ciudad) {
      this.id = id;
      this.nombre = nombre;
      this.raza = raza;
      this.edad = edad;
      this.genero = genero;
      this.tipo = tipo;
      this.ciudad = ciudad;
    }
  
    getId() {
      return this.id;
    }
  
    getNombre() {
      return this.nombre;
    }
  
    getRaza() {
      return this.raza;
    }
  
    getEdad() {
      return this.edad;
    }
  
    getGenero() {
      return this.genero;
    }
  
    getTipo() {
      return this.tipo;
    }
  
    getCiudad() {
        return this.ciudad;
      }
    
    toString() {
        return `[id=${this.id}, nombre=${this.nombre}, raza=${this.raza}, edad=${this.edad}, genero=${this.genero}, tipo=${this.tipo}, ciudad=${this.ciudad}]`;
      }
  }

class Stack {
    constructor() {
      this.items = [];
      this.size = 0;
    }
  
    push(element) {
      this.items[this.size] = element;
      this.size++;
    }
  
    pop() {
      if (this.isEmpty()) {
        return "La pila está vacía";
      }
      this.size--;
      const poppedElement = this.items[this.size];
      delete this.items[this.size];
      return poppedElement;
    }
  
    peek() {
      if (this.isEmpty()) {
        return "La pila está vacía";
      }
      return this.items[this.size - 1];
    }
  
    isEmpty() {
      return this.size === 0;
    }
  
    clear() {
      this.items = [];
      this.size = 0;
    }
  
    print() {
      if (this.isEmpty()) {
        console.log("La pila está vacía");
      } else {
        console.log("Elementos de la pila:");
        for (let i = 0; i < this.size; i++) {
          console.log(this.items[i]);
        }
      }
    }
}

// Aquí se puede variar el archivo json que se carga
const contenidoJson = require('./500000.json');

var Animales = [];
for (let i = 0; i<contenidoJson.length;i++) {
  const pet = new Animal(contenidoJson[i].id,contenidoJson[i].name,contenidoJson[i].raza,contenidoJson[i].age,contenidoJson[i].gender,contenidoJson[i].tipo,contenidoJson[i].ciudad);
  Animales.push(pet);
}

const animalStack = new Stack();


for (let i = 0;i<Animales.length-1; i++) {
  animalStack.push(Animales[i])
}

const start = performance.now();
animalStack.push(Animales[Animales.length-1]);
const end = performance.now();
const executionTime = end - start;
console.log(`Tiempo de inserción: ${executionTime} milisegundos`);

const startdel = performance.now();
animalStack.pop();
const enddel = performance.now();
const executionTimedel = enddel - startdel;
console.log(`Tiempo de eliminación: ${executionTimedel} milisegundos`);

/*

1000 elementos:
Tiempo de inserción: 0.0140000581741333 milisegundos
Tiempo de eliminación: 0.14230000972747803 milisegundos


10000 elementos:
Tiempo de inserción: 0.017300009727478027 milisegundos
Tiempo de eliminación: 0.10190010070800781 milisegundos

100000 elementos:
Tiempo de inserción: 0.02929997444152832 milisegundos
Tiempo de eliminación: 0.07439994812011719 milisegundos

200000 elementos:
Tiempo de inserción: 0.038900017738342285 milisegundos
Tiempo de eliminación: 0.1260000467300415 milisegundos

300000 elementos:
Tiempo de inserción: 0.019699931144714355 milisegundos
Tiempo de eliminación: 0.12849998474121094 milisegundos

400000 elementos:
Tiempo de inserción: 0.020200014114379883 milisegundos
Tiempo de eliminación: 0.069100022315979 milisegundos

500000 elementos:
Tiempo de inserción: 0.028400063514709473 milisegundos
Tiempo de eliminación: 0.09119999408721924 milisegundos



*/