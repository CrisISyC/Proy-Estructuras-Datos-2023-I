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

class MaxHeap {
    constructor() {
      this.array = [];
      this.size = 0;
    }
  
    insertItem(animal) {
      this.array[this.size] = animal;
      this.moveUp();
      this.size++;
    }
  
    moveUp() {
      let child = this.size;
      let parent = Math.floor((child - 1) / 2);
      let temp = this.array[child];
  
      while (child > 0 && temp.getEdad() > this.array[parent].getEdad()) {
        this.array[child] = this.array[parent];
        child = parent;
        parent = Math.floor((child - 1) / 2);
      }
  
      this.array[child] = temp;
    }
  
    removeMax() {
      const max = this.array[0];
      this.array[0] = this.array[--this.size];
      this.moveDown();
      return max;
    }
  
    moveDown() {
      let flag = false;
      let largest = -1;
      let parent = 0;
      let child = 2 * parent + 1;
      let temp = this.array[parent];
  
      while (child < this.size && !flag) {
        largest = this.array[child];
  
        if (child + 1 < this.size && this.array[child + 1].getEdad() > this.array[child].getEdad()) {
          largest = this.array[++child];
        }
  
        if (largest.getEdad() > temp.getEdad()) {
          this.array[parent] = largest;
          parent = child;
        } else {
          flag = true;
        }
  
        child = 2 * parent + 1;
      }
  
      this.array[parent] = temp;
    }
  
    getMax() {
      if (this.size > 0) {
        return this.array[0];
      }
      return null;
    }
  
    readArray() {
      for (let i = 0; i < this.size; i++) {
        console.log(this.array[i]);
      }
    }
  }


// Aquí se puede variar el archivo json que se carga
const contenidoJson = require('./1000.json');

var Animales = [];
for (let i = 0; i<contenidoJson.length;i++) {
  const pet = new Animal(contenidoJson[i].id,contenidoJson[i].name,contenidoJson[i].raza,contenidoJson[i].age,contenidoJson[i].gender,contenidoJson[i].tipo,contenidoJson[i].ciudad);
  Animales.push(pet);
}

const animalHeap = new MaxHeap();


for (let i = 0;i<Animales.length-1; i++) {
  animalHeap.insertItem(Animales[i])
}

const start = performance.now();
animalHeap.insertItem(Animales[Animales.length-1]);
const end = performance.now();
const executionTime = end - start;
console.log(`Tiempo de inserción: ${executionTime} milisegundos`);

const startdel = performance.now();
animalHeap.removeMax();
const enddel = performance.now();
const executionTimedel = enddel - startdel;
console.log(`Tiempo de eliminación: ${executionTimedel} milisegundos`);

/*

1000 elementos:
Tiempo de inserción: 0.015599966049194336 milisegundos
Tiempo de eliminación: 0.1751999855041504 milisegundos


10000 elementos:
Tiempo de inserción: 0.017799973487854004 milisegundos
Tiempo de eliminación: 0.15259993076324463 milisegundos

100000 elementos:
Tiempo de inserción: 0.019900083541870117 milisegundos
Tiempo de eliminación: 0.218500018119812 milisegundos

200000 elementos:
Tiempo de inserción: 0.021600008010864258 milisegundos
Tiempo de eliminación: 0.17690002918243408 milisegundos

300000 elementos:
Tiempo de inserción: 0.0261000394821167 milisegundos
Tiempo de eliminación: 0.29009997844696045 milisegundos

400000 elementos:
Tiempo de inserción: 0.026000022888183594 milisegundos
Tiempo de eliminación: 0.5361000299453735 milisegundos

500000 elementos:
Tiempo de inserción: 0.05149996280670166 milisegundos
Tiempo de eliminación: 0.6283999681472778 milisegundos



*/