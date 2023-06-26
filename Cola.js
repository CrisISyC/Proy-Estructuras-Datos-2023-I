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

class Cola {
    constructor() {
      this.colaArr = [];
      this.frente = 0;
      this.numElems = 0;
    }
  
    insertar(elemento) {
      this.colaArr.push(elemento);
      this.numElems++;
    }
  
    quitar() {
      const temp = this.colaArr[this.frente];
      this.frente++;
      this.numElems--;
      return temp;
    }
  
    frenteCola() {
      return this.colaArr[this.frente];
    }
  
    colaVacia() {
      return this.numElems === 0;
    }
  
    tamanoCola() {
      return this.numElems;
    }
  }
  

// Aquí se puede variar el archivo json que se carga
const contenidoJson = require('./1000.json');

var Animales = [];
for (let i = 0; i<contenidoJson.length;i++) {
  const pet = new Animal(contenidoJson[i].id,contenidoJson[i].name,contenidoJson[i].raza,contenidoJson[i].age,contenidoJson[i].gender,contenidoJson[i].tipo,contenidoJson[i].ciudad);
  Animales.push(pet);
}

const animalCola = new Cola();


for (let i = 0;i<Animales.length-1; i++) {
  animalCola.insertar(Animales[i])
}

const start = performance.now();
animalCola.insertar(Animales[Animales.length-1]);
const end = performance.now();
const executionTime = end - start;
console.log(`Tiempo de inserción: ${executionTime} milisegundos`);

const startdel = performance.now();
animalCola.quitar();
const enddel = performance.now();
const executionTimedel = enddel - startdel;
console.log(`Tiempo de eliminación: ${executionTimedel} milisegundos`);

/*

1000 elementos:
Tiempo de inserción: 0.02460002899169922 milisegundos
Tiempo de eliminación: 0.08810007572174072 milisegundos


10000 elementos:
Tiempo de inserción: 0.02799999713897705 milisegundos
Tiempo de eliminación: 0.17059993743896484 milisegundos

100000 elementos:
Tiempo de inserción: 0.02030003070831299 milisegundos
Tiempo de eliminación: 0.10280001163482666 milisegundos

200000 elementos:
Tiempo de inserción: 0.03490006923675537 milisegundos
Tiempo de eliminación: 0.08819997310638428 milisegundos

300000 elementos:
Tiempo de inserción: 0.03600001335144043 milisegundos
Tiempo de eliminación: 0.07150006294250488 milisegundos

400000 elementos:
Tiempo de inserción: 0.03789997100830078 milisegundos
Tiempo de eliminación: 0.10609996318817139 milisegundos

500000 elementos:
Tiempo de inserción: 0.03380000591278076 milisegundos
Tiempo de eliminación: 0.11979997158050537 milisegundos



*/