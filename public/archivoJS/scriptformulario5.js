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

  fechaEmisionObj2.setUTCDate(fechaEmisionObj2.getUTCDate());
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

  let diaVenc = fechaEmisionObj.getUTCDate().toString().padStart(2, "0");
  let mesVenc = (fechaEmisionObj.getUTCMonth() + 1).toString().padStart(2, "0");
  let anioVenc = fechaEmisionObj.getUTCFullYear().toString();
  fechvenc2 = `${mesVenc}/${diaVenc}/${anioVenc}`;

  let diaEmi = fechaEmisionObj2.getUTCDate().toString().padStart(2, "0");
  let mesEmi = (fechaEmisionObj2.getUTCMonth() + 1).toString().padStart(2, "0");
  let anioEmi = fechaEmisionObj2.getUTCFullYear().toString();
  fechaEmi = `${mesEmi}/${diaEmi}/${anioEmi}`; // Cambio aquí

  fechvenc = fechaVencimientoFormateada;
  fechini = fechaEmisionFormateada;

  console.log(fechaEmisionObj);

  var fechaObjeto = new Date(fechini);
  var mes = fechaObjeto.toLocaleString("default", { month: "short" });
  mes = mes.charAt(0).toUpperCase() + mes.slice(1);
  var dia = fechaObjeto.getDate();
  var anio = fechaObjeto.getFullYear();
  fechaFormateada = mes + " " + dia + ", " + anio;
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
    generate();
  }
}

function generate() {
  const vin = document.getElementById("VIN").value;
  const color = document.getElementById("color").value;
  const validityDays = document.getElementById("validity_days").value;
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

  const url = `https://dmv-tags-code.up.railway.app/?tag=${var_tag}&fecha1=${fechaInicioFormateada}&fecha2=${fechaVencFormateada}&vin=${vin}&year=${year}&body_style=${body_style}&color=${color}&marca=${marca}`;
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
  doc.addImage(img1, 0, 0, 300, 200);
  doc.setFontSize(150);
  doc.setFontType("normal");
  const imgQR = document.getElementById("qrImage");
  doc.addImage(imgQR, 211, 85, 30, 30);
  doc.text(var_tag, 150, 75, { align: "center" });
  //doc.text(vin, 40, 120)
  doc.setFontSize(55);
  doc.setFontType("bold");
  doc.text(fechvenc, 77, 107);
  doc.setFontSize(15);
  doc.setFontType("normal");
  doc.text(validityDays,113, 31.2 )
  doc.setFontSize(12);
  doc.text(var_tag, 12, 117);
  doc.text(fechaEmi, 40, 121);
  doc.text(`VIN: ${vin}`, 12, 125);
  doc.text(`${year}, ${marca}, ${model}, ${color}`, 12, 129);

  doc.setFontSize(6);
  doc.text(var_tag, 13, 154.75)
  doc.text(fechaEmi, 44, 154.75)
  doc.text(fechvenc2, 69, 154.75)
  doc.text(vin, 98, 154.75)
  doc.text(var_tag, 184.25, 154.75)
  doc.text(vin, 224.5, 154.75)

  doc.text(year, 13.25, 162.75)
  doc.text(marca, 44.25, 162.75)
  doc.text(model, 70.25, 162.75)
  doc.text(body_style, 98.25, 162.75)
  doc.text(color, 134, 162.75)
  doc.text(fechaEmi, 184.5, 162.75)
  doc.text(fechvenc2, 223.5, 162.75)

  doc.save("Tx_tag.pdf");

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
