import { font1 } from "../font/times_new_romand_normal.js";
import { font2 } from "../font/times_new_romand_bold.js";

let fechvenc;
let fechvenc2;
let fechvenc3;
let fechvenc4;
let fechvenc5;
let fechini;
let fechaFormateada;
let fechaEmi;
let fechaEmi2;
let fechaEmi3;
let fechaEmi4;
let mes_fechvenc;
let dia_fechvenc;
let año_fechvenc;

function formatTwoDigits(number) {
  return number < 10 ? "0" + number : number;
}

function calcularFecha() {
  const fechaEmision = document.getElementById("fechaEmision").value;
  // Crear fecha de emisión
  let fechaEmisionObj2 = new Date(fechaEmision);
  fechaEmisionObj2.setDate(fechaEmisionObj2.getDate() + 1);
  let diaemi = formatTwoDigits(fechaEmisionObj2.getDate());
  let mesemi = formatTwoDigits(fechaEmisionObj2.getMonth() + 1);
  let añoemi = fechaEmisionObj2.getFullYear();
  fechaEmi = `${mesemi}/${diaemi}/${añoemi}`;
  fechaEmi2 = `${mesemi}-${diaemi}-${añoemi.toString().slice(-2)}`;

  generarTag();
}

let var_tag;

function generarTag() {
  let tag = "";

  // Generar 4 números
  for (let i = 0; i < 5; i++) {
    tag += Math.floor(Math.random() * 10);
  }

  // Asignar el valor del tag generado a la variable
  var_tag = tag;

  generarTag2();
}

let var_tag2;

function generarTag2() {
  let tag = "";

  // Generar el primer número
  tag += Math.floor(Math.random() * 10);

  // Generar 5 letras
  for (let i = 0; i < 5; i++) {
    tag += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  // Generar el segundo número
  tag += Math.floor(Math.random() * 10);

  // Generar 6 letras
  for (let i = 0; i < 6; i++) {
    tag += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  // Asignar el valor del tag generado a la variable
  var_tag2 = tag;

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

  generatePDF417();
}

function validarCampos() {
  // Obtener los valores de los campos del formulario
  const vin = document.getElementById("VIN").value;
  const combustible = document.getElementById("combustible").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const body_style = document.getElementById("body_style").value;
  const transmission = document.getElementById("transmission").value;
  const cy_capacity = document.getElementById("cy_capacity").value;
  const cy_number = document.getElementById("cy_number").value;
  const weight = document.getElementById("weight").value;
  const station_city = document.getElementById("station_city").value;

  // Validar si algún campo está vacío
  if (
    vin === "" ||
    combustible === "" ||
    marca === "" ||
    model === "" ||
    year === "" ||
    body_style === "" ||
    transmission === "" ||
    cy_capacity === "" ||
    cy_number === "" ||
    weight === "" ||
    station_city === ""
  ) {
    alert("Por favor, complete todos los campos del formulario.");
  } else {
    // Todos los campos están completos, llamar a la función generate() para generar el PDF
    calcularFecha();
  }
}

function generatePDF417() {
  const vin = document.getElementById("VIN").value;
  // Configuración para generar el código PDF417
  const options = {
    bcid: "code128", // Tipo de código de barras (PDF417)
    text: vin, // Texto a codificar
    scale: 2, // Escala del código de barras (ajusta según tus necesidades)
    height: 10, // Altura del código de barras (ajusta según tus necesidades)
  };

  // Obtén el elemento canvas donde se mostrará el código de barras
  const canvas = document.getElementById("barcodeCanvas");

  // Genera el código de barras PDF417
  bwipjs.toCanvas(canvas, options);

  extractImageAndGeneratePDF();
}

// Función para extraer la imagen del canvas y generar el PDF
function extractImageAndGeneratePDF() {
  var canvas = document.getElementById("barcodeCanvas");
  var imagenExtraida = document.createElement("img");

  imagenExtraida.src = canvas.toDataURL("image/png"); // Convierte el contenido del canvas en una URL de datos (data URL)
  imagenExtraida.id = "codigoDeBarras"; // Agrega un ID a la imagen
  document.body.appendChild(imagenExtraida); // Agrega la imagen extraída al cuerpo del documento o a otro elemento HTML

  // Aplicar estilo "display: none;" para ocultar la imagen
  imagenExtraida.style.display = "none";

  horaActual();
}

let hora_actual;

function horaActual() {
  // Obtener la hora actual
  const ahora = new Date();

  // Extraer las horas y minutos
  let horas = ahora.getHours();
  let minutos = ahora.getMinutes();

  // Determinar si es AM o PM
  let amPM = horas >= 12 ? "pm" : "am";

  // Convertir las horas al formato de 12 horas y asegurar que siempre haya dos dígitos
  horas = (horas % 12 || 12).toString().padStart(2, "0");

  // Asegurar que siempre haya dos dígitos en los minutos
  minutos = minutos.toString().padStart(2, "0");

  // Formatear la hora actual en el formato deseado "hh:mm AM/PM"
  hora_actual = `${horas}:${minutos}:${amPM}`;

  generate();
}

function generate() {
  const vin = document.getElementById("VIN").value;
  const combustible = document.getElementById("combustible").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const body_style = document.getElementById("body_style").value;
  const transmission = document.getElementById("transmission").value;
  const license = document.getElementById("license").value;
  const cy_capacity = document.getElementById("cy_capacity").value;
  const cy_number = document.getElementById("cy_number").value;
  const weight = document.getElementById("weight").value;
  const miles = document.getElementById("miles").value;
  const station_city = document.getElementById("station_city").value;

  const doc = new jsPDF();
  const img1 = document.getElementById("img1");
  doc.addImage(img1, 0, 0, 211, 297);
  //Fuente1
  doc.addFileToVFS("times.ttf", font1);
  doc.addFont("times.ttf", "TimesNewRomand", "normal");
  //Fuente2
  doc.addFileToVFS("times.ttf", font2);
  doc.addFont("times.ttf", "TimesNewRomand", "bold");
  //Texto
  doc.setFont("times");
  doc.setFontType("bold");
  doc.setFontSize(10);
  doc.text(`${fechaEmi}, `, 48.5, 56.5);
  doc.setFontType("normal");
  doc.text(hora_actual, 67, 56.5);
  doc.text(`2105/${var_tag}`, 48.5, 69.5);
  doc.setFontType("bold");
  doc.text(license, 48.5, 73.75);
  doc.text(vin, 48.5, 78.2);
  doc.setFontType("normal");
  doc.text(marca, 48.5, 82.75);
  doc.text(model, 48.5, 87);
  doc.setFontType("bold");
  doc.text(year, 48.5, 91.5);
  doc.setFontType("normal");
  doc.text(`/ ${body_style}`, 57.75, 91.5);
  doc.text(`${cy_capacity} / ${cy_number} / C`, 48.5, 95.5);
  doc.setFontType("bold");
  doc.text(var_tag2, 48.5, 100);
  doc.setFontType("normal");
  doc.text(`${transmission} / ${weight}`, 48.5, 104);
  doc.text(`${miles} / ${combustible}`, 48.5, 108.5);

  doc.text(station_city, 145.75, 69.5);

  const url = `https://www.nhtsa.gov/${vin}`;
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

  const imgQR = document.getElementById("qrImage");
  doc.addImage(imgQR, 142, 182, 17, 17);

  if (license) {
    doc.text(`${license} TxDot:`, 48.5, 258);
  } else {
    doc.text(`TxDot:`, 48.5, 258);
  }

  const img2 = document.getElementById("codigoDeBarras");
  doc.addImage(img2, "PNG", 10, 261.5, 60, 10);
  doc.addImage(img2, "PNG", 10, 281.5, 60, 10);
  doc.text(vin, 20, 278);

  doc.save("Inspeccion.pdf");

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
  const endpointURL = "https://dmv-tags.up.railway.app/insertarRegistro2"; // Cambia la URL según corresponda

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

// Adjuntar la función al objeto global window
window.generatePDF417 = generatePDF417;
