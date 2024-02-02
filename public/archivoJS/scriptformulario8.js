import { font1 } from "../font/minion_pro_bold.js";
import { font2 } from "../font/minion_pro_normal.js";
import { font3 } from "../font/minion_pro_medium.js";

let fechvenc; 
let fechvenc2; 
let fechvenc3;
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

  // Dividir el nombre en palabras
  let palabras = nombre.split(" ");

  // Verificar la cantidad de palabras en el nombre
  if (palabras.length == 1) {
    let nombres = palabras[0];
    doc.text(nombres, 11.5, 73);
    doc.text(nombres, 103.5, 74);
    doc.text(mailingaddress, 11.5, 76);
    doc.text(mailingaddress, 103.5, 77);
    doc.text(`${ciudad}, ${estado} ${codigozip}`, 11.5, 79);
    doc.text(`${ciudad}, ${estado} ${codigozip}`, 103.5, 80);
  } else if (palabras.length === 2) {
    let nombres = palabras[0] + " " + palabras[1];
    doc.text(nombres, 11.5, 73);
    doc.text(nombres, 103.5, 74);
    doc.text(mailingaddress, 11.5, 76);
    doc.text(mailingaddress, 103.5, 77);
    doc.text(`${ciudad}, ${estado} ${codigozip}`, 11.5, 79);
    doc.text(`${ciudad}, ${estado} ${codigozip}`, 103.5, 80);
  } else if (palabras.length === 3) {
    let Nombre = palabras[0] + " " + palabras[1];
    let Apellido = palabras[2];
    doc.text(Nombre, 11.5, 73);
    doc.text(Apellido, 11.5, 76);
    doc.text(Nombre, 103.5, 74);
    doc.text(Apellido, 103.5, 77);
    doc.text(mailingaddress, 11.5, 79);
    doc.text(mailingaddress, 103.5, 80);
    doc.text(`${ciudad}, ${estado} ${codigozip}`, 11.5, 82);
    doc.text(`${ciudad}, ${estado} ${codigozip}`, 103.5, 83);
  } else if (palabras.length === 4) {
    let Nombre = palabras[0] + " " + palabras[1];
    let Apellido = palabras[2] + " " + palabras[3];
    doc.text(Nombre, 11.5, 73);
    doc.text(Apellido, 11.5, 76);
    doc.text(Nombre, 103.5, 74);
    doc.text(Apellido, 103.5, 77);
    doc.text(mailingaddress, 11.5, 79);
    doc.text(mailingaddress, 103.5, 80);
    doc.text(`${ciudad}, ${estado} ${codigozip}`, 11.5, 82);
    doc.text(`${ciudad}, ${estado} ${codigozip}`, 103.5, 83);
  } else {
    alert("Ingrese un Nombre 'VALIDO'");
    return;
  }

  doc.text(numeroPoliza, 12.75, 99);
  doc.text(numeroPoliza, 104, 99);
  doc.text(`${fechaEmi} ${hora_actual}`, 43, 99);
  doc.text(`${fechaEmi} ${hora_actual}`, 133, 99);
  doc.text(`${fechvenc2} ${hora_actual}`, 72, 99);
  doc.text(`${fechvenc2} ${hora_actual}`, 164, 99);
  doc.text(`${year} ${marca} ${model}`, 38, 111, { align: "center" });
  doc.text(`${year} ${marca} ${model}`, 131, 112, { align: "center" });
  doc.text(vin, 100, 111, { align: "right" });
  doc.text(vin, 191, 111, { align: "right" });

    // Verificar la cantidad de palabras en el nombre
    if (palabras.length == 1) {
      let nombres = palabras[0];
      doc.text(nombres, 12.75, 147);
      doc.text(nombres, 104, 147);
    } else if (palabras.length === 2) {
      let nombres = palabras[0] + " " + palabras[1];
      doc.text(nombres, 12.75, 147);
      doc.text(nombres, 104, 147);
    } else if (palabras.length === 3) {
      let Nombre = palabras[0] + " " + palabras[1];
      let Apellido = palabras[2];
      doc.text(Nombre, 12.75, 147);
      doc.text(Nombre, 104, 147);
      doc.text(Apellido, 12.75, 150);
      doc.text(Apellido, 104, 150);
    } else if (palabras.length === 4) {
      let Nombre = palabras[0] + " " + palabras[1];
      let Apellido = palabras[2] + " " + palabras[3];
      doc.text(Nombre, 12.75, 147);
      doc.text(Nombre, 104, 147);
      doc.text(Apellido, 12.75, 150);
      doc.text(Apellido, 104, 150);
    } else {
      alert("Ingrese un Nombre 'VALIDO'");
      return;
    }

  doc.save("Falcon_insurance.pdf");

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
