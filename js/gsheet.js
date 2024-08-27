const gscript =
  "https://script.google.com/macros/s/AKfycbxJf__3IO2-9QQbBQDfoNdG-1a4efPjnDhCgzSeAxy2zDwFgeln9d8ZCLYbpr0mAEBx/exec";

const myForm = document.querySelector("#myForm");
const sendForm = document.querySelector("#sendForm");
const enviado = document.querySelector("#enviado");
const volver = document.querySelector("#volver");
const msg = document.querySelector("#msg");

sendForm.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(gscript, {
    method: "POST",
    body: new FormData(myForm),
  })
    .then((res) => res.json())
    .then((data) => {
      reset();
      msg.innerHTML = data.msg;
      myForm.classList.add("oculto");
      enviado.classList.remove("oculto");
    })
    .catch((err) => console.error(err));
});

volver.addEventListener("click", (e) => {
    e.preventDefault();
    enviado.classList.add("oculto");
    myForm.classList.remove("oculto");
});

const nombre = document.querySelector("#Nombre");
const pareja = document.querySelector("#Pareja");
const alojamiento = document.querySelector("#Alojamiento");
const menu = document.querySelector("#Menu");
const menuPareja = document.querySelector("#Menu2");
const alergias = document.querySelector("#Alergias");

const verPareja = document.querySelector("#ver-pareja");
const verMenuPareja = document.querySelector("#ver-menu-pareja");

const compa = document.querySelector("#Compa");
compa.addEventListener("change", function () {
  if (compa.value == "yes") {
    verPareja.classList.remove("oculto");
    verMenuPareja.classList.remove("oculto");
  } else {
    verPareja.classList.add("oculto");
    verMenuPareja.classList.add("oculto");
    pareja.value = "";
    menuPareja.value = "";
  }
});

function reset() {
  nombre.value = "";
  pareja.value = "";
  alojamiento.value = "";
  menu.value = "";
  menuPareja.value = "";
  alergias.value = "";
}
