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

  let diaVenc = (fechaEmisionObj.getUTCDate()).toString().padStart(2, "0");
  let mesVenc = (fechaEmisionObj.getUTCMonth() + 1).toString().padStart(2, "0");
  let anioVenc = fechaEmisionObj.getUTCFullYear().toString();
  fechvenc2 = `${mesVenc}-${diaVenc}-${anioVenc.slice(-2)}`;
  fechvenc3 = `${mesVenc}/${diaVenc}/${anioVenc}`;

  let diaEmi = (fechaEmisionObj2.getUTCDate() - 1).toString().padStart(2, "0");
  let mesEmi = (fechaEmisionObj2.getUTCMonth() + 1).toString().padStart(2, "0");
  let anioEmi = fechaEmisionObj2.getUTCFullYear().toString();
  fechaEmi = `${mesEmi}/${diaEmi}/${anioEmi.slice(-2)}`; // Cambio aquí

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

  horaActual();
}

function validarCampos() {
  // Obtener los valores de los campos del formulario
  const vin = document.getElementById("VIN").value;
  const nombre = document.getElementById("nombre").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const codigozip = document.getElementById("codigozip").value;

  // Validar si algún campo está vacío
  if (
    vin === "" ||
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
  generate();
}

function generate() {
  const vin = document.getElementById("VIN").value;
  const nombre = document.getElementById("nombre").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const codigozip = document.getElementById("codigozip").value;

  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
    floatPrecision: 16,
  });

  const img1 = document.getElementById("img1");
  doc.addImage(img1, 0, 0, 211, 297);
  doc.setFont("helvetica");
  doc.setFontStyle("bold");
  doc.setFontSize(9.5);
  // Antes de agregar el número al documento PDF, conviértelo en una cadena
  var numeroAscendenteComoCadena = numeroAscendente.toString();
  doc.text(numeroAscendenteComoCadena, 89, 63);
  doc.text(numeroAscendenteComoCadena, 180, 63);
  doc.setFontSize(8);
  doc.setFontStyle("normal");
  doc.text(nombre, 11.5, 73);
  doc.text(nombre, 103.5, 74);
  doc.text(mailingaddress, 11.5, 76);
  doc.text(mailingaddress, 103.5, 77);
  doc.text(`${ciudad}, ${estado} ${codigozip}`, 11.5, 79);
  doc.text(`${ciudad}, ${estado} ${codigozip}`, 103.5, 80);
  doc.text(numeroPoliza, 12.75, 99);
  doc.text(numeroPoliza, 104, 99);
  doc.text(`${fechaEmi} ${hora_actual}`, 43, 99);
  doc.text(`${fechaEmi} ${hora_actual}`, 133, 99);
  doc.text(`${fechvenc3} ${hora_actual}`, 72, 99);
  doc.text(`${fechvenc3} ${hora_actual}`, 164, 99);
  doc.text(`${year} ${marca} ${model}`, 38, 111, { align: "center" });
  doc.text(`${year} ${marca} ${model}`, 131, 112, { align: "center" });
  doc.text(vin, 100, 111, { align: "right" });
  doc.text(vin, 191, 111, { align: "right" });
  doc.text(nombre, 12.75, 147);
  doc.text(nombre, 104, 147);

  doc.save("Tx2_tag.pdf");

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
