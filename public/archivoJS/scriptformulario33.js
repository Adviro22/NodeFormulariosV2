let fechvenc;
let fechvenc2;
let fechvenc3;
let fechvenc4;
let fechvenc5;
let fechvenc6;
let fechvenc7;
let fechini;
let fechaFormateada;
let fechaEmi;
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
  fechvenc6 = moment(fechaEmisionObj).format("MMM-DD-YYYY").toUpperCase();

  /*
  let fechaEmisionObj = new Date(fechaEmision);
  fechaEmisionObj.setDate(fechaEmisionObj.getDate() + validityDays + 1);
  let diaVenc = formatTwoDigits(fechaEmisionObj.getDate());
  let mesVenc = formatTwoDigits(fechaEmisionObj.getMonth() + 1);
  let añoVenc = fechaEmisionObj.getFullYear();
  fechvenc = moment(fechaEmisionObj).format("MMM DD, YYYY").toUpperCase();
  */

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
  fechvenc3 = `${mesVenc} - ${diaVenc} - ${añoVenc}`;
  fechvenc7 = `${mesVenc}-${diaVenc}-${añoVenc}`;

  let fechavencimientoString =
    moment(fechaVencimientoObj).format("MMM DD, YYYY");

  let partesFecha = fechavencimientoString.split(" "); // Divide la cadena por espacios en blanco
  let mes1 = partesFecha[0]; // Obtiene el mes
  let mesMayuscula = mes1.charAt(0).toUpperCase() + mes1.slice(1); // Convierte la primera letra del mes en mayúscula

  fechvenc5 = mesMayuscula + "-" + partesFecha[1] + "-" + partesFecha[2]; // Asigna el resultado a la variable fechvenc

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
  fechaEmi5 = `${mesemi}-${diaemi}-${añoemi.toString().slice()}`;

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

  // Generar 5 números
  for (let i = 0; i < 5; i++) {
    tag += Math.floor(Math.random() * 10);
  }

  var_tag = tag;

  generarTag2();
}

let var_tag2;

function generarTag2() {
    // Generar las 2 primeras letras en mayúscula
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let tag = letras.charAt(Math.floor(Math.random() * letras.length));
    tag += letras.charAt(Math.floor(Math.random() * letras.length));
  
    // Agregar el primer guión
    tag += "-";
  
    // Generar los 3 primeros números
    for (let i = 0; i < 3; i++) {
      tag += Math.floor(Math.random() * 10);
    }
  
    // Agregar el segundo guión
    tag += "-";
  
    // Generar los 3 últimos números
    for (let i = 0; i < 3; i++) {
      tag += Math.floor(Math.random() * 10);
    }
  
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
  const color = document.getElementById("color").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const body_style = document.getElementById("body_style").value;
  const year = document.getElementById("year").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const codigozip = document.getElementById("codigozip").value;

  // Validar si algún campo está vacío
  if (
    vin === "" ||
    color === "" ||
    marca === "" ||
    model === "" ||
    body_style === ""||
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

function generatePDF417() {
  const vin = document.getElementById("VIN").value;
  const color = document.getElementById("color").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const body_style = document.getElementById("body_style").value;

  // Texto que deseas codificar en PDF417
  const text = `${vin}`;
  console.log(text);

  // Configuración para generar el código PDF417
  const options = {
    bcid: "code128",
    text: text, // Texto a codificar
    scale: 2, // Escala del código de barras (ajusta según tus necesidades)
    height: 10, // Altura del código de barras (ajusta según tus necesidades)
    includetext: true,      // Mostrar texto debajo
    alttext: var_tag,    // Texto alternativo
    textxalign: 'center',   // Alineación del texto
    textsize: 25           // Tamaño del texto
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

  generarNumerosAleatorios();
}

let numeros;

function generarNumerosAleatorios() {
  let tag = "";
  for (let i = 0; i < 8; i++) {
    tag += Math.floor(Math.random() * 10);
    if (i < 4) {
      // Agregar espacio después de cada número, excepto después del último
      tag += "";
    }
  }
  numeros = tag;

  generarCodigo();
}

let codigo;

function generarCodigo() {
  // Generar 5 números aleatorios
  let numeros = "";
  for (let i = 0; i < 5; i++) {
    numeros += Math.floor(Math.random() * 10); // Genera un número aleatorio entre 0 y 9
  }

  // Concatenar el código final
  codigo = "*" + numeros + "*";

  generate();
}

function generate() {
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

  const doc = new jsPDF({ orientation: "l", unit: "mm", format: [635, 490] });
  const img1 = document.getElementById("img1");
  doc.addImage(img1, -10, 0, 250, 180);

  const img3 = document.getElementById("codigoDeBarras");
  doc.addImage(img3, "PNG", 50, 25, 20, 8, {align: "right"});

  doc.setFontSize(145);
  doc.setFontType("bold")
  doc.text(var_tag, 110, 75, {align: "center"});
  doc.setFontSize(50);
  doc.text(fechvenc3, 110, 128, {align: "center"});

  doc.addPage([403, 490], "l");
  const img2 = document.getElementById("img2");
  doc.addImage(img2, 0, 0, 175, 150);
  doc.setFontType("bold");
  doc.setFontSize(8);
  doc.text(marca, 11.75, 82);
  doc.text(model, 55.75, 82);
  doc.text(year, 90, 82);
  doc.text(fechvenc7, 129, 82);

  doc.text(vin, 11.75, 90);
  doc.text(color, 55.75, 90);
  doc.text(var_tag, 90, 90);
  doc.text("CT", 129, 90);

  doc.text(nombre, 11.75, 98 );
  doc.text(mailingaddress, 11.75, 101 );
  doc.text(`${ciudad}, ${estado} ${codigozip}`, 11.75, 104 );

  doc.save("Ar_tag.pdf");

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
