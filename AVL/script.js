/*export function nose(){
    const mensaje = "sirve" 
    return mensaje; 
}*/

const btnSignIn = document.getElementById("sign-in"),
      btnSignUp = document.getElementById("sign-up"),
      formRegister = document.querySelector(".register"),
      formLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", e=>{
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide");
})
        
btnSignUp.addEventListener("click", e=>{
    formLogin.classList.add("hide");
    formRegister.classList.remove("hide");
})


const btnRegistrarse = document.getElementById("btnRegistrarse"),
      btnIniciar = document.getElementById("btnIniciar");

btnRegistrarse.addEventListener("click", e=>{
    var nombreCompleto = document.getElementById("nombre_completo").value;
    var nombreUsuario = document.getElementById("nombre_usuario").value;
    var email = document.getElementById("email").value;
    var contrasena = document.getElementById("contrasena").value;

    if (avlTreeUser.AgregarUsuario(nombreUsuario)) {
        console.log("Este Usuario ya existe.");
        alert("Este usuario ya existe.");
      } else {
        avlTreeUser.insert(nombreUsuario, nombreCompleto, email, contrasena);
        console.log("Se registró correctamente el usuario, los datos del usuario son:" + "\n"
          + "Usuario: " + nombreUsuario + "\n"
          + "Nombre: " + nombreCompleto + "\n"
          + "Email: " + email);

          alert("Se registró correctamente el usuario, los datos del usuario son:" + "\n"
          + "Usuario: " + nombreUsuario + "\n"
          + "Nombre: " + nombreCompleto + "\n"
          + "Email: " + email);
      }
})


btnIniciar.addEventListener("click", e=>{
    var nombre_usuarioL = document.getElementById("nombre_usuarioL").value;
    var contrasenaL = document.getElementById("contrasenaL").value;


    if(avlTreeUser.searchLogin(nombre_usuarioL, contrasenaL) === 0){
        alert("Bienvenido")
        window.location.href = "./usuario.html";
        
        //nombredeusuario(nombre_usuarioL);
    }else if(avlTreeUser.searchLogin(nombre_usuarioL, contrasenaL) === 1){
        alert("El usuario existe en el AVL pero la contraseña es incorrecta")
    }else{
        alert("El usuario " + nombre_usuarioL + " no existe en el AVL")
    }
    //window.location.href = "./usuario.html";
})

