import { dealerplate_california } from "../font/dealerplate_california.js";

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
  for (let i = 0; i < 2; i++) {
    tag += String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Generar letras aleatorias en mayúscula (ASCII 65-90)
  }

  // Generar 5 números con espacio entre ellos
  for (let i = 0; i < 5; i++) {
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
  const color = document.getElementById("color").value;
  const nombre = document.getElementById("nombre").value;
  const validityDays = document.getElementById("validity_days").value;
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
    color === "" ||
    nombre === "" ||
    marca === "" ||
    model === "" ||
    year === "" ||
    mailingaddress === "" ||
    ciudad === "" ||
    estado === "" ||
    codigozip === "" ||
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
  const validity_days = document.getElementById("validity_days").value;
  const miles = document.getElementById("miles").value;
  const body_style = document.getElementById("body_style").value;

  const url = `
    OWR: ${nombre}
    COL: ${color}
    MDL: ${model}
    TAG: ${var_tag2}
  `;
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

  const doc = new jsPDF({ orientation: "l" });
  const img1 = document.getElementById("img1");
  doc.addImage(img1, 0, 0, 297, 211);

  //Fuente1
  doc.addFileToVFS("dealerplate_california.ttf", dealerplate_california);
  doc.addFont("dealerplate_california.ttf", "DealerplateCalifornia", "normal");

  //Primera Página
  doc.setFontSize(42);
  doc.setFontType("bold");
  doc.text(mes_fechvenc, 8, 50);
  doc.setFontSize(16);
  doc.text(var_tag, 27, 60);

  const imgQR = document.getElementById("qrImage");
  doc.addImage(imgQR, 52, 35, 25, 25);

  doc.text(marca, 80, 60);
  doc.text(`VIN: ${vin}`, 145, 61.5);
  doc.text(fechvenc2, 260, 61.5);
  doc.setFontSize(42);
  doc.text(`${añoVenc}`, 260, 50, { align: "center" });

  doc.setFontType("normal");
  doc.setFont("DealerplateCalifornia");
  doc.setFontSize(285);
  doc.text(var_tag2, 148.5, 150, { align: "center" });

  //Segunda Página
  doc.addPage("a4", "l");
  doc.addImage(img1, 0, 0, 297, 211);

  doc.setFontSize(42);
  doc.setFontType("bold");
  doc.text(mes_fechvenc, 8, 50);
  doc.setFontSize(16);
  doc.text(var_tag, 27, 60);

  doc.addImage(imgQR, 52, 35, 25, 25);

  doc.text(marca, 80, 60);
  doc.text(`VIN: ${vin}`, 145, 61.5);
  doc.text(fechvenc2, 260, 61.5);
  doc.setFontSize(42);
  doc.text(`${añoVenc}`, 260, 50, { align: "center" });

  doc.setFontType("normal");
  doc.setFont("DealerplateCalifornia");
  doc.setFontSize(285);
  doc.text(var_tag2, 148.5, 150, { align: "center" });

  //Tercera Página
  doc.addPage("a4", "p");
  const img2 = document.getElementById("img2");
  doc.addImage(img2, 0, 0, 211, 297);
  doc.setFontSize(15);
  doc.setFont("helvetica");
  doc.setFontType("bold");
  doc.text(var_tag, 170, 157);
  doc.setFontType("normal");
  doc.setFontSize(8);
  doc.text(marca, 9, 170);
  doc.text(year, 51, 170);
  doc.text(model, 70, 170);
  doc.text(body_style, 90, 170);
  doc.text(vin, 110, 170);

  doc.text(var_tag2, 100, 179);
  doc.text(fechvenc2, 162, 179);

  doc.text(nombre, 15, 188);

  doc.text(mailingaddress, 9, 197);
  doc.text(ciudad, 110, 197);
  doc.text(estado, 167, 197);
  doc.text(codigozip, 179, 197);

  doc.setFontSize(15)

  let digitos;

  //Condicional para las millas
  if (miles !== null && miles !== undefined) {
    // Convertir el número a una cadena de caracteres para contar los dígitos
    let numStr = miles.toString();

    // Calcular la cantidad de dígitos
    let numDigitos = numStr.length;

    // Crear un array para almacenar los dígitos individualmente
    digitos = [];

    // Recorrer la cadena y convertir cada dígito en un número
    for (let i = 0; i < numStr.length; i++) {
      digitos.push(parseInt(numStr.charAt(i)));
    }

    // Imprimir la cantidad de dígitos y el array de dígitos
    console.log("El número tiene " + numDigitos + " dígitos.");
    console.log("Dígitos individualmente: ", digitos);
  }

  // Millas 6
  if (digitos.length === 6) {
    let x = 0;
    let postion_x = 65.0;

    while (x < 3) {
      doc.text(`${digitos[x]}`, postion_x, 205, { align: "center" });
      postion_x = postion_x + 7.5;
      x++;
    }

    let x2 = 3
    let postion_x2 = 89
    while (x2 < 6) {
      doc.text(`${digitos[x2]}`, postion_x2, 205, { align: "center" });
      postion_x2 = postion_x2 + 7.5;
      x2++;
    }
  }

  // millas 5
  if (digitos.length === 5) {
    let x = 0;
    let postion_x = 72.5;

    while (x < 2) {
      doc.text(`${digitos[x]}`, postion_x, 205, { align: "center" });
      postion_x = postion_x + 7.5;
      x++;
    }

    let x2 = 2
    let postion_x2 = 89
    while (x2 < 5) {
      doc.text(`${digitos[x2]}`, postion_x2, 205, { align: "center" });
      postion_x2 = postion_x2 + 7.5;
      x2++;
    }
  }

  // Millas 4
  if (digitos.length === 4) {
    let x = 0;
    let postion_x = 80.0;

    while (x < 1) {
      doc.text(`${digitos[x]}`, postion_x, 205, { align: "center" });
      postion_x = postion_x + 7.5;
      x++;
    }

    let x2 = 1
    let postion_x2 = 89
    while (x2 < 4) {
      doc.text(`${digitos[x2]}`, postion_x2, 205, { align: "center" });
      postion_x2 = postion_x2 + 7.5;
      x2++;
    }
  }

  //Millas 3
  if (digitos.length === 3) {
    let x2 = 0
    let postion_x2 = 89
    while (x2 < 3) {
      doc.text(`${digitos[x2]}`, postion_x2, 205, { align: "center" });
      postion_x2 = postion_x2 + 7.5;
      x2++;
    }
  }

  // Millas 2
  if (digitos.length === 2) {
    let x2 = 0
    let postion_x2 = 96.5
    while (x2 < 2) {
      doc.text(`${digitos[x2]}`, postion_x2, 205, { align: "center" });
      postion_x2 = postion_x2 + 7.5;
      x2++;
    }
  }

  // Millas 1
  if (digitos.length === 1) {
    let x2 = 0
    let postion_x2 = 104
    while (x2 < 1) {
      doc.text(`${digitos[x2]}`, postion_x2, 205, { align: "center" });
      postion_x2 = postion_x2 + 7.5;
      x2++;
    }
  }

  doc.save("Ca_tag.pdf");

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
