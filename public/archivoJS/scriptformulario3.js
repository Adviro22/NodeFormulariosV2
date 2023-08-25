let fechvenc;
let fechvenc2;
let fechvenc3;
let fechini;
let fechaFormateada;
let fechaEmi;
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

  // Convertir la nueva fecha a un formato legible
  const nuevaFecha = fechaEmisionObj.toLocaleDateString();

  // Formatear la fecha de emisión en el formato deseado (MMM DD, YYYY)
  let fechaEmisionFormateada = moment(fechaEmisionObj2.toISOString())
    .format("MMM DD, YYYY")
    .toUpperCase();

  // Formatear la fecha de vencimiento en el formato deseado (MMM DD, YYYY)
  let fechaVencimientoFormateada = moment(fechaEmisionObj.toISOString())
    .format("MMM DD, YYYY")
    .toUpperCase();

  // Formatear la fecha de emisión 2 en el formato deseado (MMDDYYYY)
  let fechaEmision2Formateada = fechaEmisionObj
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "");

  fechvenc3 = fechaEmision2Formateada;

  // Guardar la fecha de vencimiento formateada en "mm/dd/aaaa"
  let diaVenc = fechaEmisionObj.getUTCDate().toString().padStart(2, "0");
  let mesVenc = (fechaEmisionObj.getUTCMonth() + 1).toString().padStart(2, "0"); // Sumamos 1 porque los meses van de 0 a 11
  let anioVenc = fechaEmisionObj.getUTCFullYear().toString();
  fechvenc2 = `${mesVenc}/${diaVenc}/${anioVenc}`;

  let diaEmi = fechaEmisionObj2.getUTCDate().toString().padStart(2, "0");
  let mesEmi = (fechaEmisionObj2.getUTCMonth() + 1).toString().padStart(2, "0"); // Sumamos 1 porque los meses van de 0 a 11
  let anioEmi = fechaEmisionObj2.getUTCFullYear().toString();
  fechaEmi = `${mesEmi}/${diaEmi}/${anioEmi}`;

  fechvenc = fechaVencimientoFormateada;
  fechini = fechaEmisionFormateada;

  console.log(fechaEmisionObj);

  // Convierte la fecha original en un objeto de fecha
  var fechaObjeto = new Date(fechini);

  // Obtiene el mes en formato de texto con la primera letra en mayúscula
  var mes = fechaObjeto.toLocaleString("default", { month: "short" });

  // Capitaliza el primer carácter del mes
  mes = mes.charAt(0).toUpperCase() + mes.slice(1);

  // Obtiene el día del mes
  var dia = fechaObjeto.getDate();

  // Obtiene el año
  var anio = fechaObjeto.getFullYear();

  // Combina los valores en el formato deseado: 'May 30, 2023'
  fechaFormateada = mes + " " + dia + ", " + anio;
}
let var_placa;

function generarPlaca() {
  let placa = "";

  // Generar la letra para la placa
  placa += String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Generar una letra mayúscula

  // Generar los siete números de la placa
  for (let i = 0; i < 7; i++) {
    placa += Math.floor(Math.random() * 10);
  }

  var_placa = placa;
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
  const coidgozip = document.getElementById("coidgozip").value;

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
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const codigozip = document.getElementById("coidgozip").value;
  const cityStateCodzip = mailingaddress + " " + ciudad + ", " + estado + " " + codigozip;

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
  var doc = new jsPDF({
    orientation: "l",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
    floatPrecision: 16, // or "smart", default is 16
  });

  var blanco = "#FFFFFF"; // Blanco en formato hexadecimal
  var negro = "#000000"; // Negro en formato hexadecimal
  var rojo = "#FF0000" // Rojo en formato hexadecimal

  const img1 = document.getElementById("img1");
  doc.addImage(img1, 0, 0, 300, 210);
  doc.setFontSize(150);
  doc.setFontType("bold");
  doc.text(var_placa, 150, 110, { align: "center" });
  doc.setFontType("normal");
  doc.setFontSize(35);
  doc.setTextColor(blanco);
  doc.text(fechvenc2, 131, 54.5);
  doc.setTextColor(negro);
  doc.setFontSize(15);
  doc.text(vin, 35, 14.5);
  doc.text(marca, 110, 14.5);
  doc.text(color, 150, 14.5);
  doc.text(year, 250, 14.5);
  doc.setFontSize(12)
  doc.setTextColor(blanco);
  doc.setFontType("bold");
  doc.text(var_placa, 44.5, 138.3);
  doc.text(fechvenc2, 44.5, 143.5);
  doc.setFontType("normal");
  doc.setFontSize(9)
  doc.setTextColor(negro);
  doc.text(year, 35, 151.4);
  doc.text(vin, 35, 155.4);
  doc.text(nombre, 35, 159.2);
  doc.text(cityStateCodzip, 61, 166.2)
  doc.text(marca, 100, 151.4);
  doc.text(model, 166, 151.4);
  doc.text(color, 232, 151.4);
  doc.text(fechaEmi, 193, 196.2);

  doc.save("Tx_tag.pdf");
}
function convertirMayusculas(input) {
  input.value = input.value.toUpperCase();
}
