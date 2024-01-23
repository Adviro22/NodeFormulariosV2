import { font1 } from "../font/RockSalt.js";

let fechvenc;
let fechvenc2;
let fechvenc3;
let fechini;
let fechaFormateada;
let fechaEmi;
let fechaEmi2
let fechaEmisionObj;
let fechaEmisionObj2;
let lista_fechvenc;
let fecha_venc4;
let diaVenc;
let mesVenc;
let anioVenc;

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

  let soloMes = moment(fechaEmisionObj.toISOString())
    .format("MMM")
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

  diaVenc = fechaEmisionObj.getUTCDate().toString().padStart(2, "0");
  mesVenc = (fechaEmisionObj.getUTCMonth() + 1).toString().padStart(2, "0");
  anioVenc = fechaEmisionObj.getUTCFullYear().toString();
  fechvenc2 = `${mesVenc}${diaVenc}${anioVenc.slice(-2)}`;
  fechvenc3 = `${mesVenc}/${diaVenc}/${anioVenc}`;
  lista_fechvenc = (mesVenc + diaVenc + anioVenc.slice(-2))
    .split("")
    .map(Number);
  console.log(lista_fechvenc);

  let diaEmi = (fechaEmisionObj2.getUTCDate() - 1).toString().padStart(2, "0");
  let mesEmi = (fechaEmisionObj2.getUTCMonth() + 1).toString().padStart(2, "0");
  let anioEmi = fechaEmisionObj2.getUTCFullYear().toString();
  fechaEmi = `${mesEmi} - ${diaEmi} - ${anioEmi.slice()}`; // Cambio aquí
  fechaEmi2 = `${mesEmi}/${diaEmi}/${anioEmi.slice()}`;

  fechvenc = fechaVencimientoFormateada;
  fechini = fechaEmisionFormateada;
  fecha_venc4 = `${diaVenc}-${soloMes}-${anioVenc}`;

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

  // Generar los ocho números del tag
  for (let i = 0; i < 8; i++) {
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
  const body_style = document.getElementById("body_style").value;
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
    body_style ==="" ||
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

let numeroAleatorio;

function generarNumeroAleatorio() {
  // Obtener la hora actual en milisegundos
  numeroAleatorio = Math.floor(
    Math.random() * (9999999 - 1000000 + 1) + 1000000
  );
  generate();
}

function generate() {
  const validityDays = document.getElementById("validity_days").value;
  const vin = document.getElementById("VIN").value;
  const color = document.getElementById("color").value;
  const nombre = document.getElementById("nombre").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const body_style = document.getElementById("body_style").value;
  const year = document.getElementById("year").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const codigozip = document.getElementById("codigozip").value;

  const doc = new jsPDF({
    orientation: "l",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
    floatPrecision: 16,
  });

  doc.addFileToVFS("rocksalt.ttf", font1);
  doc.addFont("rocksalt.ttf", "RockSalt", "normal");

  const img1 = document.getElementById("img1");
  doc.addImage(img1, 0, 0, 297, 211);
  doc.setFont("RockSalt");
  doc.setFontStyle("normal");
  doc.setFontSize(8);
  doc.text(`${year} ${marca}`, 115, 67);
  doc.text(vin, 93, 75);
  doc.text(fechaEmi, 115, 83);
  doc.setFontSize(50);
  doc.setTextColor(14, 52, 88);
  doc.text(mesVenc, 40, 60, { align: "center" });
  doc.text(diaVenc, 40, 93, { align: "center" });
  doc.text(anioVenc, 40, 126, { align: "center" });
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica");
  doc.setFontStyle("bold");
  doc.setFontSize(130);
  doc.text(var_tag, 185, 138, {align: "center"});
  doc.setFontSize(25);
  doc.setTextColor(255, 0, 0);
  doc.text(validityDays, 135, 30, {align: "right"});

  //Segunda Página
  doc.addPage("a4", "m");
  const img2 = document.getElementById("img2");
  doc.addImage(img2, 0, 0, 211, 297);
  doc.setFontSize(10);
  doc.setFontStyle("normal");
  doc.setTextColor(0, 0, 0);
  doc.text(nombre, 35, 107);
  doc.text(ciudad, 35, 115);
  doc.text(estado, 105, 115);
  doc.text(codigozip, 172, 115);

  doc.text(vin, 42.5, 148, {align: "center"});
  doc.text(var_tag, 83, 148, {align: "center"});
  doc.text(year, 108, 148, {align: "center"});
  doc.text(marca, 127, 148, {align: "center"});
  doc.text(model, 146.5, 148, {align: "center"});
  doc.text(color, 165.5, 148, {align: "center"});
  doc.text(body_style, 185, 148, {align: "center"});

  doc.text(fechaEmi2, 172, 181, {align: "center"});
  doc.text(fechaEmi2, 172, 194, {align: "center"});

  doc.save("La_tag.pdf");

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
