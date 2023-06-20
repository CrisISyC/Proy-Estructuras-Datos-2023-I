console.log("Holi")

const usuarios = `
[
    {
    "usuarios": [
      {
        "id": 1,
        "nombre_completo": "María Fernanda Ramírez",
        "edad": 24,
        "email": "maria.ramirez@gmail.com",
        "nombre_usuario": "maria.ramirez"
      }
    ]
  }
]
  `;

  
  console.log(typeof usuarios);

  const jsonUsuarios = JSON.parse(usuarios);    

  console.log(typeof jsonUsuarios)

  const pruebas = jsonUsuarios.filter(
    (usuario) => usuario.usuarios
  );

  console.log(pruebas)



class NodoAVL {
  constructor(dato) {
      this.dato = dato;
      this.izquierdo = null;
      this.derecho = null;
    }
}

class AVL {
    constructor() {
        this.raiz = null;
    }

    insertar(dato) {
        this.raiz = this.insertarNodo(this.raiz, dato);
    }

    insertarNodo(raiz, dato) {
        if (raiz === null) {
            return new NodoAVL(dato);
        }

        if (dato < raiz.dato) {
            raiz.izquierdo = this.insertarNodo(raiz.izquierdo, dato);
        } else if (dato > raiz.dato) {
            raiz.derecho = this.insertarNodo(raiz.derecho, dato);
        } else {
            return raiz; // No se permiten elementos duplicados
        }

        raiz.altura = Math.max(this.obtenerAltura(raiz.izquierdo), this.obtenerAltura(raiz.derecho)) + 1;

        const factorBalance = this.obtenerFactorBalance(raiz);

        if (factorBalance > 1 && dato < raiz.izquierdo.dato) {
            return this.rotacionDerecha(raiz);
        }

        if (factorBalance < -1 && dato > raiz.derecho.dato) {
            return this.rotacionIzquierda(raiz);
        }

        if (factorBalance > 1 && dato > raiz.izquierdo.dato) {
            raiz.izquierdo = this.rotacionIzquierda(raiz.izquierdo);
            return this.rotacionDerecha(raiz);
        }

        if (factorBalance < -1 && dato < raiz.derecho.dato) {
            raiz.derecho = this.rotacionDerecha(raiz.derecho);
            return this.rotacionIzquierda(raiz);
        }

        return raiz;
    }

    obtenerAltura(nodo) {
        if (nodo === null) {
            return -1;
        }

        return nodo.altura;
    }

    obtenerFactorBalance(nodo) {
        return this.obtenerAltura(nodo.izquierdo) - this.obtenerAltura(nodo.derecho);
    }

    rotacionDerecha(z) {
        const y = z.izquierdo;
        const T3 = y.derecho;

        y.derecho = z;
        z.izquierdo = T3;

        z.altura = Math.max(this.obtenerAltura(z.izquierdo), this.obtenerAltura(z.derecho)) + 1;
        y.altura = Math.max(this.obtenerAltura(y.izquierdo), this.obtenerAltura(y.derecho)) + 1;

        return y;
    }

    rotacionIzquierda(z) {
        const y = z.derecho;
        const T2 = y.izquierdo;

        y.izquierdo = z;
        z.derecho = T2;

        z.altura = Math.max(this.obtenerAltura(z.izquierdo), this.obtenerAltura(z.derecho)) + 1;
        y.altura = Math.max(this.obtenerAltura(y.izquierdo), this.obtenerAltura(y.derecho)) + 1;

        return y;
    }

    imprimirEnOrden() {
        this.imprimirEnOrdenRecursivo(this.raiz);
    }

    imprimirEnOrdenRecursivo(raiz) {
        if (raiz !== null) {
            this.imprimirEnOrdenRecursivo(raiz.izquierdo);
            console.log(raiz.dato);
            this.imprimirEnOrdenRecursivo(raiz.derecho);
        }
    }
}
  