let fechvenc;
let fechvenc2;
let fechini;
let fechaFormateada;
let fechaEmisionObj; // Variable global para fechaEmisionObj
let fechaEmisionObj2; // Variable global para fechaEmisionObj2

function calcularFecha() {
  // Obtener la fecha establecida en la variable existente
  const fechaEmision = document.getElementById("fechaEmision").value;

  // Obtener la cantidad de días seleccionados en el select
  const validityDays = document.getElementById("validity_days").value;

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
  for (let i = 0; i < 4; i++) {
    tag += Math.floor(Math.random() * 10);
  }

  // agregar una letra al tag
  tag += String.fromCharCode(65 + Math.floor(Math.random() * 26));

  // agregar los dos últimos números del tag
  for (let i = 0; i < 2; i++) {
    tag += Math.floor(Math.random() * 10);
  }
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
  doc.addImage(img1, 0, 30, 300, 150);
  doc.setFontSize(170);
  doc.setFontType("bold");
  const imgQR = document.getElementById("qrImage");
  doc.addImage(imgQR, 241, 52, 30, 30);
  doc.text(var_tag, 150, 130, { align: "center" });
  //doc.text(vin, 40, 120)
  doc.setFontSize(70);
  doc.text(fechvenc, 77, 82);
  doc.setFontSize(23);
  doc.text(year, 13, 143);
  doc.text(marca, 13, 152);

  var x = 288;
  var y = 70;

  var blanco = "#FFFFFF"; // Blanco en formato hexadecimal
  var negro = "#000000"; // Negro en formato hexadecimal

  // Establecer el color de texto
  doc.setTextColor(blanco);
  // Definir el espaciado entre las letras
  var spacing = 10;

  // Definir el tamaño de fuente
  var fontSize = 20;

  // Agregar las letras verticalmente
  var texto = fechvenc2;

  // Iterar sobre cada letra del texto
  for (var i = 0; i < texto.length; i++) {
    var letra = texto[i];

    // Calcular las coordenadas y para cada letra
    var letraY = y + i * spacing;

    // Agregar la letra verticalmente
    doc.setFontSize(fontSize);
    doc.text(letra, x, letraY);
  }

  doc.setTextColor(negro); // Negro en formato hexadecimal
  doc.text(vin, 280.3, 143, { align: "right" });

  //Segunda Pagina
  doc.addPage("a4", "p");
  doc.setFontType("normal");
  const img2 = document.getElementById("img2");
  doc.addImage(img2, 0, 0, 208, 208);

  // Agrega los valores al documento PDF
  doc.setFontSize(10);
  doc.setTextColor(negro);
  doc.text(var_tag, 62, 29);
  doc.text(fechini, 150, 29);
  doc.text(fechvenc, 150, 34);
  doc.text(fechaFormateada, 62, 58.3);
  doc.text(vin, 62, 63.8);
  doc.text(color, 62, 80.3);
  doc.text(marca, 62, 74.8);
  doc.text(year, 62, 69.3);
  doc.text(body_style, 150, 69.3);
  doc.text(model, 150, 74.8);
  doc.text(nombre, 105, 115);
  doc.text(mailingaddress, 105, 120.5);
  doc.text(cityandstate, 105, 126);
  doc.text(coidgozip, 105, 131.5);

  //Tercera Pagina
  doc.addPage("a4", "p");
  doc.setFontType("normal");
  const img3 = document.getElementById("img3");
  doc.addImage(img3, 0, 0, 208, 208);

  // Agrega los valores al documento PDF
  doc.setFontSize(10);
  doc.setTextColor(negro);
  doc.text(var_tag, 62, 29);
  doc.text(fechini, 150, 29);
  doc.text(fechvenc, 150, 34);
  doc.text(fechaFormateada, 62, 41.3); //comienzo
  doc.text(vin, 62, 46.8);
  doc.text(color, 62, 63.3);
  doc.text(marca, 62, 57.8);
  doc.text(year, 62, 52.3);
  doc.text(body_style, 150, 52.3);
  doc.text(model, 150, 57.8);
  doc.text(nombre, 105, 96);
  doc.text(mailingaddress, 105, 101.5);
  doc.text(cityandstate, 105, 107);
  doc.text(coidgozip, 105, 112.5);

  doc.save("Tx_tag.pdf");
}
function convertirMayusculas(input) {
  input.value = input.value.toUpperCase();
}
