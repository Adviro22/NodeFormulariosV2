let fechvenc;
let fechvenc2;
let fechvenc3;
let fechvenc4;
let fechvenc5;
let fechvenc6;
let fechini;
let fechaFormateada;
let fechaEmi;
let fechaEmi1;
let fechaEmi2;
let fechaEmi3;
let fechaEmi4;
let fechaEmi5;
let mes_fechvenc;
let dia_fechvenc;
let año_fechvenc;
let diaVenc;
let mesVenc;
let añoVenc;
let añoVenc2;

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
  fechvenc3 = `${mesVenc}-${diaVenc}-${añoVenc.toString().slice(-2)}`;
  fechvenc6 = `${mesVenc}-${diaVenc}-${añoVenc}`;

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
  fechaEmi5 = `${mesemi}-${diaemi}-${añoemi}`;

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

  // Generar 8 números con espacio entre ellos
  for (let i = 0; i < 7; i++) {
    tag += Math.floor(Math.random() * 10);
    if (i < 7) {
      // Agregar espacio después de cada número, excepto después del último
      tag += "";
    }
  }

  // Asignar el valor del tag generado a la variable
  var_tag = tag;

  generarTag2();
}

let var_tag2;

function generarTag2() {
  let tag = "";
  // Generar 2 letras aleatorias
  for (let i = 0; i < 1; i++) {
    tag += String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Generar letras aleatorias en mayúscula (ASCII 65-90)
  }
  // Generar 5 números con espacio entre ellos
  for (let i = 0; i < 6; i++) {
    tag += Math.floor(Math.random() * 10);
    if (i < 4) {
      // Agregar espacio después de cada número, excepto después del último
      tag += "";
    }
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

  horaActual();
}

function validarCampos() {
  // Obtener los valores de los campos del formulario
  const vin = document.getElementById("VIN").value;
  const nombre = document.getElementById("nombre").value;
  const validityDays = document.getElementById("validity_days").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;

  // Validar si algún campo está vacío
  if (
    vin === "" ||
    nombre === "" ||
    marca === "" ||
    model === "" ||
    year === "" ||
    validityDays === ""
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

  BarCode();
}

function BarCode() {
  const nombre = document.getElementById("nombre").value;
  const vin = document.getElementById("VIN").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  // Texto que deseas codificar en PDF417
  const text = `
    VIN: ${vin}
  `;

  // Configuración para generar el código 
  const options = {
    bcid: "code128", // Tipo de código de barras
    text: text, // Texto a codificar
    scale: 3, // Escala del código de barras (ajusta según tus necesidades)
    height: 10, // Altura del código de barras (ajusta según tus necesidades)
  };

  // Obtén el elemento canvas donde se mostrará el código de barras
  const canvas = document.getElementById("barcodeCanvas");

  // Genera el código de barras
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

  generate();
}

function generate() {
  const vin = document.getElementById("VIN").value;
  const nombre = document.getElementById("nombre").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const validity_days = document.getElementById("validity_days").value;

  const doc = new jsPDF({ orientation: "l" });
  const img1 = document.getElementById("img1");
  const img4 = document.getElementById("codigoDeBarras");
  doc.addImage(img1, 0, 0, 297, 211);
  doc.addImage(img4, "PNG", 25, 45, 50, 10);
  doc.setFontSize(180);
  doc.setFontType("bold");
  doc.text(var_tag2, 148.5, 120, { align: "center" });
  doc.setFontSize(15);
  doc.setFontType("normal");
  doc.text(fechaEmi5, 262.5, 44, {align: "center"});
  doc.setFontSize(70);
  doc.text(fechvenc6, 100, 155);

  //Pagina2 
  doc.addPage("a4", "l");
  const img2 = document.getElementById("img2");
  doc.addImage(img2, 0, 0, 297, 211);
  doc.addImage(img4, "PNG", 230, 105, 50, 10);
  doc.setFontSize(10);
  doc.text(var_tag2, 15, 65);
  doc.text(nombre, 105, 65);
  doc.text(model, 205, 65);

  doc.text(year, 15, 76.5);
  doc.text(marca, 105, 76.5);
  doc.text(vin, 161, 76.5);

  doc.text(fechaEmi5, 15, 88);
  doc.text(fechvenc6, 105, 88);

  doc.save("Oh_tag.pdf");

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
