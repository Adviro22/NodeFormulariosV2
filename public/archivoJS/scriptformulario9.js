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
let fechaEmi1;
let fechaEmi2;
let fechaEmi3;
let fechaEmi4;
let mes_fechvenc;
let dia_fechvenc;
let año_fechvenc;
let diaVenc;
let mesVenc;
let añoVenc;
let añoVenc2;
let lista_fechvenc;

function formatTwoDigits(number) {
  return number < 10 ? "0" + number : number;
}

function calcularFecha() {
  const fechaEmision = document.getElementById("fechaEmision").value;
  const validityDays = parseInt(document.getElementById("validity_days").value);

  let fechaEmisionObj = new Date(fechaEmision);
  fechaEmisionObj.setDate(fechaEmisionObj.getDate() + validityDays + 1);
  let fechaVencimientoObj = fechaEmisionObj;
  diaVenc = formatTwoDigits(fechaEmisionObj.getDate());
  mesVenc = formatTwoDigits(fechaEmisionObj.getMonth() + 1);
  añoVenc = fechaEmisionObj.getFullYear();
  añoVenc2 = añoVenc.toString().slice(-2);
  fechvenc = moment(fechaEmisionObj).format("MMM DD, YYYY").toUpperCase();
  lista_fechvenc = [];


  while (mesVenc > 0) {
    lista_fechvenc.unshift(mesVenc % 10); // Obtiene el último dígito y lo agrega al inicio del array
    mesVenc = Math.floor(mesVenc / 10); // Elimina el último dígito
  }

  while (diaVenc > 0) {
    lista_fechvenc.unshift(diaVenc % 10); // Obtiene el último dígito y lo agrega al inicio del array
    diaVenc = Math.floor(diaVenc / 10); // Elimina el último dígito
  }

  lista_fechvenc.push(añoVenc2[0]);
  lista_fechvenc.push(añoVenc2[1]);
  console.log(fechvenc);
  console.log(lista_fechvenc);

  console.log(`fechavenc: ${fechvenc}`);
  console.log(`diaVenc: ${diaVenc}`);
  console.log(`mesVenc: ${mesVenc}`);
  console.log(`añoVenc: ${añoVenc}`);
  console.log(`fechaEmisionObj: ${fechaEmisionObj}`);

  // Obtener el mes
  mes_fechvenc = moment(fechvenc, "MMM DD, YYYY").format("MMM").toUpperCase();

  // Obtener el día
  dia_fechvenc = moment(fechvenc, "MMM DD, YYYY").format("DD");

  // Obtener el año
  año_fechvenc = moment(fechvenc, "MMM DD, YYYY").format("YYYY");

  fechvenc2 = moment(fechaEmisionObj).format("MM/DD/YYYY");
  fechvenc3 = `${mesVenc}/${diaVenc}/${añoVenc.toString().slice(-2)}`;

  let fechavencimientoString =
    moment(fechaVencimientoObj).format("MMM DD, YYYY");

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
  fechaEmi1 = `${mesemi}-${diaemi}-${añoemi}`;
  fechaEmi2 = `${mesemi}-${diaemi}-${añoemi.toString().slice(-2)}`;

  // Nuevo formato de fecha de vencimiento
  let mesAbreviado2 = fechaEmisionObj2
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  let diaMesAño2 = `${diaVenc}-${mesAbreviado2}-${añoVenc}`;
  fechaEmi3 = diaMesAño2;

  let partesFechaEmi3 = fechaEmi3.split("-"); // Divide la cadena por el guión
  let mesEmi3 = partesFechaEmi3[1]; // Obtiene el mes
  let mesEmi3MayusculaPrimeraLetra =
    mesEmi3.charAt(0).toUpperCase() + mesEmi3.slice(1).toLowerCase(); // Convierte la primera letra del mes en mayúscula y el resto en minúscula

  fechaEmi4 =
    partesFechaEmi3[0] +
    "-" +
    mesEmi3MayusculaPrimeraLetra +
    "-" +
    partesFechaEmi3[2]; // Formatea la fecha con el mes en mayúscula solo en la primera letra

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
  console.log(lista_fechvenc);
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
