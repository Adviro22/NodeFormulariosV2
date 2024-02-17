import { font1 } from "../font/minion_pro_bold.js";
import { font2 } from "../font/minion_pro_normal.js";
import { font3 } from "../font/minion_pro_medium.js";

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
  const validityDays = parseInt(document.getElementById("validity_days").value);

  // Crear objeto de fecha de vencimiento
  let fechaEmisionObj = new Date(fechaEmision);
  fechaEmisionObj.setDate(fechaEmisionObj.getDate() + validityDays + 1);
  let fechaVencimientoObj = fechaEmisionObj.setDate(fechaEmisionObj.getDate() + validityDays + 1);
  let diaVenc = formatTwoDigits(fechaEmisionObj.getDate());
  let mesVenc = formatTwoDigits(fechaEmisionObj.getMonth() + 1);
  let añoVenc = fechaEmisionObj.getFullYear();
  fechvenc = moment(fechaEmisionObj).format("MMM DD, YYYY").toUpperCase();

  // Obtener el mes
  mes_fechvenc = moment(fechvenc, "MMM DD, YYYY").format("MMM").toUpperCase();

  // Obtener el día
  dia_fechvenc = moment(fechvenc, "MMM DD, YYYY").format("DD");

  // Obtener el año
  año_fechvenc = moment(fechvenc, "MMM DD, YYYY").format("YYYY");

  fechvenc2 = moment(fechaEmisionObj).format("MM/DD/YYYY");
  fechvenc3 = `${mesVenc}-${diaVenc}-${añoVenc.toString().slice(-2)}`;

  let fechavencimientoString = moment(fechaVencimientoObj).format("MMM DD, YYYY");

  let partesFecha = fechavencimientoString.split(" "); // Divide la cadena por espacios en blanco
  let mes1 = partesFecha[0]; // Obtiene el mes
  let mesMayuscula = mes1.charAt(0).toUpperCase() + mes1.slice(1); // Convierte la primera letra del mes en mayúscula

  fechvenc5 = mesMayuscula + " " + partesFecha[1] + " " + partesFecha[2]; // Asigna el resultado a la variable fechvenc


  // Nuevo formato de fecha de vencimiento
  let mesAbreviado = fechaEmisionObj
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
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

  // Nuevo formato de fecha de vencimiento
  let mesAbreviado2 = fechaEmisionObj2
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  let diaMesAño2 = `${diaVenc}-${mesAbreviado2}-${añoVenc}`;
  fechaEmi3 = diaMesAño2;

  let partesFechaEmi3 = fechaEmi3.split("-"); // Divide la cadena por el guión
  let mesEmi3 = partesFechaEmi3[1]; // Obtiene el mes
  let mesEmi3MayusculaPrimeraLetra = mesEmi3.charAt(0).toUpperCase() + mesEmi3.slice(1).toLowerCase(); // Convierte la primera letra del mes en mayúscula y el resto en minúscula

  fechaEmi4 = partesFechaEmi3[0] + "-" + mesEmi3MayusculaPrimeraLetra + "-" + partesFechaEmi3[2]; // Formatea la fecha con el mes en mayúscula solo en la primera letra


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

  // Generar 4 números
  for (let i = 0; i < 7; i++) {
    tag += Math.floor(Math.random() * 10);
  }

  // Asignar el valor del tag generado a la variable
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
  const vehiculo = document.getElementById("vehiculo").value;
  const combustible = document.getElementById("combustible").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const codigozip = document.getElementById("codigozip").value;
  const body_style = document.getElementById("body_style").value;

  // Validar si algún campo está vacío
  if (
    vin === "" ||
    color === "" ||
    nombre === "" ||
    vehiculo === "" ||
    combustible === "" ||
    marca === "" ||
    model === "" ||
    year === "" ||
    mailingaddress === "" ||
    ciudad === "" ||
    estado === "" ||
    codigozip === "" ||
    body_style === ""
  ) {
    alert("Por favor, complete todos los campos del formulario.");
  } else {
    // Todos los campos están completos, llamar a la función generate() para generar el PDF
    calcularFecha();
  }
}

function generatePDF417() {
  const nombre = document.getElementById("nombre").value;
  const vin = document.getElementById("VIN").value;
  const color = document.getElementById("color").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  // Texto que deseas codificar en PDF417
  const text = `
    Plate: ${var_tag}
    NAME: ${nombre} 
    MAKE: ${marca}
    MODEL: ${model}
    YEAR: ${year}
    COLOR: ${color}
    VIN: ${vin}
    ADDRESS: ${mailingaddress}
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
  const vehiculo = document.getElementById("vehiculo").value;
  const combustible = document.getElementById("combustible").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const codigozip = document.getElementById("codigozip").value;
  const validityDays = document.getElementById("validity_days").value;
  const body_style = document.getElementById("body_style").value;

  const doc = new jsPDF({ orientation: "l", unit: "px", format: [982.2, 516] });
  const img1 = document.getElementById("img1");
  doc.addImage(img1, 0, 0, 736.65, 387);
  doc.setFont("helvetica");
  doc.setFontSize(150);
  doc.setFontStyle("bold");
  doc.text(var_tag, 368.325, 180, { align: "center" });
  doc.setFontSize(120);
  doc.text(mes_fechvenc, 140, 270, { align: "center" });
  doc.text(dia_fechvenc, 350, 270, { align: "center" });
  doc.text(año_fechvenc, 570, 270, { align: "center" });
  doc.setFontSize(38);
  doc.text(vin, 80, 315);
  doc.text(color, 500, 315);
  doc.text(year, 80, 342);
  doc.text(marca, 240, 342);
  doc.text(body_style, 500, 342);

  //Pagina2
  doc.addPage([1363.8, 551.4], "l");
  const img2 = document.getElementById("img2");
  doc.addImage(img2, 0, 0, 1022.85, 413.55);
  doc.setFontStyle("normal");
  doc.setFontSize(20);
  doc.text(nombre, 60, 315);
  doc.text(var_tag, 795, 315);
  doc.text(mailingaddress, 60, 355);
  doc.text(ciudad, 60, 398);
  doc.text(estado, 400, 398);
  doc.text(codigozip, 610, 398);

  //Pagina3
  doc.addPage([370.8, 813.9], "p");
  const img3 = document.getElementById("img3");
  doc.addImage(img3, 0, 0, 278.1, 610.425);

  doc.setFontSize(8);
  doc.text(fechvenc5, 198, 77);
  doc.text(nombre, 58, 123);
  doc.text(`${mailingaddress}  ${ciudad}, ${estado} ${codigozip}`, 58, 130);
  //TEXTO 1
  doc.setFontSize(7);
  doc.text(vehiculo, 23, 202.5);
  doc.text(vin, 92.5, 202.5);
  doc.text(var_tag, 162.5, 202.5);
  doc.text(fechvenc2, 230.5, 202.5);
  doc.text(year, 23, 220);
  doc.text(marca, 39, 220);
  doc.text(model, 58, 220);
  doc.text(combustible, 162.5, 220);
  doc.text(body_style, 230.5, 220);
  doc.text(color, 23, 235);
  doc.text(fechaEmi, 23, 260);
  doc.text(fechvenc2, 230.5, 257);

  doc.setFontSize(8);
  doc.text(nombre, 27, 280);
  doc.text(`${mailingaddress}  ${ciudad}, ${estado} ${codigozip}`, 27, 287);
  doc.text(fechaEmi4, 107.5, 310);
  const img4 = document.getElementById("codigoDeBarras");
  doc.addImage(img4, "PNG", 170.5, 303, 60, 10);

  //TEXTO 2
  doc.setFontSize(7);
  doc.text(vehiculo, 14.5, 368);
  doc.text(vin, 84, 368);
  doc.text(var_tag, 154, 368);
  doc.text(fechvenc2, 222, 368);
  doc.text(year, 14.5, 385.5);
  doc.text(marca, 30.5, 385.5);
  doc.text(model, 49.5, 385.5);
  doc.text(combustible, 154, 385.5);
  doc.text(body_style, 222, 385.5);
  doc.text(color, 14.5, 400.5);
  doc.text(fechaEmi, 14.5, 425.5);
  doc.text(fechvenc2, 222, 422.5);

  doc.setFontSize(8);
  doc.text(nombre, 18.5, 445.5);
  doc.text(`${mailingaddress}  ${ciudad}, ${estado} ${codigozip}`, 18.5, 453.5);
  doc.text(fechaEmi4, 99, 475.5);
  doc.addImage(img4, "PNG", 162, 468.5, 60, 10);

  doc.save("Colorado.pdf");

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
