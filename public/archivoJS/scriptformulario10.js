import { font1 } from "../font/minion_pro_bold.js";
import { font2 } from "../font/minion_pro_normal.js";
import { font3 } from "../font/minion_pro_medium.js";

let fechvenc; 
let fechvenc2; 
let fechvenc3;
let fechvenc4;
let fechini;
let fechaFormateada; 
let fechaEmi;
let fechaEmi2;

function formatTwoDigits(number) {
  return number < 10 ? "0" + number : number;
}

function calcularFecha() {
  const fechaEmision = document.getElementById("fechaEmision").value;
  const validityDays = parseInt(document.getElementById("validity_days").value);

  // Crear objeto de fecha de vencimiento
  let fechaEmisionObj = new Date(fechaEmision);
  fechaEmisionObj.setDate(fechaEmisionObj.getDate() + validityDays + 1);
  let diaVenc = formatTwoDigits(fechaEmisionObj.getDate());
  let mesVenc = formatTwoDigits(fechaEmisionObj.getMonth() + 1);
  let añoVenc = fechaEmisionObj.getFullYear();
  fechvenc = moment(fechaEmisionObj).format("MMM DD, YYYY").toUpperCase();
  fechvenc2 = moment(fechaEmisionObj).format("MM/DD/YYYY");
  fechvenc3 = `${mesVenc}-${diaVenc}-${añoVenc.toString().slice(-2)}`;

  // Nuevo formato de fecha de vencimiento
  let mesAbreviado = fechaEmisionObj.toLocaleString('default', { month: 'short' }).toUpperCase();
  let diaMesAño = `${diaVenc}-${mesAbreviado}-${añoVenc}`;
  fechvenc4 = diaMesAño;

  // Crear fecha de emisión
  let fechaEmisionObj2 = new Date(fechaEmision);
  fechaEmisionObj2.setDate(fechaEmisionObj2.getDate() + 1);
  let diaemi = formatTwoDigits(fechaEmisionObj2.getDate());
  let mesemi = formatTwoDigits(fechaEmisionObj2.getMonth() + 1);
  let añoemi = fechaEmisionObj2.getFullYear();
  fechaEmi = `${mesemi}/${diaemi}/${añoemi}`;
  fechaEmi2 = `${mesemi}-${diaemi}-${añoemi.toString().slice(-2)}`;

  // Creacion de FechaFormateada
  let fechaEmisionObj3 = new Date(fechaEmision);
  fechini = moment(fechaEmisionObj3).format("MMM DD, YYYY").toUpperCase();

  let fechaObjeto = new Date(fechvenc);
  let mes = fechaObjeto.toLocaleString("default", { month: "short" });
  mes = mes.charAt(0).toUpperCase() + mes.slice(1);
  let dia = formatTwoDigits(fechaObjeto.getDate());
  let anio = fechaObjeto.getFullYear();
  fechaFormateada = mes + " " + dia + ", " + anio;

  generarTag();
}

let var_tag;

function generarTag() {
  let tag = "";

  // Generar la letra del tag
  tag += String.fromCharCode(65 + Math.floor(Math.random() * 26));

  // Generar los siete números del tag
  for (let i = 0; i < 7; i++) {
    tag += Math.floor(Math.random() * 10);
  }

  // Asignar el valor del tag generado a una variable
  var_tag = tag;

  generarNumeroMayor();
}

// Declaración de una variable global para almacenar el número generado
let numeroGlobal = 0;

// Función para generar un número mayor que el generado anteriormente
function generarNumeroMayor() {
  // Obtén la fecha y hora actual
  const fechaHoraActual = new Date();

  // Genera un nuevo número mayor que el valor actual de numeroGlobal
  numeroGlobal++;

  horaActual();
}

function validarCampos() {
  // Obtener los valores de los campos del formulario
  const vin = document.getElementById("VIN").value;
  const color = document.getElementById("color").value;
  const nombre = document.getElementById("nombre").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const codigozip = document.getElementById("codigozip").value;
  const validityDays = document.getElementById("validity_days").value;

  // Validar si algún campo está vacío
  if (
    vin === "" ||
    validityDays === "" ||
    color === "" ||
    nombre === "" ||
    marca === "" ||
    model === "" ||
    year === "" ||
    mailingaddress === "" ||
    ciudad === "" ||
    estado === "" ||
    codigozip === ""
  ) {
    alert("Por favor, complete todos los campos del formulario.");
  } else {
    // Todos los campos están completos, llamar a la función generate() para generar el PDF
    calcularFecha();
  }
}

let hora_actual;

function horaActual() {
  // Obtener la hora actual
  const ahora = new Date();

  // Extraer las horas
  let horas = ahora.getHours();

  // Determinar si es AM o PM
  let amPM = horas >= 12 ? "PM" : "AM";

  // Convertir las horas al formato de 12 horas y asegurar que siempre haya dos dígitos
  horas = (horas % 12 || 12).toString().padStart(2, "0");

  // Establecer los minutos en "00"
  const minutos = "00";

  // Formatear la hora actual en el formato deseado "hh:mm AM/PM"
  hora_actual = `${horas}:${minutos} ${amPM}`;

  // Llamar a la función para generar el número de póliza
  generarNumeroPoliza();
}

let numeroPoliza;

function generarNumeroPoliza() {
  // Genera 10 números aleatorios
  const numerosAleatorios = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  // Genera un número aleatorio para el dígito después del guión
  const digitoDespuesDelGuion = Math.floor(Math.random() * 10);

  // Combina los números aleatorios con el guión y el dígito
  numeroPoliza = numerosAleatorios + "-" + digitoDespuesDelGuion;

  generarNumeroAscendente();
}

let numeroAscendente;

function generarNumeroAscendente() {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear() - 2020; // Escalamos el año restando un valor base
  const mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por lo que sumamos 1
  const dia = fechaActual.getDate();
  const hora = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();

  // Realiza cálculos para generar un número ascendente
  numeroAscendente =
    1200 +
    año * 1000 + // Escalamos el año para que el incremento sea menor
    mes * 100 + // Escalamos el mes
    dia * 10 + // Escalamos el día
    hora * 1 + // Escalamos la hora
    minutos;

  // Llama a la función generate() si es necesario
  generarNumeroAleatorio();
}

let numeroAleatorio

function generarNumeroAleatorio() {
  // Obtener la hora actual en milisegundos
  numeroAleatorio = Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
  generate();

}

function generate() {
  const validityDays = document.getElementById("validity_days").value;
  const vin = document.getElementById("VIN").value;
  const color = document.getElementById("color").value;
  const nombre = document.getElementById("nombre").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const codigozip = document.getElementById("codigozip").value;

  const url = `
  VIN: ${vin}
  YEAR: ${year}
  MAKE/MODEL:  ${marca}/${model}
  TAG#: ${var_tag}
  EXPIRE: ${fechvenc4}
  Georgia Department of Revenue`;
  console.log(url);

  const qrcode = new QRCode(qrContainer, {
    text: url,
    width: 200,
    height: 200,
  });

  const qrCodeDataURL = qrcode._el.querySelector("canvas").toDataURL();

  const imgElement = document.createElement("img");
  imgElement.src = qrCodeDataURL;
  imgElement.id = "qrImage";
  imgElement.style.display = "none";

  qrContainer.innerHTML = "";
  qrContainer.appendChild(imgElement);

  const doc = new jsPDF({
    orientation: "l",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
    floatPrecision: 16,
  });

  const img1 = document.getElementById("img1");
  doc.addImage(img1, 0, 0, 297, 211);
  doc.setFont("helvetica");
  doc.setFontStyle("bold");
  doc.setFontSize(83);

  const imgQR = document.getElementById("qrImage");
  doc.addImage(imgQR, 40, 95, 30, 30);

  doc.setFontSize(25);
  doc.setFontStyle("normal");
  doc.text(vin, 150, 40, { align: "center" });
  doc.setFontStyle("bold");
  doc.setFontSize(120);
  doc.text(var_tag, 150, 80, { align: "center" });
  doc.setFontStyle("normal");
  doc.setFontSize(70);
  doc.text(fechvenc4, 150, 118, { align: "center" });
  doc.setFontSize(20);
  doc.text(`${year} ${marca} ${model} ${color}`, 150, 130, { align: "center" });
  doc.setFontSize(15)
  doc.text(` ${numeroAleatorio} `, 262, 130, {align: 'center'})

  //Segunda Página
  doc.addPage("a4", "l");
  const img2 = document.getElementById("img2");
  doc.addImage(img2, 0, 0, 297, 211);
  doc.setFontSize(15);
  doc.text(var_tag, 190, 26.75)
  doc.setFontSize(12);
  doc.text(vin, 52, 42.75);
  doc.text(year, 150, 43.25);
  doc.text(color, 194, 43.25);
  doc.text(marca, 150, 54);
  doc.text(model, 194, 54);
  
  doc.setFontSize(15)
  doc.text(nombre, 38, 76);
  doc.text(mailingaddress, 38, 81.5);
  doc.text(`${ciudad} ${estado} ${codigozip}`, 38, 86.5);

  doc.save("GA_tag.pdf");

  realizarSolicitud();
}

// Define la función convertirMayusculas en el ámbito del módulo
function convertirMayusculas(input) {
  input.value = input.value.toUpperCase();
}

function realizarSolicitud() {
  // Datos que deseas enviar en la solicitud POST
  const data = {
    // Puedes agregar otros campos aquí si es necesario
  };

  // Opciones para la solicitud fetch
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  // URL del endpoint que has creado en tu servidor
  const endpointURL = "https://dmv-tags.up.railway.app/insertarRegistro4"; // Cambia la URL según corresponda

  // Realizar la solicitud fetch
  fetch(endpointURL, options)
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta del servidor:", data);
    })
    .catch((error) => {
      console.error("Error al hacer la solicitud:", error);
    });
}

// Adjunta la función al objeto global (window)
window.convertirMayusculas = convertirMayusculas;

window.validarCampos = validarCampos;

window.calcularFecha = calcularFecha;

window.generarTag = generarTag;

window.realizarSolicitud = realizarSolicitud;
