function AgregarDatos() {

  var websiteSelect = document.getElementById('websiteInput');
  var selectedOption = websiteSelect.options[websiteSelect.selectedIndex].value;
  var username = document.getElementById('usernameInput').value;
  var password = document.getElementById('passwordInput').value;
  var passwordCifrado = document.getElementById('password-convertido').textContent;

  // Para guardar los datos ingresados agregando un div en la ventana

  var passwordsContainer = document.getElementById('passwordsContainer');
  var passwordEntry = document.createElement('div');
  passwordEntry.classList.add('passwordEntry');
  passwordEntry.innerHTML = '<span>Red social:</span> ' + selectedOption +
    '<br><span>Usuario:</span> ' + username +
    '<br><span>Contraseña:</span> ' + password +
    '<br><span>Cifrado:</span> ' + passwordCifrado +
    '<br><button onclick="deletePasswordEntry(this)"><ion-icon name="trash"></ion-icon>Eliminar</button>';
  passwordsContainer.appendChild(passwordEntry);

  // Para limpiar las entradas
  document.getElementById('websiteInput').selectedIndex = 0;
  document.getElementById('usernameInput').value = '';
  document.getElementById('passwordInput').value = '';
  document.getElementById('password-convertido').textContent = '';
  document.getElementById('password-desencriptado').textContent = '';
}

function deletePasswordEntry(button) {
  var passwordEntry = button.parentNode;
  passwordEntry.parentNode.removeChild(passwordEntry);
}


document.getElementById('addPasswordForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que se envíe el formulario

  AgregarDatos();
});

//CIFRADO DE CONTRASEÑA
function cifrado() {
  var mensaje = document.getElementById("passwordInput").value.toUpperCase();
  var clave = document.getElementById("websiteInput").value.toUpperCase();

  var mensajeCifrado = "";
  var alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var claveAlineada = "";

  // Alinear la clave con el mensaje
  for (var i = 0; i < mensaje.length; i++) {
    claveAlineada += clave.charAt(i % clave.length);
  }
  // Cifrar el mensaje
  for (var i = 0; i < mensaje.length; i++) {
    var mensajeChar = mensaje.charAt(i);
    var claveChar = claveAlineada.charAt(i);

    if (mensajeChar == " ") {
      mensajeCifrado += " ";
    } else {
      var mensajeCharCode = mensajeChar.charCodeAt(0) - 65;
      var claveCharCode = claveChar.charCodeAt(0) - 65;
      var cifradoCharCode = (mensajeCharCode + claveCharCode) % 26;
      mensajeCifrado += String.fromCharCode(cifradoCharCode + 65);
    }
  }

  document.getElementById("password-convertido").innerHTML = mensajeCifrado;
}

// DESENCRIPTAR CONTRASEÑA
function descifrado() {
  var mensajeCifrado = document.getElementById("password-convertido").innerHTML;
  var clave = document.getElementById("websiteInput").value.toUpperCase();

  var mensajeDesencriptado = "";
  var alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var claveAlineada = "";

  // Alinear la clave con el mensaje cifrado
  for (var i = 0; i < mensajeCifrado.length; i++) {
    claveAlineada += clave.charAt(i % clave.length);
  }


  // Desencriptar el mensaje
  for (var i = 0; i < mensajeCifrado.length; i++) {
    var mensajeChar = mensajeCifrado.charAt(i);
    var claveChar = claveAlineada.charAt(i);

    if (mensajeChar == " ") {
      mensajeDesencriptado += " ";
    } else {
      var mensajeCharCode = mensajeChar.charCodeAt(0) - 65;
      var claveCharCode = claveChar.charCodeAt(0) - 65;
      var desencriptadoCharCode = (mensajeCharCode - claveCharCode + 26) % 26;
      mensajeDesencriptado += String.fromCharCode(desencriptadoCharCode + 65);
    }
  }

  document.getElementById("password-desencriptado").innerHTML = mensajeDesencriptado;
}