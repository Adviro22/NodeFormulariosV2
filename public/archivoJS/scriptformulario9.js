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
let lista_fechvenc;

function calcularFecha() {
  const fechaEmision = document.getElementById("fechaEmision").value;
  const validityDays = document.getElementById("validity_days").value;
  const mesesDeValidez = Math.floor(validityDays / 30);

  fechaEmisionObj2 = new Date(fechaEmision + "T00:00:00Z");
  fechaEmisionObj2.setUTCHours(0, 0, 0, 0);

  fechaEmisionObj = new Date(fechaEmision + "T00:00:00Z");
  fechaEmisionObj.setUTCHours(0, 0, 0, 0);

  // Restar un día por mes de validez
  for (let i = 0; i < mesesDeValidez; i++) {
    fechaEmisionObj.setUTCMonth(fechaEmisionObj.getUTCMonth() - 1);

    // Manejar restricciones de día
    if (fechaEmisionObj.getUTCDate() <= 0) {
      // Obtener el último día del mes anterior
      fechaEmisionObj.setUTCMonth(fechaEmisionObj.getUTCMonth() - 1);
      const ultimoDiaMesAnterior = new Date(
        fechaEmisionObj.getUTCFullYear(),
        fechaEmisionObj.getUTCMonth() + 1,
        0
      ).getUTCDate();
      fechaEmisionObj.setUTCDate(ultimoDiaMesAnterior);
    }
  }

  // Calcular la fecha de vencimiento restando días
  fechaEmisionObj.setUTCDate(fechaEmisionObj.getUTCDate() + parseInt(validityDays) - 1);

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

  // Obtener el último día del mes de vencimiento
  let diaVenc = new Date(
    fechaEmisionObj.getUTCFullYear(),
    fechaEmisionObj.getUTCMonth() + 1,
    0
  ).getUTCDate().toString().padStart(2, "0");

  let mesVenc = (fechaEmisionObj.getUTCMonth() + 1).toString().padStart(2, "0");
  let anioVenc = fechaEmisionObj.getUTCFullYear().toString().slice(-2);
  fechvenc2 = `${mesVenc}${diaVenc}${anioVenc}`;
  fechvenc3 = `${mesVenc}/${diaVenc}/${anioVenc}`;
  lista_fechvenc = (mesVenc + diaVenc + anioVenc).split("").map(Number);
  console.log(lista_fechvenc);
  console.log(fechaEmisionObj)
  console.log(fechaEmisionObj2)

  let diaEmi = (fechaEmisionObj2.getUTCDate() - 1).toString().padStart(2, "0");
  let mesEmi = (fechaEmisionObj2.getUTCMonth() + 1).toString().padStart(2, "0");
  let anioEmi = fechaEmisionObj2.getUTCFullYear().toString();
  fechaEmi = `${mesEmi}/${diaEmi}/${anioEmi}`;

  fechvenc = fechaVencimientoFormateada;
  fechini = fechaEmisionFormateada;

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

  // Generar las tres letras del tag
  for (let i = 0; i < 3; i++) {
    tag += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  // Generar los cuatro números del tag
  for (let i = 0; i < 4; i++) {
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
  // Fecha de Expiración
  doc.text(lista_fechvenc[0].toString(), 178, 50, { align: "right" });
  doc.text(lista_fechvenc[1].toString(), 197, 50, { align: "right" });
  doc.text(lista_fechvenc[2].toString(), 216, 50, { align: "right" });
  doc.text(lista_fechvenc[3].toString(), 235, 50, { align: "right" });
  doc.text(lista_fechvenc[4].toString(), 254, 50, { align: "right" });
  doc.text(lista_fechvenc[5].toString(), 273, 50, { align: "right" });

  doc.setFontSize(15);
  doc.setFontStyle("normal");
  doc.text(nombre, 29, 38);
  doc.text(mailingaddress, 12, 44);
  doc.text(`${ciudad}, ${estado} ${codigozip}`, 12, 50);

  doc.setFontSize(175);
  doc.setFontStyle("bold");
  doc.text(var_tag, 148.5, 130, { align: "center" });
  doc.setFontStyle("normal");
  doc.setFontSize(13);
  doc.text(vin, 38, 173.5, { align: "center" });
  doc.text(color, 84, 173.5, { align: "center" });

  //Segunda Página
  doc.addPage("a4", "l");
  const img2 = document.getElementById("img2");
  doc.addImage(img2, 0, 0, 297, 211);
  doc.setFontSize(10);
  doc.text(validityDays, 160, 75, { align: "center" });
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.setFontStyle("bold");
  doc.text(var_tag, 53, 75, { align: "center" });
  doc.text(`Exp:${fechvenc3}`, 53, 83, { align: "center" });
  doc.setFontStyle("normal");
  doc.setFontSize(15);
  doc.setTextColor(0, 0, 0);
  doc.text(year, 25, 101.5);
  doc.text(marca, 90, 101.5);
  doc.text(model, 157, 101.5);
  doc.text(color, 228, 101.5);
  doc.setFontSize(13);
  doc.text(vin, 22, 108.5);
  doc.text(nombre, 30, 115.5);
  doc.text(`${mailingaddress} ${ciudad} ${estado} ${codigozip}`, 35, 129.5);
  doc.text(fechaEmi, 167, 192);

  doc.save("Fl_tag.pdf");

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
