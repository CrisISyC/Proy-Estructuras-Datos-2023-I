

class AVLNode {
   constructor(nom_usuario, nombre, email, contrasena) {
      this.nom_usuario = nom_usuario; // Con el usuario se crea el orden del AVL
      this.nombre = nombre;
      this.email = email;
      this.contrasena = contrasena;
      this.left = null; // Referencia al hijo izquierdo
      this.right = null; // Referencia al hijo derecho
      this.height = 1; // Altura del nodo
    }
}
  

class AVLTree {
    constructor() {
      this.root = null;
    }
  
    // Altura de un nodo
    getHeight(node) {
      if (node === null) {
        return 0;
      }
      return node.height;
    }
  
    // Saber si el AVL esta balanceado, si es negativo, el subarbol derecho tiene mayor altura, positivo izquierda, 0 balanceados
    getBalanceFactor(node) {
      if (node === null) {
        return 0;
      }
      return this.getHeight(node.left) - this.getHeight(node.right);
    }
  
    rotateRight(node) {
      const newRoot = node.left;
      const temp = newRoot.right;
  
      // Realizar la rotación
      newRoot.right = node;
      node.left = temp;
  
      // Actualizar las alturas
      node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
      newRoot.height = Math.max(this.getHeight(newRoot.left), this.getHeight(newRoot.right)) + 1;
  
      return newRoot; // Devolver la nueva raíz
    }
  
    rotateLeft(node) {
      const newRoot = node.right;
      const temp = newRoot.left;
  
      // Realizar la rotación
      newRoot.left = node;
      node.right = temp;
  
      // Actualizar las alturas
      node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
      newRoot.height = Math.max(this.getHeight(newRoot.left), this.getHeight(newRoot.right)) + 1;
  
      return newRoot; // Devolver la nueva raíz
    }
  
    
    insert(nom_usuario, nombre, email, contrasena) {
      this.root = this.insertNode(this.root, nom_usuario, nombre, email, contrasena);
    }

    insertNode(node, nom_usuario, nombre, email, contrasena) {
      if (node === null) {
        return new AVLNode(nom_usuario, nombre, email, contrasena);
      }

      //Buscar donde insertar el nodo
      if (nom_usuario < node.nom_usuario) {
        node.left = this.insertNode(node.left, nom_usuario, nombre, email, contrasena);
      } else if (nom_usuario > node.nom_usuario) {
        node.right = this.insertNode(node.right, nom_usuario, nombre, email, contrasena);
      } else {
        console.log("Este usuario ya existe");
        return node;
      }

      // Actualizar la altura del nodo actual
      node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

      // Saber si el arbol esta en equilibrio o no, para hacer las rotaciones respectivas
      const balanceFactor = this.getBalanceFactor(node);

      // Caso izquierda-izquierda
      if (balanceFactor > 1 && nom_usuario < node.left.nom_usuario) {
        return this.rotateRight(node);
      }
      // Caso derecha-derecha
      if (balanceFactor < -1 && nom_usuario > node.right.nom_usuario) {

        return this.rotateLeft(node);
      }
      // Caso izquierda-derecha      
      if (balanceFactor > 1 && nom_usuario > node.left.nom_usuario) {
        node.left = this.rotateLeft(node.left);
        return this.rotateRight(node);
      }
      // Caso derecha-izquierda
      if (balanceFactor < -1 && nom_usuario < node.right.nom_usuario) {
        node.right = this.rotateRight(node.right);
        return this.rotateLeft(node);
      }
      return node;
    }


    printInOrderTraversal() {
      this.inOrder(this.root);
    }
    inOrder(node) {
      if (node !== null) {
        this.inOrder(node.left);
        console.log("Usuario: " + node.nom_usuario + "\n" 
        + "Nombre: " + node.nombre + "\n" 
        + "Email: " + node.email );

        this.inOrder(node.right);
      }
    }
  

    updateUsuario(nom_usuario, newnombre, newemail, newcontrasena) {
      this.root = this.updateUsuarioHelper(this.root, nom_usuario, newnombre, newemail, newcontrasena);
    }
    updateUsuarioHelper(node, nom_usuario, newnombre, newemail, newcontrasena) {
      if (node === null) {
        return null;
      }

      if (nom_usuario < node.nom_usuario) {
        node.left = this.updateUsuarioHelper(node.left,nom_usuario, newnombre, newemail, newcontrasena);
      } else if (nom_usuario > node.nom_usuario) {
        node.right = this.updateUsuarioHelper(node.right,nom_usuario, newnombre, newemail, newcontrasena);
      } else {
        // Se encontró el nodo a actualizar
        node.nombre = newnombre;
        node.email = newemail;
        node.contrasena = newcontrasena;
      }
      return node;
    }  


    // Buscar un unico usuario e imprimir sus valores
    searchUsuario(nom_usuario) {
      const node = this.searchNode(this.root, nom_usuario);

      if (node !== null) {
        console.log("Información del usuario:" + "\n" 
        + "Usuario: " + node.nom_usuario + "\n" 
        + "Nombre: " + node.nombre + "\n" 
        + "Email: " + node.email);
        return true;       
      } else {
        console.log("No se encontró el usuario:", nom_usuario);
        return false;
      }
    }
    searchNode(node, nom_usuario) {
      if (node === null || node.nom_usuario === nom_usuario) {
        return node;
      }

      if (nom_usuario < node.nom_usuario) {
        return this.searchNode(node.left, nom_usuario);
      } else {
        return this.searchNode(node.right, nom_usuario);
      }
    }

    // Método para eliminar un nodo del árbol
    deleteUsuario(nom_usuario) {
      this.root = this.deleteUsuarioHelper(this.root, nom_usuario);
    }
    deleteUsuarioHelper(node, nom_usuario) {
    if (node === null) {
      return null;
    }

    if (nom_usuario < node.nom_usuario) {
      node.left = this.deleteUsuarioHelper(node.left, nom_usuario);
    } else if (nom_usuario > node.nom_usuario) {
      node.right = this.deleteUsuarioHelper(node.right, nom_usuario);
    } else {
      // Nodo encontrado, realizar la eliminación
      if (node.left === null && node.right === null) {
        // Caso 1: Nodo hoja
        return null;
      } else if (node.left === null || node.right === null) {
        // Caso 2: Nodo con un solo hijo
        if (node.left !== null) {
          return node.left;
        } else {
          return node.right;
        }
      } else {
        // Caso 3: Nodo con dos hijos
        const successor = this.getMinValueNode(node.right);
        node.nom_usuario = successor.nom_usuario;
        node.nombre = successor.nombre;
        node.email = successor.email;
        node.contrasena = successor.contrasena;
        node.right = this.deleteUsuarioHelper(node.right, successor.nom_usuario);
      }
    }

    // Actualizar la altura del nodo
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    // Saber si el arbol esta o no balanceado para hacer las rotaciones
    const balanceFactor = this.getBalanceFactor(node);

    // Caso Izquierda-izquierda
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rotateRight(node);
    }
    // Caso derecha-derecha    
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.rotateLeft(node);
    }
    // Caso izquierda-derecha
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }
    // Caso derecha-izquierda
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }
    return node;
  }
    getMinValueNode(node) {
      let current = node;
      while (current.left !== null) {
        current = current.left;
      }
      return current;
    }


    //Buscar todos los nodos entre un nodo a y un nodo b
    searchRange(a, b) {
      this.searchRangeHelper(this.root, a, b);
    }

    searchRangeHelper(node, a, b) {
      if (node === null) {
        return;
      }

      // Si el valor del nodo es menor que a, se busca en el subárbol derecho
      if (node.nom_usuario < a) {
        this.searchRangeHelper(node.right, a, b);
      }
      // Si el valor del nodo es mayor que b, se busca en el subárbol izquierdo
      else if (node.nom_usuario > b) {
        this.searchRangeHelper(node.left, a, b);
      }
      // Si el valor del nodo está dentro del rango [a, b], se imprime y se busca en ambos subárboles
      else {
        this.searchRangeHelper(node.left, a, b);
        console.log(node.nom_usuario); // Imprimir los valores del nodo
        this.searchRangeHelper(node.right, a, b);
      }
    }
}  
 
  // Ejemplo de uso
  const avlTree = new AVLTree();
  function fetchUsuarios() {
      fetch("./usuarios.json")
        .then(response => response.json())
        .then(data => {
          data.forEach(usuario => {
            avlTree.insert(usuario.nombre_usuario,usuario.nombre_completo, usuario.email, usuario.contraseña);        
          });
      });
  }
   
  //Pruebas para ver si funciona
  console.log("Funciona");
  fetchUsuarios();
  
  /*
  avlTree.printInOrderTraversal();

  avlTree.updateUsuario("maria.florez", "nuevo Nombre", "nuevo Email", "nueva Contrasena");

  avlTree.searchUsuario("cristian.barrera");

  avlTree.deleteUsuario("juliana.gongora");

  avlTree.searchRange("deiver.bernal", "luis.leon");
  */