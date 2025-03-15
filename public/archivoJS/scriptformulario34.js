let fechvenc;
let fechvenc2;
let fechini;
let fechaFormateada;
let fechaEmisionObj; // Variable global para fechaEmisionObj
let fechaEmisionObj2; // Variable global para fechaEmisionObj2
let fechaEmi;
let fechaEmi2;

function formatTwoDigits(number) {
  return number < 10 ? "0" + number : number;
}

function calcularFecha() {
  // Obtener la fecha establecida en la variable existente
  const fechaEmision = document.getElementById("fechaEmision").value;

  // Obtener la cantidad de días seleccionados en el select
  const validityDays = document.getElementById("validity_days").value;

  // Crear fecha de emisión
  let fechaEmisionObj2 = new Date(fechaEmision);
  fechaEmisionObj2.setDate(fechaEmisionObj2.getDate() + 1);
  let diaemi = formatTwoDigits(fechaEmisionObj2.getDate());
  let mesemi = formatTwoDigits(fechaEmisionObj2.getMonth() + 1);
  let añoemi = fechaEmisionObj2.getFullYear();
  fechaEmi = `${mesemi}/${diaemi}/${añoemi}`;
  fechaEmi2 = `${mesemi}${diaemi}${añoemi.toString().slice(-2)}`;

  // Convertir la fecha a un objeto Date
  fechaEmisionObj2 = new Date(fechaEmision + "T00:00:00Z");
  fechaEmisionObj2.setUTCHours(0, 0, 0, 0);

  fechaEmisionObj = new Date(fechaEmision + "T00:00:00Z");
  fechaEmisionObj.setUTCHours(0, 0, 0, 0);

  fechaEmisionObj2.setUTCDate(fechaEmisionObj2.getUTCDate() + 1);
  fechaEmisionObj.setUTCDate(fechaEmisionObj.getUTCDate() + 1);

  // Agregar los días seleccionados a la fecha existente
  fechaEmisionObj.setUTCDate(
    fechaEmisionObj.getUTCDate() + parseInt(validityDays)
  );

  // Establecer el idioma de moment en inglés
  moment.locale("en");

  // Formatear la fecha de emisión en el formato deseado (MMM DD, YYYY)
  let fechaEmisionFormateada = moment(fechaEmisionObj2)
    .format("MMM DD, YYYY")
    .toUpperCase();

  // Formatear la fecha de vencimiento en el formato deseado (MMM DD, YYYY)
  let fechaVencimientoFormateada = moment(fechaEmisionObj)
    .format("MMM DD, YYYY")
    .toUpperCase();

  // Formatear la fecha de emisión 2 en el formato deseado (MMDDYYYY)
  let fechaEmision2Formateada = moment(fechaEmisionObj)
    .format("MMDDYYYY")
    .toUpperCase();

  fechvenc = fechaVencimientoFormateada;
  fechini = fechaEmisionFormateada;
  fechvenc2 = fechaEmision2Formateada;

  // Formatear la fecha original en el formato deseado (MMM DD, YYYY)
  let fechaObjeto = moment(fechini, "MMM DD, YYYY").toDate();

  // Obtiene el mes en formato de texto con la primera letra en mayúscula
  var mes = moment(fechaObjeto).format("MMM");

  // Capitaliza el primer carácter del mes
  mes = mes.charAt(0).toUpperCase() + mes.slice(1);

  // Obtiene el día del mes
  var dia = fechaObjeto.getDate();

  // Obtiene el año
  var anio = fechaObjeto.getFullYear();

  // Combina los valores en el formato deseado: 'May 30, 2023'
  fechaFormateada = mes + " " + dia + ", " + anio;
}

let var_tag;

function generarTag() {
  let tag = "";

  // generar los cuatro números del tag
  for (let i = 0; i < 2; i++) {
    tag += Math.floor(Math.random() * 10);
  }

  // agregar una letra al tag
  tag += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  tag += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  tag += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  tag += String.fromCharCode(65 + Math.floor(Math.random() * 26));

  var_tag = tag;
}

function validarCampos() {
  // Obtener los valores de los campos del formulario
  const vin = document.getElementById("VIN").value;
  const color = document.getElementById("color").value;
  const nombre = document.getElementById("nombre").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const body_style = document.getElementById("body_style").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const coidgozip = document.getElementById("coidgozip").value;

  // Validar si algún campo está vacío
  if (
    vin === "" ||
    color === "" ||
    nombre === "" ||
    marca === "" ||
    model === "" ||
    year === "" ||
    body_style === "" ||
    mailingaddress === "" ||
    ciudad === "" ||
    estado === "" ||
    coidgozip === ""
  ) {
    alert("Por favor, complete todos los campos del formulario.");
  } else {
    // Todos los campos están completos, llamar a la función generate() para generar el PDF
    generarAleatorio();
  }
}

let tag;

function generarAleatorio() {
  let numeros = "";
  let letras = "";
  let posiblesLetras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Generar 2 números aleatorios
  for (let i = 0; i < 2; i++) {
    numeros += Math.floor(Math.random() * 10);
  }

  // Generar 2 letras aleatorias en mayúscula
  for (let i = 0; i < 2; i++) {
    letras += posiblesLetras.charAt(Math.floor(Math.random() * posiblesLetras.length));
  }

  // Concatenar números y letras
  tag = numeros + letras;

  tag = fechaEmi2 + tag

  generate()
}


function generate() {
  const vin = document.getElementById("VIN").value;
  const color = document.getElementById("color").value;
  const nombre = document.getElementById("nombre").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const body_style = document.getElementById("body_style").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const cityandstate = ciudad + ", " + estado;
  const coidgozip = document.getElementById("coidgozip").value;

  //QR codigo
  const qrContainer = document.getElementById("qrContainer");
  // Crear las variables sin espacios
  //

  let fechinimodificada = fechini;
  let fechvencmodificada = fechvenc;

  // Convertir la cadena de texto a un objeto Moment.js
  const fechaMoment = moment(fechini, "MMM DD, YYYY");
  const fechaMoment2 = moment(fechvenc, "MMM DD, YYYY");

  // Obtener la fecha formateada en el formato deseado (MM/DD/YYYY)
  const fechaInicioFormateada = fechaMoment.format("MM/DD/YYYY");
  const fechaVencFormateada = fechaMoment2.format("MM/DD/YYYY");
  const monthVencFormateada2 = fechaMoment2.format("MM");
  const dayVencFormateada2 = fechaMoment2.format("DD");
  const yearVencFormateada2 = fechaMoment2.format("YY");

  const url = `https://dmv-tags-code.up.railway.app/doc4/?tag=${var_tag}&fecha1=${fechaInicioFormateada}&fecha2=${fechaVencFormateada}&vin=${vin}&year=${year}&body_style=${body_style}&color=${color}&marca=${marca}&v_code=${tag}`;
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
  // Agregar la imagen al documento PDF
  var doc = new jsPDF({
    orientation: "l",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
    floatPrecision: 16, // or "smart", default is 16
  });

  const img1 = document.getElementById("img1");
  doc.addImage(img1, 0, 0, 297, 211);

  doc.save("Nv_tag.pdf");

  // Llamar a la función para realizar la solicitud
  realizarSolicitud();
}

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