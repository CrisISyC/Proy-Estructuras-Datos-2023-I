
class AVLNode {
    constructor(nom_usuario, email) {
       this.nom_usuario = nom_usuario; // Con el usuario se crea el orden del AVL
       this.email = email;
       this.left = null; // Referencia al hijo izquierdo
       this.right = null; // Referencia al hijo derecho
       this.height = 1; // Altura del nodo
     }
 }
   
 
 class AVLTreeUser {
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
   
     
     insert(nom_usuario, email) {
       this.root = this.insertNode(this.root, nom_usuario, email);
     }
 
     insertNode(node, nom_usuario,email) {
       if (node === null) {
         return new AVLNode(nom_usuario, email);
       }
 
       //Buscar donde insertar el nodo
       if (email < node.email) {
         node.left = this.insertNode(node.left, nom_usuario,email);
       } else if (email > node.email) {
         node.right = this.insertNode(node.right, nom_usuario, email);
       } else {
         console.log("Este usuario ya existe");
         return node;
       }
 
       // Actualizar la altura del nodo actual
       node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
 
       // Saber si el arbol esta en equilibrio o no, para hacer las rotaciones respectivas
       const balanceFactor = this.getBalanceFactor(node);
 
       // Caso izquierda-izquierda
       if (balanceFactor > 1 && email < node.left.email) {
         return this.rotateRight(node);
       }
       // Caso derecha-derecha
       if (balanceFactor < -1 && email > node.right.email) {
 
         return this.rotateLeft(node);
       }
       // Caso izquierda-derecha      
       if (balanceFactor > 1 && email > node.left.email) {
         node.left = this.rotateLeft(node.left);
         return this.rotateRight(node);
       }
       // Caso derecha-izquierda
       if (balanceFactor < -1 && email < node.right.email) {
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
         + "Email: " + node.email );
 
         this.inOrder(node.right);
       }
     }
   
     // Buscar un unico usuario e imprimir sus valores
     searchEmail(email) {
       const node = this.searchNode(this.root, email);
 
       if (node !== null) {
         console.log("Información del usuario:" + "\n" 
         + "Usuario: " + node.nom_usuario + "\n" 
         + "Email: " + node.email);
         return node.nom_usuario;       
       } else {
         const mensaje = "No se encontró el usuario ";
         return mensaje;
       }
     }
     searchNode(node, email) {
       if (node === null || node.email === email) {
         return node;
       }
 
       if (email < node.email) {
         return this.searchNode(node.left, email);
       } else {
         return this.searchNode(node.right, email);
       }
     }
}
  
   // Ejemplo de uso
   const avlTreeUser = new AVLTreeUser();
 
   function fetchUsuarios() {
       fetch("./usuarios.json")
         .then(response => response.json())
         .then(data => {
           data.forEach(usuario => {
             avlTreeUser.insert(usuario.nombre_usuario,usuario.email);        
           });
       });
   }
    
   //Pruebas para ver si funciona
   //console.log("Funciona");
   fetchUsuarios();
   
   /*
   avlTreeUser.printInOrderTraversal();
 
 
   avlTreeUser.searchEmail(email);

   */
 