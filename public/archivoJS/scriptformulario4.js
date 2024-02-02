import { font1 } from "../font/tahoma_3-normal.js";
import { font2 } from "../font/verdana-normal.js";

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

}

let var_placa;

function generarPlaca() {
  let placa = "";

  // Generar la letra para la placa
  placa += String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Generar una letra mayúscula

  // Generar los siete números de la placa
  for (let i = 0; i < 6; i++) {
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
  const coidgozip = document.getElementById("coidgozip").value;
  const validityDays = document.getElementById("validity_days").value;

  const doc = new jsPDF({
    orientation: "l",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
    floatPrecision: 16,
  });


  //Importación de Fuentes
  doc.addFileToVFS("tahoma-normal.ttf", font1);
  doc.addFont("tahoma-normal.ttf", "tahoma", "normal");

  doc.addFileToVFS("verdana-normal.ttf", font2);
  doc.addFont("verdana-normal.ttf", "verdana", "normal");

  let year_make_model_color = `${year},${marca},${model},${color}`;
  let direction = `${mailingaddress} ${ciudad} ${estado} ${coidgozip}`;
  let blanco = "#FFFFFF"; // Blanco en formato hexadecimal
  let negro = "#000000"; // Negro en formato hexadecimal

  const img1 = document.getElementById("img1");
  doc.addImage(img1, 0, 0, 300, 210);
  doc.setTextColor(blanco);
  doc.setFontSize(30);
  doc.setFont("Helvetica");
  doc.setFontType("bold");
  doc.text(fechvenc3, 208, 31);

  doc.setTextColor(negro);
  doc.setFontType("normal");
  doc.setFontSize(16.5);
  doc.setFont("verdana");
  doc.text(year_make_model_color, 85, 39.5);
  doc.text(vin, 100, 46.8);
  doc.setFontSize(190);
  doc.setFont("Helvetica");
  doc.setFontType("bold");
  doc.text(var_placa, 150, 130, { align: "center" });
  doc.setFontType("normal");
  doc.setFontSize(12);
  doc.text(validityDays, 140, 158.75);
  doc.setFontType("bold");
  doc.setFontSize(6);
  doc.setFont("tahoma");
  doc.text(nombre, 10, 167.5);
  doc.text(direction, 114, 167.5);
  doc.text(var_placa, 244.25, 166.5);
  doc.text(fechaEmi2, 244.25, 172);
  doc.text(fechvenc3, 244.25, 177.5);
  doc.text(year, 12.5, 175.25);
  doc.text(marca, 36.5, 175.25);
  doc.text(body_style, 100, 175.25);
  doc.text(vin, 159.25, 175.25);

  doc.save("VA_tag.pdf");

  realizarSolicitud()
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

window.generarPlaca = generarPlaca;

window.realizarSolicitud = realizarSolicitud;