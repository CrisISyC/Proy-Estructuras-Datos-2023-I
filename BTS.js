class BinarySearchTree {
    constructor() {
      this.root = null;
    }
    
    insertBST(num) {
      this.root = this.insert(num, this.root);
    }
    
    insert(num, p) {
      if (p === null) {
        p = new Node(num);
      } else {
        if (num < p.data) {
          p.left = this.insert(num, p.left);
        } else if (num > p.data) {
          p.right = this.insert(num, p.right);
        } else {
          console.log("Item in tree and not inserted.");
        }
      }
      return p;
    }
    
    removeBST(num) {
      this.root = this.remove(num, this.root);
    }
    
    remove(num, p) {
      if (p !== null) {
        if (num < p.data) {
          p.left = this.remove(num, p.left);
        } else if (num > p.data) {
          p.right = this.remove(num, p.right);
        } else {
          if (p.left === null && p.right === null) {
            p = null;
          } else if (p.left === null) {
            p = p.right;
          } else if (p.right === null) {
            p = p.left;
          } else {
            const t = this.findMin(p.right);
            p.data = t.data;
            p.right = this.remove(p.data, p.right);
          }
        }
      } else {
        console.log("Item not in tree and not removed");
      }
      return p;
    }
    
    findMin(p) {
      if (p !== null) {
        while (p.left !== null) {
          p = p.left;
        }
      }
      return p;
    }
    
    traverseBST() {
      console.log("The tree is:");
      if (this.root !== null) {
        this.traverse(this.root);
      } else {
        console.log("Empty");
      }
      console.log();
    }
    
    traverse(ptr) {
      if (ptr.left !== null) {
        this.traverse(ptr.left);
      }
      console.log(" " + ptr.data);
      if (ptr.right !== null) {
        this.traverse(ptr.right);
      }
    }
}
    // Inner Class: Node
class Node {
    constructor(data) {
        this.left = null;
        this.data = data;
        this.right = null;
    }
}

const mascotas = new BinarySearchTree();
const fs = require('fs');

function leerArchivoJSON() {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream('1000.json', 'utf8');
      let jsonData = '';
  
      stream.on('data', chunk => {
        jsonData += chunk;
      });
  
      stream.on('end', () => {
        try {
          const parsedData = JSON.parse(jsonData);
          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      });
  
      stream.on('error', error => {
        reject(error);
      });
    });
  }
  

leerArchivoJSON()
  .then(jsonData => {
    
    // Puedes acceder a jsonData y trabajar con los datos aquí
    console.time('Insert');
    let cantidad = jsonData['Usuarios'].length;
    for (let i = 0; i < cantidad; i++) {
        mascotas.insertBST(jsonData['Usuarios'][i]['_id']);
    }

    //mascotas.traverseBST();

    console.timeEnd('Insert');

    console.time('Search');
    mascotas.removeBST(cantidad/2);
    console.timeEnd('Search');
  })
  .catch(error => {
    console.error('Error al leer el archivo:', error);
  });