
// creacion de animal
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
// tabla hash 
class HashTabla {
    constructor(capacidad) {
        this.capacidad = capacidad;
        this.tabla = new Array(capacidad);
        this.tamano = 0;
        this.factorCarga = 0.0;
    }

    funcionHash(id) {
        return id % this.capacidad;
    }

    funcionRehash(intento, id) {
        return (intento + this.funcionHash(id)) % this.capacidad;
    }

    rehash() {
        let nuevaCapacidad = this.capacidad * 2;
        let nuevaTabla = new Array(nuevaCapacidad);

        // Reinsertar todos los elementos en la nueva tabla
        for (let animal of this.tabla) {
            if (animal != null) {
                let indice = this.funcionHash(animal.getId());

                while (nuevaTabla[indice] != null) {
                    indice = this.funcionRehash(indice, animal.getId());
                }

                nuevaTabla[indice] = animal;
            }
        }

        this.tabla = nuevaTabla;
        this.capacidad = nuevaCapacidad;
        this.factorCarga = this.tamano / this.capacidad;
    }
    // busqueda por tipo, raza, genero,edad y ciudad 
    buscar1(tipo, raza, genero, edad, ciudad) {
        let resultados = [];
        for (let animal of this.tabla) {
            if (animal != null && animal.getTipo() === tipo && animal.getRaza() === raza && animal.getGenero() === genero && animal.getEdad() === edad && animal.getCiudad() === ciudad) {
                resultados.push(animal);
            }
        }
        return resultados;
    }
    // misma busqueda pero por rangos de edad busqueda por tipo, raza, genero,edad y ciudad 
    buscar2(tipo, raza, genero,ini, end, ciudad) {
        let resultados = [];
        for (let animal of this.tabla) {
            if (animal != null && animal.getTipo() === tipo && animal.getRaza() === raza && animal.getGenero() === genero && animal.getEdad()>=ini && animal.getEdad()<=end && animal.getCiudad() === ciudad) {
                resultados.push(animal);
            }
        }
        return resultados;
    }

    // busqueda por tipo, raza, genero, edad
    buscar3(tipo, raza, genero, edad) {
        let resultados = [];
        for (let animal of this.tabla) {
            if (animal != null && animal.getTipo() === tipo && animal.getRaza() === raza && animal.getGenero() === genero && animal.getEdad() === edad) {
                resultados.push(animal);
            }
        }
        return resultados;
    }
    // busqueda por tipo, raza, genero, rango edad
 buscar4(tipo, raza, genero, ini,end) {
        let resultados = [];
        for (let animal of this.tabla) {
            if (animal != null && animal.getTipo() === tipo && animal.getRaza() === raza && animal.getGenero() === genero && animal.getEdad()>=ini && animal.getEdad()<=end) {
                resultados.push(animal);
            }
        }
        return resultados;
    }

    buscar5(tipo, raza, genero) {
        let resultados = [];
        for (let animal of this.tabla) {
            if (animal != null && animal.getTipo() === tipo && animal.getRaza() === raza && animal.getGenero() === genero) {
                resultados.push(animal);
            }
        }
        return resultados;
    }

    buscar6(tipo, genero) {
        let resultados = [];
        for (let animal of this.tabla) {
            if (animal != null && animal.getTipo() === tipo && animal.getGenero() === genero) {
                resultados.push(animal);
            }
        }
        return resultados;
    }

    buscar7(tipo) {
        let resultados = [];
        for (let animal of this.tabla) {
            if (animal != null && animal.getTipo() === tipo) {
                resultados.push(animal);
            }
        }
        return resultados;
    }

    buscar8(inicio, fin) {
        let resultados = [];
        for (let animal of this.tabla) {
            if (animal != null && animal.getEdad() >= inicio && animal.getEdad() <= fin) {
                resultados.push(animal);
            }
        }
        return resultados;
    }

    insertar(animal) {
        if (this.factorCarga >= 0.5) {
            this.rehash();
        }

        let id = animal.getId();
        let indice = this.funcionHash(id);
        let intento = 0;

        while (this.tabla[indice] != null) {
            indice = this.funcionRehash(intento, id);
            intento++;
        }

        this.tabla[indice] = animal;
        this.tamano++;
        this.factorCarga = this.tamano / this.capacidad;
    }

    buscar(id) {
        let indice = this.funcionHash(id);
        let intento = 0;

        while (this.tabla[indice] != null) {
            if (this.tabla[indice].getId() === id) {
                return this.tabla[indice];
            }
            intento++;
            indice = this.funcionRehash(intento, id);
        }

        return null;
    }

    mostrarTabla() {
        console.log("Tabla Hash:");
        for (let i = 0; i < this.capacidad; i++) {
            if (this.tabla[i] != null) {
                console.log(`Índice ${i}: ${this.tabla[i]}`);
            }
        }
    }
}

let hashTabla = new HashTabla(9999999);
let x = new Animal(1005664, "luna", "labrador", 4, "female", "perro", "bogota");
let y = new Animal(1455664, "toby", "sin raza", 5, "male", "perro", "cali");
let z = new Animal(6678664, "marco", "siames", 1, "male", "gato", "bogota");
let g = new Animal(7805664, "laila", "labrador", 2, "female", "perro", "Cartagena");
let h = new Animal(9000664, "batman", "labrador", 7, "male", "perro", "bogota");
let entrada = [x, y, z, g, h];

// Insertar animales
for (let i = 0; i < entrada.length; i++) {
    hashTabla.insertar(entrada[i]);
}

// Buscar animales
let animalEncontrado1 = hashTabla.buscar(1455664);
console.log("Animal encontrado 1:", animalEncontrado1);

let n = hashTabla.buscar6("perro", "female");
for (let i = 0; i < n.length; i++) {
    console.log(n[i]);
}

let r = hashTabla.buscar8(3, 6);
for (let i = 0; i < r.length; i++) {
    console.log(r[i]);
}

hashTabla.mostrarTabla();