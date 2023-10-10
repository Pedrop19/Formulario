document.addEventListener("DOMContentLoaded", function () {
  let emailElement = document.getElementById("email");
  let continueButton = document.getElementById("continue");
  let hiddenElement = document.getElementById("hidden");
  let errorElement = document.createElement("p");
  let passwordElement = document.getElementById("psw");
  let labelpswElement = document.getElementById("labelpsw");
  let spanpswElement = document.getElementById("spanpsw");
  let userElement = document.getElementById("usr");
  let labelusrElement = document.getElementById("labeluser");
  let spanusrElement = document.getElementById("spanuser");
  let telefonoElement = document.getElementById("tel");
  let labeltelElement = document.getElementById("labeltel");
  let spantelElement = document.getElementById("spantel");

  const regexPatterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    user: /^[a-zA-Z\s]{1,20}$/,
    telefono: /^\d{9}$/
  };

  function validarCampo(valor, tipo) {
    const regex = regexPatterns[tipo];
    return regex.test(valor);
  }


  const elementsToToggle = [
    { element: passwordElement, label: labelpswElement, span: spanpswElement, type: "password" },
    { element: userElement, label: labelusrElement, span: spanusrElement, type: "user" },
    { element: telefonoElement, label: labeltelElement, span: spantelElement, type: "telefono" },
    // Agrega más elementos aquí según sea necesario
  ];

  function toggleElementsByType(type, valid) {
    elementsToToggle.forEach((elementSet) => {
        const { element, label, span, type: elementType } = elementSet;

        if (elementType === type) {
            if (valid) {
                element.classList.remove("hidd");
                label.classList.remove("hidd");
                span.classList.remove("hidd");
                
            } else {
                element.classList.add("hidd");
                label.classList.add("hidd");
                span.classList.add("hidd");
                
            }
        }
    });
}








  continueButton.setAttribute("disabled", "true");
  errorElement.textContent = " ";

  function mostrarError(mensaje) {
    continueButton.setAttribute("disabled", "true");
    const errorElement = document.createElement("p");
    errorElement.textContent = mensaje;
    hiddenElement.textContent = "";
    hiddenElement.appendChild(errorElement);
  }

  emailElement.addEventListener('keyup', () => {
    const isValidEmail = validarCampo(emailElement.value, "email");

    if (!isValidEmail) {
      mostrarError("El email no es correcto");
    } else {
      continueButton.removeAttribute("disabled");
      hiddenElement.textContent = "";
    }
  });

  passwordElement.addEventListener('keyup', () => {
    const isValidPassword = validarCampo(passwordElement.value, "password");

    if (!isValidPassword) {
      mostrarError("La contraseña no es correcta");
    } else {
      continueButton.removeAttribute("disabled");
      hiddenElement.textContent = "";
    }

  });


  userElement.addEventListener('keyup', () => {
    const isValidUser = validarCampo(userElement.value, "user");

    if (!isValidUser) {
      mostrarError("El usuario no es correcta");
    } else {
      continueButton.removeAttribute("disabled");
      hiddenElement.textContent = "";
    }

  });

  telefonoElement.addEventListener('keyup', () => {
    const isValidTelefono = validarCampo(telefonoElement.value, "telefono");

    if (!isValidTelefono) {
      mostrarError("El telefono no es correcto");
    } else {
      continueButton.removeAttribute("disabled");
      hiddenElement.textContent = "";
    }

  });

  emailElement.addEventListener('blur', () => {
    errorElement.textContent = " ";
  });

  passwordElement.addEventListener('blur', () => {
    passwordElement.textContent = " ";
  });

  userElement.addEventListener('blur', () => {
    userElement.textContent = " ";
  });

  telefonoElement.addEventListener('blur', () => {
    telefonoElement.textContent = " ";
  });

  continueButton.addEventListener('click', () => {
    const isValidEmail = validarCampo(emailElement.value, "email");

    if (!continueButton.hasAttribute("disabled") && isValidEmail) {
      toggleElementsByType("password", true);
      const isValidPassword = validarCampo(passwordElement.value, "password");
      if (isValidPassword) {
        toggleElementsByType("user", true);
        const isValidUser = validarCampo(userElement.value, "user");
        if (isValidUser) {
          toggleElementsByType("telefono", true);
          const isValidTelefono = validarCampo(telefonoElement.value, "telefono");
          if (isValidTelefono) {
            window.location.href = "../index.html";
          } else {
            continueButton.setAttribute("disabled", "true");
            const errorElement = document.createElement("p");
            mostrarError("El telefono no es correcto");
            hiddenElement.textContent = "";
            hiddenElement.appendChild(errorElement);
          }
        } else {
          continueButton.setAttribute("disabled", "true");
          const errorElement = document.createElement("p");
          mostrarError("El usuario no es correcto");
          hiddenElement.textContent = "";
          hiddenElement.appendChild(errorElement);
        }
      } else {
        continueButton.setAttribute("disabled", "true");
        const errorElement = document.createElement("p");
        mostrarError("La contraseña no es correcta");
        hiddenElement.textContent = "";
        hiddenElement.appendChild(errorElement);
      }
    }
  });


  function escribirEnPantalla(texto) {
    let arr = texto.split("");
    let i = 0;
    let tituloElement = document.getElementById("titulo");
    let intervalo = setInterval(function () {
      if (i == arr.length - 1) {
        tituloElement.innerHTML += arr[i];
        clearInterval(intervalo);
      } else {
        if (arr[i] == "\n") {
          tituloElement.innerHTML += "<br>";
          i++;
        } else {
          tituloElement.innerHTML += arr[i];
          i++;
        }
      }
    }, 100);
  }

  escribirEnPantalla('Bienvenido a Pedrohub!\nQue comience la aventura');
});
