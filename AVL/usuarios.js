
function fetchUsuarios() {
    fetch("usuarios.json")
      .then(response => response.json())
      .then(data => {
        data.forEach(usuario => {
          console.log(usuario.nombre_completo + " - " + usuario.id);
        });
    });
}

function editarUsuario(id, nuevoNombre, nuevoNombreUsuario, nuevoEmail, nuevaContrasena) {
    fetch("usuarios.json")
      .then(response => response.json())
      .then(data => {
        // Buscar el usuario por su ID
        const usuario = data.find(user => user.id === id);
  
        if (usuario) {
          // Actualizar los datos del usuario
          usuario.nombre_completo = nuevoNombre;
          usuario.nombre_usuario = nuevoNombreUsuario;
          usuario.email = nuevoEmail;
          usuario.contraseña = nuevaContrasena;
  
          // Guardar los cambios en el archivo JSON
          fetch("usuarios.json", {
            method: "PUT", // o "POST" dependiendo de tu servidor
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(updatedData => {
            console.log('Datos actualizados:', updatedData);
          })
          .catch(error => {
            console.error('Error al enviar los datos modificados:', error);
          });
      } else {
        console.log('No se encontró ningún usuario con el ID especificado.');
      }
    })
    .catch(error => {
      console.error('Error al obtener el archivo JSON:', error);
    });
}
  
  fetchUsuarios(); 
    editarUsuario(1, "nuevoNombre", "nuevoNombreUsuario", "nuevoEmail", "nuevaContrasena");
    fetchUsuarios();    