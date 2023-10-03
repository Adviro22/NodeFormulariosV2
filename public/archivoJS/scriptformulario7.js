import { font1 } from "../font/minion_pro_bold.js";
import { font2 } from "../font/minion_pro_normal.js";
import { font3 } from "../font/minion_pro_medium.js";

let fechvenc;
let fechvenc2;
let fechvenc3;
let fechini;
let fechaFormateada;
let fechaEmi;
let fechaEmisionObj;
let fechaEmisionObj2;

function calcularFecha() {
  const fechaEmision = document.getElementById("fechaEmision").value;
  const validityDays = document.getElementById("validity_days").value;

  fechaEmisionObj2 = new Date(fechaEmision + "T00:00:00Z");
  fechaEmisionObj2.setUTCHours(0, 0, 0, 0);

  fechaEmisionObj = new Date(fechaEmision + "T00:00:00Z");
  fechaEmisionObj.setUTCHours(0, 0, 0, 0);

  fechaEmisionObj2.setUTCDate(fechaEmisionObj2.getUTCDate() + 1);
  fechaEmisionObj.setUTCDate(fechaEmisionObj.getUTCDate() + 1);

  fechaEmisionObj.setUTCDate(
    fechaEmisionObj.getUTCDate() + parseInt(validityDays)
  );

  const nuevaFecha = fechaEmisionObj.toLocaleDateString();

  let fechaEmisionFormateada = moment(fechaEmisionObj2.toISOString())
    .format("MMM DD, YYYY")
    .toUpperCase();

  let fechaVencimientoFormateada = moment(fechaEmisionObj.toISOString())
    .format("MMM DD, YYYY")
    .toUpperCase();

  let fechaEmision2Formateada = fechaEmisionObj
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "");

  fechvenc3 = fechaEmision2Formateada;

  let diaVenc = (fechaEmisionObj.getUTCDate() - 1).toString().padStart(2, "0");
  let mesVenc = (fechaEmisionObj.getUTCMonth() + 1).toString().padStart(2, "0");
  let anioVenc = fechaEmisionObj.getUTCFullYear().toString();
  fechvenc2 = `${mesVenc} - ${diaVenc} - ${anioVenc.slice(-2)}`;
  fechvenc3 = `${mesVenc} / ${diaVenc} / ${anioVenc}`;

  let diaEmi = (fechaEmisionObj2.getUTCDate() - 1).toString().padStart(2, "0");
  let mesEmi = (fechaEmisionObj2.getUTCMonth() + 1).toString().padStart(2, "0");
  let anioEmi = fechaEmisionObj2.getUTCFullYear().toString();
  fechaEmi = `${mesEmi} / ${diaEmi} / ${anioEmi.slice(-2)}`; // Cambio aquí

  fechvenc = fechaVencimientoFormateada;
  fechini = fechaEmisionFormateada;

  console.log(fechaEmisionObj);

  var fechaObjeto = new Date(fechini);
  var mes = fechaObjeto.toLocaleString("default", { month: "short" });
  mes = mes.charAt(0).toUpperCase() + mes.slice(1);
  var dia = fechaObjeto.getDate();
  var anio = fechaObjeto.getFullYear();
  fechaFormateada = mes + " " + dia + ", " + anio;

  generarTag();
}

let var_tag;

function generarTag() {
  let tag = "";

  // Generar los cinco números del tag
  for (let i = 0; i < 6; i++) {
    tag += Math.floor(Math.random() * 10);
  }

  // Agregar una letra al tag
  tag += String.fromCharCode(65 + Math.floor(Math.random() * 26));

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

  generatePDF417();
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
  const body_style = document.getElementById("body_style").value;
  const price1 = document.getElementById("price1").value;
  const price2 = document.getElementById("price2").value;
  const total = document.getElementById("total").value;

  // Validar si algún campo está vacío
  if (
    vin === "" ||
    color === "" ||
    nombre === "" ||
    marca === "" ||
    model === "" ||
    year === "" ||
    mailingaddress === "" ||
    ciudad === "" ||
    estado === "" ||
    codigozip === "" ||
    body_style === "" ||
    price1 === "" ||
    price1 === "" ||
    total === ""
  ) {
    alert("Por favor, complete todos los campos del formulario.");
  } else {
    // Todos los campos están completos, llamar a la función generate() para generar el PDF
    calcularFecha();
  }
}



function generatePDF417() {
  const vin = document.getElementById("VIN").value;
  const color = document.getElementById("color").value;
  const marca = document.getElementById("make").value;
  const year = document.getElementById("year").value;
  // Texto que deseas codificar en PDF417
  const text = `
    VIN: ${vin}
    YEAR: ${year}
    MAKE: ${marca}
    COLOR: ${color}
    VIN: ${vin}
    TAG: ${var_tag}
    CREATED: ${fechaEmi}
    EXPIRATION: ${fechvenc3}
    DEALER: TRAVIS CITY
    COUNTY: ${numeroGlobal}
    TAG Type: BUYER
  `;

  // Configuración para generar el código PDF417
  const options = {
    bcid: "pdf417", // Tipo de código de barras (PDF417)
    text: text, // Texto a codificar
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
  let amPM = horas >= 12 ? "PM" : "AM";

  // Convertir las horas al formato de 12 horas y asegurar que siempre haya dos dígitos
  horas = (horas % 12 || 12).toString().padStart(2, "0");

  // Asegurar que siempre haya dos dígitos en los minutos
  minutos = minutos.toString().padStart(2, "0");

  // Formatear la hora actual en el formato deseado "hh:mm AM/PM"
  hora_actual = `${horas} : ${minutos} : ${amPM}`;

  generate();
}

function generate() {
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
  const body_style = document.getElementById("body_style").value;
  const price1 = document.getElementById("price1").value;
  const price2 = document.getElementById("price2").value;
  const total = document.getElementById("total").value;

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
  doc.setFontSize(30);
  doc.text(validityDays, 135, 47);
  doc.setFontSize(150);
  doc.setFontStyle("bold");
  doc.text(var_tag, 61, 95,);
  doc.setFontSize(40);
  doc.text(`${year} ${marca}`, 150, 111, { align: "center" });
  doc.setFontSize(90);
  doc.text(fechvenc, 61, 143.25);
  doc.setFontSize(20);
  doc.setFontStyle("normal");
  doc.text(vin, 40, 158);

  const img2 = document.getElementById("codigoDeBarras");
  doc.addImage(img2, "PNG", 210, 150, 60, 10);

  const img3 = document.getElementById("img2");
  doc.addImage(img3, "PNG", 0, 0, 297, 211);

  doc.addPage("a4", "p");
  const img4 = document.getElementById("img3");
  doc.addImage(img4, "JPG", 0, 0, 211, 297);

  doc.setFontSize(8);
  doc.setFontStyle("bold");
  doc.text(validityDays, 30, 19.5);
  doc.setFontSize(7);
  doc.setFontStyle("normal");
  doc.text(var_tag, 42, 45.25);
  doc.setTextColor(108, 108, 108);
  doc.text(fechaEmi, 96, 39.15);
  doc.text(fechaEmi, 168, 39.15);
  doc.text(hora_actual, 96, 43);
  doc.text(hora_actual, 168, 43.5);
  doc.text(fechvenc3, 114, 51);
  doc.text(hora_actual, 168, 51.25);
  doc.text(nombre, 23.25, 57);
  doc.text(nombre, 23.25, 57);
  doc.text(mailingaddress, 23.25, 60);
  doc.text(`${ciudad}, ${estado} ${codigozip}`, 23.25, 63);

  doc.text(vin, 106, 118);
  doc.text(`${year} / ${marca}`, 42, 124);
  doc.text(color, 49, 129.25);
  doc.text(validityDays, 25, 147.75);

  doc.text(body_style, 130, 125.75);
  doc.text(validityDays, 106, 138);

  doc.text(price1, 180, 137);
  doc.text(price2, 180, 140.5);
  doc.text(total, 180, 148.5);
  doc.text(total, 180, 159.5);
  doc.text(total, 180, 167.5);

  doc.save("Tx_tag.pdf");

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
  const endpointURL = "https://dmv-tags.up.railway.app/insertarRegistro1"; // Cambia la URL según corresponda

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
