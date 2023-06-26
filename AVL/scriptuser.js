
const btnDatos = document.getElementById("datos"),
      btnDatosmostrar = document.getElementById("botonOculto2"),
      btnActualizar = document.getElementById("actualizar"),
      btnDatosactualizar = document.getElementById("botonOculto"),
      btnUsuarios = document.getElementById("usuarios");

var h2Element = document.querySelector('.form-information h2'),
    pnombre = document.querySelector('.form-information p'),
    pnombre1 = document.querySelector('.form-information p1'),
    pusuario = document.querySelector('.form-information p2'),
    pusuario1 = document.querySelector('.form-information p3'),
    pcorreo = document.querySelector('.form-information p4'),
    pcorreo1 = document.querySelector('.form-information p5');


btnDatosactualizar.addEventListener("click", e=>{

  avlTreeUser.printInOrderTraversalDes();

  mostrarLista();
  var select = document.getElementById("frutas"); // Obtener el elemento select
  var seleccion = select.value; // Obtener el valor seleccionado


  avlTreeUser.deleteUsuario(seleccion);

  var select = document.getElementById("frutas"); // Obtener el elemento select
  while (select.firstChild) {
    select.removeChild(select.firstChild); // Eliminar cada opción del select
  }

  avlTreeUser.printInOrderTraversalDes();
  mostrarLista();
})

btnDatosmostrar.addEventListener("click", e=>{

  avlTreeUser.printInOrderTraversalDes();

  mostrarLista();
  var select = document.getElementById("frutas"); // Obtener el elemento select
  var seleccion = select.value; // Obtener el valor seleccionado


  pnombre.textContent = avlTreeUser.searchUsuario(seleccion)[1]
  pusuario1.textContent = avlTreeUser.searchUsuario(seleccion)[0]
  pcorreo1.textContent = avlTreeUser.searchUsuario(seleccion)[2]

  var select = document.getElementById("frutas"); // Obtener el elemento select
  while (select.firstChild) {
    select.removeChild(select.firstChild); // Eliminar cada opción del select
  }

  avlTreeUser.printInOrderTraversalDes();
  mostrarLista();
})

btnDatos.addEventListener("click", e=>{
    // Cambia el texto del elemento h2
    ocultarBoton();
    ocultarCampo();
    avlTreeUser.printInOrderTraversalDes();
    mostrarLista();

    mostrarBoton2();

    h2Element.textContent = 'Datos';
    pnombre1.textContent = 'Nombre';


    pusuario.textContent = 'Usuario';


    pcorreo.textContent = "Correo";


    var lista = document.getElementById("miLista");

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    var select = document.getElementById("frutas"); // Obtener el elemento select
    while (select.firstChild) {
      select.removeChild(select.firstChild); // Eliminar cada opción del select
    }
  
    avlTreeUser.printInOrderTraversalDes();
    mostrarLista();
})

btnActualizar.addEventListener("click", e=>{
    // Cambia el texto del elemento h2

    mostrarLista(); 
    avlTreeUser.printInOrderTraversalDes();


    h2Element.textContent = 'Borrar';
  

    pnombre1.textContent = '';
    pnombre1.textContent = '';
    pnombre.textContent = '';

    pusuario.textContent = '';
    pusuario1.textContent = '';

    pcorreo.textContent = '';
    pcorreo1.textContent = '';
    mostrarBoton();
    mostrarCampo();
    ocultarBoton2();
    var select = document.getElementById("frutas"); // Obtener el elemento select
    while (select.firstChild) {
      select.removeChild(select.firstChild); // Eliminar cada opción del select
    }
  
    avlTreeUser.printInOrderTraversalDes();
    mostrarLista();
    var lista = document.getElementById("miLista");

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

})

btnUsuarios.addEventListener("click", e=>{
    // Cambia el texto del elemento h2
    h2Element.textContent = 'Usuarios';

    var lista = document.getElementById("miLista");

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    avlTreeUser.printInOrderTraversal();
    pnombre1.textContent = '';
    pnombre1.textContent = '';
    pnombre.textContent = '';

    pusuario.textContent = '';
    pusuario1.textContent = '';

    pcorreo.textContent = '';
    pcorreo1.textContent = '';
    ocultarBoton();
    ocultarCampo();
    ocultarLista();
    ocultarBoton2()
    
})


  function ocultarBoton() {
    var botonOculto = document.getElementById("botonOculto");
    botonOculto.style.display = "none";
  }
  
  
  function mostrarBoton() {
    var botonOculto = document.getElementById("botonOculto");
    botonOculto.style.display = "block";

  }  

  function ocultarBoton2() {
    var botonOculto = document.getElementById("botonOculto2");
    botonOculto.style.display = "none";
  }
  
  
  function mostrarBoton2() {
    var botonOculto = document.getElementById("botonOculto2");
    botonOculto.style.display = "block";

  } 
  function ocultarCampo() {
    var campo = document.getElementById("nombre_usuarioL1");
    var campo1 = document.getElementById("nombre_usuarioL2");
    campo.classList.add("hidden");
    campo1.classList.add("hidden");
  }

  function mostrarCampo() {
    var campo = document.getElementById("nombre_usuarioL1");
    var campo1 = document.getElementById("nombre_usuarioL2");
    campo.classList.remove("hidden");
    campo1.classList.remove("hidden");
    
  }

  function ocultarLista() {
    var select = document.getElementById("frutas"); // Obtener el elemento select
    var select2 = document.getElementById("frutas2");
    select.classList.add("hidden"); // Agregar la clase "hidden" para ocultar el select
    select2.classList.add("hidden");
  }


      // Función para mostrar la lista desplegable
      function mostrarLista() {
        var select = document.getElementById("frutas"); // Obtener el elemento select
        var select2 = document.getElementById("frutas2");
        select.classList.remove("hidden"); // Remover la clase "hidden" para mostrar el select
        select2.classList.remove("hidden");
      }

      function limpiarLista() {
        var select = document.getElementById("frutas"); // Obtener el elemento select
  
        while (select.firstChild) {
          select.removeChild(select.firstChild); // Eliminar cada opción del select
        }
      }      

      function cambiarPlaceholder() {
        var input = document.getElementById("myInput"); // Obtener el elemento input
        var nuevoPlaceholder = document.getElementById("nuevoPlaceholder").value; // Obtener el valor del nuevo placeholder
  
        input.placeholder = nuevoPlaceholder; // Actualizar el atributo placeholder del input
      }     